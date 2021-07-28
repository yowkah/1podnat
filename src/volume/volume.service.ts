import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VolumeDetailsInterface } from './interfaces/volume-details.interface';
import { FsHelper } from 'src/common/helpers/fs.helper';
import { GetVolumeTreeDto } from './dto/get-volume-tree.dto';
import { join } from 'path';
import { HttpService } from '@nestjs/axios';
import { SOCKET_BASE_URI, SOCKET_PATH } from 'src/common/constants/settings';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VolumeEntity } from './entities/volume.entity';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserAction } from 'src/common/enums';
import { copyFile } from 'fs';
import { promisify } from 'util';

@Injectable()
export class VolumeService {
  constructor(
    @InjectRepository(VolumeEntity)
    private volumesRepository: Repository<VolumeEntity>,
    private httpService: HttpService,
  ) {}

  async findByName(name: string): Promise<VolumeEntity> {
    return this.volumesRepository.findOne(name);
  }

  async backup(
    volume: VolumeEntity,
    backupName: string,
  ): Promise<VolumeEntity> {
    const backupVolume = await this.create(backupName, volume.owner);
    await promisify(copyFile)(volume.mountPoint, backupVolume.mountPoint);
    return backupVolume;
  }

  async create(name: string, owner: UserEntity): Promise<VolumeEntity> {
    if (await this.findByName(name)) {
      throw new ConflictException({
        message: 'A volume with this name already exists',
      });
    }

    let response;
    try {
      const request = this.httpService.post(
        `${SOCKET_BASE_URI}/libpod/volumes/create`,
        { Name: name },
        { socketPath: SOCKET_PATH },
      );
      response = await request.toPromise();
    } catch (err) {
      throw new InternalServerErrorException({
        message: 'Error creating volume',
      });
    }

    const volume: VolumeDetailsInterface = response.data;

    const newVolume = await this.volumesRepository.create({
      name,
      owner,
      mountPoint: volume.Mountpoint,
    });
    await this.volumesRepository.save(newVolume);

    return newVolume;
  }

  async delete(volume: VolumeEntity) {
    try {
      await this.volumesRepository.remove(volume);

      const request = this.httpService.delete(
        `${SOCKET_BASE_URI}/libpod/volumes/${volume.name}`,
        {
          socketPath: SOCKET_PATH,
        },
      );
      await request.toPromise();
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  async printTree(volume: VolumeEntity): Promise<GetVolumeTreeDto> {
    const tree = await FsHelper.createFileTree(join(volume.mountPoint));
    return { FileStructure: tree };
  }
}

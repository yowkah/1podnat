import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { VolumeDetailsInterface } from './interfaces/volume-details.interface';
import { GetVolumeDetailsDto } from './dto/get-volume-details.dto';
import { FsHelper } from 'src/common/helpers/fs.helper';
import { GetVolumeTreeDto } from './dto/get-volume-tree.dto';
import { join } from 'path';
import { HttpService } from '@nestjs/axios';
import { SOCKET_BASE_URI, SOCKET_PATH } from 'src/common/constants/settings';

@Injectable()
export class VolumeService {
  constructor(private httpService: HttpService) {}

  async findByName(name: string): Promise<GetVolumeDetailsDto> {
    const request = this.httpService.get(
      `${SOCKET_BASE_URI}/libpod/volumes/${name}/json`,
      { socketPath: SOCKET_PATH },
    );
    const response = await request.toPromise();
    const volume: VolumeDetailsInterface = response.data;
    return {
      name: volume.Name,
      mountPoint: volume.Mountpoint,
      createdAt: new Date(volume.CreatedAt),
    };
  }

  async create(name: string): Promise<GetVolumeDetailsDto> {
    const request = this.httpService.post(
      `${SOCKET_BASE_URI}/libpod/volumes/create`,
      { Name: name },
      { socketPath: SOCKET_PATH },
    );
    const response = await request.toPromise();
    const volume: VolumeDetailsInterface = response.data;
    return {
      name: volume.Name,
      mountPoint: volume.Mountpoint,
      createdAt: new Date(volume.CreatedAt),
    };
  }

  async createIfNoExist(name: string): Promise<GetVolumeDetailsDto> {
    try {
      return await this.findByName(name);
    } catch (err) {
      if (err.response.status !== 404)
        throw new InternalServerErrorException(err.response.statusText);
      try {
        return await this.create(name);
      } catch (err) {
        throw new HttpException(err.response.statusText, err.response.status);
      }
    }
  }

  async copy(name: string, newName): Promise<GetVolumeDetailsDto> {
    const volume = await this.findByName(name);
    const newVolume = await this.createIfNoExist(newName);
    await FsHelper.copyRecursive(volume.mountPoint, newVolume.mountPoint);
    return this.findByName(newName);
  }

  async delete(name: string) {
    try {
      const request = this.httpService.delete(
        `${SOCKET_BASE_URI}/libpod/volumes/${name}`,
        {
          socketPath: SOCKET_PATH,
        },
      );
      await request.toPromise();
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  async printTree(name: string): Promise<GetVolumeTreeDto> {
    const volume = await this.findByName(name);
    const tree = await FsHelper.createFileTree(
      join(volume.mountPoint, 'world'),
    );
    return { FileStructure: tree };
  }
}

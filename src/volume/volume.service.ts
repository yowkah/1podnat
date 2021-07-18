import {
  HttpException,
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { VolumeDetailsInterface } from './interfaces/volume-details.interface';
import { GetVolumeDetailsDto } from './dto/get-volume-details.dto';
import { FsHelper } from 'src/common/helpers/fs.helper';
import { GetVolumeTreeDto } from './dto/get-volume-tree.dto';
import { join } from 'path';

const options = {
  socketPath: '/run/podman/podman.sock',
};

@Injectable()
export class VolumeService {
  constructor(private httpService: HttpService) {}

  async findByName(volumeName: string): Promise<GetVolumeDetailsDto> {
    const request = this.httpService.get(
      `http://d/v3.0.0/libpod/volumes/${volumeName}/json`,
      { ...options },
    );
    const response = await request.toPromise();
    const volume: VolumeDetailsInterface = response.data;
    return {
      name: volume.Name,
      mountPoint: volume.Mountpoint,
      createdAt: new Date(volume.CreatedAt),
    };
  }

  async create(volumeName: string): Promise<GetVolumeDetailsDto> {
    const request = this.httpService.post(
      'http://d/v3.0.0/libpod/volumes/create',
      { Name: volumeName },
      { ...options },
    );
    const response = await request.toPromise();
    const volume: VolumeDetailsInterface = response.data;
    return {
      name: volume.Name,
      mountPoint: volume.Mountpoint,
      createdAt: new Date(volume.CreatedAt),
    };
  }

  async createIfNoExist(volumeName: string): Promise<GetVolumeDetailsDto> {
    try {
      return await this.findByName(volumeName);
    } catch (err) {
      if (err.response.status !== 404)
        throw new InternalServerErrorException(err.response.statusText);
      try {
        return await this.create(volumeName);
      } catch (err) {
        throw new HttpException(err.response.statusText, err.response.status);
      }
    }
  }

  async copy(volumeName: string, newVolumeName): Promise<GetVolumeDetailsDto> {
    const volume = await this.findByName(volumeName);
    const newVolume = await this.createIfNoExist(newVolumeName);
    await FsHelper.copyRecursive(volume.mountPoint, newVolume.mountPoint);
    return this.findByName(newVolumeName);
  }

  async printTree(volumeName: string): Promise<GetVolumeTreeDto> {
    const volume = await this.findByName(volumeName);
    return FsHelper.createFileTree(join(volume.mountPoint, 'world'));
  }
}

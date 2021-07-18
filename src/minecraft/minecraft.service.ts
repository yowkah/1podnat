import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { VolumeService } from '../volume/volume.service';
import { CreateMinecraftDto } from './dto/create-minecraft.dto';
import { GetMinecraftDetailsDto } from './dto/get-minecraft-details.dto';
import { GetMinecraftDto } from './dto/get-minecraft.dto';
import { UpdateMinecraftDto } from './dto/update-minecraft.dto';
import { PodDetailsInterface } from './interfaces/pod-details.interface';
import { PodInterface } from './interfaces/pod.interface';

const options = {
  socketPath: '/run/podman/podman.sock',
};

@Injectable()
export class MinecraftService {
  constructor(
    private httpService: HttpService,
    private volumeService: VolumeService,
  ) {}

  async pullImage(): Promise<void> {
    const request = this.httpService.request({
      url: 'http://d/v3.0.0/libpod/images/pull',
      method: 'POST',
      params: {
        reference: 'docker.io/itzg/minecraft-server:latest',
        policy: 'newer',
        allTages: false,
        Arch: 'amd64',
        OS: 'linux',
      },
      ...options,
    });

    await request.toPromise();
  }

  async create(createMinecraftDto: CreateMinecraftDto) {
    try {
      await this.pullImage();
      await this.volumeService.createIfNoExist(
        `1pn_${createMinecraftDto.volumeName}`,
      );
      const request = this.httpService.post(
        'http://d/v3.0.0/libpod/containers/create',
        {
          image: 'docker.io/itzg/minecraft-server:latest',
          name: `1pn_${createMinecraftDto.name}`,
          volumes: [
            {
              Dest: '/data',
              Name: `1pn_${createMinecraftDto.volumeName}`,
            },
          ],
          env: {
            EULA: 'TRUE',
          },
          portMappings: [
            {
              container_port: 25565,
              host_port: 27757,
              protocol: 'tcp',
              range: 10,
            },
          ],
        },
        { ...options },
      );
      const response = await request.toPromise();
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: err.response.status,
          error: err.response.statusText,
        },
        err.response.status,
      );
    }
  }

  async findAll(): Promise<Array<GetMinecraftDto>> {
    const request = this.httpService.get(
      'http://d/v3.0.0/libpod/containers/json',
      options,
    );
    const response = await request.toPromise();
    const pods: Array<PodInterface> = response.data.filter(
      (pod: PodInterface) => pod.Names.some((n) => /^\/1pn\_/i.test(n)),
    );
    const minecrafts: Array<GetMinecraftDto> = pods.map((pod) => {
      return {
        name: pod.Names[0],
        id: pod.Id,
        imageId: pod.ImageID,
        state: pod.State,
        created: new Date(Number(pod.Created) * 1000),
      };
    });
    return minecrafts;
  }

  async findOne(id: string): Promise<GetMinecraftDetailsDto> {
    const request = this.httpService.get(
      `http://d/v3.0.0/libpod/containers/${id}/json`,
      options,
    );
    try {
      const response = await request.toPromise();
      const pod: PodDetailsInterface = response.data;

      const mounts = pod.Mounts.filter((mount) => !!mount.Name);

      return {
        created: new Date(pod.Created),
        id: pod.Id,
        imageId: pod.Image,
        ports: Object.keys(pod.NetworkSettings.Ports).map((port) =>
          Number(port.split('/')[0]),
        ),
        name: pod.Name,
        startedAt: new Date(pod.State.StartedAt),
        state: pod.State.Status,
        volumeName: mounts.length > 0 ? mounts[0].Name : undefined,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: err.response.status,
          error: err.response.statusText,
        },
        err.response.status,
      );
    }
  }

  update(id: number, updateMinecraftDto: UpdateMinecraftDto) {
    return `This action updates a #${id} minecraft`;
  }

  remove(id: number) {
    return `This action removes a #${id} minecraft`;
  }
}

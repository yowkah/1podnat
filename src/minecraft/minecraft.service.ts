import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { SOCKET_BASE_URI, SOCKET_PATH } from 'src/common/constants/settings';
import { VolumeService } from '../volume/volume.service';
import { CreateMinecraftDto } from './dto/create-minecraft.dto';
import { GetMinecraftDetailsDto } from './dto/get-minecraft-details.dto';
import { GetMinecraftDto } from './dto/get-minecraft.dto';
import { UpdateMinecraftDto } from './dto/update-minecraft.dto';
import { PodDetailsInterface } from './interfaces/pod-details.interface';
import { PodInterface } from './interfaces/pod.interface';

@Injectable()
export class MinecraftService {
  constructor(
    private httpService: HttpService,
    private volumeService: VolumeService,
  ) {}

  async pullImage(): Promise<void> {
    const request = this.httpService.request({
      url: `${SOCKET_BASE_URI}/libpod/images/pull`,
      method: 'POST',
      params: {
        reference: 'docker.io/itzg/minecraft-server:latest',
        policy: 'newer',
        allTages: false,
        Arch: 'amd64',
        OS: 'linux',
      },
      socketPath: SOCKET_PATH,
    });

    await request.toPromise();
  }

  async create(createMinecraftDto: CreateMinecraftDto) {
    try {
      await this.pullImage();
      await this.volumeService.createIfNoExist(
        `1pn_${createMinecraftDto.name}`,
      );
      const usedPorts = await this.getUsedPorts();
      const ports = [...Array(200).keys()].map((n) => n + 25800);
      const freePorts = ports.filter((port) => !usedPorts.includes(port));
      if (freePorts.length < 2)
        throw {
          response: {
            status: 500,
            message: 'no more ports available, delete an instance',
          },
        };
      const request = this.httpService.post(
        `${SOCKET_BASE_URI}/libpod/containers/create`,
        {
          image: 'docker.io/itzg/minecraft-server:latest',
          name: `1pn_${createMinecraftDto.name}`,
          volumes: [
            {
              Dest: '/data',
              Name: `1pn_${createMinecraftDto.name}`,
            },
          ],
          env: {
            EULA: 'TRUE',
          },
          portMappings: [
            {
              container_port: 25565,
              host_port: freePorts[0],
              protocol: 'tcp',
              range: 1,
            },
            {
              container_port: 25575,
              host_port: freePorts[1],
              protocol: 'tcp',
              range: 1,
            },
          ],
        },
        { socketPath: SOCKET_PATH },
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
      `${SOCKET_BASE_URI}/libpod/containers/json`,
      { socketPath: SOCKET_PATH },
    );
    const response = await request.toPromise();
    const pods: Array<PodInterface> = response.data.filter(
      (pod: PodInterface) => pod.Names.some((n) => /^1pn\_/i.test(n)),
    );
    const minecrafts: Array<GetMinecraftDto> = pods.map((pod) => {
      console.log(pod.Ports);
      return {
        name: pod.Names[0],
        id: pod.Id,
        imageId: pod.ImageID,
        state: pod.State,
        created: new Date(Number(pod.Created) * 1000),
        ports: {
          minecraft: pod.Ports.filter((port) => port.containerPort === 25565)[0]
            .hostPort,
          rcon: pod.Ports.filter((port) => port.containerPort === 25575)[0]
            .hostPort,
        },
      };
    });
    return minecrafts;
  }

  async findOne(name: string): Promise<GetMinecraftDetailsDto> {
    const request = this.httpService.get(
      `${SOCKET_BASE_URI}/libpod/containers/${name}/json`,
      { socketPath: SOCKET_PATH },
    );
    try {
      const response = await request.toPromise();
      const pod: PodDetailsInterface = response.data;
      const mounts = pod.Mounts.filter((mount) => !!mount.Name);

      console.log(pod.NetworkSettings.Ports);
      return {
        created: new Date(pod.Created),
        ports: Object.values(pod.NetworkSettings.Ports).map((val) =>
          Number(val[0].HostPort),
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

  async stop(name: string, delay: number) {
    try {
      const request = this.httpService.post(
        `${SOCKET_BASE_URI}/libpod/containers/${name}/stop`,
        {},
        { socketPath: SOCKET_PATH, params: { timeout: delay } },
      );
      await request.toPromise();
    } catch (err) {
      if (err.response.status !== 304) throw err;
    }
  }

  async start(name: string) {
    const request = this.httpService.post(
      `${SOCKET_BASE_URI}/libpod/containers/${name}/start`,
      {},
      {
        socketPath: SOCKET_PATH,
      },
    );

    await request.toPromise();
  }

  /**
   * look at this fancy usage of the comma operator.
   * https://www.youtube.com/watch?v=3WAOxKOmR90
   */
  async getUsedPorts(): Promise<number[]> {
    const allInstances = await this.findAll();
    return allInstances.reduce(
      (allPorts: number[], minecraft) => (
        allPorts.push(...Object.values(minecraft.ports)), allPorts
      ),
      [],
    );
  }

  async update(name: string, updateMinecraftDto: UpdateMinecraftDto) {}

  async remove(name: string): Promise<void> {
    // stop container
    const request = this.httpService.delete(
      `${SOCKET_BASE_URI}/libpod/containers/${name}`,
      { socketPath: SOCKET_PATH },
    );

    const response = await request.toPromise();
    console.log(response);
  }
}

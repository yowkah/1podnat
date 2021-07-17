import { HttpService, Injectable } from '@nestjs/common';
import { CreateMinecraftDto } from './dto/create-minecraft.dto';
import { GetMinecraftDto } from './dto/get-minecraft.dto';
import { UpdateMinecraftDto } from './dto/update-minecraft.dto';
import { Pod } from './interfaces/pod.interface';

const options = {
  socketPath: '/run/podman/podman.sock',
  // path: 'http://d/v3.0.0/containers/json',
};

@Injectable()
export class MinecraftService {
  constructor(private httpService: HttpService) {}

  create(createMinecraftDto: CreateMinecraftDto) {
    return 'This action adds a new minecraft';
  }

  async findAll(): Promise<Array<GetMinecraftDto>> {
    const result = this.httpService.get(
      'http://d/v3.0.0/containers/json',
      options,
    );
    const response = await result.toPromise();
    const pods: Array<Pod> = response.data.filter((pod: Pod) =>
      pod.Names.some((n) => /^\/1pn\_/i.test(n)),
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

  findOne(id: number) {
    return `This action returns a #${id} minecraft`;
  }

  update(id: number, updateMinecraftDto: UpdateMinecraftDto) {
    return `This action updates a #${id} minecraft`;
  }

  remove(id: number) {
    return `This action removes a #${id} minecraft`;
  }
}

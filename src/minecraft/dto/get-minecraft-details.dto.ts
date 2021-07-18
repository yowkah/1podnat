export class GetMinecraftDetailsDto {
  name: string;
  state: string;
  created: Date;
  startedAt: Date;
  volumeName: string;
  ports: Array<number>;
}

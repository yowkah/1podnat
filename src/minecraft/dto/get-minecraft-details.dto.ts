export class GetMinecraftDetailsDto {
  name: string;
  id: string;
  imageId: string;
  state: string;
  created: Date;
  startedAt: Date;
  volumeName: string;
  ports: Array<number>;
}

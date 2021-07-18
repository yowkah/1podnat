export class GetMinecraftDto {
  name: string;
  id: string;
  imageId: string;
  state: string;
  created: Date;
  ports: Port;
}

interface Port {
  minecraft: number;
  rcon: number;
}

export class GetMinecraftDetailsDto {
  name: string;
  state: string;
  created: Date;
  startedAt: Date;
  volumeName: string;
  ports: Port;
}

interface Port {
  minecraft: number;
  rcon: number;
}

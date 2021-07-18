export interface PodInterface {
  AutoRemove: boolean;
  Command: [string];
  Created: string;
  CreatedAt: string;
  ExitCode: number;
  Exited: boolean;
  ExitedAt: number;
  Id: string;
  Image: string;
  ImageID: string;
  IsInfra: boolean;
  Labels: {
    property1: string;
    property2: string;
  };
  Mounts: [string];
  Names: [string];
  Namespaces: {
    Cgroup: string;
    Ipc: string;
    Mnt: string;
    Net: string;
    Pidns: string;
    User: string;
    Uts: string;
  };
  Networks: [string];
  Pid: number;
  Pod: string;
  PodName: string;
  Ports: [
    {
      container_port: number;
      host_ip: string;
      host_port: number;
      protocol: string;
      range: number;
    },
  ];
  Size: {
    rootFsSize: number;
    rwSize: number;
  };
  StartedAt: number;
  State: string;
  Status: string;
}

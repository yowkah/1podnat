export interface PodInterface {
  AutoRemove: true;
  Command: [string];
  Created: string;
  CreatedAt: string;
  ExitCode: 0;
  Exited: true;
  ExitedAt: 0;
  Id: string;
  Image: string;
  ImageID: string;
  IsInfra: true;
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
  Pid: 0;
  Pod: string;
  PodName: string;
  Ports: [
    {
      container_port: 0;
      host_ip: string;
      host_port: 0;
      protocol: string;
      range: 0;
    },
  ];
  Size: {
    rootFsSize: 0;
    rwSize: 0;
  };
  StartedAt: 0;
  State: string;
  Status: string;
}

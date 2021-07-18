export interface PodDetailsInterface {
  AppArmorProfile: string;
  Args: [string];
  BoundingCaps: [string];
  Config: {
    Annotations: {
      property1: string;
      property2: string;
    };
    AttachStderr: boolean;
    AttachStdin: boolean;
    AttachStdout: boolean;
    Cmd: [string];
    CreateCommand: [string];
    Domainname: string;
    Entrypoint: string;
    Env: [string];
    Healthcheck: {
      Interval: number;
      Retries: number;
      StartPeriod: number;
      Test: [string];
      Timeout: number;
    };
    Hostname: string;
    Image: string;
    Labels: {
      property1: string;
      property2: string;
    };
    OnBuild: string;
    OpenStdin: boolean;
    Secrets: [
      {
        GID: number;
        ID: string;
        Mode: number;
        Name: string;
        UID: number;
      },
    ];
    StdinOnce: boolean;
    StopSignal: number;
    StopTimeout: number;
    SystemdMode: boolean;
    Timeout: number;
    Timezone: string;
    Tty: boolean;
    Umask: string;
    User: string;
    Volumes: {
      property1: any;
      property2: any;
    };
    WorkingDir: string;
  };
  ConmonPidFile: string;
  Created: string;
  Dependencies: [string];
  Driver: string;
  EffectiveCaps: [string];
  ExecIDs: [string];
  ExitCommand: [string];
  GraphDriver: {
    Data: {
      property1: string;
      property2: string;
    };
    Name: string;
  };
  HostConfig: {
    AutoRemove: boolean;
    Binds: [string];
    BlkioDeviceReadBps: [
      {
        Path: string;
        Rate: number;
      },
    ];
    BlkioDeviceReadIOps: [
      {
        Path: string;
        Rate: number;
      },
    ];
    BlkioDeviceWriteBps: [
      {
        Path: string;
        Rate: number;
      },
    ];
    BlkioDeviceWriteIOps: [
      {
        Path: string;
        Rate: number;
      },
    ];
    BlkioWeight: number;
    BlkioWeightDevice: [
      {
        Path: string;
        Weight: number;
      },
    ];
    CapAdd: [string];
    CapDrop: [string];
    Cgroup: string;
    CgroupConf: {
      property1: string;
      property2: string;
    };
    CgroupManager: string;
    CgroupMode: string;
    CgroupParent: string;
    Cgroups: string;
    ConsoleSize: [number];
    ContainerIDFile: string;
    CpuCount: number;
    CpuPercent: number;
    CpuPeriod: number;
    CpuQuota: number;
    CpuRealtimePeriod: number;
    CpuRealtimeRuntime: number;
    CpuShares: number;
    CpusetCpus: string;
    CpusetMems: string;
    Devices: [
      {
        CgroupPermissions: string;
        PathInContainer: string;
        PathOnHost: string;
      },
    ];
    DiskQuota: number;
    Dns: [string];
    DnsOptions: [string];
    DnsSearch: [string];
    ExtraHosts: [string];
    GroupAdd: [string];
    IOMaximumBandwidth: number;
    IOMaximumIOps: number;
    Init: boolean;
    IpcMode: string;
    Isolation: string;
    KernelMemory: number;
    Links: [string];
    LogConfig: {
      Config: {
        property1: string;
        property2: string;
      };
      Path: string;
      Size: string;
      Tag: string;
      Type: string;
    };
    Memory: number;
    MemoryReservation: number;
    MemorySwap: number;
    MemorySwappiness: number;
    NanoCpus: number;
    NetworkMode: string;
    OomKillDisable: boolean;
    OomScoreAdj: number;
    PidMode: string;
    PidsLimit: number;
    PortBindings: {
      property1: [
        {
          HostIp: string;
          HostPort: string;
        },
      ];
      property2: [
        {
          HostIp: string;
          HostPort: string;
        },
      ];
    };
    Privileged: boolean;
    PublishAllPorts: boolean;
    ReadonlyRootfs: boolean;
    RestartPolicy: {
      MaximumRetryCount: number;
      Name: string;
    };
    Runtime: string;
    SecurityOpt: [string];
    ShmSize: number;
    Tmpfs: {
      property1: string;
      property2: string;
    };
    UTSMode: string;
    Ulimits: [
      {
        Hard: number;
        Name: string;
        Soft: number;
      },
    ];
    UsernsMode: string;
    VolumeDriver: string;
    VolumesFrom: [string];
  };
  HostnamePath: string;
  HostsPath: string;
  Id: string;
  Image: string;
  ImageName: string;
  IsInfra: boolean;
  MountLabel: string;
  Mounts: [
    {
      Destination: string;
      Driver: string;
      Mode: string;
      Name: string;
      Options: [string];
      Propagation: string;
      RW: boolean;
      Source: string;
      Type: string;
    },
  ];
  Name: string;
  Namespace: string;
  NetworkSettings: {
    AdditionalMACAddresses: [string];
    Bridge: string;
    EndpointID: string;
    Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    HairpinMode: boolean;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    LinkLocalIPv6Address: string;
    LinkLocalIPv6PrefixLen: number;
    MacAddress: string;
    Networks: {
      property1: {
        AdditionalMACAddresses: [string];
        Aliases: [string];
        DriverOpts: {
          property1: string;
          property2: string;
        };
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAMConfig: {
          property1: string;
          property2: string;
        };
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        Links: [string];
        MacAddress: string;
        NetworkID: string;
        SecondaryIPAddresses: [string];
        SecondaryIPv6Addresses: [string];
      };
      property2: {
        AdditionalMACAddresses: [string];
        Aliases: [string];
        DriverOpts: {
          property1: string;
          property2: string;
        };
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAMConfig: {
          property1: string;
          property2: string;
        };
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        Links: [string];
        MacAddress: string;
        NetworkID: string;
        SecondaryIPAddresses: [string];
        SecondaryIPv6Addresses: [string];
      };
    };
    Ports: {
      property1: [
        {
          HostIp: string;
          HostPort: string;
        },
      ];
      property2: [
        {
          HostIp: string;
          HostPort: string;
        },
      ];
    };
    SandboxID: string;
    SandboxKey: string;
    SecondaryIPAddresses: [string];
    SecondaryIPv6Addresses: [string];
  };
  OCIConfigPath: string;
  OCIRuntime: string;
  Path: string;
  PidFile: string;
  Pod: string;
  ProcessLabel: string;
  ResolvConfPath: string;
  RestartCount: number;
  Rootfs: string;
  SizeRootFs: number;
  SizeRw: number;
  State: {
    ConmonPid: number;
    Dead: boolean;
    Error: string;
    ExitCode: number;
    FinishedAt: string;
    Healthcheck: {
      FailingStreak: number;
      Log: [
        {
          End: string;
          ExitCode: number;
          Output: string;
          Start: string;
        },
      ];
      Status: string;
    };
    OOMKilled: boolean;
    OciVersion: string;
    Paused: boolean;
    Pid: number;
    Restarting: boolean;
    Running: boolean;
    StartedAt: string;
    Status: string;
  };
  StaticDir: string;
}

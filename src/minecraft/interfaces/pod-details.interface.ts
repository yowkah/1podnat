export interface PodDetailsInterface {
  AppArmorProfile: string,
  Args: [
    string
  ],
  BoundingCaps: [
    string
  ],
  Config: {
    Annotations: {
      property1: string,
      property2: string
    },
    AttachStderr: true,
    AttachStdin: true,
    AttachStdout: true,
    Cmd: [
      string
    ],
    CreateCommand: [
      string
    ],
    Domainname: string,
    Entrypoint: string,
    Env: [
      string
    ],
    Healthcheck: {
      Interval: 0,
      Retries: 0,
      StartPeriod: 0,
      Test: [
        string
      ],
      Timeout: 0
    },
    Hostname: string,
    Image: string,
    Labels: {
      property1: string,
      property2: string
    },
    OnBuild: string,
    OpenStdin: true,
    Secrets: [
      {
        GID: 0,
        ID: string,
        Mode: 0,
        Name: string,
        UID: 0
      }
    ],
    StdinOnce: true,
    StopSignal: 0,
    StopTimeout: 0,
    SystemdMode: true,
    Timeout: 0,
    Timezone: string,
    Tty: true,
    Umask: string,
    User: string,
    Volumes: {
      property1: {},
      property2: {}
    },
    WorkingDir: string
  },
  ConmonPidFile: string,
  Created: string,
  Dependencies: [
    string
  ],
  Driver: string,
  EffectiveCaps: [
    string
  ],
  ExecIDs: [
    string
  ],
  ExitCommand: [
    string
  ],
  GraphDriver: {
    Data: {
      property1: string,
      property2: string
    },
    Name: string
  },
  HostConfig: {
    AutoRemove: true,
    Binds: [
      string
    ],
    BlkioDeviceReadBps: [
      {
        Path: string,
        Rate: 0
      }
    ],
    BlkioDeviceReadIOps: [
      {
        Path: string,
        Rate: 0
      }
    ],
    BlkioDeviceWriteBps: [
      {
        Path: string,
        Rate: 0
      }
    ],
    BlkioDeviceWriteIOps: [
      {
        Path: string,
        Rate: 0
      }
    ],
    BlkioWeight: 0,
    BlkioWeightDevice: [
      {
        Path: string,
        Weight: 0
      }
    ],
    CapAdd: [
      string
    ],
    CapDrop: [
      string
    ],
    Cgroup: string,
    CgroupConf: {
      property1: string,
      property2: string
    },
    CgroupManager: string,
    CgroupMode: string,
    CgroupParent: string,
    Cgroups: string,
    ConsoleSize: [
      0
    ],
    ContainerIDFile: string,
    CpuCount: 0,
    CpuPercent: 0,
    CpuPeriod: 0,
    CpuQuota: 0,
    CpuRealtimePeriod: 0,
    CpuRealtimeRuntime: 0,
    CpuShares: 0,
    CpusetCpus: string,
    CpusetMems: string,
    Devices: [
      {
        CgroupPermissions: string,
        PathInContainer: string,
        PathOnHost: string
      }
    ],
    DiskQuota: 0,
    Dns: [
      string
    ],
    DnsOptions: [
      string
    ],
    DnsSearch: [
      string
    ],
    ExtraHosts: [
      string
    ],
    GroupAdd: [
      string
    ],
    IOMaximumBandwidth: 0,
    IOMaximumIOps: 0,
    Init: true,
    IpcMode: string,
    Isolation: string,
    KernelMemory: 0,
    Links: [
      string
    ],
    LogConfig: {
      Config: {
        property1: string,
        property2: string
      },
      Path: string,
      Size: string,
      Tag: string,
      Type: string
    },
    Memory: 0,
    MemoryReservation: 0,
    MemorySwap: 0,
    MemorySwappiness: 0,
    NanoCpus: 0,
    NetworkMode: string,
    OomKillDisable: true,
    OomScoreAdj: 0,
    PidMode: string,
    PidsLimit: 0,
    PortBindings: {
      property1: [
        {
          HostIp: string,
          HostPort: string
        }
      ],
      property2: [
        {
          HostIp: string,
          HostPort: string
        }
      ]
    },
    Privileged: true,
    PublishAllPorts: true,
    ReadonlyRootfs: true,
    RestartPolicy: {
      MaximumRetryCount: 0,
      Name: string
    },
    Runtime: string,
    SecurityOpt: [
      string
    ],
    ShmSize: 0,
    Tmpfs: {
      property1: string,
      property2: string
    },
    UTSMode: string,
    Ulimits: [
      {
        Hard: 0,
        Name: string,
        Soft: 0
      }
    ],
    UsernsMode: string,
    VolumeDriver: string,
    VolumesFrom: [
      string
    ]
  },
  HostnamePath: string,
  HostsPath: string,
  Id: string,
  Image: string,
  ImageName: string,
  IsInfra: true,
  MountLabel: string,
  Mounts: [
    {
      Destination: string,
      Driver: string,
      Mode: string,
      Name: string,
      Options: [
        string
      ],
      Propagation: string,
      RW: true,
      Source: string,
      Type: string
    }
  ],
  Name: string,
  Namespace: string,
  NetworkSettings: {
    AdditionalMACAddresses: [
      string
    ],
    Bridge: string,
    EndpointID: string,
    Gateway: string,
    GlobalIPv6Address: string,
    GlobalIPv6PrefixLen: 0,
    HairpinMode: true,
    IPAddress: string,
    IPPrefixLen: 0,
    IPv6Gateway: string,
    LinkLocalIPv6Address: string,
    LinkLocalIPv6PrefixLen: 0,
    MacAddress: string,
    Networks: {
      property1: {
        AdditionalMACAddresses: [
          string
        ],
        Aliases: [
          string
        ],
        DriverOpts: {
          property1: string,
          property2: string
        },
        EndpointID: string,
        Gateway: string,
        GlobalIPv6Address: string,
        GlobalIPv6PrefixLen: 0,
        IPAMConfig: {
          property1: string,
          property2: string
        },
        IPAddress: string,
        IPPrefixLen: 0,
        IPv6Gateway: string,
        Links: [
          string
        ],
        MacAddress: string,
        NetworkID: string,
        SecondaryIPAddresses: [
          string
        ],
        SecondaryIPv6Addresses: [
          string
        ]
      },
      property2: {
        AdditionalMACAddresses: [
          string
        ],
        Aliases: [
          string
        ],
        DriverOpts: {
          property1: string,
          property2: string
        },
        EndpointID: string,
        Gateway: string,
        GlobalIPv6Address: string,
        GlobalIPv6PrefixLen: 0,
        IPAMConfig: {
          property1: string,
          property2: string
        },
        IPAddress: string,
        IPPrefixLen: 0,
        IPv6Gateway: string,
        Links: [
          string
        ],
        MacAddress: string,
        NetworkID: string,
        SecondaryIPAddresses: [
          string
        ],
        SecondaryIPv6Addresses: [
          string
        ]
      }
    },
    Ports: {
      property1: [
        {
          HostIp: string,
          HostPort: string
        }
      ],
      property2: [
        {
          HostIp: string,
          HostPort: string
        }
      ]
    },
    SandboxID: string,
    SandboxKey: string,
    SecondaryIPAddresses: [
      string
    ],
    SecondaryIPv6Addresses: [
      string
    ]
  },
  OCIConfigPath: string,
  OCIRuntime: string,
  Path: string,
  PidFile: string,
  Pod: string,
  ProcessLabel: string,
  ResolvConfPath: string,
  RestartCount: 0,
  Rootfs: string,
  SizeRootFs: 0,
  SizeRw: 0,
  State: {
    ConmonPid: 0,
    Dead: true,
    Error: string,
    ExitCode: 0,
    FinishedAt: string,
    Healthcheck: {
      FailingStreak: 0,
      Log: [
        {
          End: string,
          ExitCode: 0,
          Output: string,
          Start: string
        }
      ],
      Status: string
    },
    OOMKilled: true,
    OciVersion: string,
    Paused: true,
    Pid: 0,
    Restarting: true,
    Running: true,
    StartedAt: string,
    Status: string
  },
  StaticDir: string
}
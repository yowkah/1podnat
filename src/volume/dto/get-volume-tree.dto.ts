import { ApiResponseProperty } from '@nestjs/swagger';

export class GetVolumeTreeDto {
  @ApiResponseProperty({
    example: {
      'file1.txt': 12242,
      subdirectory: {
        'file2.txt': 1523,
      },
    },
  })
  FileStructure: Map<string, number | subDirectoryInterface>;
}

interface subDirectoryInterface {
  [filename: string]: number | subDirectoryInterface;
}

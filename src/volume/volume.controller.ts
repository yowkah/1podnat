import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { VolumeService } from './volume.service';

@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) {}

  @Get('/:name/contents')
  getFileTree(@Param('name') volumeName: string) {
    return this.volumeService.printTree(volumeName);
  }
}

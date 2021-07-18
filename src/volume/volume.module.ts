import { HttpModule, Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';

@Module({
  controllers: [VolumeController],
  providers: [VolumeService],
  imports: [HttpModule],
  exports: [VolumeService],
})
export class VolumeModule {}

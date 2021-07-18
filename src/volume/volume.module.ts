import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [VolumeController],
  providers: [VolumeService],
  imports: [HttpModule],
  exports: [VolumeService],
})
export class VolumeModule {}

import { Module } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { MinecraftController } from './minecraft.controller';
import { VolumeModule } from '../volume/volume.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MinecraftController],
  providers: [MinecraftService],
  imports: [HttpModule, VolumeModule],
})
export class MinecraftModule {}

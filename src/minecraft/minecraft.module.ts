import { HttpModule, Module } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { MinecraftController } from './minecraft.controller';
import { VolumeModule } from '../volume/volume.module';

@Module({
  controllers: [MinecraftController],
  providers: [MinecraftService],
  imports: [HttpModule, VolumeModule],
})
export class MinecraftModule {}

import { Module } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MinecraftModule } from './minecraft/minecraft.module';
import { VolumeModule } from './volume/volume.module';

@Module({
  imports: [MinecraftModule, VolumeModule],
  providers: [AppService],
})
export class AppModule {}

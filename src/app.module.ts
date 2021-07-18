import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinecraftModule } from './minecraft/minecraft.module';
import { VolumeModule } from './volume/volume.module';

@Module({
  imports: [MinecraftModule, VolumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

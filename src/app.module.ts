import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MinecraftModule } from './minecraft/minecraft.module';
import { VolumeModule } from './volume/volume.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MinecraftModule, VolumeModule, UsersModule, AuthModule],
  providers: [AppService, UsersService],
  controllers: [],
})
export class AppModule {}

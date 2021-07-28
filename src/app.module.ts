import { Module } from '@nestjs/common';
import { MinecraftModule } from './minecraft/minecraft.module';
import { VolumeModule } from './volume/volume.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { VolumeEntity } from './volume/entities/volume.entity';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    MinecraftModule,
    VolumeModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'password',
      entities: [UserEntity, VolumeEntity],
      synchronize: true,
    }),
    CaslModule,
  ],
  providers: [UserService],
  controllers: [],
})
export class AppModule {}

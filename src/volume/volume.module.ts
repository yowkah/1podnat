import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolumeEntity } from './entities/volume.entity';
import { CaslModule } from 'src/casl/casl.module';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [VolumeController],
  providers: [VolumeService],
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([VolumeEntity, UserEntity]),
    CaslModule,
    UserModule,
  ],
  exports: [VolumeService, TypeOrmModule],
})
export class VolumeModule {}

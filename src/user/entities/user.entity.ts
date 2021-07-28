import { Exclude } from 'class-transformer';
import { VolumeEntity } from 'src/volume/entities/volume.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => VolumeEntity, (volume) => volume.owner)
  volumes: VolumeEntity[];
}

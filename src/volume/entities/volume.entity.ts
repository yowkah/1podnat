import { Transform } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Volume')
export class VolumeEntity {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.volumes, { eager: true })
  owner: UserEntity;

  @Column({ unique: true })
  mountPoint: string;

  @Column({ default: new Date() })
  createdAt: Date;
}

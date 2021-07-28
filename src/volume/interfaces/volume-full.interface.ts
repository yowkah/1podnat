import { VolumeEntity } from '../entities/volume.entity';
import { VolumeDetailsInterface } from './volume-details.interface';

export interface VolumeFullInterface
  extends VolumeDetailsInterface,
    VolumeEntity {}

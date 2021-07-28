import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetVolumeDetailsDto {
  @Expose()
  @Transform(({ value }) => value.replace(/^1pn_/, ''))
  name: string;

  @Expose()
  @Transform(({ value }) => value.email)
  owner: string;

  @Expose()
  mountPoint: string;

  @Expose()
  createdAt: Date;
}

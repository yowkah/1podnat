import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsDefined, Length } from 'class-validator';

export class CreateVolumeDto {
  @Length(4, 20)
  @IsAlphanumeric()
  @IsDefined()
  @Transform(({ value }) => `1pn_${value}`)
  name: string;
}

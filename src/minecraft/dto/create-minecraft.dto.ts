import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateMinecraftDto {
  @IsNotEmpty()
  @Length(4, 20)
  @IsAlphanumeric()
  name: string;

  @IsOptional()
  @Length(4, 20)
  @IsAlphanumeric()
  volumeName: string;
}

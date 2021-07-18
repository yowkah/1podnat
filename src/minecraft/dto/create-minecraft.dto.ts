import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class CreateMinecraftDto {
  @IsNotEmpty()
  @Length(4, 20)
  @IsAlphanumeric()
  name: string;
}

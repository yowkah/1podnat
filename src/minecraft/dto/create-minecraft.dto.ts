import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class CreateMinecraftDto {
  @IsNotEmpty()
  @Length(4, 20)
  @IsAlphanumeric()
  @ApiPropertyOptional({
    maxLength: 20,
    minLength: 4,
    format: 'alphanumeric',
    required: true,
  })
  name: string;
}

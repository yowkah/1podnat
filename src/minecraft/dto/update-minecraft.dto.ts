import { PartialType } from '@nestjs/mapped-types';
import { CreateMinecraftDto } from './create-minecraft.dto';

export class UpdateMinecraftDto extends PartialType(CreateMinecraftDto) {}

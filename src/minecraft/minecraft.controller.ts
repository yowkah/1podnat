import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { MinecraftService } from './minecraft.service';
import { CreateMinecraftDto } from './dto/create-minecraft.dto';
import { UpdateMinecraftDto } from './dto/update-minecraft.dto';
import { UsePipes } from '@nestjs/common';

@Controller('minecraft')
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createMinecraftDto: CreateMinecraftDto) {
    return this.minecraftService.create(createMinecraftDto);
  }

  @Get()
  findAll() {
    return this.minecraftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minecraftService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMinecraftDto: UpdateMinecraftDto,
  ) {
    return this.minecraftService.update(+id, updateMinecraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minecraftService.remove(+id);
  }
}

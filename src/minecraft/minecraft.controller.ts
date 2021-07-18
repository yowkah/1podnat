import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  HttpCode,
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

  @Post(':name/stop')
  @HttpCode(204)
  stop(@Param('name') name: string, @Query('delay') delay: number = 0) {
    return this.minecraftService.stop(name, delay);
  }

  @Post(':name/start')
  @HttpCode(204)
  start(@Param('name') name: string) {
    return this.minecraftService.start(name);
  }

  @Get()
  findAll() {
    return this.minecraftService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.minecraftService.findOne(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateMinecraftDto: UpdateMinecraftDto,
  ) {
    return this.minecraftService.update(name, updateMinecraftDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.minecraftService.remove(name);
  }
}

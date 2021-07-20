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
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenericHttpErrorDto } from 'src/common/dto/genericHttpError.dto';
import { GetMinecraftDetailsDto } from './dto/get-minecraft-details.dto';

@ApiTags('Minecraft')
@Controller('minecraft')
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 507,
    description: 'insufficient storage',
    type: GenericHttpErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  create(
    @Body() createMinecraftDto: CreateMinecraftDto,
  ): Promise<GetMinecraftDetailsDto> {
    return this.minecraftService.create(createMinecraftDto);
  }

  @Post(':name/stop')
  @HttpCode(204)
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  @ApiQuery({
    name: 'delay',
    required: false,
  })
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  stop(@Param('name') name: string, @Query('delay') delay: number = 0) {
    return this.minecraftService.stop(name, delay);
  }

  @Post(':name/start')
  @HttpCode(204)
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  start(@Param('name') name: string) {
    return this.minecraftService.start(name);
  }

  @Get()
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  findAll() {
    return this.minecraftService.findAll();
  }

  @Get(':name')
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  findOne(@Param('name') name: string) {
    return this.minecraftService.findOne(name);
  }

  @Patch(':name')
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  update(
    @Param('name') name: string,
    @Body() updateMinecraftDto: UpdateMinecraftDto,
  ) {
    return this.minecraftService.update(name, updateMinecraftDto);
  }

  @Delete(':name')
  @HttpCode(204)
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  remove(@Param('name') name: string) {
    return this.minecraftService.remove(name);
  }
}

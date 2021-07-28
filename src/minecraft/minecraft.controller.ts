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
  ApiInternalServerErrorResponse,
  ApiParam,
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

  @Post(':name/stop')
  @HttpCode(204)
  // #region Swagger Decorators
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
  // #endregion
  stop(@Param('name') name: string, @Query('delay') delay: number = 0) {
    return this.minecraftService.stop(name, delay);
  }

  @Post(':name/start')
  @HttpCode(204)
  // #region Swagger Decorators
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  // #endregion
  start(@Param('name') name: string) {
    return this.minecraftService.start(name);
  }

  @Get()
  // #region Swagger Decorators
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  // #endregion
  findAll() {
    return this.minecraftService.findAll();
  }

  @Get(':name')
  // #region Swagger Decorators
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  // #endregion
  findOne(@Param('name') name: string) {
    return this.minecraftService.findOne(name);
  }

  @Patch(':name')
  // #region Swagger Decorators
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  // #endregion
  update(
    @Param('name') name: string,
    @Body() updateMinecraftDto: UpdateMinecraftDto,
  ) {
    return this.minecraftService.update(name, updateMinecraftDto);
  }

  @Delete(':name')
  @HttpCode(204)
  // #region decorators
  @ApiInternalServerErrorResponse({
    description: `generic error response`,
    type: GenericHttpErrorDto,
  })
  @ApiParam({
    name: 'name',
    format: 'alphanumeric',
    required: true,
  })
  // #endregion
  remove(@Param('name') name: string) {
    return this.minecraftService.remove(name);
  }
}

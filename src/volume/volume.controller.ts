import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  HttpCode,
  UseGuards,
  Body,
  Req,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { GenericHttpErrorDto } from 'src/common/dto/genericHttpError.dto';
import { UserAction } from 'src/common/enums';
import { CreateVolumeDto } from './dto/create-volume-details.dto';
import { GetVolumeDetailsDto } from './dto/get-volume-details.dto';
import { GetVolumeTreeDto } from './dto/get-volume-tree.dto';
import { VolumeEntity } from './entities/volume.entity';
import { VolumeNamePipe } from './volumeName.pipe';
import { VolumeService } from './volume.service';

@ApiTags('Volume')
@Controller('volume')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VolumeController {
  constructor(
    private readonly volumeService: VolumeService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  // #region Swagger Decorators
  @ApiOperation({
    operationId: 'Create Volume',
    description: 'Creates a new Volume',
  })
  @ApiCreatedResponse({ type: GetVolumeDetailsDto })
  // #endregion
  async createVolume(
    @Request() req,
    @Body() body: CreateVolumeDto,
  ): Promise<GetVolumeDetailsDto> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.cannot(UserAction.Create, VolumeEntity))
      throw new ForbiddenException();

    const dto = plainToClass(CreateVolumeDto, body);

    return plainToClass(
      GetVolumeDetailsDto,
      await this.volumeService.create(dto.name, req.user),
    );
  }

  @Post('/:name/backup')
  async backupVolume(
    @Body() body: CreateVolumeDto,
    @Request() req,
    @Param('name', new VolumeNamePipe()) name: string,
  ): Promise<GetVolumeDetailsDto> {
    const dto = plainToClass(CreateVolumeDto, body);
    const volume = await this.volumeService.findByName(name);

    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (!ability.can(UserAction.Update, volume)) throw new ForbiddenException();

    const backupVolume = this.volumeService.backup(volume, dto.name);
    return plainToClass(GetVolumeDetailsDto, backupVolume);
  }

  @Get('/:name/contents')
  // #region Swagger Decorators
  @ApiOperation({
    operationId: 'get volume dirtree',
    description:
      "returns a JSON representation of the volume's file and directory structure and the filesizes.",
  })
  @ApiOkResponse({ type: GetVolumeTreeDto })
  @ApiResponseProperty({
    example: {
      'file1.txt': 12242,
      subdirectory: {
        'file2.txt': 1523,
      },
    },
  })
  // #endregion
  async getFileTree(
    @Request() req,
    @Param('name', new VolumeNamePipe()) name: string,
  ): Promise<GetVolumeTreeDto> {
    const volume = await this.volumeService.findByName(name);

    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.cannot(UserAction.Read, volume)) throw new ForbiddenException();

    return this.volumeService.printTree(volume);
  }

  @Delete(':name')
  @HttpCode(204)
  // #region Swagger Decorators
  @ApiOperation({
    description:
      'deletes a volume, this action is **irreversible**, so use it with care.',
  })
  @ApiNoContentResponse({ description: 'The volume was deleted' })
  @ApiConflictResponse({
    description: 'The volume is in use and can not be deleted',
    type: GenericHttpErrorDto,
  })
  @ApiInternalServerErrorResponse({
    type: GenericHttpErrorDto,
    description: 'general error',
  })
  // #endregion
  async delete(@Param('name', new VolumeNamePipe()) name: string, @Req() req) {
    const volume = await this.volumeService.findByName(name);

    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.cannot(UserAction.Delete, volume))
      throw new ForbiddenException();

    return this.volumeService.delete(volume);
  }
}

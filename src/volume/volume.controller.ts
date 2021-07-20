import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { GenericHttpErrorDto } from 'src/common/dto/genericHttpError.dto';
import { GetVolumeTreeDto } from './dto/get-volume-tree.dto';
import { VolumeService } from './volume.service';

@ApiTags('Volume')
@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) {}

  @Get('/:name/contents')
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
  getFileTree(@Param('name') name: string): Promise<GetVolumeTreeDto> {
    return this.volumeService.printTree(name);
  }

  @Delete(':name')
  @HttpCode(204)
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
  delete(@Param('name') name: string) {
    return this.volumeService.delete(name);
  }
}

import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class VolumeNamePipe implements PipeTransform {
  transform(name: string): string {
    return `1pn_${name}`;
  }
}

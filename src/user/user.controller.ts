import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return classToPlain(req.user);
  }
}

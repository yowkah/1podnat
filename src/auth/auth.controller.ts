import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './discord-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async loginGoogle() {
    return this.authService.login({});
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async callbackGoogle(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  async loginDiscord() {
    return this.authService.login({});
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  async callbackDiscord(@Request() req) {
    return this.authService.login(req.user);
  }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './discord/discord-auth.guard';
import { GoogleAuthGuard } from './google/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async loginGoogle() {
    return {};
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async callbackGoogle(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  async loginDiscord() {
    return {};
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  async callbackDiscord(@Request() req) {
    return this.authService.login(req.user);
  }
}

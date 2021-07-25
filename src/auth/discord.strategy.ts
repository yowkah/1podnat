import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import {
  DISCORD_CALLBACK,
  DISCORD_CLIENTID,
  DISCORD_SECRET,
} from 'src/common/constants/settings';
import { AuthService } from './auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private authService: AuthService) {
    super({
      clientID: DISCORD_CLIENTID,
      clientSecret: DISCORD_SECRET,
      callbackURL: DISCORD_CALLBACK,
      scope: ['identify', 'email'],
    });
  }

  async validate(a, b, profile): Promise<any> {
    console.log(profile);
    return this.authService.validate(profile);
  }
}

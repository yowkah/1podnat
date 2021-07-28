import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import {
  DISCORD_CALLBACK,
  DISCORD_CLIENTID,
  DISCORD_SECRET,
} from 'src/common/constants/settings';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from '../auth.service';

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
    //according to discord's documentation, animated avatars start with  a_ in their filename
    // https://discord.com/developers/docs/reference
    const avatarFileExtension = /^a_/.test(profile.avatar) ? 'gif' : 'png';
    const user: CreateUserDto = {
      email: profile.email,
      picture: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${avatarFileExtension}`,
    };
    console.log(user);
    return this.authService.validate(user);
  }
}

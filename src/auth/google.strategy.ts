import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import {
  GOOGLE_CALLBACK,
  GOOGLE_CLIENTID,
  GOOGLE_SECRET,
} from 'src/common/constants/settings';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: GOOGLE_CLIENTID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(a, b, profile): Promise<any> {
    console.log(profile._json);
    return this.authService.validate(profile._json);
  }
}

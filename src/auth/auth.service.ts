import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(userDto: CreateUserDto) {
    const user = await this.userService.findOne(userDto.email);
    if (user != null) return classToPlain(user);

    const newUser = await this.userService.create(userDto);
    return classToPlain(newUser);
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.create({
      picture: userDto.picture,
      email: userDto.email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

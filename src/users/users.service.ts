import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly Users = [
    {
      userId: 1,
      username: 'Jouke',
      password: 'somethingstupid',
    },
    {
      userId: 2,
      username: 'Levi',
      password: 'iLoveCleartext',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.Users.find((user) => user.username === username);
  }
}

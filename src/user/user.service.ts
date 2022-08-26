import { AuthUserDto } from './dto/auth-user.dto';
import { hashSync, compare } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './../entities/User.entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { FailQuery } from '../decorators/fail-query.decorator';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}

  @FailQuery('name')
  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  @FailQuery()
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = hashSync(createUserDto.password);
    return this.repository.save(createUserDto);
  }

  async login(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.repository.findOne({
      where: [
        { email: authUserDto.username },
        { username: authUserDto.username },
      ],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const toCompare = await compare(authUserDto.password, user.password);

    if (!toCompare) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const token = sign(
      { user, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
      process.env.APP_KEY,
    );

    return { user, token };
  }
}

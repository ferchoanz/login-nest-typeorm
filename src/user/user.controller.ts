import { AuthUserDto } from './dto/auth-user.dto';

import { UserService } from './user.service';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() authUserDto: AuthUserDto) {
    return await this.service.login(authUserDto);
  }
}

import { DatabaseModule } from './../db/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}

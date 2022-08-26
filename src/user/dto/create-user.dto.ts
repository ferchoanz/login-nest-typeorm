import { TypeUser } from './../../entities/TypeUser.enum';
import { StatusUser } from '../../entities/StatusUser.enum';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(TypeUser)
  type: TypeUser;

  @IsOptional()
  @IsEnum(StatusUser)
  status: StatusUser;
}

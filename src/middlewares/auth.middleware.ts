import {
  Injectable,
  NestMiddleware,
  RequestMethod,
  UnauthorizedException,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.header('Authorization') || req.header('authorization');

    if (!token) {
      throw new UnauthorizedException();
    }

    token = token.startsWith('Bearer ')
      ? (token = token.slice(7, token.length))
      : token;

    verify(token, process.env.APP_KEY, (error, decode) => {
      if (error) {
        throw new UnauthorizedException();
      }
      next();
    });
  }
}

export const excludesAuthMiddleware: RouteInfo[] = [
  { path: 'users', method: RequestMethod.POST },
  { path: 'users/login', method: RequestMethod.POST },
];

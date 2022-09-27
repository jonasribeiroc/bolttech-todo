import {
  createParamDecorator,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const UserSession = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (req.headers) {
      if (req.headers.authorization) {
        const tokenParts = req.headers.authorization.split(' ');
        if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
          throw new UnauthorizedException('bad_token');
        }
        return jwt.decode(tokenParts[1]);
      }
    }

    return null;
  },
);

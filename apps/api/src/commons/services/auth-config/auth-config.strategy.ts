import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserSession } from '@src/commons/models';
import { AuthConfigService } from './auth-config.service';

@Injectable()
export class AuthConfigStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(userSession: IUserSession) {
    const user = await this.authConfigService.validate(userSession);
    if (!user) {
      throw new UnauthorizedException();
    }

    return userSession;
  }
}

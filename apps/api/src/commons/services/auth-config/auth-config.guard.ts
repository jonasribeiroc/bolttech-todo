import { Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthConfigGuard extends AuthGuard('jwt') implements IAuthGuard {}

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IUserSession } from '@src/commons/models';
import { UserSession } from '@src/commons/decorators';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import { AuthConfigGuard } from '@src/commons/services';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async userLogin(@Body() body: LoginAuthDto) {
    return await this.authService.login(body);
  }

  @Post('/register')
  async userRegistration(@Body() body: RegisterAuthDto) {
    return await this.authService.register(body);
  }

  @Get('/refresh')
  @UseGuards(AuthConfigGuard)
  refreshToken(@UserSession() userSession: IUserSession) {
    return this.authService.refreshToken(userSession);
  }
}

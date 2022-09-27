import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserSession, User, UserDocument } from '@src/commons/models';
import { AuthConfigService } from '@src/commons/services';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authConfigService: AuthConfigService,
  ) {}

  async validate(auth: IUserSession): Promise<User> {
    return await this.userModel.findById(auth._id);
  }

  async login(loginAuth: LoginAuthDto): Promise<string> {
    const user = await this.userModel.findOne({ email: loginAuth.email });
    if (!user) throw new NotFoundException();

    const isPasswordMatching = await compare(loginAuth.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('invalid password');
    }

    return await this.authConfigService.getSignedToken(user);
  }

  async register(registerAuth: RegisterAuthDto): Promise<string> {
    const existingUser = await this.userModel.findOne({
      email: registerAuth.email,
    });
    if (existingUser) throw new BadRequestException('User already exists');

    const passwordHash = await hash(registerAuth.password, 10);
    const user = await this.userModel.create({
      name: registerAuth.name,
      email: registerAuth.email,
      password: passwordHash,
    });

    return await this.authConfigService.getSignedToken(user);
  }

  async refreshToken(userSession: IUserSession): Promise<string> {
    if (!userSession || !userSession._id) throw new BadRequestException();
    return await this.authConfigService.refreshToken(userSession);
  }
}

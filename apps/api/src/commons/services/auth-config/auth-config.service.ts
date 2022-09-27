import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserSession, IUser, User, UserDocument } from '@src/commons/models';

@Injectable()
export class AuthConfigService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validate(auth: IUserSession): Promise<User> {
    return await this.userModel.findById(auth._id);
  }

  async getSignedToken(user: IUser): Promise<string> {
    return this.jwtService.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  async refreshToken(userSession: IUserSession) {
    const user = await this.userModel.findById(userSession._id);
    return this.getSignedToken(user);
  }
}

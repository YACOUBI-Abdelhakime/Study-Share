import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    let user = await this.userModel.findOne({
      email: login.email.toLowerCase(),
    });
    let match: boolean = false;

    if (user) {
      match = await bcrypt.compare(login.password, user.password);
    }

    if (!match) {
      throw new UnauthorizedException('Email or password not correct !');
    }
    let token: string = this.jwtService.sign({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        isVerified: user.isVerified,
      },
    });

    return { token };
  }

  async register(user: RegisterDto): Promise<{ token: string }> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.email = user.email.toLowerCase();

    let createdUser;
    try {
      createdUser = await this.userModel.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    let token: string = this.jwtService.sign({
      user: {
        _id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
        dateOfBirth: createdUser.dateOfBirth,
        isVerified: createdUser.isVerified,
      },
    });

    return { token };
  }
}

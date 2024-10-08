import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { sendEmail } from 'src/utils/sendEmail';

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
      throw new UnauthorizedException('Email or password not correct');
    }
    if (!user.isVerified) {
      throw new ForbiddenException('Email not verified');
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

  async register(user: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.email = user.email.toLowerCase();

    let createdUser;
    try {
      createdUser = await this.userModel.create(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === 11000) {
        // Duplicate email
        throw new BadRequestException(
          'Email is already used. Please choose another one or login',
        );
      }
      throw new BadRequestException(error.message);
    }
    await this.sendVerificationEmail(user.email);
    createdUser = {
      email: createdUser.email,
      name: createdUser.name,
      dateOfBirth: createdUser.dateOfBirth,
      isVerified: createdUser.isVerified,
    };
    return createdUser;
  }

  async verifyEmail(token: string): Promise<string> {
    let user: User & { _id: Types.ObjectId } = await this.userModel.findOne({
      emailVerificationToken: token,
    });

    if (!user) {
      // User with this token not found, navigate to login page
      return `<body><script>window.location.href = "${process.env.APP_IP}/login";</script></body>`;
    }

    await this.userModel.updateOne(
      { _id: user._id },
      { isVerified: true, emailVerificationToken: null },
    );
    return `<body><script>window.location.href = "${process.env.APP_IP}/login";</script></body>`;
  }

  async sendVerificationEmail(email: string): Promise<void> {
    let user: User & { _id: Types.ObjectId } = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

    let emailVerificationToken: string = this.jwtService.sign(
      { email: user.email },
      {
        expiresIn: '1h',
      },
    );
    await this.userModel.updateOne(
      { _id: user._id },
      { emailVerificationToken: emailVerificationToken },
    );

    const verificationUrl = `${process.env.SERVER_URI}/auth/verify-email/${emailVerificationToken}`;

    const emailOption: EmailOption = {
      to: email,
      subject: 'Verify your Email ✔',
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
    };

    await sendEmail(emailOption);
  }
}

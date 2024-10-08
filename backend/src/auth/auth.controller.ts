import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() user: RegisterDto): Promise<User> {
    return await this.authService.register(user);
  }

  @Get('/verify-email/:token')
  async verifyEmail(@Param('token') token: string): Promise<string> {
    return await this.authService.verifyEmail(token);
  }
}

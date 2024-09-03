import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/contacts')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request): Promise<User[]> {
    return await this.userService.getContacts(req.user);
  }
}

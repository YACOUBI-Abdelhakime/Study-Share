import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getProfile(user: any): Promise<User> {
    let foundUser: User;
    try {
      foundUser = await this.userModel.findById(user.id);
    } catch (_) {
      throw new NotFoundException();
    }
    return foundUser;
  }
}

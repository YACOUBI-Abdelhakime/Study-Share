import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getContacts(payload: any): Promise<User[]> {
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    let contacts: User[];
    try {
      contacts = await this.userModel
        .find({ _id: { $ne: userIdAsObjectId } })
        .select('name _id');
    } catch (_) {
      throw new NotFoundException();
    }
    return contacts;
  }
}

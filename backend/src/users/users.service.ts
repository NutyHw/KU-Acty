import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel : Model<UserDocument> ){}

  async create(userDto : UserDto) : Promise<User> {
    const user = new this.userModel(userDto);
    return user.save();
  }

  async findAll() : Promise<User[]> {
    return this.userModel.find({});
  }

  async findOne(username : string) : Promise<User> {
    return this.userModel.findOne({ username : username });
  }
}

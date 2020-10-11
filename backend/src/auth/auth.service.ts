import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  saltRound = 10;
  constructor(private readonly userService : UsersService) {};

  async hashPassword(password : string) : Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }

  async register(userDto : UserDto) : Promise<boolean> {
    userDto.password = await this.hashPassword(userDto.password);
    const user = await this.userService.findOne(userDto.username);
    if ( user ){
      return false;
    } 
    await this.userService.create(userDto)
    return true;
  }

  async login(userDto : UserDto) : Promise<boolean> {
    const user = await this.userService.findOne(userDto.username);
    if ( !user ){
      return false
    }
    const match = await bcrypt.compare(userDto.password, user.password);
    return match
  }
}

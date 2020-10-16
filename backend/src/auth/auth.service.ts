import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UsersService,
    private readonly jwtService : JwtService
  ) {};

  saltRound = 10;

  async hashPassword(password : string) : Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }

  async register( userDto : RegisterDto ) : Promise<User> {
    userDto.password = await this.hashPassword(userDto.password);
    userDto.role = 'organizer';
    const user = await this.userService.findOne(userDto.username);

    if ( user ){
      throw new HttpException('username already in userd', HttpStatus.BAD_REQUEST) 
    }

    return await this.userService.create(userDto)
  }

  async login(userDto : LoginDto ) : Promise<any> {
    const user = await this.userService.findOne(userDto.username);

    if ( !user ){
      throw new HttpException('username or password not match', HttpStatus.BAD_REQUEST)
    }

    const match = await bcrypt.compare(userDto.password, user.password);
    if ( !match ){
      throw new HttpException('username or password not match', HttpStatus.BAD_REQUEST)
    }

    const payload = await this.createPayload(user.username, user._id, user.role );
    return payload;
  }

  async createPayload(username : string , userId : string, role : string) : Promise<any>{
    const payload = { username : username, userId : userId , role : role }
    return {
      access_token : this.jwtService.sign(payload)
    }
  }
}

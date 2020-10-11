import { Controller, Body, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('/register')
  async register(@Body() userDto : UserDto){
    return await this.authService.register(userDto);
  }

  @Post('/login')
  async login(@Body() userDto : UserDto){
    return await this.authService.login(userDto);
  }
}

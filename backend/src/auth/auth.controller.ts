import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() userDto : UserDto ) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto : UserDto){
    return await this.authService.login(userDto);
  }
}

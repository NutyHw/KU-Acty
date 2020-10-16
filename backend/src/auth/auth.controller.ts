import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() userDto : RegisterDto ) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto : LoginDto ){
    return await this.authService.login(userDto);
  }
}

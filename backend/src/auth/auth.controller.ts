import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { LoginDto, RegisterDto, ChangePasswordDto, ResetPasswordDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() userDto : RegisterDto ) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto : LoginDto ){
    return await this.authService.login(userDto);
  }

  @Post('change-password')
  @HttpCode(200)
  async changePassword(@Body() changePasswordDto : ChangePasswordDto ) {
    return await this.authService.changePassword(changePasswordDto);
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto : ResetPasswordDto ) {
    return await this.authService.resetPassword( resetPasswordDto.email );
  }
}

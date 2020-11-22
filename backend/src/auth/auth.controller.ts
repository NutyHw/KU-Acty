import { Controller, Body, Post, HttpCode, Request , UseGuards} from '@nestjs/common';
import { LoginDto, RegisterDto, ChangePasswordDto, ResetPasswordDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async changePassword(@Body() changePasswordDto : ChangePasswordDto, @Request() req : any ) {
    return await this.authService.changePassword(changePasswordDto, req.user.userId);
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto : ResetPasswordDto ) {
    return await this.authService.resetPassword( resetPasswordDto.username );
  }
}

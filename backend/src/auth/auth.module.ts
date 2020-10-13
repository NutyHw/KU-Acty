import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './config/constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OrganizersModule } from '../organizers/organizers.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [ 
    UsersModule , 
    PassportModule,
    OrganizersModule,
    JwtModule.register({
      secret : jwtConstants.secret,
      signOptions : { expiresIn : '1hr' }
    }),
    MulterModule.register({
      dest : '/Users/nuttupoomsaitoh/Desktop/files/'
    })
  ],
  providers: [ AuthService , JwtStrategy ],
  controllers: [AuthController],
})
export class AuthModule {}

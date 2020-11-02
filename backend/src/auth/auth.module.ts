import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { OrganizersModule } from '../organizers/organizers.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtStrategy } from './jwt.strategy';
import { JwtConstant } from './config/constant';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports : [ 
    UsersModule , 
    PassportModule,
    OrganizersModule,
    JwtModule.register({
      secret : JwtConstant.secret
    }),
    MulterModule.register({
      dest : '/data/'
    }),
    MongooseModule.forFeature([ { name : User.name , schema : UserSchema } ])
  ],
  providers: [ AuthService, JwtStrategy ],
  controllers: [AuthController],
  exports : [ AuthService ]
})

export class AuthModule {}

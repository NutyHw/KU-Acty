import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/KU_ACTY') ,AuthModule , UsersModule],
  providers : [ AuthService , UsersService ]
})

export class AppModule {}

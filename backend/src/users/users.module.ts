import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from './users.service';
import { UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';

@Module({
  imports : [ MongooseModule.forFeature([ { name : 'Users', schema : UserSchema } ]) ],
  providers: [UsersService],
  controllers: [UsersController],
  exports : [ UsersService, MongooseModule ]
})
export class UsersModule {}

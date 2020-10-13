import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizersModule } from './organizers/organizers.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://host.docker.internal/KU_ACTY') ,
    AuthModule , 
    UsersModule, 
    OrganizersModule, EventsModule ,
  ],
})

export class AppModule {}

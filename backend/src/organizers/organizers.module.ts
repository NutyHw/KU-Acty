import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizersService } from './organizers.service';
import { OrganizerSchema, Organizer } from './schema/organizer.schema';
import { OrganizersController } from './organizers.controller';
import { MulterModule } from '@nestjs/platform-express';
import { EventsModule } from '../events/events.module';

@Module({
  imports : [ 
    MongooseModule.forFeature([ { name : Organizer.name, schema : OrganizerSchema } ]) ,
    MulterModule.register({
      dest : '/data/'
    }),
    EventsModule
  ],
  providers : [ OrganizersService ],
  controllers : [ OrganizersController ],
  exports : [ OrganizersService ]
})
export class OrganizersModule {}

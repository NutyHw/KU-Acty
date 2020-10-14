import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizersService } from './organizers.service';
import { OrganizerSchema, Organizer } from './schema/organizer.schema';
import { OrganizersController } from './organizers.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [ 
    MongooseModule.forFeature([ { name : Organizer.name, schema : OrganizerSchema } ]) ,
    MulterModule.register({
      dest : '/data/'
    })
  ],
  providers : [ OrganizersService ],
  controllers : [ OrganizersController ]
})
export class OrganizersModule {}

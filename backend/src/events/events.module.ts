import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from './schema/event.schema';
import { FollowerSchema, Follower } from './schema/follower.schema';

@Module({
  imports : [ 
    MongooseModule.forFeature([
      { name : Event.name, schema : EventSchema },
      { name : Follower.name, schema : FollowerSchema }
    ])
  ],
  providers: [EventsService],
  controllers: [EventsController]
})

export class EventsModule {}

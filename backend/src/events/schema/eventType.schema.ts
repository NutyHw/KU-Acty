import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventTypeDocument = EventType & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class EventType {
  @Prop({
    required : true
  })
  event_type_name : string
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);

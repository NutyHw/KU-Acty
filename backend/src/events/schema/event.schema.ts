import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Event {
  @Prop({ required : true })
  event_name : string

  @Prop({ required : true })
  organizer_id : Types.ObjectId

  @Prop({ required : true })
  benefit_hour : number

  @Prop({ required : true })
  place : string

  @Prop({ required : true })
  event_start_time : Date

  @Prop({ required : true })
  event_end_time : Date

  @Prop({ required : true })
  contact : string

  @Prop({ required : true })
  description : string

  @Prop({ required : true })
  attachment_path : [{ type : Types.ObjectId, ref : 'upload' }]

  @Prop({ default : 0 })
  view_counts : number

  @Prop({ default : 0 })
  interest_count : number

  @Prop({ default : 'active' })
  status : string

  @Prop({ required : true })
  event_type : [ Types.ObjectId ]
}

export const EventSchema = SchemaFactory.createForClass(Event);

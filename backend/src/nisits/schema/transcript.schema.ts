import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TranscriptDocument = Transcript & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Transcript {
  @Prop({ 
    required : true
  })
  type : { type : Types.ObjectId, ref : 'transcriptrules' }

  @Prop({ 
    required : true 
  })
  nisit_id : { type : Types.ObjectId, ref : 'users' }

  @Prop({ 
    required : true,
    default : [ ],
  })
  event_id : [ { type : Types.ObjectId, ref : 'events' } ]
}

export const TranscriptSchema = SchemaFactory.createForClass(Transcript);

import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TranscriptRuleDocument = TranscriptRule & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class TranscriptRule {
  @Prop({
    required : true
  })
  start_year : number

  @Prop({
    required : true
  })
  end_year : number

  @Prop({ 
    required : true 
  })
  event_types : [ { event_type_id : { ref : 'eventtypes', type : Types.ObjectId }, participate_number : number , index : number } ]
}

export const TranscriptRuleSchema = SchemaFactory.createForClass(TranscriptRule);

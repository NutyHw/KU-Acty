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
  type : Types.ObjectId

  @Prop({ 
    required : true 
  })
  eventType : unknown
}

export const TranscriptRuleSchema = SchemaFactory.createForClass(TranscriptRule);

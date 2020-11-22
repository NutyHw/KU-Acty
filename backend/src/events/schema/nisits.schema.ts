import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type NisitsDocument = Nisits & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Nisits {
  @Prop({
    required : true
  })
  user  : Types.ObjectId
  year : number
  facaulty : string
  gender : string
}

export const NisitsSchema = SchemaFactory.createForClass(Nisits);

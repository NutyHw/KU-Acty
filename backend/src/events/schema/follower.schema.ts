import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document , Types} from 'mongoose';

export type FollowerDocument = Follower & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Follower {
  @Prop({ required : true })
  student_id : Types.ObjectId

  @Prop({ required : true })
  event_id : Types.ObjectId
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);

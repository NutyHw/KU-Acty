import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document , Types} from 'mongoose';

export type ViewerDocument = Viewer & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Viewer {
  @Prop({ required : true })
  nisit_id : Types.ObjectId

  @Prop({ required : true })
  event_id : Types.ObjectId
}

export const ViewerSchema = SchemaFactory.createForClass(Viewer);

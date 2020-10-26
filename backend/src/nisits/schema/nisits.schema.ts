import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NisitsDocument = Nisits & Document;

@Schema({
 timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
})

export class Nisits {
  @Prop({
    required : true,
  })
  userId : Types.ObjectId

  @Prop({ 
    required : true,
    enum : [ 'male' , 'female', 'others' ]
  })
  nameTitle : string

  @Prop({
    required : true
  })
  firstname : string

  @Prop({ 
    required : true,
  })
  lastname : string

  @Prop({
    required : true
  })
  faculty : string

  @Prop({
    required : true
  })
  department : string

  @Prop({
    required : true
  })
  transcript : Types.ObjectId
}

export const NisitsSchema = SchemaFactory.createForClass(Nisits);

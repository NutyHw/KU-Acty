import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'typeorm';
import { Document } from 'mongoose';

export type OrganizerDocument = Organizer & Document;

@Schema({
timestamps : { createdAt : 'created_at' , updatedAt : 'updated_at' }
})

export class Organizer {
  @Prop({
    required : true
  })

  user : [{ type : ObjectID, ref : 'users' }]

  @Prop({ required : true })
  organizer_name : string

  @Prop({ default : null })
  document_path : string

  @Prop({ required : true })
  email : string

  @Prop({ required : true })
  contact : string

  @Prop({ required : true })
  location : string

  @Prop({ required : true })
  description : string

  @Prop({ default : null })
  approve_date : Date
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);

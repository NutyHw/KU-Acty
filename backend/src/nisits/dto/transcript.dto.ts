import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class TranscriptDto {
  @IsMongoId()
  type : Types.ObjectId

  @IsMongoId()
  nisit_id : Types.ObjectId
}

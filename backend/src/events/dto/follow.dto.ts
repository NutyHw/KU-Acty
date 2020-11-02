import { Types } from 'mongoose';

export class FollowDto {
  student_id : Types.ObjectId
  event_id : string
}

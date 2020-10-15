import { Types } from 'mongoose';

export class OrganizerDto {
  organizerName : string
  user : Types.ObjectId
  email : string
  contact : string
  location : string
  description : string
}

import { Types } from 'mongoose';
import {  } from 'class-validator';

export class OrganizerDto {
  organizer_name : string
  user : Types.ObjectId
  email : string
  contact : string
  location : string
  description : string
}

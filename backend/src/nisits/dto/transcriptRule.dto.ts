import { Types } from 'mongoose';

export class TranscriptRuleDto {
  start_year : number
  end_year : number
  event_types : [ { event_type_id : Types.ObjectId, participate_number : number } ]
} 

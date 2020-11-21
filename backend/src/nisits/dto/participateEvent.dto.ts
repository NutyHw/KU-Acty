import { IsMongoId } from 'class-validator';

export class ParticipateEventDto {
  @IsMongoId()
  event_id : string

  @IsMongoId()
  nisit_id : string
}

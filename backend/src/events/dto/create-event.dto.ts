import { IsString, IsDateString, IsNumberString, IsMongoId, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateEventDto {

  @IsString()
  @IsNotEmpty()
  event_name : string

  @IsMongoId()
  @IsNotEmpty()
  organizer_id : string

  @IsNumberString()
  @IsNotEmpty()
  benefit_hour : number

  @IsString()
  @IsNotEmpty()
  place : string

  @IsDateString()
  @IsNotEmpty()
  event_start_time : string

  @IsDateString()
  @IsNotEmpty()
  event_end_time : string

  @IsString()
  @IsNotEmpty()
  contact : string

  @IsString()
  @IsNotEmpty()
  description : string

  @IsEnum([ 'active', 'past', 'cancled' ])
  @IsNotEmpty()
  status : string

  @IsString()
  @IsNotEmpty()
  event_type : string
}

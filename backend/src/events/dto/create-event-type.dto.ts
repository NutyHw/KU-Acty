import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEventTypeDto {
  @IsString()
  @IsNotEmpty()
  event_type_name : string
}

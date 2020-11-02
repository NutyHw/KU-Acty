export class TranscriptRuleDto {
  startYear : number
  endYear : number
  properties : Array<EventType>
} 

type EventType = {
  name : string
  hours : number
}

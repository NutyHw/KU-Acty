// @ts-nocheck
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { Types, Model } from 'mongoose';
import { Transcript, TranscriptDocument } from './schema/transcript.schema';
import { TranscriptRule, TranscriptRuleDocument } from './schema/transcriptRule.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TranscriptRuleDto } from './dto/transcriptRule.dto';
import { ParticipateEventDto } from './dto/participateEvent.dto';
import { TranscriptDto } from './dto/transcript.dto';

@Injectable()
export class NisitsService {
  constructor(
    private readonly eventService : EventsService,
    @InjectModel(Transcript.name) private readonly transcriptModel : Model<TranscriptDocument>,
    @InjectModel(TranscriptRule.name) private readonly transcriptRuleModel : Model<TranscriptRuleDocument>,
  ) {}

  async findFollowEvent( _id : string ) : Promise<any> {
    return await this.eventService.getFollowEvent(_id)
  }

  async getTranscript( _id : string ) : Promise<any> {
    const res = {
      eventCount : 0,
      sumHours : 0
    };
    const transcript = await this.transcriptModel.findOne({ nisit_id : Types.ObjectId(_id) });
    const transcriptRule = await this.transcriptRuleModel.findById(transcript.type);
    const events = await this.eventService.getEventById( transcript.event_id );

    for ( const event_type of transcriptRule.event_types ){
      const type_name = await this.eventService.findEventTypeById( Types.ObjectId(event_type.event_type_id) );
      res[event_type.event_type_id] = { 
        participate_number : event_type.participate_number,
        events : [],
        sumHours : 0,
        type_name : type_name.event_type_name,
        index : event_type.index
      } 
    }

    for ( const event of events ){
      for ( const eventType of event.event_type ){
        res[eventType]['events'].push({ name : event.event_name, hours : event.benefit_hour, _id : event._id });
        res[eventType]['sumHours'] += event.benefit_hour
      }
      res['eventCount'] += 1;
      res['sumHours'] += event.benefit_hour;
    }

    const res2 = {
      transcript : [],
      eventCount : res['eventCount'],
      sumHours : res['sumHours']
    }

    for ( const [key,value] of Object.entries(res) ){
      if ( key !== 'eventCount' && key !== 'sumHours' ){
        res2['transcript'].push(value)
      }
    }
    return res2;
  }

  async createTranscriptRule( transcriptRuleDto : TranscriptRuleDto  ) : Promise<any> {
    const createTranscriptRule = new this.transcriptRuleModel(transcriptRuleDto);
    return await createTranscriptRule.save();
  }

  async createTranscript( transcriptDto : TranscriptDto ) : Promise<any> {
    transcriptDto.nisit_id = new Types.ObjectId(transcriptDto.nisit_id);
    transcriptDto.type = new Types.ObjectId(transcriptDto.type);
    const createTranscript = new this.transcriptModel(transcriptDto);
    return await createTranscript.save();
  }

  async updateTranscript( participateEventDto : ParticipateEventDto ) : Promise<any> {
    participateEventDto.nisit_id = new Types.ObjectId(participateEventDto.nisit_id);
    participateEventDto.event_id = new Types.ObjectId(participateEventDto.event_id);

    const transcript = await this.transcriptModel.findOne({ nisit_id : participateEventDto.nisit_id })
    if ( !transcript ){
      throw new HttpException('nisit id is not valid',HttpStatus.BAD_REQUEST);
    }

    const event = await this.eventService.findById( participateEventDto.event_id )

    if ( !event ){
      throw new HttpException('event id is not valid',HttpStatus.BAD_REQUEST);
    }
    
    if ( transcript.transcript.includes(participateEventDto.event_id) ){
      throw new HttpException('event id alread include',HttpStatus.BAD_REQUEST);
    }

    return this.transcriptModel.updateOne(
      { nisit_id : participateEventDto.nisit_id },
      { $push : { transcript : participateEventDto.event_id } }
    )
  }
}

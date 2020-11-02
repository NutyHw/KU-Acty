import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { Types, Model } from 'mongoose';
import { Transcript, TranscriptDocument } from './schema/transcript.schema';
import { TranscriptRule, TranscriptRuleDocument } from './schema/transcriptRule.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TranscriptRuleDto } from './dto/transcriptRule.dto';

@Injectable()
export class NisitsService {
  constructor(
    private readonly eventService : EventsService,
    @InjectModel(Transcript.name) private readonly transcriptModel : Model<TranscriptDocument>,
    @InjectModel(TranscriptRule.name) private readonly transcriptRuleModel : Model<TranscriptRuleDocument>
  ) {}

  async findFollowEvent( _id : string ) : Promise<any> {
    return await this.eventService.getFollowEvent(_id)
  }

  async getTranscript( _id : string ) : Promise<any> {
    return await this.transcriptModel.findOne({ nisitId : Types.ObjectId(_id) }).populate('event_id').exec()
  }

  async createTranscriptRule( transcriptRuleDto : TranscriptRuleDto  ) : Promise<any> {
    const createTranscriptRule = new this.transcriptRuleModel(transcriptRuleDto);
    return await createTranscriptRule.save();
  }
}

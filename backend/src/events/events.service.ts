import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schema/event.schema';
import { Follower, FollowerDocument } from './schema/follower.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel : Model<EventDocument>,
    @InjectModel(Follower.name) private followerModel : Model<FollowerDocument>
  ){}

  async createEvent(createEventDto : CreateEventDto) : Promise<Event>{
    const createEvent = new this.eventModel(createEventDto);
    return await createEvent.save();
  }

  async updateEvent(_id : string, createEventDto : CreateEventDto) : Promise<any> {
    const temp = JSON.stringify(createEventDto);
    const updated = JSON.parse(temp);
    return await this.eventModel.updateOne(
        { _id : new Types.ObjectId(_id) },
        { '$set' : updated }
      )
  }

  async followEvent( followDto : FollowDto ) : Promise<Follower> {
    const record = {
      event_id : new Types.ObjectId(followDto.event_id),
      student_id : new Types.ObjectId(followDto.student_id)
    }
    const follower = new this.followerModel(record);
    return await follower.save();
  }

  async unFollow( followDto : FollowDto ) : Promise<any> {
    const record = {
      event_id : new Types.ObjectId(followDto.event_id),
      student_id : new Types.ObjectId(followDto.student_id)
    }
    return await this.followerModel.deleteOne(record).exec();
  }

  async getDetailedEvent( _id : string ) : Promise<Event> {
    return await this.eventModel.findById(new Types.ObjectId(_id)).exec();
  }

  async searchEvent( queryDto : QueryDto ) : Promise<Event[]> {
    const res =  await this.eventModel.aggregate<any>([
      { $match : { event_name : queryDto.event_name } },
      { $match : 
        { 
          $gte : { event_start_time : queryDto.evet_start_time }, 
          $lt : { event_end_time : queryDto.event_end_time }
        }
      },
      { $match : { event_type : queryDto.event_type } }
    ])
    return res;
  }
}

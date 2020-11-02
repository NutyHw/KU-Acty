import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schema/event.schema';
import { Follower, FollowerDocument } from './schema/follower.schema';
import { Organizer, OrganizerDocument } from '../organizers/schema/organizer.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel : Model<EventDocument>,
    @InjectModel(Follower.name) private followerModel : Model<FollowerDocument>,
    @InjectModel(Organizer.name) private organizerModel : Model<OrganizerDocument>
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

  async getDetailedEvent( _id : string ) : Promise<any> {
    const eventDetail =  await this.eventModel.findById(new Types.ObjectId(_id)).exec();
    const organizerDetail = await this.organizerModel.findOne({ user : new Types.ObjectId(eventDetail.organizer_id) }).exec()
    return { eventDetail, organizerDetail }
  }

  async searchEvent( queryDto : QueryDto ) : Promise<Event[]> {
    const pipeline = new Array();
    if ( queryDto.event_name != '' ){
      pipeline.push({ $match : { event_name : queryDto.event_name } })
    }

    if ( queryDto.event_start_time){
      pipeline.push({ $match : { event_start_time : { $gte : new Date(queryDto.event_start_time) } }})
    }

    if ( queryDto.event_end_time){
      pipeline.push({ $match : { event_end_time : { $lte :  new Date(queryDto.event_start_time) } }})
    }

    if ( queryDto.event_type.length != 0 ){
      pipeline.push({ $match : { event_type : { $in : queryDto.event_type } } })
    }

    const res =  await this.eventModel.aggregate<any>(pipeline);
    return res;
  }

  async getFollowEvent( _id : string ) : Promise<Follower[]>{
    const res = await this.followerModel.find(
      { student_id : _id }
    )
    return res;
  }

  async getCreateEvent( _id : string ) : Promise<Event[]> {
    const res = await this.eventModel.find(
      { organizer_id : new Types.ObjectId(_id) }
    )
    return res;
  }
}

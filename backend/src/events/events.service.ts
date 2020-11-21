import { Model, Types } from 'mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schema/event.schema';
import { Follower, FollowerDocument } from './schema/follower.schema';
import { Organizer, OrganizerDocument } from '../organizers/schema/organizer.schema';
import { EventType, EventTypeDocument } from './schema/eventType.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { QueryDto } from './dto/query.dto';
import { CreateEventTypeDto } from './dto/create-event-type.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel : Model<EventDocument>,
    @InjectModel(Follower.name) private followerModel : Model<FollowerDocument>,
    @InjectModel(Organizer.name) private organizerModel : Model<OrganizerDocument>,
    @InjectModel(EventType.name) private eventTypeModel : Model<EventTypeDocument>
  ){}

  async findById( _id : Types.ObjectId ) : Promise<Event> {
    return await this.eventModel.findOne({ _id : _id })
  }

  async createEvent(createEventDto : CreateEventDto) : Promise<Event>{
    const createEvent = new this.eventModel(createEventDto);
    return await createEvent.save();
  }

  async updateEvent(_id : string, createEventDto : CreateEventDto) : Promise<any> {
    const temp = JSON.stringify(createEventDto);
    const updated = JSON.parse(temp);
    const res = await this.eventModel.updateOne(
        { _id : new Types.ObjectId(_id) },
        { '$set' : updated }
      )
    return res;
  }

  async followEvent( followDto : FollowDto ) : Promise<boolean> {
    const record = {
      event_id : new Types.ObjectId(followDto.event_id),
      student_id : new Types.ObjectId(followDto.student_id)
    }
    const follower = new this.followerModel(record);
    if ( follower ){
      return true;
    } else {
      throw new HttpException('internal error',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async unFollow( followDto : FollowDto ) : Promise<true> {
    const record = {
      event_id : new Types.ObjectId(followDto.event_id),
      student_id : new Types.ObjectId(followDto.student_id)
    }
    const res = await this.followerModel.deleteOne(record).exec();
    if ( res.deletedCount === 0 ){
      throw new HttpException('event_id not match',HttpStatus.BAD_REQUEST)
    } else {
      return true;
    }
  }

  async getDetailedEvent( _id : string ) : Promise<any> {
    const eventDetail =  await this.eventModel.findById(new Types.ObjectId(_id)).exec();
    const organizerDetail = await this.organizerModel.findOne({ user : new Types.ObjectId(eventDetail.organizer_id) }).exec()
    return { eventDetail, organizerDetail }
  }

  async searchEvent( queryDto : QueryDto ) : Promise<Event[]> {
    const pipeline = new Array<any>();

    pipeline.push({ $match : { 'status' : 'active' } })

    if ( queryDto.event_name != '' ){
      pipeline.push({ $match : { event_name : { '$regex' : new RegExp(queryDto.event_name) } }})
    }

    if ( queryDto.event_start_time){
      pipeline.push({ $match : { event_start_time : { $gte : new Date(queryDto.event_start_time) } }})
    }

    if ( queryDto.event_end_time){
      pipeline.push({ $match : { event_start_time : { $lte :  new Date(queryDto.event_end_time) } }})
    }

    if ( queryDto.event_type.length != 0 ){
      pipeline.push({ $match : { event_type : { $elemMatch : { $in : queryDto.event_type } } } } )
    }


    const res = await this.eventModel.aggregate<any>(pipeline);
    return res;
  }

  async getFollowEvent( _id : string ) : Promise<Event[]>{
    const res = await this.followerModel.find(
      { student_id : _id  }
    )
    const allEventsId = res.map( (elm) => elm._id )
    const res2 = await this.eventModel.aggregate([
      { $match : { event_start_time : { $gt : new Date() } } },
      { $match : { _id : { $in : allEventsId } } },
    ]).sort({ event_start_time : 1 })

    return res2;
  }

  async getCreateEvent( _id : string ) : Promise<Event[]> {
    const res = await this.eventModel.find(
      { organizer_id : new Types.ObjectId(_id) }
    )
    return res;
  }

  async getEventById( _ids : [ Types.ObjectId ] ) : Promise<Event[]> {
    return await this.eventModel.find({ _id : { $in : _ids } }).exec()
  }

  async createEventType( createEventTypeDto : CreateEventTypeDto ) : Promise<any> {
    const createEventType = new this.eventTypeModel(createEventTypeDto);
    return await createEventType.save();
  }

  async findEventTypeById( _id : Types.ObjectId ) : Promise<any> {
    return await this.eventTypeModel.findOne({ _id : _id })
  }
}

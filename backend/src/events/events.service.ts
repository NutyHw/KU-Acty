//@ts-nocheck
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
    createEventDto.event_type = createEventDto.event_type.map( event_type => Types.ObjectId(event_type) )
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
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

  async followEvent( followDto : FollowDto ) : Promise<any> {
    const record = {
      event_id : Types.ObjectId(followDto.event_id),
      nisit_id : followDto.nisit_id
    }
    const res = await this.followerModel.findOne(record);

    if ( res ){
      throw new HttpException('nisit already follow this event',HttpStatus.BAD_REQUEST);
    }

    await this.eventModel.updateOne({ _id : record.event_id },{ $inc : { interest_count : 1 } })
    const follower = new this.followerModel(record);
    return follower.save();
  }

  async unFollow( followDto : FollowDto ) : Promise<true> {
    const record = {
      event_id : Types.ObjectId(followDto.event_id),
      nisit_id : followDto.nisit_id
    }

    const res = await this.followerModel.deleteOne(record);
    await this.eventModel.updateOne({ _id : record.event_id },{ $inc : { interest_count : -1 } })

    if ( res.deletedCount === 0 ){
      throw new HttpException('event_id not match',HttpStatus.BAD_REQUEST)
    } else {
      return true;
    }
  }

  async getDetailedEvent( _id : string, nisit_id : string ) : Promise<any> {
    const eventDetail =  await this.eventModel.findById(Types.ObjectId(_id));
    const organizerDetail = await this.organizerModel.findOne({ user : eventDetail.organizer_id })
    const eventType2 = await this.eventTypeModel.find({ _id : { $in : eventDetail.event_type } })
    const eventType = eventType2.map( el => el.event_type_name )
    const followRecord = await this.followerModel.findOne({ nisit_id : Types.ObjectId(nisit_id), event_id : Types.ObjectId(_id) })
    const isFollow = followRecord ? true : false;

    await this.eventModel.updateOne( { _id : Types.ObjectId(_id) }, { $inc : { view_counts : 1 } } )
    return { eventDetail, organizerDetail, eventType, isFollow }
  }

  async searchEvent( queryDto : QueryDto ) : Promise<any[]> {
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
    for ( const event of res ){
      const eventType = await this.eventTypeModel.find({ _id : { $in : event.event_type } });
      event.event_type = eventType.map( el => el.event_type_name );
    }
    return res;
  }

  async getFollowEvent( _id : string ) : Promise<any[]>{
    const res = await this.followerModel.find(
      { nisit_id : Types.ObjectId(_id)  }
    )

    const allEventsId = res.map( (elm) => Types.ObjectId(elm.event_id) )

    const feeds = await this.eventModel.find({ _id : { $in : allEventsId } })
    for ( const feed of feeds ){
      const eventType = await this.eventTypeModel.find({ _id : { $in : feed.event_type } });
      feed.event_type = eventType.map( el => el.event_type_name )
    }
    return feeds
  }

  async getCreateEvent( _id : string ) : Promise<Event[]> {
    const res = await this.eventModel.find(
      { organizer_id : new Types.ObjectId(_id) }
    )
    for ( const event of res ){
      const eventType = await this.eventTypeModel.find({ _id : { $in : event.event_type } });
      event.event_type = eventType.map( el => el.event_type_name );
    }
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

  async getEventByOrgId( organizer_id : Types.ObjectId ) : Promise<any> {
    const viewCounts = await this.eventModel.find({ organizer_id : organizer_id }).sort({ view_counts : -1 });
    const interestCount = await this.eventModel.find({ organizer_id : organizer_id }).sort({ interest_count : -1 });

    return { viewCount, interestCount }
  }

  async getEventTypeForRule( eventTypeId : [ Types.ObjectId ] ) : Promise<any> { 
    return await this.eventTypeModel.find({ _id : { $in : eventTypeId } });
  }
}

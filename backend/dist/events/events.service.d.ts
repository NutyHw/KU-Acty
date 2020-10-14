import { Model } from 'mongoose';
import { Event, EventDocument } from './schema/event.schema';
import { Follower, FollowerDocument } from './schema/follower.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { QueryDto } from './dto/query.dto';
export declare class EventsService {
    private eventModel;
    private followerModel;
    constructor(eventModel: Model<EventDocument>, followerModel: Model<FollowerDocument>);
    createEvent(createEventDto: CreateEventDto): Promise<Event>;
    updateEvent(_id: string, createEventDto: CreateEventDto): Promise<any>;
    followEvent(followDto: FollowDto): Promise<Follower>;
    unFollow(followDto: FollowDto): Promise<any>;
    getDetailedEvent(_id: string): Promise<Event>;
    searchEvent(queryDto: QueryDto): Promise<Event[]>;
}

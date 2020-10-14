import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
export declare class EventsController {
    private readonly eventService;
    constructor(eventService: EventsService);
    createEvent(createEventDto: CreateEventDto): Promise<import("./schema/event.schema").Event>;
    updateEvent(createEventDto: CreateEventDto, param: any): Promise<any>;
    getDetailedEvent(param: any): Promise<import("./schema/event.schema").Event>;
    followEvent(followDto: FollowDto): Promise<import("./schema/follower.schema").Follower>;
    unFollowEvent(followDto: FollowDto): Promise<any>;
}

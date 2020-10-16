import { Document, Types } from 'mongoose';
export declare type EventDocument = Event & Document;
export declare class Event {
    event_name: string;
    organizer_id: Types.ObjectId;
    benefit_hour: number;
    place: string;
    event_start_time: Date;
    event_end_time: Date;
    contact: string;
    description: string;
    attachment_path: [{
        type: Types.ObjectId;
        ref: 'upload';
    }];
    view_counts: number;
    interest_count: number;
    status: string;
    event_type: [string];
}
export declare const EventSchema: import("mongoose").Schema<any>;

import { Document, Types } from 'mongoose';
export declare type FollowerDocument = Follower & Document;
export declare class Follower {
    student_id: Types.ObjectId;
    event_id: Types.ObjectId;
}
export declare const FollowerSchema: import("mongoose").Schema<any>;

import { Document, Types } from 'mongoose';
export declare type OrganizerDocument = Organizer & Document;
export declare class Organizer {
    user: Types.ObjectId;
    organizer_name: string;
    document_path: string;
    email: string;
    contact: string;
    location: string;
    description: string;
    approve_date: Date;
}
export declare const OrganizerSchema: import("mongoose").Schema<any>;

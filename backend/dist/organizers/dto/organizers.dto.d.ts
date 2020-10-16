import { Types } from 'mongoose';
export declare class OrganizerDto {
    organizer_name: string;
    user: Types.ObjectId;
    email: string;
    contact: string;
    location: string;
    description: string;
}

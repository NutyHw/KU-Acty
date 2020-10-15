import { Types } from 'mongoose';
export declare class OrganizerDto {
    organizerName: string;
    user: Types.ObjectId;
    email: string;
    contact: string;
    location: string;
    description: string;
}

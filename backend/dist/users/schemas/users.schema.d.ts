import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    _id: string;
    username: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<any>;

import { Document } from 'mongoose';
import { ObjectID } from 'typeorm';
export declare type FileDocument = File & Document;
export declare class File {
    _id: ObjectID;
    path: string;
}
export declare const FileSchema: import("mongoose").Schema<any>;

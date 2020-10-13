import { Model } from 'mongoose';
import { Organizer, OrganizerDocument } from './schema/organizer.schema';
import { OrganizerDto } from './dto/organizers.dto';
import { ObjectID } from 'typeorm';
export declare class OrganizersService {
    private organizerModel;
    constructor(organizerModel: Model<OrganizerDocument>);
    create(organizerDto: OrganizerDto): Promise<Organizer>;
    approve(_id: ObjectID): Promise<Organizer>;
    uploadFile(_id: string, filePath: string): Promise<any>;
}

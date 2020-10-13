import { Model, Types } from 'mongoose';
import { Organizer, OrganizerDocument } from './schema/organizer.schema';
import { OrganizerDto } from './dto/organizers.dto';
export declare class OrganizersService {
    private organizerModel;
    constructor(organizerModel: Model<OrganizerDocument>);
    create(organizerDto: OrganizerDto): Promise<Organizer>;
    approve(_id: Types.ObjectId): Promise<Organizer>;
    uploadFile(_id: string, filePath: string): Promise<any>;
}

import { OrganizerDto } from './dto/organizers.dto';
import { OrganizersService } from './organizers.service';
import { Organizer } from './schema/organizer.schema';
export declare class OrganizersController {
    private readonly organizerService;
    constructor(organizerService: OrganizersService);
    register(organizerDto: OrganizerDto): Promise<Organizer>;
    upload(file: any, param: any): Promise<any>;
}

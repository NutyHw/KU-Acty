import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Organizer, OrganizerDocument } from './schema/organizer.schema';
import { OrganizerDto } from './dto/organizers.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectModel(Organizer.name) private organizerModel : Model<OrganizerDocument>,
    private readonly eventsService : EventsService
  ){}

  async create( organizerDto : OrganizerDto ) : Promise<Organizer> {
    organizerDto.user = new Types.ObjectId(organizerDto.user);
    const organizer = new this.organizerModel(organizerDto);
    return organizer.save()
  }

  async approve( _id : Types.ObjectId ) : Promise<Organizer> {
    return await this.organizerModel.updateOne({ _id : _id }, { $set : { approve_date : new Date() } });
  }

  async uploadFile( _id : string, filePath : string ) : Promise<any> {
    return await this.organizerModel.updateOne({ user : new Types.ObjectId(_id) }, { $set : { document_path : filePath } });
  }

  async feed( _id : string ) : Promise<any> {
    console.log(_id)
    return await this.eventsService.getCreateEvent(_id);
  }
}

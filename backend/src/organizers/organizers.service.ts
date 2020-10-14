import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Organizer, OrganizerDocument } from './schema/organizer.schema';
import { OrganizerDto } from './dto/organizers.dto';

@Injectable()
export class OrganizersService {
  constructor(@InjectModel(Organizer.name) private organizerModel : Model<OrganizerDocument> ){}

  async create( organizerDto : OrganizerDto ) : Promise<Organizer> {
    const organizer = new this.organizerModel(organizerDto);
    return organizer.save()
  }

  async approve( _id : Types.ObjectId ) : Promise<Organizer> {
    return await this.organizerModel.updateOne({ _id : _id }, { $set : { approve_date : new Date() } });
  }

  async uploadFile( _id : string, filePath : string ) : Promise<any> {
    return await this.organizerModel.updateOne({ _id : new Types.ObjectId(_id) }, { $set : { document_path : filePath } });
  }
}

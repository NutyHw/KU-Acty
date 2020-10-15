import { Controller, Post, Param , UseInterceptors, UploadedFile, Body} from '@nestjs/common';
import { OrganizerDto } from './dto/organizers.dto';
import { OrganizersService } from './organizers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Organizer } from './schema/organizer.schema';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizerService : OrganizersService) {}

  @Post()
  async register(@Body() organizerDto : OrganizerDto) : Promise<Organizer> {
    return await this.organizerService.create(organizerDto);
  }

  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file , @Param() param ) : Promise<any>{
    console.log(file);
    return await this.organizerService.uploadFile( param.id, file.path );
  }
}

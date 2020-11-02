import { Controller, Post, Param , UseInterceptors, UploadedFile, Body, UseGuards, Req, Get } from '@nestjs/common';
import { OrganizerDto } from './dto/organizers.dto';
import { OrganizersService } from './organizers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Organizer } from './schema/organizer.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

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
    return await this.organizerService.uploadFile( param.id, file.path );
  }

  @Get('/feed')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('organizer')
  async feed( @Req() req ) : Promise<any> {
    return await this.organizerService.feed(req.user.userId);
  }
}

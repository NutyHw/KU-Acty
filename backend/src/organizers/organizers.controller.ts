import { Controller, Post, Param , UseInterceptors, UploadedFile, Body, UseGuards, Request, Get } from '@nestjs/common';
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
  async feed( @Request() req : any ) : Promise<any> {
    return await this.organizerService.feed(req.user.userId);
  }

  @Get('/stat')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('organizer')
  async stat( @Request() req : any ) : Promise<any> {
    return await this.organizerService.eventStat(req.user.userId)
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('organizer')
  async selfProfile( @Request() req : any ) : Promise<any> {
    return await this.organizerService.getProfile(req.user.userId)
  }

  @Get(':id/profile')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('nisit','organizer')
  async profile( @Param() organizer_id : any ) : Promise<any>{
    return await this.organizerService.getProfile(organizer_id.id)
  }

  @Get(':id/feed')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('nisit','organizer')
  async viewFeed( @Param() id : any ) : Promise<any> {
    console.log(id)
    return await this.organizerService.feed(id.id);
  }
}

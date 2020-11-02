import { Controller, Post, Put, Body, Param, Get, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryDto } from './dto/query.dto';
import { Types } from 'mongoose';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(
    private readonly eventService : EventsService,
  ){}

  @Post()
  @Role('organizer')
  async createEvent(@Body() createEventDto : CreateEventDto , @Request() req : any){
    createEventDto.organizer_id = Types.ObjectId(req.user.userId);
    return await this.eventService.createEvent(createEventDto);
  }

  @Put(':id')
  @Role('organizer')
  async updateEvent(@Body() createEventDto : CreateEventDto,@Param() param : { id : string }){
    return await this.eventService.updateEvent(param.id, createEventDto)
  }

  @Get(':id/detail')
  @Role('organizer')
  async getDetailedEvent(@Param() param : { id : string }){
    return await this.eventService.getDetailedEvent(param.id)
  }

  @Post('follow')
  @Role('nisit')
  async followEvent(@Body() followDto : FollowDto, @Request() req : any ){
    followDto.student_id = Types.ObjectId(req.user.userId);
    return await this.eventService.followEvent(followDto)
  }

  @Post('unfollow')
  @Role('nisit')
  async unFollowEvent(@Body() followDto : FollowDto, @Request() req : any){
    followDto.student_id = Types.ObjectId(req.user.userId);
    return await this.eventService.unFollow(followDto);
  }

  @Post('search')
  @Role('nisit','organizer')
  async search(@Body() queryDto : QueryDto){
    return await this.eventService.searchEvent(queryDto)
  }
}

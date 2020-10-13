import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService : EventsService){}
  @Post()
  async createEvent(@Body() createEventDto : CreateEventDto ){
    console.log(createEventDto);
    return await this.eventService.createEvent(createEventDto);
  }

  @Put(':id')
  async updateEvent(@Body() createEventDto : CreateEventDto,@Param() param){
    return await this.eventService.updateEvent(param.id, createEventDto)
  }

  @Get(':id/detail')
  async getDetailedEvent(@Param() param){
    return await this.eventService.getDetailedEvent(param.id)
  }

  @Post('follow')
  async followEvent(@Body() followDto : FollowDto ){
    return await this.eventService.followEvent(followDto)
  }

  @Post('unfollow')
  async unFollowEvent(@Body() followDto : FollowDto){
    return await this.eventService.unFollow(followDto);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { NisitsService } from './nisits.service';

@Controller('nisits')
export class NisitsController {
  constructor(
    private readonly nisitService : NisitsService
  ){}

  //@Get(':id/transcript')
  //async getTranscript(@Param() id : string) : Promise<any>{
    //return await this.nisitService.getTranscript(id);
  //}

  @Get(':id/feed')
  async getFeed(@Param() id : string) : Promise<any> {
    return await this.nisitService.findFollowEvent(id)
  }
}

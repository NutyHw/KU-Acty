import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { TranscriptRuleDto } from './dto/transcriptRule.dto';
import { NisitsService } from './nisits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';

@Controller('nisits')
@UseGuards(JwtAuthGuard,RolesGuard)
export class NisitsController {
  constructor(
    private readonly nisitService : NisitsService
  ){}

  @Get(':id/transcript')
  @Role('nisit')
  async getTranscript(@Param() id : string) : Promise<any>{
    return await this.nisitService.getTranscript(id);
  }

  @Get(':id/feed')
  @Role('nisit')
  async getFeed(@Param() id : string) : Promise<any> {
    return await this.nisitService.findFollowEvent(id)
  }

  @Post('transcriptrule')
  @Role('admin')
  async createTranscriptRule(@Body() TranscriptRuleDto : TranscriptRuleDto ) : Promise<any> {
    return await this.createTranscriptRule(TranscriptRuleDto);
  }
}

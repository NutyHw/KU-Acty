import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TranscriptRuleDto } from './dto/transcriptRule.dto';
import { TranscriptDto } from './dto/transcript.dto';
import { NisitsService } from './nisits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';
import { ParticipateEventDto } from './dto/participateEvent.dto';

@Controller('nisits')
@UseGuards(JwtAuthGuard,RolesGuard)
export class NisitsController {
  constructor(
    private readonly nisitService : NisitsService
  ){}

  @Get('transcript')
  @Role('nisit')
  async getTranscript(@Request() req : any) : Promise<any>{
    return await this.nisitService.getTranscript(req.user.userId);
  }

  @Get('feed')
  @Role('nisit')
  async getFeed(@Request() req : any) : Promise<any> {
    return await this.nisitService.findFollowEvent(req.user.userId)
  }

  @Post('transcript-rule')
  @Role('organizer')
  async createTranscriptRule(@Body() TranscriptRuleDto : TranscriptRuleDto ) : Promise<any> {
    return await this.nisitService.createTranscriptRule(TranscriptRuleDto);
  }

  @Post('update-transcript')
  @Role('organizer')
  async updateTranscript(@Body() participateEventDto : ParticipateEventDto ) : Promise<any>{
    return await this.nisitService.updateTranscript(participateEventDto)
  }

  @Post('transcript')
  @Role('organizer')
  async createTranscript(@Body() transcriptDto : TranscriptDto) : Promise<any> {
    return await this.nisitService.createTranscript(transcriptDto);
  }

  @Get('transcriptRule')
  @Role('organizer')
  async getTranscriptRule() : Promise<any> {
    return await this.nisitService.getTranscriptRule();
  }
}

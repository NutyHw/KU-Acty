import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { NisitsService } from './nisits.service';
import { NisitsController } from './nisits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transcript, TranscriptSchema } from './schema/transcript.schema';
import { TranscriptRule, TranscriptRuleSchema } from './schema/transcriptRule.schema';
import { Nisits, NisitsSchema } from './schema/nisits.schema';

@Module({
  imports : [ 
    MongooseModule.forFeature([
      { name : Transcript.name , schema : TranscriptSchema },
      { name : Nisits.name, schema : NisitsSchema },
      { name : TranscriptRule.name, schema : TranscriptRuleSchema }
    ]),
    EventsModule
  ],
  providers : [ NisitsService ],
  controllers : [ NisitsController ],
  exports : [ MongooseModule ]
})
export class NisitsModule {
}

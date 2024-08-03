import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { publicationSchema } from './schemas/publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publication', schema: publicationSchema },
    ]),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}

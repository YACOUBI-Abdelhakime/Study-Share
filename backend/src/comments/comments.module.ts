import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './schemas/comment.schema';
import { publicationSchema } from 'src/publications/schemas/publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: commentSchema }]),
    MongooseModule.forFeature([
      { name: 'Publication', schema: publicationSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}

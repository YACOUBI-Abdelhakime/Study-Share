import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: commentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}

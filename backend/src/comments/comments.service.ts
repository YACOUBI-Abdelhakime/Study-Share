import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model, Types } from 'mongoose';
import { AddCommentDto } from './dtos/add.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  async getPublicationComments(publicationId: string): Promise<Comment[]> {
    const publicationIdAsObjectId =
      Types.ObjectId.createFromHexString(publicationId);
    const comments = await this.commentModel.aggregate([
      {
        $match: {
          publicationId: publicationIdAsObjectId,
        },
      },
      {
        $lookup: {
          // The name of the users collection
          from: 'users',
          // The field in the comments collection
          localField: 'userId',
          // The field in the users collection
          foreignField: '_id',
          // The alias for the result array
          as: 'user',
        },
      },
      {
        $unwind: '$user', // Unwind the user array to merge it with the publication
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          content: 1,
          publicationId: 1,
          createdAt: 1,
          userName: '$user.name',
        },
      },
    ]);
    return comments;
  }

  async addComment(comment: AddCommentDto, payload): Promise<Comment> {
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const publicationIdAsObjectId = Types.ObjectId.createFromHexString(
      comment.publicationId,
    );
    let newComment: Comment = {
      ...comment,
      userId: userIdAsObjectId,
      publicationId: publicationIdAsObjectId,
    };
    const createdComment = await this.commentModel.create(newComment);
    return createdComment;
  }
}

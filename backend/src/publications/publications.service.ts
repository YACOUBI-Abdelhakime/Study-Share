import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddPublicationDto as AddPublicationDto } from './dtos/add.publication.dto';
import { UpdatePublicationDto } from './dtos/update.publication.dto';
import { Publication } from './schemas/publication.schema';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name)
    private publicationModel: Model<Publication>,
  ) {}

  async getPublications(): Promise<Publication[]> {
    const publications = await this.publicationModel.aggregate([
      {
        $lookup: {
          // The name of the users collection
          from: 'users',
          // The field in the publications collection
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
          title: 1,
          content: 1,
          commentsCount: 1,
          isDiscussionOpen: 1,
          tags: 1,
          createdAt: 1,
          userId: 1,
          userName: '$user.name',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return publications;
  }

  async getUserPublications(payload): Promise<Publication[]> {
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const publications = await this.publicationModel.find({
      userId: userIdAsObjectId,
    });
    return publications;
  }

  async addPublication(
    publication: AddPublicationDto,
    payload,
  ): Promise<Publication> {
    const userIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    let newPublication: Publication = {
      ...publication,
      userId: userIdAsObjectId,
      isDiscussionOpen: true,
      commentsCount: 0,
    };
    const createdPublication =
      await this.publicationModel.create(newPublication);
    return createdPublication;
  }

  async deletePublication(id: string): Promise<Publication> {
    const publication = await this.publicationModel.findByIdAndDelete(id);
    return publication;
  }

  async updatePublication(
    id: string,
    publication: UpdatePublicationDto,
  ): Promise<Publication> {
    const updatedPublication = await this.publicationModel.findByIdAndUpdate(
      id,
      publication,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedPublication;
  }
}

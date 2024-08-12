import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddPublicationDto as AddPublicationDto } from './dtos/add.publication.dto';
import { UpdatePublicationDto } from './dtos/update.publication.dto';
import { Publication } from './schemas/publication.schema';
import { PublicationTagEnum } from './types/publication.tag.enum';

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

  async getTagValues(): Promise<PublicationTagEnum[]> {
    return Object.values(PublicationTagEnum);
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

  async togglePublicationDiscussion(id: string, payload): Promise<Publication> {
    const userId = payload.user._id;

    // Fetch the publication to get its current state
    const publication = await this.publicationModel.findById(id);

    if (!publication || publication.userId.toString() != userId) {
      throw new UnauthorizedException(
        "Can't toggle discussion of another user's publication",
      );
    }

    const updatedPublication = await this.publicationModel.findByIdAndUpdate(
      id,
      { isDiscussionOpen: !publication.isDiscussionOpen },
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedPublication;
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

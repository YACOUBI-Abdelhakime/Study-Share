import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publication } from './schemas/publication.schema';
import { Model } from 'mongoose';
import { AddPublicationsDto } from './dtos/add.publication.dto';
import { PublicationStatusEnum } from './types/publication.status.enum';
import { UpdatePublicationsDto } from './dtos/update.publication.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name)
    private publicationModel: Model<Publication>,
  ) {}

  async getPublications(): Promise<Publication[]> {
    const publications = await this.publicationModel.find();
    return publications;
  }

  async getUserPublications(user): Promise<Publication[]> {
    const publications = await this.publicationModel.find({ userId: user.id });
    return publications;
  }

  async addPublication(
    publication: AddPublicationsDto,
    user,
  ): Promise<Publication> {
    let newPublication: Publication = {
      ...publication,
      userId: user.id,
      status: PublicationStatusEnum.OPEN,
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
    publication: UpdatePublicationsDto,
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';
import { AddPublicationDto } from './dtos/add.publication.dto';
import { UpdatePublicationDto } from './dtos/update.publication.dto';
import { PublicationsService } from './publications.service';
import { Publication } from './schemas/publication.schema';
import { PublicationTagEnum } from './types/publication.tag.enum';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPublications(): Promise<Publication[]> {
    return await this.publicationService.getPublications();
  }

  // Unused
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUserPublications(@Req() req: Request): Promise<Publication[]> {
    return await this.publicationService.getUserPublications(req.user);
  }

  @Get('/tag-values')
  @UseGuards(JwtAuthGuard)
  async getTagValues(): Promise<PublicationTagEnum[]> {
    return await this.publicationService.getTagValues();
  }

  // Add publication
  @Post()
  @UseGuards(JwtAuthGuard)
  async addPublication(
    @Body() publication: AddPublicationDto,
    @Req() req: Request,
  ): Promise<Publication> {
    return await this.publicationService.addPublication(publication, req.user);
  }

  // Toggle publication discussion open/close
  @Get('/toggle-discussion/:id')
  @UseGuards(JwtAuthGuard)
  async togglePublicationDiscussion(
    @Param('id') publicationId: string,
    @Req() req: Request,
  ): Promise<Publication> {
    return await this.publicationService.togglePublicationDiscussion(
      publicationId,
      req.user,
    );
  }

  // Unused
  // Update publication
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePublication(
    @Param('id') publicationId: string,
    @Body() publication: UpdatePublicationDto,
  ): Promise<Publication> {
    return await this.publicationService.updatePublication(
      publicationId,
      publication,
    );
  }

  // Delete publication
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deletePublication(
    @Param('id') publicationId: string,
  ): Promise<Publication> {
    return await this.publicationService.deletePublication(publicationId);
  }
}

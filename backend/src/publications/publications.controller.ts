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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AddPublicationsDto } from './dtos/add.publication.dto';
import { Publication } from './schemas/publication.schema';
import { PublicationsService } from './publications.service';
import { Request } from 'express';
import { UpdatePublicationsDto } from './dtos/update.publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPublications(): Promise<Publication[]> {
    return await this.publicationService.getPublications();
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUserPublications(@Req() req: Request): Promise<Publication[]> {
    return await this.publicationService.getUserPublications(req.user);
  }

  // Add publication
  @Post()
  @UseGuards(JwtAuthGuard)
  async addPublication(
    @Body() publication: AddPublicationsDto,
    @Req() req: Request,
  ): Promise<Publication> {
    return await this.publicationService.addPublication(publication, req.user);
  }

  // Update publication
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePublication(
    @Param('id') publicationId: string,
    @Body() publication: UpdatePublicationsDto,
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

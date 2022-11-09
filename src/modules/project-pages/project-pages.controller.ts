import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NewPageDto } from './dto/page.dto';
import { ProjectPagesService } from './project-pages.service';

@Controller('pages')
export class ProjectPagesController {
    constructor(
        private readonly projectPagesService: ProjectPagesService,
        ) {}

        @Post()
        @UseGuards(JwtAuthGuard)
        async createPage(
            @Body() newPage: NewPageDto,
            @Req() req
        ) {
            return await this.projectPagesService.addPage(newPage, req.user.id)
        }
    
        @Get(':id')
        @UseGuards(JwtAuthGuard)
        async getPage(
            @Param('id') id: number,
            @Req() req
        ) {
            return await this.projectPagesService.getPage(id, req.user.id)
        }
    
        @Put(':id')
        @UseGuards(JwtAuthGuard)
        async updatePage(
            @Param('id') id: number,
            @Body() page: NewPageDto,
            @Req() req
        ) {
            return this.projectPagesService.updatePage(page, id, req.user.id)
        }
    
        @Delete(':id')
        @UseGuards(JwtAuthGuard)
        async deletePage(
            @Param('id') id: number,
            @Req() req
        ) {
            return await this.projectPagesService.deletePage(id, req.user.id)
        }
}

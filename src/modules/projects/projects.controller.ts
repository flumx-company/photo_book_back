import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NewProjectDto } from './dto/new-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectService: ProjectsService,
        ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createProject(
        @Body() newProject: NewProjectDto,
        @Req() req
    ) {
        return await this.projectService.createProject(newProject, req.user.id)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getProject(
        @Param('id') id: number,
        @Req() req
    ) {
        return await this.projectService.getProject(id, req.user.id)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateProject(
        @Param('id') id: number,
        @Body() project: NewProjectDto,
        @Req() req
    ) {
        return this.projectService.updateProject(project, id, req.user.id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteProject(
        @Param('id') id: number,
        @Req() req
    ) {
        return await this.projectService.deleteProject(id, req.user.id)
    }
}

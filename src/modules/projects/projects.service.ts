import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NewPageDto } from '../project-pages/dto/page.dto';
import { ProjectPagesService } from '../project-pages/project-pages.service';
import { NewProjectDto } from './dto/new-project.dto';
import { NewProject } from './entitys/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository (NewProject) private readonly projectRepository:Repository<NewProject>,
        private readonly pageService: ProjectPagesService
    ){}

    async createProject(project: NewProjectDto, userId: number) : Promise<NewProject | string> {
        try {
            const newProject = await this.projectRepository.save({...project, userId})
            const defaultPage: NewPageDto = {
                background: '#fff',
                prev: null,
                elements: null,
                projectId: newProject.id,
                userId
            }
            for (let i = newProject.pages; i > 0; i--) {
                this.pageService.addPage(defaultPage, userId)
            }
            return newProject
        } catch (error) {
            return error
        }
    }

    async getProject(id: number, userId: number) : Promise<NewProject | string> {
        try {
            const project = await this.projectRepository.findOne({
                where: {
                      id
                },
                relations: ['projectPages']
              })
              if (project.userId === userId) {
                  return project
              } else {
                 
              }
        } catch (error) {
            return error
        }
    }

    async deleteProject(id: number, userId: number) {
        try {
            const project = await this.projectRepository.findOne(id)
            if (project.userId === userId) {
                return await this.projectRepository.delete(id)
            } else {
                throw new BadRequestException('No acces, check the project id')
            }
        } catch (error) {
            return (error)
        }  
    }

    async updateProject(data: NewProjectDto, id: number, userId: number) : Promise<{
        result: UpdateResult,
        updatedData: NewProject
    }> {
        try {
            let updateData = await this.projectRepository.findOne(id);
            if(updateData && userId === updateData.userId) {
                updateData = {
                    ...updateData,
                    ...data
                }            
                const result = await this.projectRepository.update(id, updateData);
                return {
                    updatedData: updateData,
                    result
                }
            } else {
                throw new BadRequestException('No acces, check the project id')
            }
    
        } catch (error) {
            throw new BadRequestException('No acces, check the project id')
        }
    }
}

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NewPageDto } from './dto/page.dto';
import { NewPage } from './entitys/page.entity';

@Injectable()
export class ProjectPagesService {
    constructor(
        @InjectRepository (NewPage) private readonly pageRepository:Repository<NewPage>
    ){}

    async addPage(page: NewPageDto, userId: number) : Promise<NewPage | string> {
        try {
            return await this.pageRepository.save({...page, userId})
        } catch (error) {
            return error
        }
    }

    async getPage(id: number, userId: number) : Promise<NewPage | string> {
        try {
            const page = await this.pageRepository.findOne({
                where: {
                    id
                },
                relations: ['photoInstance','template']
            })
            if (page.userId === userId) {
                return page
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new ForbiddenException('No acces, check the page id')
        }
    }

    async deletePage(id: number, userId: number) {
        try {
            const page = await this.pageRepository.findOne(id)
            if (page.userId === userId) {
                return await this.pageRepository.delete(id)
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new ForbiddenException('No acces, check the page id')
        }
    }

    async updatePage(data: NewPageDto, id: number, userId: number) : Promise<{
        result: UpdateResult,
        updatedData: NewPage
    }> {
        try {
            let updateData = await this.pageRepository.findOne(id);

            if(updateData && updateData.userId === userId) {
                updateData = {
                    ...updateData,
                    ...data
                }            
                const result = await this.pageRepository.update(id, updateData);
                return {
                    updatedData: updateData,
                    result
                }
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new ForbiddenException('No acces, check the page id')
        }
    }
}

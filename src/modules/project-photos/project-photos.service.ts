import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PhotoDto } from './dto/photo.dto';
import { NewPhoto } from './entity/photo.entity';
import * as fs from 'fs'
import { Templates } from './entity/templates.entity';
import { NewPhotoInstance } from './entity/photo-instance.entity';
import { PhotoInstanceDto } from './dto/photo-instance.dto';
import { DefaultTemplates } from './entity/default-template.entity';
import { UpdatePhotoInstanceDto } from './dto/update-photo-instance.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class ProjectPhotosService {
    constructor(
        @InjectRepository (NewPhoto) private readonly photoRepository:Repository<NewPhoto>,
        @InjectRepository (Templates) private readonly templateRepository:Repository<Templates>,
        @InjectRepository (DefaultTemplates) private readonly defaultTemplateRepository:Repository<DefaultTemplates>,
        @InjectRepository (NewPhotoInstance) private readonly photoInstanceRepository:Repository<NewPhotoInstance>,
    ){}

    async addPhoto (photo: PhotoDto, userId: number, path: string, name: string) {
        try {
            return await this.photoRepository.save({...photo, userId, path, name})
        } catch (error) {
            return error;
        }
    }

    async addPhotoInstance (photoInstance: PhotoInstanceDto) {
        try {
            if (!photoInstance.templateId) {
                const template = {
                    top: photoInstance.top,
                    left: photoInstance.left,
                    width: photoInstance.width,
                    height: photoInstance.height,
                    borderColor: '#4lkdf',
                    borderWidth: 1,
                    pageId: photoInstance.pageId,
                    default: false
                }
                const templateResult = await this.templateRepository.save(template)
                return await this.photoInstanceRepository.save({...photoInstance, templateId: templateResult.id})
            }
            return await this.photoInstanceRepository.save(photoInstance)
        } catch (error) {
            return error
        }
    }

    async deletePhotoInstance(id: number) {
        try {
            const instance = await this.photoInstanceRepository.findOne(id)
            return await this.templateRepository.delete(instance.templateId)
        } catch (error) {
            return error
        }
    }

    async getPhotoInstance(id: number) {
        try {
            return await this.photoInstanceRepository.findOne({
                where: {
                    id
                },
                relations: ['template']
            })
        } catch (error) {
            return error
        }
    }

    async updatePhotoInstance(data: UpdatePhotoInstanceDto, id: number) : Promise<{
        result: UpdateResult,
        updatedData: NewPhotoInstance
    }> {
        try {
            let updateData = await this.photoInstanceRepository.findOne(id);
            if(updateData) {
                updateData = {
                    ...updateData,
                    ...data
                }         
                const result = await this.photoInstanceRepository.update(id, updateData);
                return {
                    updatedData: updateData,
                    result
                }
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            return error
        }
    }

    async getPhoto(id: number, userId: number) : Promise<NewPhoto| string> {
        try {
            const photo = await this.photoRepository.findOne(id)
            if (photo.userId === userId) {
                return photo
            } else {
                throw new ForbiddenException('No acces, check the photo id')
            }
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updatePhoto(data: PhotoDto, id: number, userId: number) : Promise<{
        result: UpdateResult,
        updatedData: NewPhoto
    }> {
        try {
            let updateData = await this.photoRepository.findOne(id);

            if(updateData && updateData.userId === userId) {
                updateData = {
                    ...updateData,
                    ...data
                }            
                const result = await this.photoRepository.update(id, updateData);
                return {
                    updatedData: updateData,
                    result
                }
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new ForbiddenException('No acces, check the photo id')
        }
    }

    async deletePhoto(id: number, userId: number) {
        try {
            const photo = await this.photoRepository.findOne(id)
            if (photo.userId === userId) {
                fs.unlink(photo.path, () => { console.log('deleted') })
                return await this.photoRepository.delete(id)
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new ForbiddenException('No acces, check the photo id')
        }
    }

    async addTemplate (templates: Array<number>, pageId: number) {
        try {
            templates.map(async (item: number) => {
                const defaultTemplate = await this.defaultTemplateRepository.findOne(item)
                this.templateRepository.save({...defaultTemplate, pageId, default: true, id: null})
            })
        } catch (error) {
            return error;
        }
    }

    async updateTemplate(data: UpdateTemplateDto, id: number) : Promise<{
        result: UpdateResult,
        updatedData: TemplateDto
    }> {
        try {
            let updateData = await this.templateRepository.findOne(id);
            if(updateData) {
                updateData = {
                    ...updateData,
                    ...data
                }         
                const result = await this.templateRepository.update(id, updateData);
                return {
                    updatedData: updateData,
                    result
                }
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            return error
        }
    }
}

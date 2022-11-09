import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { join } from 'path';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PhotoDto } from './dto/photo.dto';
import { ProjectPhotosService } from './project-photos.service';
import { PhotoInstanceDto } from './dto/photo-instance.dto';
import { UpdatePhotoInstanceDto } from './dto/update-photo-instance.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('project-photos')
export class ProjectPhotosController {
    constructor(
        private readonly projectPhotosService: ProjectPhotosService,
        ) {}

        @Post('upload')
        @UseGuards(JwtAuthGuard)
        @UseInterceptors(
            FileInterceptor('file', {
                storage: diskStorage({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const filename = path.parse(file.originalname).name
                        const extension = path.parse(file.originalname).ext
                        cb(null, `${filename}${extension}`)
                    }
                })
            })
        )
        async uploadSingle(
            @UploadedFile() file,
            @Body() photo: PhotoDto,
            @Req() req
            ) {
            return this.projectPhotosService.addPhoto(photo, req.user.id, file.path, file.filename)
        }
    
        @Get(':id')
        @UseGuards(JwtAuthGuard)
        async getPage(
            @Param('id') id: number,
            @Req() req
        ) {
            return this.projectPhotosService.getPhoto(id, req.user.id)
        }

        @Get('uploads/:file')
        getPhotoFile(
            @Param('file') file,
            @Res() res
        ) {
            return res.sendFile(join(process.cwd(), 'uploads/' + file))
        }
    
        @Put(':id')
        @UseGuards(JwtAuthGuard)
        async updatePage(
            @Param('id') id: number,
            @Body() photo: PhotoDto,
            @Req() req
        ) {
            return this.projectPhotosService.updatePhoto(photo, id, req.user.id)
        }
    
        @Delete(':id')
        @UseGuards(JwtAuthGuard)
        async deletePage(
            @Param('id') id: number,
            @Req() req
        ) {
            return this.projectPhotosService.deletePhoto(id, req.user.id)
        }

        @Post('instance')
        @UseGuards(JwtAuthGuard)
        async addPhotoInstance(
            @Body() photoInstance: PhotoInstanceDto
        ) {
            return this.projectPhotosService.addPhotoInstance(photoInstance)
        }

        @Delete('instance/:id')
        @UseGuards(JwtAuthGuard)
        async deletePhotoInstance(
            @Param('id') id: number,
        ) {
            return this.projectPhotosService.deletePhotoInstance(id)
        }

        @Get('instance/:id')
        getPhotoInstance(
            @Param('id') id: number
        ) {
            return this.projectPhotosService.getPhotoInstance(id)
        }

        @Put('instance/:id')
        @UseGuards(JwtAuthGuard)
        async updatePhotoInstance(
            @Param('id') id: number,
            @Body() instance: UpdatePhotoInstanceDto
        ) {
            return this.projectPhotosService.updatePhotoInstance(instance, id)
        }

        @Post('template')
        @UseGuards(JwtAuthGuard)
        async addTemplate(
            @Body() templateInfo
        ) {
            return this.projectPhotosService.addTemplate(templateInfo.templates, templateInfo.page)
        }

        @Put('template/:id')
        @UseGuards(JwtAuthGuard)
        async updateTemplate(
            @Param('id') id: number,
            @Body() template: UpdateTemplateDto
        ) {
            return this.projectPhotosService.updateTemplate(template, id)
        }
}

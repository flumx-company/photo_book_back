import { NewPage } from "src/modules/project-pages/entitys/page.entity";
import { NewProject } from "src/modules/projects/entitys/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NewPhoto } from "./photo.entity";
import { Templates } from "./templates.entity";

@Entity('photo-instance')
export class NewPhotoInstance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    top: number;

    @Column()
    left: number;

    @Column()
    width: number;

    @Column()
    height: number;   

    @Column()
    degree: number;   

    @Column()
    templateId: number; 

    @Column()
    pageId: number;

    @Column()
    photoId: number;

    @Column()
    projectId: number;

    @OneToOne(
        type => Templates,
        template => template.photoInstance,
        {
            cascade: true,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn()
    template: Templates

    @ManyToOne(
        () => NewPage, 
        page => page.photoInstance,
        {
            onDelete: 'CASCADE'
        }
    )
    page: Promise<NewPage>

    @ManyToOne(
        () => NewPhoto, 
        photo => photo.photoInstance,
        {
            onDelete: 'CASCADE'
        }
    )
    photo: Promise<NewPage>

    @ManyToOne(
        () => NewProject, 
        project => project.photoInstance,
        {
            onDelete: 'CASCADE'
        }
    )
    project: Promise<NewPhotoInstance>

}
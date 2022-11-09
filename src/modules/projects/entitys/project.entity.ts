import { NewUser } from "src/modules/auth/entitys/new_user.entity";
import { NewPage } from "src/modules/project-pages/entitys/page.entity";
import { NewPhotoInstance } from "src/modules/project-photos/entity/photo-instance.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class NewProject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectName: string

    @Column({
        default: 10
    })
    pages: number;

    @Column({
        default: 'created'
    })
    status: string;

    @Column({
        nullable: true
    })
    company: string;   
    
    @Column({
        nullable: true
    })
    params: string;

    @Column()
    userId: number;
    @ManyToOne(
        () => NewUser, 
        user => user.projects,
        {
            onDelete: 'CASCADE'
        }
    )
    user: Promise<NewUser>

    @OneToMany(
        () => NewPage,
        projectPages => projectPages.project,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    projectPages: Promise<NewPage[]>

    @OneToMany(
        () => NewPhotoInstance,
        photoInstance => photoInstance.project,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    photoInstance: Promise<NewPhotoInstance[]>
}
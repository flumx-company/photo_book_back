import { NewUser } from "src/modules/auth/entitys/new_user.entity";
import { NewPhotoInstance } from "src/modules/project-photos/entity/photo-instance.entity";
import { Templates } from "src/modules/project-photos/entity/templates.entity";
import { NewProject } from "src/modules/projects/entitys/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pages')
export class NewPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: '#fff'
    })
    background: string

    @Column({
        nullable: true
    })
    prev: number;

    @Column({
        nullable: true
    })
    elements: string;

    @Column()
    projectId: number;   

    @ManyToOne(
        () => NewProject, 
        project => project.projectPages,
        {
            onDelete: 'CASCADE'
        }
    )
    project: Promise<NewProject>

    @Column()
    userId: number;   

    @ManyToOne(
        () => NewUser, 
        user => user.userPages
    )
    user: Promise<NewUser>

    @OneToMany(
        () => Templates,
        template => template.page,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    template: Promise<Templates[]>

    @OneToMany(
        () => NewPhotoInstance,
        photoInstance => photoInstance.page,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    photoInstance: Promise<NewPhotoInstance[]>
}
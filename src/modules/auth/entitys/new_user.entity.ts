import { NewPage } from "src/modules/project-pages/entitys/page.entity";
import { NewPhoto } from "src/modules/project-photos/entity/photo.entity";
import { NewProject } from "src/modules/projects/entitys/project.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class NewUser {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => NewProject,
        projects => projects.user,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    projects: Promise<NewProject[]>

    @OneToMany(
        () => NewPage,
        userPages => userPages.user,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    userPages: Promise<NewPage[]>

    @OneToMany(
        () => NewPhoto,
        pagePhoto => pagePhoto.user,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    pagePhoto: Promise<NewPhoto[]>

    @Column()
    firstName: string

    @Column()
    lastName: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    password: string;   
    
    @Column()
    authMethod: string;

    @Column({
        nullable: true,
        unique: true
    })
    uid: string;

    @Column({
        default: 'user'
    })
    role: string;

}
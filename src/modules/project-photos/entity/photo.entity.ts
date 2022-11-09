import { NewUser } from "src/modules/auth/entitys/new_user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NewPhotoInstance } from "./photo-instance.entity";

@Entity('photos')
export class NewPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    name: string;

    @Column()
    path: string;

    @Column()
    projectId: number;   

    @Column()
    userId: number;   

    @ManyToOne(
        () => NewUser, 
        user => user.pagePhoto
    )
    user: Promise<NewUser>

    @OneToMany(
        () => NewPhotoInstance,
        photoInstance => photoInstance.photo,
        {
            cascade: true
        }
    ) 
    @JoinColumn()
    photoInstance: Promise<NewPhotoInstance[]>
}
import { NewPage } from "src/modules/project-pages/entitys/page.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NewPhotoInstance } from "./photo-instance.entity";

@Entity('templates') 
export class Templates {
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
    borderColor: string; 

    @Column()
    borderWidth: number; 

    @Column()
    default: boolean;

    @Column()
    pageId: number;  
    
    @OneToOne(
        type => NewPhotoInstance,
        photoInstance => photoInstance.template
    )
    photoInstance: NewPhotoInstance;

    @ManyToOne(
        () => NewPage, 
        page => page.template,
        {
            onDelete: 'CASCADE'
        }
    )
    page: Promise<NewPage>
}
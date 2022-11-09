import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('default-templates') 
export class DefaultTemplates {
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
}
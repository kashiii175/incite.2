import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryColumn()
    public id: string;

    @Column({ length: 500 })
   name: string;

    @Column({ length: 500,nullable: true  })
    mail: string;


    
}
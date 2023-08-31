
import { Learner } from 'src/learner/learner.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany,JoinTable } from 'typeorm';

@Entity()
export class Courses {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 500 })
   name: string;

    @Column({ length: 500,nullable: true  })
    rating: string;

    @Column({ length: 500,nullable: true  })
    videos: string;

    @Column({ length: 500, nullable: true })
    image: string;

    @ManyToMany(() => Learner, learner => learner.courses)
    //@JoinTable()
    learner: Learner[];

   
  //lsmcl

    
}
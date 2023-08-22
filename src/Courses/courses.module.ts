import { Learner } from 'src/learner/learner.module';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany,JoinTable } from 'typeorm';

@Entity()
export class Courses {
    @PrimaryColumn()
    public id: string;

    @Column({ length: 500 })
   name: string;

    @Column({ length: 500 })
    rating: string;

    @Column({ length: 500 })
    videos: string;

    @Column({ length: 500, nullable: true })
    image: string;

    @ManyToMany(() => Learner, learner => learner.courses)
    @JoinTable()
    learner: Learner[];


  

    
}
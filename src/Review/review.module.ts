import { Courses } from 'src/Courses/courses.module';
import { Learner } from 'src/learner/learner.module';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany } from 'typeorm';



@Entity()
export class Review {
    @PrimaryColumn()
    public id: string;

    @Column({ length: 500 })
    rating: string;

    @Column({ length: 500 })
    comment: string;

    @ManyToOne(() => Learner, learner => learner.review)
    @JoinColumn({ name: 'Learner' })
    learner: Learner;


}
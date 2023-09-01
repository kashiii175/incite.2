import { Courses } from 'src/Courses/courses.entity';
import { Review } from 'src/Review/review.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany, JoinTable } from 'typeorm';



@Entity()
export class Teacher {
    @PrimaryColumn()
    public id: string;

    @Column({ length: 500 })
    mail: string;

    @Column({ length: 500 })
    phoneNumber: string;

    @Column({ length: 500 })
    fullname: string;

    @Column({ length: 500, nullable: true })
    image: string;

    @Column({ length: 500, nullable: true })
    qualification: string;

    @Column({ type: 'jsonb', nullable: true })
    location: {
        longitude: string;
        latitude: string;
    }

    @OneToMany(() => Courses, courses => courses.teacher)
   
    courses: Courses[];


  // @OneToMany(() => Review, review => review.learner)
  // review: Review[];


//kmklmkm

}
import { Courses } from 'src/Courses/courses.entity';
import { Review } from 'src/Review/review.entity';
import { Event } from 'src/event/event.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany, JoinTable } from 'typeorm';



@Entity()
export class Organization {
    @PrimaryColumn()
    public id: string;

    @Column({ length: 500 })
    mail: string;

    @Column({ length: 500 })
    phoneNumber: string;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500, nullable: true })
    image: string;


    @Column({ type: 'jsonb', nullable: true })
    location: {
        longitude: string;
        latitude: string;
    }

//     @ManyToMany(() => Courses, courses => courses.learner)
//     @JoinTable()
//   courses: Courses[];


  @OneToMany(() => Event, event => event.organization)
  event: Event[];


//kmklmkm

}
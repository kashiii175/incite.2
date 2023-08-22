import { Courses } from 'src/Courses/courses.module';
import { Review } from 'src/Review/review.module';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany } from 'typeorm';



@Entity()
export class Learner {
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
    education: string;

    @Column({ type: 'jsonb', nullable: true })
    location: {
        longitude: string;
        latitude: string;
    }

    @ManyToMany(() => Courses, courses => courses.learner)
  
  courses: Courses[];


  @OneToMany(() => Review, review => review.learner)
  review: Review[];




}
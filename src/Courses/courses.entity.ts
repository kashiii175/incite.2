
import { Learner } from 'src/learner/learner.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany,JoinTable } from 'typeorm';

@Entity()
export class Courses {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 500 })
   name: string;

    @Column({ length: 500,nullable: true  })
    rating: string;

    @Column('jsonb', { nullable: true })
   videos: string[];

    @Column({ length: 500, nullable: true })
    image: string;

   @Column({ nullable: true })
    learnersCount:number;

    @Column({ length: 500, nullable: true })
    level: string;

    @ManyToMany(() => Learner, learner => learner.courses)
    //@JoinTable()
    learner: Learner[];

    @ManyToOne(type => Teacher, teacher => teacher.courses)
    @JoinColumn({ name: 'Teacher' })
    teacher: Teacher;
  
  //lsmcl

    
}
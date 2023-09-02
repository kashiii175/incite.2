
import { Learner } from 'src/learner/learner.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, PrimaryColumn, OneToMany, ManyToOne, JoinColumn,ManyToMany,JoinTable } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 500,nullable: true })
    name: string;

    @Column({ length: 500,nullable: true })
    description: string;

    @Column({ length: 500,nullable: true  })
    video: string;

    @Column({ length: 500, nullable: true })
    image: string;

    // @ManyToMany(() => Learner, learner => learner.courses)
    // //@JoinTable()
    // learner: Learner[];

    // @ManyToOne(type => Teacher, teacher => teacher.courses)
    // @JoinColumn({ name: 'Teacher' })
    // teacher: Teacher;
  
  //lsmcl

    
}
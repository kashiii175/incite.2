
import { Learner } from 'src/learner/learner.entity';
import { Organization } from 'src/organization/organization.entity';
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
    @Column({ nullable: true })
    learnersCount:number;

    // @ManyToMany(() => Learner, learner => learner.courses)
    // //@JoinTable()
    // learner: Learner[];

    @ManyToOne(type => Organization, organization => organization.event)
    @JoinColumn({ name: 'Organization' })
    organization: Organization;
  
    @ManyToMany(() => Learner, learner => learner.events)
    //@JoinTable()
    learner: Learner[];
  //lsmcl

    
}
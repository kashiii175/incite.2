import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Courses } from "./courses.entity";
import { Repository } from "typeorm";
import { CreateCourseDto } from "./courses.controller";

@Injectable()
export class CourseService {
   
    
  constructor(
    @InjectRepository(Courses)
    private courseRepository: Repository <Courses>,
    ) { }
    
     
   
    
    
   
    async createuser(createcourseDto:CreateCourseDto): Promise<Courses> {
        const createdreview= await this.courseRepository.save(createcourseDto);
        return createdreview;
      }
      async findAll(): Promise<Courses[]> {
        return await this.courseRepository.find();
      }

      async findAlll(): Promise<any[]> {
        const courses = await this.courseRepository.createQueryBuilder('course')
          .leftJoinAndSelect('course.learner', 'learner') // Assuming you have a 'learner' relationship in Courses entity
          .select([
            'course.id',
            'course.name',
            'course.rating',
            'course.image',
            'COUNT(learner.id) AS learnerCount',
          ])
          .groupBy('course.id')
          .getRawMany();
      
        return courses.map(course => ({
          id: course.id,
          name: course.name,
          rating: course.rating,
          image: course.image,
          learnerCount: parseInt(course.learnerCount),
        }));
      }
      async findOne(id: number) {
        
        let user= await this.courseRepository.findOne({ where: {id},relations:['learner']})
       
        return user
      }

      async save(user: Partial<Courses>): Promise<Courses> {
        return await this.courseRepository.save(user);
      }
    

      async findAllll(): Promise<Courses[]> {
        return await this.courseRepository.find({relations:['learner','teacher']});
      }
    
      async countLearnersByCourse(courseId: number): Promise<number> {
        return await this.courseRepository.count({
          where: {
            id: courseId,
          },
        });
      }
    }
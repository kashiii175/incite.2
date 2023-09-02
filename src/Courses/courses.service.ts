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
      async findOne(id: number) {
        
        let user= await this.courseRepository.findOne({ where: {id} })
       
        return user
      }

      async save(user: Partial<Courses>): Promise<Courses> {
        return await this.courseRepository.save(user);
      }
    

    }
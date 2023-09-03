import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Courses } from "./courses.entity";
import { Repository } from "typeorm";
import { CreateCourseDto } from "./courses.controller";
import { Video } from "src/videos/videos.entity";

@Injectable()
export class CourseService {
   
    
  constructor(
    @InjectRepository(Courses)
    private courseRepository: Repository <Courses>,
    @InjectRepository(Video)
    private videoRepository: Repository <Video>
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
        
        let user= await this.courseRepository.findOne({ where: {id},relations:['learner','videos']})
       
        return user
      }

      async save(user: Partial<Courses>): Promise<Courses> {
        return await this.courseRepository.save(user);
      }
    

      async findAllll(): Promise<Courses[]> {
        return await this.courseRepository.find({relations:['learner','teacher','videos']});
      }
    
      async countLearnersByCourse(courseId: number): Promise<number> {
        return await this.courseRepository.count({
          where: {
            id: courseId,
          },
        });
      }


      async addVideos(courseId: number, videos: string[]) {
        const savedVideos = await this.videoRepository.save(videos.map(video => ({ url: video })));
      
        const course = await this.courseRepository.findOne({
          where: { id: courseId },
          relations: ['videos'], // Make sure to load the 'videos' relation
        });
      
        if (!course) {
          throw new Error('Course not found');
        }
      
        const video = await this.videoRepository.findOne({
          where: { url: videos[0] },
        });
      
        if (!video) {
          throw new Error('Video not found');
        }
      
        course.videos.push(video);
        await this.courseRepository.save(course);
      
        return savedVideos;
      }
        }
    
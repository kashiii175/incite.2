import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { Learner } from './learner/learner.entity';
import { LearnerController } from './learner/learner.controller';
import { LearnerService } from './learner/learner.service';
import { Courses } from './Courses/courses.entity';
import { Review } from './Review/review.entity';
import { CourseController } from './Courses/courses.controller';
import { CourseService } from './Courses/courses.service';
import { Teacher } from './teacher/teacher.entity';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), // Imported once with global config
    TypeOrmModule.forFeature([Learner,Courses,Review,Teacher]), // Include your entities here
  ],  
  controllers: [AppController,LearnerController,CourseController,TeacherController],
  providers: [AppService,LearnerService,CourseService,TeacherService],
})
export class AppModule {}

import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Patch, Post, Put, UsePipes } from "@nestjs/common";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { LearnerService } from "./learner.service";
import { UploadFile } from "src/utils/file-uploading.utils";
import axios from "axios";
import { CourseService } from "src/Courses/courses.service";
import { EventService } from "src/event/event.service";





export class CreatedUser {
    userId:string;
    id: string;
    mail: string;
    phoneNumber: string;
    password: string;
    fullname: string;
    role: string;
    image: string;
  
  
  }
  
  
  @Controller('Learner')
  export class LearnerController {
   
  
    constructor(private readonly learnerService: LearnerService,
      private readonly eventService: EventService,
      private readonly courseService: CourseService,
     ) { }
    protected readonly logger = new Logger(this.constructor.name);
  
  
  

    

    
@Post('signup')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
async create(@Body() createduser: CreatedUser) {
  try{
  const { id } = createduser;

  
  const user = await this.learnerService.createUser(createduser, id);

  return{
    success: true,
    result: user,
   };
}catch (e) {
  this.logger.error(e);
  throw e;
}
}

@Get()
  async findAll() {
    return await this.learnerService.findAll();
  }


  @Get(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: string){
    try{
    let user= await this.learnerService.findOne(id);
    if(!user){
      throw new HttpException(`Learner not found`, HttpStatus.NOT_FOUND)
    }
    return {
      success: true,
      result: user,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
  }




  @Put(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneByid(@Param('id') id: string, @Body() bd: any){
    try{
    let user= await this.learnerService.findOne(id);
    if(!user){
      throw new HttpException(`Learner not found`, HttpStatus.NOT_FOUND)
    }
    let img: string = null

    if (bd?.file)
    {
         img=await UploadFile(bd.file);
    }
    // Save the updated user entity
    console.log(img);
    if(img)
    {user.image=img
    }
    if (bd.location?.latitude && bd.location?.longitude) {
      const { latitude, longitude } = bd.location;

      const nominatimResponse = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      const address = nominatimResponse.data.display_name;

      bd.location.address = address;
    }

    const updatedUser = await this.learnerService.save({ ...user, ...bd });

    return {
      success: true,
      result: updatedUser,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}

@Post('addcourse/:id')
@UsePipes(new InvalidRequestValidator())
@HttpCode(HttpStatus.OK)
async addCourse(@Param('id') id: string, @Body() bd: any) {
  try {
    // Load the learner
    const learner = await this.learnerService.findOne(id);

    if (!learner) {
      throw new HttpException(`Learner not found`, HttpStatus.NOT_FOUND);
    }

    // Load the new course
    const newCourse = await this.courseService.findOne(bd.courseId);

    if (!newCourse) {
      throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND);
    }
console.log(learner.courses)
    // Check if the learner has courses
    if (!learner.courses) {
      learner.courses = [];
    }
 // Check if the course is already added
 if (learner.courses.includes(newCourse)) {
  throw new HttpException(`Course already added`, HttpStatus.BAD_REQUEST);
}
    // Add the new course to the learner's courses
    learner.courses.unshift(newCourse);

    // Save the updated learner entity
    const updatedLearner = await this.learnerService.save(learner);

    return {
      success: true,
      result: updatedLearner,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}

@Post('add/event/:id')
@UsePipes(new InvalidRequestValidator())
@HttpCode(HttpStatus.OK)
async addevent(@Param('id') id: string, @Body() bd: any) {
  try {
    // Load the learner
    const learner = await this.learnerService.findOne(id);

    if (!learner) {
      throw new HttpException(`Learner not found`, HttpStatus.NOT_FOUND);
    }

    // Load the new course
    const newEvent = await this.eventService.findOne(bd.eventId);

    if (!newEvent) {
      throw new HttpException(`Event not found`, HttpStatus.NOT_FOUND);
    }
console.log(learner.events)
    // Check if the learner has courses
    if (!learner.events) {
      learner.events = [];
    }
//  Check if the course is already added
 if (learner.events.includes(newEvent)) {
  throw new HttpException(`Course already added`, HttpStatus.BAD_REQUEST);
}
    // Add the new course to the learner's courses
    learner.events.unshift(newEvent);

    // Save the updated learner entity
    const updatedLearner = await this.learnerService.save(learner);

    return {
      success: true,
      result: updatedLearner,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}



}

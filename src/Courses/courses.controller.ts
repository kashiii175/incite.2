import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Put, UsePipes } from "@nestjs/common";
import { UploadFile } from "src/utils/file-uploading.utils";
import { CourseService } from "./courses.service";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";


export class CreateCourseDto {
    id:number
   name: string;
    rating: string;
    videos: string[];
    image: string;
  }
  
  
  @Controller('Courses')
  export class CourseController {
    constructor(private readonly courseService: CourseService,) { }
    protected readonly logger = new Logger(this.constructor.name);
  






@Post()
async create(@Body() createcourseDto: CreateCourseDto) {
  try {
    let img: string = null
if(createcourseDto?.image)
{

    img=await UploadFile(createcourseDto.image);
    }
    if(img)
    {
        createcourseDto.image = img;
    }
   

    const review = await this.courseService.createuser(createcourseDto);

    return {
      success: true,
      result: review,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}


@Get(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: number){
    try{
    let user= await this.courseService.findOne(id);
    if(!user){
      throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND)
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


  @Get()
  async findAll() {
    let courses= await this.courseService.findAll();
    return {
      success: true,
      result: courses,
    };
  }

  @Put(':id')
@UsePipes(new InvalidRequestValidator())
@HttpCode(HttpStatus.OK)
async findOneByid(@Param('id') id: number, @Body() bd: any) {
  try {
    let user = await this.courseService.findOne(id);
    console.log(user);
    console.log(bd.videos)
    if (!user) {
      throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND);
    }
    let img: string = null;

    if (bd?.file) {
      img = await UploadFile(bd.file);
    }
    // Save the updated user entity
    console.log(img);
    if (img) {
      user.image = img;
    }
      if (!user.videos) {
        user.videos = [];
      }
console.log(bd.videos)
console.log("dvndjvndjvn")
if (bd.videos) {
  // Parse the videos string into an array
  let newVideos = JSON.parse(bd.videos);
  if (Array.isArray(newVideos)) {
    // Concatenate the new videos with the existing ones
    user.videos = user.videos.concat(newVideos);
  }
} // else: do nothing


    const updatedUser = await this.courseService.save(user);

    return {
      success: true,
      result: updatedUser,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}

@Post('courses/:id/add-videos')
  async addVideosToCourse(@Param('id') id: number, @Body() videoData: { videos: string[] }) {
    const course = await this.courseService.findOne(id);
    if (!course) {
      throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND);
    }

    let existingVideos = [];

    // Check if the 'videos' property exists on the 'course' object
    if (course.videos) {
      // If it does, set the 'existingVideos' variable to the value of the 'videos' property
      existingVideos = course.videos;
    }

    // Add the new videos to the copy of the existing videos array
    existingVideos.push(...videoData.videos);

    // Set the 'videos' property to the copy of the existing videos array
    course.videos = existingVideos;

    // Save the updated course entity
    const updatedCourse = await this.courseService.save(course);

    return {
      success: true,
      result: updatedCourse,
    };
  }
}
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { UploadFile } from "src/utils/file-uploading.utils";
import { CourseService } from "./courses.service";


export class CreateCourseDto {
    id:number
   name: string;
    rating: string;
    videos: string;
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
  }
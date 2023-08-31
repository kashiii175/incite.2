import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, UsePipes } from "@nestjs/common";
import { UploadFile } from "src/utils/file-uploading.utils";
import { CourseService } from "./courses.service";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";


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







  }
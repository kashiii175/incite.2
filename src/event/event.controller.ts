import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Put, UsePipes } from "@nestjs/common";
import { UploadFile, UploadVideo } from "src/utils/file-uploading.utils";

import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { EventService } from "./event.service";


export class CreateEventDto {
    id:number
    name: string;
    description: string;
    video: string;
    image: string;

  }
  
  
  @Controller('Event')
  export class EventController {
    constructor(private readonly eventService: EventService,) { }
    protected readonly logger = new Logger(this.constructor.name);
  






@Post()
async create(@Body() createeventDto: CreateEventDto) {
  try {
    let img: string = null
    let vid:string = null
if(createeventDto?.image)
{

    img=await UploadFile(createeventDto.image);
    }
    if(img)
    {
        createeventDto.image = img;
    }
    if(createeventDto?.video)
    { 
    vid=await UploadVideo(createeventDto.video);
      }
    if(vid)
    {
    createeventDto.video = vid;
    }

    const review = await this.eventService.createuser(createeventDto);

    return {
      success: true,
      result: review,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}


@Get('get/:id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: number){
    try{
    let user= await this.eventService.findOne(id);
    console.log("njn", user)
    if(!user){
      throw new HttpException(`Event not found`, HttpStatus.NOT_FOUND)
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
    let courses= await this.eventService.findAll();

    for (const course of courses) {
      const learnersCount = course.learner.length;

      course.learnersCount = learnersCount;
    }

    return {
      success: true,
      result: courses,
    };
  }

  @Put(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneByid(@Param('id') id: number, @Body() bd: any){
    try{
    let user= await this.eventService.findOne(id);
    if(!user){
      throw new HttpException(`Course not found`, HttpStatus.NOT_FOUND)
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
    //
    
    const updatedUser = await this.eventService.save({ ...user, ...bd });

    return {
      success: true,
      result: updatedUser,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}
}
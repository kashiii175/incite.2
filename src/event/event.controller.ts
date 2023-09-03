import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, UsePipes } from "@nestjs/common";
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


@Get(':id')
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
    return {
      success: true,
      result: courses,
    };
  }
}
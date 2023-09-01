import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Put, UsePipes } from "@nestjs/common";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { TeacherService } from "./teacher.service";
import { UploadFile } from "src/utils/file-uploading.utils";
import axios from "axios";

export class CreatedTeacher{
    userId:string;
    id: string;
    mail: string;
    phoneNumber: string;
    password: string;
    fullname: string;
    role: string;
    image: string;
  
  
  }
  
  
  @Controller('Teacher')
  export class TeacherController {
   
  
    constructor(private readonly teacherService: TeacherService,
     // private readonly courseService: CourseService,
     ) { }
    protected readonly logger = new Logger(this.constructor.name);
  
  
  

    

    
@Post('signup')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
async create(@Body() createdteacher: CreatedTeacher) {
  try{
  const { id } = createdteacher;

  
  const user = await this.teacherService.createUser(createdteacher, id);

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
    return await this.teacherService.findAll();
  }


  @Get(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: string){
    try{
    let user= await this.teacherService.findOne(id);
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
    let user= await this.teacherService.findOne(id);
    if(!user){
      throw new HttpException(`Teacher not found`, HttpStatus.NOT_FOUND)
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

    const updatedUser = await this.teacherService.save({ ...user, ...bd });

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
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Patch, Post, Put, UsePipes } from "@nestjs/common";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { LearnerService } from "./learner.service";
import { UploadFile } from "src/utils/file-uploading.utils";
import axios from "axios";





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



 

}

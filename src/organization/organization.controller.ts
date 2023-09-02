import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post, Put, UsePipes } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { UploadFile } from "src/utils/file-uploading.utils";
import axios from "axios";

export class CreatedOrganization {
    userId:string;
    id: string;
    mail: string;
    phoneNumber: string;
    password: string;
    name: string;
    role: string;
    image: string;
  
  
  }
  
  
  @Controller('Organization')
  export class OrganizationController {
   
  
    constructor(private readonly orgService: OrganizationService,
      
     ) { }
    protected readonly logger = new Logger(this.constructor.name);
  
  
  

    

    
@Post('signup')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
async create(@Body() createduser: CreatedOrganization) {
  try{
  const { id } = createduser;

  
  const user = await this.orgService.createUser(createduser, id);

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
    return await this.orgService.findAll();
  }


  @Get(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: string){
    try{
    let user= await this.orgService.findOne(id);
    if(!user){
      throw new HttpException(`Organization not found`, HttpStatus.NOT_FOUND)
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
    let user= await this.orgService.findOne(id);
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

    const updatedUser = await this.orgService.save({ ...user, ...bd });

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
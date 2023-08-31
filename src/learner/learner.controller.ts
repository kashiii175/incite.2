import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UsePipes } from "@nestjs/common";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";
import { LearnerService } from "./learner.service";





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
  
  
  @Controller('User')
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
}
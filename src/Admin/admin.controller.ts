import { Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, UsePipes } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { InvalidRequestValidator } from "src/shared/pipes/invalid-request-validator";

@Controller('Admin')
  export class AdminController {
   
  
    constructor(private readonly learnerService: AdminService,
     ) { }
    protected readonly logger = new Logger(this.constructor.name);
  
  



@Get(':id')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy(@Param('id') id: string){
    try{
    let user= await this.learnerService.findOne(id);
    if(!user){
      throw new HttpException(`Admin not found`, HttpStatus.NOT_FOUND)
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
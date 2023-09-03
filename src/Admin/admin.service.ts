import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import { Learner } from "./learner.entity";
import { Repository } from "typeorm";
//import { CreatedUser } from "./learner.controller";
import { Admin } from "./admin.entity";

@Injectable()
export class AdminService {
 
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) { }

  async findOne(id: string) {
    console.log(id)
    let user= await this.adminRepository.findOne({ where: {id} })
    return user
  }

}
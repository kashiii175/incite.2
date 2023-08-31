import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Learner } from "./learner.entity";
import { Repository } from "typeorm";
import { CreatedUser } from "./learner.controller";

@Injectable()
export class LearnerService {
 
  constructor(
    @InjectRepository(Learner)
    private userRepository: Repository<Learner>,
  ) { }



    async getTotalUsers(): Promise<number> {
      return this.userRepository.count();
    }

    async createUser(createduser: CreatedUser, userId: string): Promise<Learner> {
      const { mail, phoneNumber, fullname } = createduser;
    
      // const user = new User();
      // user.id = userId;
      // user.mail = mail;
      // user.phoneNumber = phoneNumber;
      // user.fullname = fullname;
     // user.role = RoleName.Customer;
    
      const user=await this.userRepository.save(createduser);
    
      return user;
    }
}
//kkdnvknv
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./organization.entity";
import { Repository } from "typeorm";
import { CreatedOrganization } from "./organization.controller";

@Injectable()
export class OrganizationService {
 
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) { }



    async getTotalUsers(): Promise<number> {
      return this.orgRepository.count();
    }

    async createUser(createduser: CreatedOrganization, userId: string): Promise<Organization> {
      const { mail, phoneNumber, name } = createduser;
    
      // const user = new User();
      // user.id = userId;
      // user.mail = mail;
      // user.phoneNumber = phoneNumber;
      // user.fullname = fullname;
     // user.role = RoleName.Customer;
    
      const user=await this.orgRepository.save(createduser);
    
      return user;
    }


    async findAll(): Promise<Organization[]> {
      return await this.orgRepository.find();
    }



    async findOne(id: string) {
      console.log(id)
      let user= await this.orgRepository.findOne({ where: {id},})
      return user
    }

    async save(user: Partial<Organization>): Promise<Organization> {
        return await this.orgRepository.save(user);
      }

}
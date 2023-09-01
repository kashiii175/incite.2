import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./teacher.entity";
import { Repository } from "typeorm";
import { CreatedTeacher } from "./teacher.controller";

@Injectable()
export class TeacherService {
 
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) { }



    

    async createUser(createduser: CreatedTeacher, userId: string): Promise<Teacher> {
      const { mail, phoneNumber, fullname } = createduser;
    
      // const user = new User();
      // user.id = userId;
      // user.mail = mail;
      // user.phoneNumber = phoneNumber;
      // user.fullname = fullname;
     // user.role = RoleName.Customer;
    
      const user=await this.teacherRepository.save(createduser);
    
      return user;
    }


    async findAll(): Promise<Teacher[]> {
      return await this.teacherRepository.find();
    }



    async findOne(id: string) {
      console.log(id)
      let user= await this.teacherRepository.findOne({ where: {id}})
      return user
    }


    async save(user: Partial<Teacher>): Promise<Teacher> {
        return await this.teacherRepository.save(user);
      }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { Repository } from "typeorm";
import { CreateEventDto } from "./event.controller";


@Injectable()
export class EventService {
   
    
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository <Event>,
    ) { }
    
     
   
    
    
   
    async createuser(createcourseDto:CreateEventDto): Promise<Event> {
        const createdreview= await this.eventRepository.save(createcourseDto);
        return createdreview;
      }
      async findAll(): Promise<Event[]> {
        return await this.eventRepository.find({relations:["organization",'learner']});
      }
      async findOne(id: number) {
        
        let user= await this.eventRepository.findOne({ where: {id},relations:["organization",'learner'] })
       
        return user
      }

    

    }
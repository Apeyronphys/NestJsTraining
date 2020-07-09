import { Injectable, NotFoundException } from '@nestjs/common';
import { CretateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(TaskRepository)
      private taskRepository: TaskRepository, 
  ){}

    async getTasks(
        filterDto: GetTaskFilterDto,
        user: User, 
    ): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(
        id: number,
        user: User,
    ): Promise<Task>{
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        
        if(!found){
            throw new NotFoundException(`Task with ID ${id} is not found.`); 
        } 
        return found; 
    }

    createTask(
        createTaskDto: CretateTaskDto,
        user: User
    ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(
        id: number,
        user: User, 
    ): Promise<void>{
        const result = this.taskRepository.delete({ id, userId: user.id });
        
        if ((await result).affected === 0){
            throw new NotFoundException(`Task with ID ${id} is not found/or can't be deleted.`);
        } 
    }

    async updateTaskById(
        id: number,
        status: TaskStatus,
        user: User,
    ): Promise<Task>{
        const task = await this.getTaskById(id, user); 
        task.status = status; 
        await task.save(); 
        return task; 

    }
}


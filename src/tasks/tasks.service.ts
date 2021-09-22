import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  getTasks = async (
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> => {
    return this.tasksRepository.getTasks(filterDto, user);
  };

  getTaskById = async (id: string, user: User): Promise<Task> => {
    const task = await this.tasksRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException('Required task was not found');
    }

    return task;
  };

  updateStatus = async (
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> => {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  };

  createTask = (createTaskDto: CreateTaskDto, user: User): Promise<Task> => {
    return this.tasksRepository.createTask(createTaskDto, user);
  };

  deleteTaskById = async (id: string, user: User): Promise<void> => {
    const result = await this.tasksRepository.delete({ id, user });

    if (!result.affected) {
      throw new NotFoundException('Required task was not found');
    }
  };
}

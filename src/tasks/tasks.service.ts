import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getFilterdTasks(filterDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = [...this.tasks];
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  getTaskById = async (id: string): Promise<Task> => {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Required task was not found');
    }

    return task;
  };

  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const newTask: Task = {
  //     id: uuidV4(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  // deleteTaskById(id: string): void {
  //   const taskToDelete = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
  // }
}

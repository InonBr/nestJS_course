import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: uuidV4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

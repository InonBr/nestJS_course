import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  getTasks = async (
    FilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> => {
    const { status, search } = FilterDto;

    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  };

  createTask = async (
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> => {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      user,
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(newTask);

    return newTask;
  };
}

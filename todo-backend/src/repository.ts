import { Todo, CreateTodoDto, UpdateTodoDto } from './types';
import { randomUUID } from 'crypto';

class TodoRepository {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return [...this.todos];
  }

  findById(id: string): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  create(dto: CreateTodoDto): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description ?? '',
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, dto: UpdateTodoDto): Todo | undefined {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    this.todos[index] = {
      ...this.todos[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    return this.todos[index];
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  // For testing purposes
  clear(): void {
    this.todos = [];
  }
}

export const todoRepository = new TodoRepository();

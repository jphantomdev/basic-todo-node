import { Router, Request, Response } from 'express';
import { todoRepository } from './repository';
import { CreateTodoDto, UpdateTodoDto } from './types';

export const todoRouter = Router();

// GET /todos
todoRouter.get('/', (_req: Request, res: Response) => {
  const todos = todoRepository.findAll();
  res.json(todos);
});

// GET /todos/:id
todoRouter.get('/:id', (req: Request, res: Response) => {
  const todo = todoRepository.findById(req.params.id);
  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  res.json(todo);
});

// POST /todos
todoRouter.post('/', (req: Request, res: Response) => {
  const { title, description } = req.body as CreateTodoDto;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const todo = todoRepository.create({ title: title.trim(), description });
  res.status(201).json(todo);
});

// PUT /todos/:id
todoRouter.put('/:id', (req: Request, res: Response) => {
  const dto = req.body as UpdateTodoDto;
  const updated = todoRepository.update(req.params.id, dto);

  if (!updated) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  res.json(updated);
});

// DELETE /todos/:id
todoRouter.delete('/:id', (req: Request, res: Response) => {
  const deleted = todoRepository.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  res.status(204).send();
});

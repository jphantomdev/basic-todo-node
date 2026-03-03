import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const todoApi = {
  getAll: (): Promise<Todo[]> => request('/todos'),

  getById: (id: string): Promise<Todo> => request(`/todos/${id}`),

  create: (dto: CreateTodoDto): Promise<Todo> =>
    request('/todos', { method: 'POST', body: JSON.stringify(dto) }),

  update: (id: string, dto: UpdateTodoDto): Promise<Todo> =>
    request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(dto) }),

  delete: (id: string): Promise<void> =>
    request(`/todos/${id}`, { method: 'DELETE' }),
};

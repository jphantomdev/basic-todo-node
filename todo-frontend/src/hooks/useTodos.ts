import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';
import { todoApi } from '../services/todoApi';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  createTodo: (dto: CreateTodoDto) => Promise<void>;
  updateTodo: (id: string, dto: UpdateTodoDto) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  clearError: () => void;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (dto: CreateTodoDto) => {
    try {
      const todo = await todoApi.create(dto);
      setTodos((prev) => [...prev, todo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: string, dto: UpdateTodoDto) => {
    try {
      const updated = await todoApi.update(id, dto);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  };

  const toggleTodo = (id: string, completed: boolean) =>
    updateTodo(id, { completed });

  const clearError = () => setError(null);

  return { todos, loading, error, createTodo, updateTodo, deleteTodo, toggleTodo, clearError };
}

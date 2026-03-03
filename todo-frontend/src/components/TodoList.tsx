import { Todo, UpdateTodoDto } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, dto: UpdateTodoDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  if (todos.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-state">
        <span className="empty-icon">📋</span>
        <p>No hay tareas aún. ¡Agrega una!</p>
      </div>
    );
  }

  return (
    <div className="todo-list-wrapper" data-testid="todo-list">
      {pending.length > 0 && (
        <section>
          <h2 className="list-heading">Pendientes ({pending.length})</h2>
          <ul className="todo-list">
            {pending.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </ul>
        </section>
      )}
      {done.length > 0 && (
        <section>
          <h2 className="list-heading done-heading">Completadas ({done.length})</h2>
          <ul className="todo-list">
            {done.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

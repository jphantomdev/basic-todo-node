import { useState } from 'react';
import { Todo, UpdateTodoDto } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, dto: UpdateTodoDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [busy, setBusy] = useState(false);

  const handleToggle = async () => {
    setBusy(true);
    try { await onToggle(todo.id, !todo.completed); }
    finally { setBusy(false); }
  };

  const handleDelete = async () => {
    setBusy(true);
    try { await onDelete(todo.id); }
    finally { setBusy(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setBusy(true);
    try {
      await onUpdate(todo.id, { title: editTitle.trim(), description: editDesc.trim() });
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  if (editing) {
    return (
      <li className="todo-item editing" data-testid="todo-item">
        <form onSubmit={handleSave} className="edit-form">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-title"
            autoFocus
            required
            data-testid="edit-title"
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="input-description"
            placeholder="Descripción"
            data-testid="edit-description"
          />
          <div className="edit-actions">
            <button type="submit" disabled={busy} className="btn-save">Guardar</button>
            <button type="button" onClick={() => setEditing(false)} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid="todo-item">
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={busy}
          data-testid="todo-checkbox"
        />
        <span className="checkmark" />
      </label>
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && <span className="todo-description">{todo.description}</span>}
      </div>
      <div className="todo-actions">
        <button onClick={() => setEditing(true)} disabled={busy} className="btn-edit" aria-label="Editar">
          ✏️
        </button>
        <button onClick={handleDelete} disabled={busy} className="btn-delete" aria-label="Eliminar">
          🗑️
        </button>
      </div>
    </li>
  );
}

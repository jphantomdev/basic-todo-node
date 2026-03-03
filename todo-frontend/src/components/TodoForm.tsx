import { useState } from 'react';
import { CreateTodoDto } from '../types/todo';

interface TodoFormProps {
  onSubmit: (dto: CreateTodoDto) => Promise<void>;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form" data-testid="todo-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="¿Qué hay que hacer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
          disabled={submitting}
          data-testid="input-title"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-description"
          disabled={submitting}
          data-testid="input-description"
        />
      </div>
      <button type="submit" disabled={submitting || !title.trim()} className="btn-add">
        {submitting ? 'Agregando…' : '+ Agregar'}
      </button>
    </form>
  );
}

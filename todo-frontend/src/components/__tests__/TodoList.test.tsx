import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/todo';

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Pending Task',
    description: '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Done Task',
    description: 'A description',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const noop = vi.fn().mockResolvedValue(undefined);

describe('TodoList', () => {
  it('shows empty state when no todos', () => {
    render(<TodoList todos={[]} onToggle={noop} onUpdate={noop} onDelete={noop} />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders todos when provided', () => {
    render(<TodoList todos={mockTodos} onToggle={noop} onUpdate={noop} onDelete={noop} />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
  });

  it('shows pending and completed sections', () => {
    render(<TodoList todos={mockTodos} onToggle={noop} onUpdate={noop} onDelete={noop} />);
    expect(screen.getByText(/pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/completadas/i)).toBeInTheDocument();
  });

  it('renders todo titles', () => {
    render(<TodoList todos={mockTodos} onToggle={noop} onUpdate={noop} onDelete={noop} />);
    expect(screen.getByText('Pending Task')).toBeInTheDocument();
    expect(screen.getByText('Done Task')).toBeInTheDocument();
  });
});

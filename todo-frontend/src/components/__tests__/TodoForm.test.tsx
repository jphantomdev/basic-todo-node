import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../TodoForm';

describe('TodoForm', () => {
  it('renders the form inputs', () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('input-description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  it('submit button is disabled when title is empty', () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    const btn = screen.getByRole('button', { name: /agregar/i });
    expect(btn).toBeDisabled();
  });

  it('enables submit when title has value', async () => {
    render(<TodoForm onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByTestId('input-title'), 'My Task');
    expect(screen.getByRole('button', { name: /agregar/i })).toBeEnabled();
  });

  it('calls onSubmit with correct data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TodoForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByTestId('input-title'), 'Test Todo');
    await userEvent.type(screen.getByTestId('input-description'), 'Some desc');
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Test Todo',
        description: 'Some desc',
      });
    });
  });

  it('clears inputs after successful submit', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TodoForm onSubmit={onSubmit} />);

    const titleInput = screen.getByTestId('input-title') as HTMLInputElement;
    await userEvent.type(titleInput, 'Task');
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    });
  });
});

import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo, toggleTodo, clearError } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>✅ Todo App</h1>
        <p className="subtitle">Simple. Rápido. Sin base de datos.</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner" role="alert" data-testid="error-banner">
            <span>{error}</span>
            <button onClick={clearError} className="btn-close-error">×</button>
          </div>
        )}

        <section className="form-section">
          <TodoForm onSubmit={createTodo} />
        </section>

        <section className="list-section">
          {loading ? (
            <div className="loading" data-testid="loading">Cargando tareas…</div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

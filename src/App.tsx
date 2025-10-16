import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todoWithoutId: Omit<Todo, 'id'>) => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...todoWithoutId,
        id: maxId + 1,
      },
    ]);
  };

  const aggregatedTodos = createTodoAggregates(todos, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={handleAddTodo} />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};

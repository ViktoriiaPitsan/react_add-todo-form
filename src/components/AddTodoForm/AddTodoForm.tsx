import { ChangeEvent, FormEvent, useState } from 'react';
import { Nullable } from '../../domain/Nullable';
import users from '../../api/users';
import { Todo } from '../../domain/Todo';

type AddTodoFormProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
};

export const AddTodoForm = ({ onSubmit }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerIdError, setOwnerIdError] = useState<Nullable<string>>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);
    setTitle(event.target.value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOwnerIdError(null);
    setOwnerId(+event.target.value);
  };

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);

    setOwnerId(0);
    setOwnerIdError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerIdError(null);

    const normalizedTitle = title.trim();
    let hasError = false;

    if (!normalizedTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (ownerId === 0) {
      setOwnerIdError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSubmit({
      title: normalizedTitle,
      completed: false,
      userId: ownerId,
    });

    handleResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={ownerId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {ownerIdError && <span className="error">{ownerIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

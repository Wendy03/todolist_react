import PropTypes from 'prop-types';
const TodoList = ({
  todos,
  filteredTodos,
  toggleTodo,
  delTodo,
  delAllTodo,
}) => {
  return (
    <div className="todoList_items">
      <ul className="todoList_item">
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <label className="todoList_label">
                <input
                  className="todoList_input"
                  type="checkbox"
                  value={todo.status}
                  checked={todo.status}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.content}</span>
              </label>
              <a href="#" onClick={(e) => delTodo(e, todo.id)}>
                <i className="fa fa-times"></i>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="todoList_statistics">
        <p>{todos.filter((todo) => !todo.status).length}個待完成項目</p>
        <a href="#" onClick={delAllTodo}>
          清除已完成項目
        </a>
      </div>
    </div>
  );
};
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  filteredTodos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  delAllTodo: PropTypes.func.isRequired,
};

export default TodoList;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyImg from '../assets/images/empty.png';
import TodoList from '../components/TodoList';
const { VITE_API } = import.meta.env;
const Todo = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');

  const getTodos = async () => {
    try {
      const res = await axios.get(`${VITE_API}/todos`);
      const { data } = res.data;
      setTodos(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = cookieValue;
    axios
      .get(`${VITE_API}/users/checkout`)
      .then((res) => {
        setUserName(res.data.nickname);
      })
      .catch(() => {
        alert('驗證失敗');
      });
    getTodos();
  }, []);
  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === '全部') {
      return true;
    } else if (activeFilter === '待完成') {
      return !todo.status;
    } else {
      return todo.status;
    }
  });
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_API}/todos`, { content });
      setContent('');
      getTodos();
    } catch (err) {
      alert('新增失敗');
    }
  };
  const toggleTodo = async (id) => {
    try {
      await axios.patch(`${VITE_API}/todos/${id}/toggle`);
      getTodos();
    } catch (err) {
      alert('更新失敗');
    }
  };
  const delTodo = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`${VITE_API}/todos/${id}`);
      alert('確認刪除?');
      getTodos();
    } catch (err) {
      alert('刪除失敗');
    }
  };
  const delAllTodo = async (e) => {
    e.preventDefault();
    try {
      const delTargetTodos = todos.filter((todo) => todo.status);
      if (delTargetTodos.length <= 0) {
        alert('沒有已完成項目');
        return;
      }
      for (let i = 0; i < delTargetTodos.length; i++) {
        await axios.delete(`${VITE_API}/todos/${delTargetTodos[i].id}`);
      }
      getTodos();
    } catch (err) {
      alert('刪除失敗');
    }
  };
  const signOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${VITE_API}/users/sign_out`);
      document.cookie = `token='';expires=${new Date()}`;
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
    navigate('/');
  };
  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>{userName}的代辦</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={signOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              value={content}
              onChange={(e) => setContent(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTodo(e);
                }
              }}
            />
            <a href="#" onClick={addTodo}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          {todos.length > 0 ? (
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li>
                  <a
                    href="#"
                    className={activeFilter === '全部' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter('全部');
                    }}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeFilter === '待完成' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter('待完成');
                    }}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={activeFilter === '已完成' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter('已完成');
                    }}
                  >
                    已完成
                  </a>
                </li>
              </ul>
              <TodoList
                todos={todos}
                filteredTodos={filteredTodos}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                delTodo={delTodo}
                delAllTodo={delAllTodo}
              />
            </div>
          ) : (
            <div className="empty">
              <p>目前尚無待辦事項</p>
              <img src={EmptyImg} alt="目前尚無待辦事項" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Todo;

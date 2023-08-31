import { Route, Routes } from 'react-router-dom';
import "./assets/style/App.css";
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Todo from './pages/Todo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginImg from '../assets/images/login.png';
const { VITE_API } = import.meta.env;
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${VITE_API}/users/sign_in`, data);
      const { token, exp } = res.data;
      document.cookie = `token=${token};expires=${new Date(exp * 1000)}`;
      alert('登入成功');
      navigate('/todo');
    } catch (error) {
      alert('帳號或密碼錯誤');
    }
  };

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <img className="d-m-n" src={LoginImg} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', {
                required: { value: true, message: '信箱必填' },
                pattern: { value: /^\S+@\S+$/i, message: 'E-mail格式錯誤' },
              })}
              className="formControls_input"
              type="text"
              id="email"
              placeholder="請輸入 email"
              required
            />
            <span style={{ color: 'red' }}>
              {errors.email && errors.email.message}
            </span>
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              {...register('password', {
                required: { value: true, message: '密碼必填' }
              })}
              className="formControls_input"
              type="password"
              id="pwd"
              placeholder="請輸入密碼"
              required
            />
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="登入"
            />
            <NavLink to="/register" className="formControls_btnLink">
              <p>註冊帳號</p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

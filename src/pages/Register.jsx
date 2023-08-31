import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Signup from '../assets/images/signup.png';
const { VITE_API } = import.meta.env;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      CheckPassword: '',
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.CheckPassword) {
      alert('兩次密碼不一樣');
      return;
    }

    try {
      await axios.post(`${VITE_API}/users/sign_up`, data);
      alert('註冊成功');
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <img className="logoImg" src={Signup} alt="" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">註冊帳號</h2>
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
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              {...register('nickname', {
                required: { value: true, message: '暱稱必填' },
              })}
              className="formControls_input"
              type="text"
              id="name"
              placeholder="請輸入您的暱稱"
            />
            <span style={{ color: 'red' }}>
              {errors.nickname && errors.nickname.message}
            </span>
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              {...register('password', {
                required: { value: true, message: '密碼必填' },
                minLength: { value: 8, message: '密碼不可低於 8 個字元' },
              })}
              className="formControls_input"
              type="password"
              id="pwd"
              placeholder="請輸入密碼"
              required
            />
            <span style={{ color: 'red' }}>
              {errors.password && errors.password.message}
            </span>
            <label className="formControls_label" htmlFor="pwd">
              再次輸入密碼
            </label>
            <input
              {...register('CheckPassword', {
                required: { value: true, message: '確認密碼必填' },
                minLength: { value: 8, message: '確認密碼不可低於 8 個字元' },
              })}
              className="formControls_input"
              type="password"
              id="check_pwd"
              placeholder="請再次輸入密碼"
              required
            />
            <span style={{ color: 'red' }}>
              {errors.CheckPassword && errors.CheckPassword.message}
            </span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="註冊帳號"
            />
            <NavLink to="/" className="formControls_btnLink">
              <p>登入</p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

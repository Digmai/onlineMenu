import React, { useState, useCallback, useEffect } from "react";
import { login } from "../slices/user";
import { RootState, useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./../scss/login-page.scss";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => !state.user.user);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(login(formValues.email, formValues.password));
    },
    [dispatch, formValues.email, formValues.password]
  );

  useEffect(() => {
    if (error) history("/");
  }, [error, history]);

  return (
    <div className="login">
      <h1>Авторизация</h1>
      {error && <div className="error__masseges">{error}</div>}

      <form className="login__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            className="login__form-input"
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            className="login__form-input"
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
          />
        </div>
        <button className="login__form-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

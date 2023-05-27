import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/user";
import { RootState, useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import "./../scss/login-page.scss";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = useCallback(
    async (values: any) => {
      setLoading(true);
      await dispatch(login(values.username, values.password));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!error) {
      history("/");
    }
  }, [error, history]);

  return (
    <div className="login-page">
      <Title className="login-page__header" level={2}>
        Авторизация
      </Title>
      {error && <div className="login-page__error">{error}</div>}
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              type: "string",
              message: "Введите корректный username",
            },
          ]}
        >
          <Input autoFocus disabled={loading} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          className="login__password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password disabled={loading} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

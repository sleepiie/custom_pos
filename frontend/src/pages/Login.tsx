import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Login, Register } from "../../wailsjs/go/main/App";

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setError("");
    if (isRegister) {
      if (values.password !== values.confirmpassword) {
        setError("Passwords do not match!");
        return;
      }
      Register(values.username, values.password)
        .then(() => setIsRegister(false))
        .catch((err) => setError(err.message));
      form.resetFields();
    } else {
      Login(values.username, values.password)
        .then((username) => {
          if (username) {
            onLogin();
          }
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

      <Form form={form} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        {isRegister && (
          <Form.Item
            name="confirmpassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        )}

        {!isRegister && (
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isRegister ? "Register" : "Login"}
          </Button>
          <Button type="link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

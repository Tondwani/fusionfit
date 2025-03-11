import { Form, Input, Button } from "antd";
import { useTrainerActions } from "@/providers/TrainerProvider";


const TrainerLogin = () => {
  const { loginTrainer } = useTrainerActions();

  const onFinish = (values) => {
    loginTrainer(values.email, values.password);
  };

  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  );
};

export default TrainerLogin;

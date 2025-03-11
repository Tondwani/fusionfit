import { Form, Input, Button } from "antd";
import { useTrainerActions } from "@/providers/TrainerProvider";


const TrainerRegister = () => {
  const { registerTrainer } = useTrainerActions();

  const onFinish = (values) => {
    registerTrainer({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: "",
      contactNumber: "",
      PlanType: "",
      activeState: false,
      trial: false,
      policiesAccepted: false
    });
  };

  return (
    <Form name="register" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords do not match!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TrainerRegister;
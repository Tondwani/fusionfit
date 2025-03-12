import { Form, Input, Button, Switch, Alert, Select } from "antd";
import { useAuthActions } from "@/providers/TrainerProvider";
import { useState } from "react";

import PolicySection from "@/components/policy";

const TrainerRegister = () => {
  const { registerTrainer } = useAuthActions();
  const [hasReadPolicies, setHasReadPolicies] = useState(false);

  const onFinish = async (values) => {
    if (!hasReadPolicies) {
      return;
    }
    
    registerTrainer({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role || "trainer", 
      contactNumber: values.contactNumber || "",
      planType: values.planType,
      activeState: false,
      trial: false,
      policiesAccepted: hasReadPolicies,
      birthDate: "values.birthDate || new Date().toISOString().split('T')[0]"
    });
    
  };

  return (
    <div>
      <PolicySection />
      
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
        <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select>
          <Select.Option value="trainer">Trainer</Select.Option>
          <Select.Option value="specialist">Specialist</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="contactNumber"
        rules={[
          { required: true, message: "Please enter your contact number" },
          { pattern: /^\+?[\d\s-]{10,}$/, message: "Please enter a valid phone number" }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Plan Type"
        name="planType"
        rules={[{ required: true, message: "Please select a plan type" }]}
      >
        <Select>
          <Select.Option value="basic">Basic</Select.Option>
          <Select.Option value="premium">Premium</Select.Option>
          <Select.Option value="pro">Pro</Select.Option>
        </Select>
      </Form.Item>

        <Form.Item
          name="policiesAccepted"
          valuePropName="checked"
        >
          <Switch
            checked={hasReadPolicies}
            onChange={setHasReadPolicies}
            checkedChildren="Policies Accepted"
            unCheckedChildren="Accept Policies"
          />
        </Form.Item>

        {!hasReadPolicies && (
          <Alert
            message="Please read and accept the policies to continue"
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!hasReadPolicies}> 
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TrainerRegister;
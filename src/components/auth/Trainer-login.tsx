import { Form, Input, Button, message, Spin } from "antd";
import { useAuthActions } from "@/providers/TrainerProvider";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TrainerLogin = () => {
  const { loginTrainer } = useAuthActions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      await loginTrainer({
        email: values.email,
        password: values.password
      });
      
      message.success("Login successful!");
      
      // timeout to ensure state updates before navigation
      setTimeout(() => {
        router.push('/TrainerMenu');
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      
      // More informative error message using server response if available
      message.error(
        error.response?.data?.message || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Trainer Login</h2>
      
      <Form 
        name="login" 
        onFinish={onFinish} 
        layout="vertical"
        disabled={loading}
      >
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item 
          label="Password" 
          name="password" 
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            style={{ width: '100%' }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
      
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin tip="Authenticating..." />
        </div>
      )}
    </div>
  );
};

export default TrainerLogin;
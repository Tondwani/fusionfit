import { useClientActions, useClientState } from "@/providers/ClientMangementProvder";
import { Form, Input, Button, Typography, message } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IClientLoginPayload } from "@/providers/ClientMangementProvder/context";

const { Title } = Typography;

const LoginForm = () => {
    const { loginClient } = useClientActions();
    const { isPending, isSuccess, isError } = useClientState();
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            message.success("Login successful!");
            router.push("/ClientMenu"); // Redirect after successful login
        } else if (isError) {
            message.error("Login failed. Please try again.");
        }
    }, [isSuccess, isError, router]);

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const loginPayload: IClientLoginPayload = {
                email: values.email,
                password: values.password
            };
            
            await loginClient(loginPayload);
            // The useEffect will handle redirection on success
        } catch (error) {
            console.error("Login error:", error);
            // The useEffect will handle error message
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: "2rem", textAlign: "center" }}>
            <Title level={2}>Client Login</Title>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email!" },
                        { type: "email", message: "Please enter a valid email!" }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isPending} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
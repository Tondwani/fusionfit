import { useClientActions } from "@/providers/ClientMangementProvder";
import { ICreateClientPayload } from "@/providers/ClientMangementProvder/context";
import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { useState } from "react";

const ClientCreateForm: React.FC = () => {
  const { createClient } = useClientActions();
  const [formData, setFormData] = useState<ICreateClientPayload>({
    fullName: "",
    email: "",
    contactNumber: "",
    sex: "",
    birthDate: "",
    trialerId: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Handle form field changes to update formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle select field changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      formData.fullName && 
      formData.email && 
      formData.contactNumber && 
      formData.sex && 
      formData.birthDate && 
      formData.trialerId
    ) {
      setLoading(true);
      try {
        await createClient(formData); 
        message.success("Client created successfully");
        // Reset form after successful creation
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          sex: "",
          birthDate: "",
          trialerId: ""
        });
      } catch (error) {
        message.error("Failed to create client");
        setError("Failed to create client. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill all required fields.");
      message.error("Please fill all required fields.");
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", padding: "2rem" }}>
      <Row justify="center">
        <Col xs={24} sm={24} md={16} lg={12}>
          <Card
            title="Create New Client"
            style={{
              background: "linear-gradient(to right, #8E44AD, #6C5CE7)",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            headStyle={{ color: "white", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          >
            <Form onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label={<span style={{ color: "white" }}>Full Name</span>}
                name="fullName"
                rules={[{ required: true, message: "Please input the client's full name!" }]}
              >
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "white" }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please input client's email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Contact Number</span>}
                    name="contactNumber"
                    rules={[{ required: true, message: "Please input contact number!" }]}
                  >
                    <Input
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Sex</span>}
                    name="sex"
                    rules={[{ required: true, message: "Please select sex!" }]}
                  >
                    <Select 
                      placeholder="Select sex"
                      onChange={(value) => handleSelectChange("sex", value)}
                      value={formData.sex || undefined}
                    >
                      <select value="male">Male</select>
                      <select value="female">Female</select>
                      <select value="other">Other</select>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Birth Date</span>}
                    name="birthDate"
                    rules={[{ required: true, message: "Please input birth date!" }]}
                  >
                    <Input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ color: "white" }}>Trainer ID</span>}
                    name="trialerId"
                    rules={[{ required: true, message: "Please input trainer ID!" }]}
                  >
                    <Input
                      name="trialerId"
                      value={formData.trialerId}
                      onChange={handleChange}
                      placeholder="Enter trainer ID"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {error && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                  {error}
                </div>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{
                    backgroundColor: "#6C5CE7",
                    borderColor: "#6C5CE7",
                    height: "40px",
                    fontSize: "16px",
                    marginTop: "10px"
                  }}
                >
                  Create Client
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ClientCreateForm;
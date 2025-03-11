import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PolicySection = () => {
  return (
    <Card style={{ marginBottom: 3 }}>
      <Title level={4}>Terms and Policies</Title>
      
      <Title level={5}>1. Data Privacy Policy</Title>
      <Paragraph>
        We are committed to protecting your personal information and will only use it for service-related purposes.
      </Paragraph>

      <Title level={5}>2. Service Agreement</Title>
      <Paragraph>
        By registering, you agree to provide professional fitness services according to industry standards and best practices.
      </Paragraph>

      <Title level={5}>3. Code of Conduct</Title>
      <Paragraph>
        You must maintain professional behavior, respect client privacy, and adhere to ethical training practices.
      </Paragraph>

      <Title level={5}>4. Payment Terms</Title>
      <Paragraph>
        All financial transactions will be processed securely, with fees deducted as per the selected plan type.
      </Paragraph>

      <Title level={5}>5. Cancellation Policy</Title>
      <Paragraph>
        A 30-day notice is required for service cancellation. All outstanding sessions must be completed or transferred.
      </Paragraph>
    </Card>
  );
};

export default PolicySection;
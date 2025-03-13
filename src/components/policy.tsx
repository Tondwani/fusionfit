import { Card, Typography, Collapse } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const PolicySection = () => {
  return (
    <Card 
      style={{ 
        marginBottom: 3, 
        maxHeight: '300px',
        overflow: 'auto'
      }}
      size="small"
    >
      <Title level={4} style={{ fontSize: '18px', marginBottom: '12px' }}>Terms and Policies</Title>
      
      <Collapse bordered={false} defaultActiveKey={['1']} ghost>
        <Panel header={<Title level={5} style={{ fontSize: '14px', margin: 0 }}>1. Data Privacy Policy</Title>} key="1">
          <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
            We are committed to protecting your personal information and will only use it for service-related purposes.
          </Paragraph>
        </Panel>
        
        <Panel header={<Title level={5} style={{ fontSize: '14px', margin: 0 }}>2. Service Agreement</Title>} key="2">
          <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
            By registering, you agree to provide professional fitness services according to industry standards and best practices.
          </Paragraph>
        </Panel>
        
        <Panel header={<Title level={5} style={{ fontSize: '14px', margin: 0 }}>3. Code of Conduct</Title>} key="3">
          <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
            You must maintain professional behavior, respect client privacy, and adhere to ethical training practices.
          </Paragraph>
        </Panel>
        
        <Panel header={<Title level={5} style={{ fontSize: '14px', margin: 0 }}>4. Payment Terms</Title>} key="4">
          <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
            All financial transactions will be processed securely, with fees deducted as per the selected plan type.
          </Paragraph>
        </Panel>
        
        <Panel header={<Title level={5} style={{ fontSize: '14px', margin: 0 }}>5. Cancellation Policy</Title>} key="5">
          <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
            A 30-day notice is required for service cancellation. All outstanding sessions must be completed or transferred.
          </Paragraph>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default PolicySection;
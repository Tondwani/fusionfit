'use client';

import { Layout, Typography, Card } from 'antd';
import styles from './dashboard.module.css';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  return (
    <Layout className={styles.dashboardLayout}>
      <Header className={styles.dashboardHeader}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Fusion Gym
        </Title>
      </Header>
      
      <Content className={styles.dashboardContent}>
        <Title level={3} className={styles.welcomeText}>
          Welcome Back!
        </Title>
        <Card className={styles.mainCard}>
          <Title level={4}>Your Fitness Journey Starts Here</Title>
        </Card>
      </Content>
    </Layout>
  );
}

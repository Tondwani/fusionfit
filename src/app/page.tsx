'use client';

import { Layout, Typography, Button, Tabs, Space } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Fusion Gym
        </Title>
      </Header>

      <Content className={styles.content}>
        <div className={styles.heroSection}>
          <Title level={1}>Why Join Us?</Title>
          <Paragraph className={styles.heroParagraph}>
            Transform your life with state-of-the-art equipment, expert trainers, 
            and a supportive community. At Fusion Gym, we&apos;re committed to helping 
            you achieve your fitness goals.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            onClick={() => router.push('/dashboard')}
            className={styles.joinButton}
          >
            Join Now
          </Button>
        </div>

        <Tabs 
          defaultActiveKey="1" 
          items={[
            {
              key: '1',
              label: '',
              children: (
                <div className={styles.aboutSection}>
                  <Paragraph>
                    Fusion Gym is more than just a fitness center - it&apos;s a community 
                    dedicated to helping you become the best version of yourself. 
                    With our innovative approach to fitness and wellness, we combine 
                    traditional training methods with modern techniques to create a 
                    unique and effective workout experience.
                  </Paragraph>
                </div>
              ),
            }
          ]} 
        />
      </Content>

      <Footer className={styles.footer}>
        <Space direction="vertical" align="center">
          <Typography.Text>© {new Date().getFullYear()} Fusion Gym</Typography.Text>
          <Typography.Text>&ldquo;Strength doesn&apos;t come from what you can do. It comes from overcoming the things you once thought you couldn&apos;t.&rdquo;</Typography.Text>
        </Space>
      </Footer>
    </Layout>
  );
}
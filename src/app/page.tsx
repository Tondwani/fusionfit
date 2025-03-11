'use client';


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

            className={styles.joinButton}
          >
            Join Now
          </Button>

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
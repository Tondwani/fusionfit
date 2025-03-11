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

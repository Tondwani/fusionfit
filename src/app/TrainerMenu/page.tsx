'use client';

import React, { useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, List, Avatar, Spin } from 'antd';
import { UserOutlined, TeamOutlined, FileOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthState, useAuthActions } from '../../providers/TrainerProvider';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const TrainerDashboard: React.FC = () => {
  const { currentUser, isPending } = useAuthState();
  const { getCurrentUser, logout } = useAuthActions();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const trainerFeatures = [
    {
      title: 'Manage Clients',
      description: 'Create and manage client profiles',
      icon: <TeamOutlined style={{ fontSize: 24 }} />,
      path: '/clients'
    },
    {
      title: 'Meal Plans',
      description: 'Create and assign meal plans to clients',
      icon: <FileOutlined style={{ fontSize: 24 }} />,
      path: '/meal-plans'
    },
    {
      title: 'Food Items',
      description: 'Create and manage food items for meal plans',
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      path: '/food-items'
    }
  ];

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="light">
        <div style={{ height: 64, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Title level={4}>Nutrition App</Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['features']}
          style={{ height: '100%' }}
        >
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.SubMenu key="features" title="Features" icon={<AppstoreOutlined />}>
            <Menu.Item key="clients" icon={<TeamOutlined />}>
              Manage Clients
            </Menu.Item>
            <Menu.Item key="mealplans" icon={<FileOutlined />}>
              Meal Plans
            </Menu.Item>
            <Menu.Item key="fooditems" icon={<AppstoreOutlined />}>
              Food Items
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => logout()}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
            {currentUser && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} />
                <Text strong style={{ marginLeft: 8 }}>
                  {currentUser.name} (Trainer)
                </Text>
              </div>
            )}
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Title level={3}>Trainer Dashboard</Title>
            <Text>Welcome back, {currentUser?.name || 'Trainer'}! Here's what you can do:</Text>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {trainerFeatures.map((feature, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card 
                    hoverable
                    actions={[<a key="go">Go to {feature.title}</a>]}
                  >
                    <Card.Meta
                      avatar={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            <div style={{ marginTop: 32 }}>
              <Title level={4}>Trainer Responsibilities</Title>
              <List
                bordered
                dataSource={[
                  'Register and maintain your account',
                  'Create and manage client profiles',
                  'Create custom meal plans for clients',
                  'Add and manage food items for meal plans',
                  'Assign meal plans to specific clients'
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TrainerDashboard;
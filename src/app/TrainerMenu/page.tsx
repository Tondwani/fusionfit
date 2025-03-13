'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, List, Avatar, Spin, message, Alert, Button, Modal } from 'antd';
import { UserOutlined, TeamOutlined, FileOutlined, AppstoreOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuthState, useAuthActions } from '../../providers/TrainerProvider';
import { useRouter } from 'next/navigation';
import ClientCreateForm from '@/components/CreateClient/createClient';
import { ClientProvider } from '@/providers/ClientMangementProvder';
import {} from '@/components/FoodItems/CreateFood';
import {} from '@/components/FoodItems/FoodCatergory';
import {} from '@/components/FoodItems/foodItemsList';
import {} from '@/components/FoodItems/SearchFood';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const TrainerDashboard: React.FC = () => {
  const { currentUser, isPending } = useAuthState();
  const { getCurrentUser, logout } = useAuthActions();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showClientForm, setShowClientForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Check if we have a token first
        const hasToken = localStorage.getItem("auth_token");
        if (!hasToken) {
          throw new Error("No authentication token");
        }
        
        // Try to get user data
        try {
          await getCurrentUser();
        } catch (error) {
          console.warn("Could not fetch user details, using minimal profile");
          // getCurrentUser fails but if it has a token, can show a minimal dashboard
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Authentication check failed:", error);
        message.error("Please log in to access the dashboard");
        router.push('/login');
      }
    };
    
    checkAuth();
  }, []);

  // checking auth status or explicitly loading, show spinner
  if (loading || isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  //  handle missing user data
  if (!currentUser) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: 24 }}>
          <Alert
            message="Limited Access Mode"
            description="We're having trouble loading your complete profile data, but you can still access the dashboard with limited functionality."
            type="warning"
            showIcon
          />
          {/* Show minimal dashboard */}
          <div style={{ marginTop: 24 }}>
            <Title level={3}>Trainer Dashboard</Title>
            <Text>Welcome to the Nutrition App. You're in limited access mode.</Text>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col xs={24}>
                <Card>
                  <Card.Meta
                    title="Limited Functionality"
                    description="Some features may be unavailable until we can load your complete profile."
                  />
                </Card>
              </Col>
            </Row>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={() => router.push('/login')}>
                Return to Login
              </Button>
              <Button onClick={() => location.reload()}>
                Retry Loading Profile
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }

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
      title: 'Food Item Management',
      description: 'Create and manage food items for meal plans',
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      path: '/food-management'
    }
  ];

  const handleMenuClick = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    message.success("You have been logged out");
    router.push('/app/page');
  };

  const openClientForm = () => {
    setShowClientForm(true);
  };

  const closeClientForm = () => {
    setShowClientForm(false);
  };

  return (
    <ClientProvider>
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
              <Menu.Item key="clients" icon={<TeamOutlined />} onClick={() => handleMenuClick('/clients')}>
                Manage Clients
              </Menu.Item>
              <Menu.Item key="mealplans" icon={<FileOutlined />} onClick={() => handleMenuClick('/meal-plans')}>
                Meal Plans
              </Menu.Item>
              <Menu.Item key="fooditems" icon={<AppstoreOutlined />} onClick={() => handleMenuClick('/food-items')}>
                Food Items
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: '0 16px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
              <div>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={openClientForm}
                >
                  Add New Client
                </Button>
              </div>
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
                      onClick={() => handleMenuClick(feature.path)}
                      actions={[
                        <a key="go" onClick={(e) => {
                          e.stopPropagation();
                          handleMenuClick(feature.path);
                        }}>
                          Go to {feature.title}
                        </a>
                      ]}
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

      {/* Client Creation Modal */}
      <Modal
        title="Create New Client"
        open={showClientForm}
        onCancel={closeClientForm}
        footer={null}
        width={800}
        bodyStyle={{ padding: 0 }}
      >
        <ClientCreateForm />
      </Modal>
    </ClientProvider>
  );
};

export default TrainerDashboard;
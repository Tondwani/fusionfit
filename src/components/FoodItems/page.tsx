'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Form, Input, Button, Select, InputNumber, Card, Row, Col, 
         message, Divider, Spin, Empty, List, Tag, Statistic, Table } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useFoodItemActions, useFoodItemState } from '@/providers/FoodItemProvider';
import { IFoodItem, ICreateFoodItemPayload } from '@/providers/FoodItemProvider/context';
import { FOOD_CATEGORIES } from '@/providers/FoodItemProvider/reducer';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;

// Helper functions for category display
const getCategoryLabel = (category: string) => {
  switch (category.toLowerCase()) {
    case 'veg': return 'Vegetables';
    case 'meat': return 'Meat & Poultry';
    case 'dairy': return 'Dairy Products';
    case 'fruit': return 'Fruits';
    case 'bnl': return 'Beans & Legumes';
    case 'grains': return 'Grains & Cereals';
    default: return category;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'veg': return 'green';
    case 'meat': return 'red';
    case 'dairy': return 'cyan';
    case 'fruit': return 'orange';
    case 'bnl': return 'brown';
    case 'grains': return 'gold';
    default: return 'geekblue';
  }
};

// Create Food Item Component
const CreateFoodItem: React.FC = () => {
  const { createFoodItem } = useFoodItemActions();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ICreateFoodItemPayload) => {
    setLoading(true);
    try {
      await createFoodItem(values);
      message.success(`${values.name} has been added successfully!`);
      form.resetFields();
    } catch (error) {
      console.error('Error creating food item:', error);
      message.error('Failed to create food item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Food Item</h2>
      <Card>
        <Form
          form={form}
          name="createFoodItem"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            servingSize: 100,
            protein: 0,
            carbs: 0,
            sugar: 0,
            fat: 0,
            fiber: 0,
            sodium: 0,
            potassium: 0,
            cholesterol: 0,
            energy: 0
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Food Name"
                rules={[{ required: true, message: 'Please enter the food name' }]}
              >
                <Input placeholder="Enter food name (e.g., Lettuce, Chicken Breast)" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select a category">
                  {FOOD_CATEGORIES.map(category => (
                    <Option key={category} value={category}>
                      {getCategoryLabel(category)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="servingSize"
                label="Serving Size (g)"
                rules={[{ required: true, message: 'Please enter the serving size' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="energy"
                label="Energy (kcal)"
                rules={[{ required: true, message: 'Please enter the energy value' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Macronutrients</Divider>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="protein"
                label="Protein (g)"
                rules={[{ required: true, message: 'Please enter the protein content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="carbs"
                label="Carbohydrates (g)"
                rules={[{ required: true, message: 'Please enter the carbs content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="fat"
                label="Fat (g)"
                rules={[{ required: true, message: 'Please enter the fat content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="sugar"
                label="Sugar (g)"
                rules={[{ required: true, message: 'Please enter the sugar content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="fiber"
                label="Fiber (g)"
                rules={[{ required: true, message: 'Please enter the fiber content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="cholesterol"
                label="Cholesterol (mg)"
                rules={[{ required: true, message: 'Please enter the cholesterol content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="sodium"
                label="Sodium (mg)"
                rules={[{ required: true, message: 'Please enter the sodium content' }]}
              >
                <InputNumber min={0} precision={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="potassium"
            label="Potassium (mg)"
            rules={[{ required: true, message: 'Please enter the potassium content' }]}
          >
            <InputNumber min={0} precision={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ minWidth: '120px' }}>
              Create Food Item
            </Button>
            <Button 
              style={{ marginLeft: '10px' }} 
              onClick={() => form.resetFields()}
              disabled={loading}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// Food Items By Category Component
const FoodItemsByCategory: React.FC = () => {
  const { getFoodItemsByCategory } = useFoodItemActions();
  const { foodItems, isPending, isError } = useFoodItemState();
  const [selectedCategory, setSelectedCategory] = useState<string>('veg');
  const [loading, setLoading] = useState(false);

  const fetchFoodByCategory = async (category: string) => {
    setLoading(true);
    try {
      await getFoodItemsByCategory(category);
    } catch (error) {
      console.error(`Error fetching ${category} food items:`, error);
      message.error(`Failed to load ${category} food items. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFoodByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const refreshCategory = () => {
    if (selectedCategory) {
      fetchFoodByCategory(selectedCategory);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <h3 style={{ marginBottom: '8px' }}>Select Category:</h3>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: '100%' }}
              disabled={loading || isPending}
            >
              {FOOD_CATEGORIES.map(category => (
                <Option key={category} value={category}>
                  {getCategoryLabel(category)}
                </Option>
              ))}
            </Select>
          </Col>
          <Col 
            xs={24} 
            sm={12} 
            md={4} 
            lg={4} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              marginTop: '16px' 
            }}
          >
            <Button 
              icon={<ReloadOutlined />} 
              onClick={refreshCategory}
              loading={loading || isPending}
              style={{ marginBottom: '1px' }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
      </div>

      {(loading || isPending) ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" tip={`Loading ${getCategoryLabel(selectedCategory)}...`} />
        </div>
      ) : isError ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Failed to load food items. Please try again.</p>
          <Button type="primary" onClick={refreshCategory}>Retry</Button>
        </div>
      ) : !foodItems || foodItems.length === 0 ? (
        <Empty description={`No food items found in ${getCategoryLabel(selectedCategory)}`} />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
          dataSource={foodItems}
          renderItem={(item: IFoodItem) => (
            <List.Item>
              <Card
                title={item.name}
                headStyle={{ background: getCategoryColor(item.category) + '22', borderBottom: `2px solid ${getCategoryColor(item.category)}` }}
                hoverable
              >
                <div style={{ marginBottom: '8px' }}>
                  <Tag color={getCategoryColor(item.category)}>{getCategoryLabel(item.category)}</Tag>
                </div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic title="Serving" value={item.servingSize} suffix="g" />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Energy" value={item.energy} suffix="kcal" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Protein" value={item.protein} suffix="g" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Carbs" value={item.carbs} suffix="g" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Fat" value={item.fat} suffix="g" />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

// Search Food Items Component
const SearchFoodItems: React.FC = () => {
  const { getFoodItems } = useFoodItemActions();
  const { foodItems, isPending } = useFoodItemState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IFoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!foodItems || foodItems.length === 0) {
        setLoading(true);
        try {
          await getFoodItems();
        } catch (error) {
          console.error('Error fetching food items:', error);
          message.error('Failed to load food items. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearched(true);
    
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    //  API doesn't have a search endpoint, we'll filter locally
    if (foodItems && foodItems.length > 0) {
      const filteredResults = foodItems.filter(
        item => item.name.toLowerCase().includes(value.toLowerCase()) ||
               item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const columns: ColumnsType<IFoodItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        let color = getCategoryColor(category);
        return <Tag color={color}>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Serving Size',
      dataIndex: 'servingSize',
      key: 'servingSize',
      render: (size) => `${size}g`,
    },
    {
      title: 'Protein',
      dataIndex: 'protein',
      key: 'protein',
      render: (protein) => `${protein}g`,
    },
    {
      title: 'Carbs',
      dataIndex: 'carbs',
      key: 'carbs',
      render: (carbs) => `${carbs}g`,
    },
    {
      title: 'Fat',
      dataIndex: 'fat',
      key: 'fat',
      render: (fat) => `${fat}g`,
    },
    {
      title: 'Energy',
      dataIndex: 'energy',
      key: 'energy',
      render: (energy) => `${energy} kcal`,
    },
  ];

  if (loading || isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spin size="large" tip="Loading food items..." />
      </div>
    );
  }

  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <h2>Search Food Items</h2>
        <p>
          Search for food items by name or category.
        </p>
        <Search
          placeholder="Enter food name or category..."
          enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
          size="large"
          onSearch={handleSearch}
          style={{ maxWidth: '600px' }}
          loading={loading}
        />
      </Card>

      {searched && searchTerm && (
        <div style={{ marginBottom: '16px' }}>
          <h3>
            Search Results for "{searchTerm}" 
            <span style={{ color: '#8c8c8c', marginLeft: '10px', fontSize: '0.9em' }}>
              {searchResults.length} items found
            </span>
          </h3>
        </div>
      )}

      {searched && (
        searchResults.length === 0 ? (
          <Empty 
            description={
              searchTerm ? 
                `No food items matching "${searchTerm}" were found` : 
                "Please enter a search term"
            } 
          />
        ) : (
          <Table 
            columns={columns} 
            dataSource={searchResults.map(item => ({ ...item, key: item.id }))} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        )
      )}
    </div>
  );
};

// Main Food Management Component
const FoodItems: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Food Management</Title>
      <Tabs defaultActiveKey="browse" size="large">
        <TabPane tab="Browse Foods" key="browse">
          <FoodItemsByCategory />
        </TabPane>
        <TabPane tab="Search Foods" key="search">
          <SearchFoodItems />
        </TabPane>
        <TabPane tab="Add New Food" key="create">
          <CreateFoodItem />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FoodItems;

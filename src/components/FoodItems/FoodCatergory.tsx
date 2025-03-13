import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Spin, Empty, List, Tag, Statistic, Button, message } from 'antd';
import { useFoodItemActions, useFoodItemState } from '@/providers/FoodItemProvider';
import { IFoodItem } from '@/providers/FoodItemProvider/context';
import { FOOD_CATEGORIES } from '@/providers/FoodItemProvider/reducer';
import { ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

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

export default FoodItemsByCategory;
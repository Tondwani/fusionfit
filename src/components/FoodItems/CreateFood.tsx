import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Card, Row, Col, message, Divider } from 'antd';
import { useFoodItemActions } from '@/providers/FoodItemProvider';
import { ICreateFoodItemPayload } from '@/providers/FoodItemProvider/context';
import { FOOD_CATEGORIES } from '@/providers/FoodItemProvider/reducer';

const { Option } = Select;

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

export default CreateFoodItem;
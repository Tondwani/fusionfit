import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, Empty, Button, message } from 'antd';
import { useFoodItemActions, useFoodItemState } from '@/providers/FoodItemProvider';
import { ColumnsType } from 'antd/es/table';
import { IFoodItem } from '@/providers/FoodItemProvider/context';
import { ReloadOutlined } from '@ant-design/icons';

const FoodItemsList: React.FC = () => {
  const { getFoodItems } = useFoodItemActions();
  const { foodItems, isPending, isError } = useFoodItemState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      await getFoodItems();
    } catch (error) {
      console.error('Error fetching food items:', error);
      message.error('Failed to load food items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        let color = 'geekblue';
        switch (category.toLowerCase()) {
          case 'veg':
            color = 'green';
            break;
          case 'meat':
            color = 'red';
            break;
          case 'dairy':
            color = 'cyan';
            break;
          case 'fruit':
            color = 'orange';
            break;
          case 'bnl':
            color = 'brown';
            break;
          case 'grains':
            color = 'gold';
            break;
          default:
            color = 'geekblue';
        }
        return <Tag color={color}>{category.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Vegetables', value: 'veg' },
        { text: 'Meat', value: 'meat' },
        { text: 'Dairy', value: 'dairy' },
        { text: 'Fruit', value: 'fruit' },
        { text: 'Beans & Legumes', value: 'bnl' },
        { text: 'Grains', value: 'grains' },
      ],
      onFilter: (value, record) => record.category.toLowerCase() === value,
    },
    {
      title: 'Serving Size',
      dataIndex: 'servingSize',
      key: 'servingSize',
      render: (size) => `${size}g`,
      sorter: (a, b) => a.servingSize - b.servingSize,
    },
    {
      title: 'Protein',
      dataIndex: 'protein',
      key: 'protein',
      render: (protein) => `${protein}g`,
      sorter: (a, b) => a.protein - b.protein,
    },
    {
      title: 'Carbs',
      dataIndex: 'carbs',
      key: 'carbs',
      render: (carbs) => `${carbs}g`,
      sorter: (a, b) => a.carbs - b.carbs,
    },
    {
      title: 'Fat',
      dataIndex: 'fat',
      key: 'fat',
      render: (fat) => `${fat}g`,
      sorter: (a, b) => a.fat - b.fat,
    },
    {
      title: 'Energy',
      dataIndex: 'energy',
      key: 'energy',
      render: (energy) => `${energy} kcal`,
      sorter: (a, b) => a.energy - b.energy,
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
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>All Food Items</h2>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={fetchData}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      {isError ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Failed to load food items. Please try again.</p>
          <Button type="primary" onClick={fetchData}>Retry</Button>
        </div>
      ) : !foodItems || foodItems.length === 0 ? (
        <Empty description="No food items found" />
      ) : (
        <Table 
          columns={columns} 
          dataSource={foodItems.map(item => ({ ...item, key: item.id }))} 
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      )}
    </div>
  );
};

export default FoodItemsList;
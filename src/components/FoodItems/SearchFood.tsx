import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Tag, Card, Empty, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFoodItemActions, useFoodItemState } from '@/providers/FoodItemProvider';
import { IFoodItem } from '@/providers/FoodItemProvider/context';
import { ColumnsType } from 'antd/es/table';

const { Search } = Input;

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
        let color = 'geekblue';
        switch (category.toLowerCase()) {
          case 'veg': color = 'green'; break;
          case 'meat': color = 'red'; break;
          case 'dairy': color = 'cyan'; break;
          case 'fruit': color = 'orange'; break;
          case 'bnl': color = 'brown'; break;
          case 'grains': color = 'gold'; break;
          default: color = 'geekblue';
        }
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

export default SearchFoodItems;
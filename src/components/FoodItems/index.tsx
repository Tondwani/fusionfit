export {
  CreateFood,
  FoodCategory,
  FoodItemsList,
  SearchFood
};

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { FoodItemProvider } from '@/providers/FoodItemProvider';
import CreateFood from './CreateFood';
import FoodCategory from './FoodCatergory';
import FoodItemsList from './foodItemsList';
import SearchFood from './SearchFood';

const { TabPane } = Tabs;

const FoodManagement: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <FoodItemProvider>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '24px' }}>Food Item Management</h1>
        
        <Tabs activeKey={activeKey} onChange={handleTabChange}>
          <TabPane tab="All Food Items" key="1">
            <FoodItemsList />
          </TabPane>
          <TabPane tab="Food By Category" key="2">
            <FoodCategory />
          </TabPane>
          <TabPane tab="Search Food" key="3">
            <SearchFood />
          </TabPane>
          <TabPane tab="Create New Food Item" key="4">
            <CreateFood />
          </TabPane>
        </Tabs>
      </div>
    </FoodItemProvider>
  );
};

export default FoodManagement;
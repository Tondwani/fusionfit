'use client';

import { Tabs } from 'antd';
import TrainerRegister from '@/components/auth/Tariner-Reg';
import ClientLogin from '@/components/auth/Client';
import TrainerLogin from '@/components/auth/Trainer-login';
import '@/styles/form.css';



const FormPage = () => {
  return (
      <div className="form-page">
        <div className="form-container">
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                key: '1',
                label: 'Trainer Register',
                children: <TrainerRegister />,
                
              },
              {
                key: '2',
                label: 'Client Login',
                children: <ClientLogin />,
              },
              {
                key: '3',
                label: 'Trainer Login',
                children: <TrainerLogin />,
              },
            ]}
          />
        </div>
      </div>
  );
};

export default FormPage;
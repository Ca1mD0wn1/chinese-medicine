import { Layout } from 'antd';
import React from 'react';
import SiderBar from './menu/SiderBar';
import HeaderIndex from './menu/HeaderIndex';
import ContentIndex from './menu/ContentIndex';
const App: React.FC = () => {

  return (
    <Layout id='admin-app'>

      <SiderBar></SiderBar>
      <Layout className="site-layout">
        <HeaderIndex></HeaderIndex>
        <ContentIndex></ContentIndex>
      </Layout>
    </Layout>
  );
};

export default App;
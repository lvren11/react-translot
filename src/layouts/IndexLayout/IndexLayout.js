import React from 'react';
import { Layout } from 'antd';
import Footer from '@/layouts/Footer';
const { Content } = Layout;
const IndexLayout = props => (
  <React.Fragment>
    <Layout>
      <Content>
        {props.children}
      </Content>
    </Layout>

  </React.Fragment>
);

export default IndexLayout;

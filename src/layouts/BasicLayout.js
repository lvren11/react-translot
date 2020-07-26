import React from 'react';
import { Layout } from 'antd';
import Header from '../components/common/Header/Header';
import Footer from '@/layouts/Footer';
import Hidden from '@material-ui/core/Hidden';
import {connect} from 'dva';
const { Content } = Layout;

@connect(({ user,center }) => ({
  user,center
}))

class BasicLayout extends React.Component{
  render(){
    const {user:{user}} =this.props;
  return(
  <React.Fragment>
    <Layout>
      <div id="primaryLayout">
      <Header />
      <Content>
        {this.props.children}
      </Content>
      <Hidden only={['xl','sm','md','lg']}>
        <Footer userid={user.id} />
      </Hidden>
      </div>
    </Layout>
  </React.Fragment>
);
}
}
export default BasicLayout;

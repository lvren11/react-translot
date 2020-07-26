import React from 'react';
import { Layout,Icon} from 'antd';
import Sliderbar from '../../components/common/Sliderbar/Sliderbar';
import Headerclass from '../../components/common/Header/Header';
import Footer from '@/layouts/Footer';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import './CenterLayout.less';
const { Header, Content } = Layout;

class CenterLayout extends React.Component {
  state = {
    collapsed: false,
    isMobile: false,
  };
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
          collapsed: true,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {isMobile}=this.state;
    return (
      <div id="primaryLayout">
        <Headerclass />
        <Layout style={{marginTop:isMobile?'1rem':'2rem'}}>
          <Sliderbar trigger={null} collapsible collapsed={this.state.collapsed} style={{overflowY: 'auto',marginLeft:isMobile?'1rem':'5rem'}} />
          <Header style={{ background: '#fff', padding: 0 ,height:'32px' }}>
            {isMobile
              ?
              (<div/>)
              :(<Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              />)
            }
          </Header>
          <Content
            style={{
              margin: isMobile?'12px 8px':'24px 16px',
              padding: isMobile?12:24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
        {isMobile ? <Footer />:<div />}

      </div>
    );
  }
}

export default CenterLayout;

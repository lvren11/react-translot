import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  List, Avatar, Icon, Button, Pagination,
} from 'antd';
import './home.less';
import ToTop from '@/components/common/toTop/ToTop';
import Link from 'umi/link';
import money from '@/assets/images/money.png';
import Banner1 from '@/components/common/Banner_pc/Banner1';
import { Banner11DataSource } from '@/components/common/Banner_pc/data.source';
import { enquireScreen } from 'enquire-js';
import Flipcard from '@/components/common/flipcard/flipcard';
import UserAvatar from '@/components/UserAvatar';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

@connect(({ article, loading }) => ({
  article, loading: loading.effects['article/sort_List'],
}))

class Sorttime extends Component {
  state={
    len:50,
    up:false,
    down:true,
    isMobile,
  };
  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'article/sort_List',
      payload:{
        len:this.state.len,
        sortby:'time',
      }
    });
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  };
  changetoup = () =>{
    const { dispatch} = this.props;
    dispatch({
      type: 'article/sort_List',
      payload:{
        len:this.state.len,
        sort:'asc',
        sortby:'time',
      }
    });
    this.setState({
      up: true,
    });
  };
  changetodown = () =>{
    const { dispatch} = this.props;
    dispatch({
      type: 'article/sort_List',
      payload:{
        sortby:'time',
        sort:'desc',
        len:this.state.len,
      }
    });
    this.setState({
      down:true,
    });
  };
  render() {
    const {
      article: { sort_List},
      loading,
    } = this.props;
    const children = [
      <Banner1
        id="Banner1_1"
        key="Banner1_1"
        dataSource={Banner11DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <>
        <div className="templates-wrapper">
          {children}
        </div>
        <div style={{ padding: '1.5rem' }}>
          <Row type="flex" justify="center">
            <Col md={23} sm={20} xs={24}>
              <Row type="flex" justify="space-between">
                <Col lg={15} sm={16} xs={24}>
                  <Card
                    bordered={false}
                    title={"发布时间排序"}
                    extra={<div>
                      <Button type="link" onClick={this.changetoup} ghost>
                        <Icon type="up-circle" style={{fontSize: 20, color: '#ccc',marginRight:'5px'}}/>
                      </Button>
                      <Button type="link" onClick={this.changetodown} ghost>
                        <Icon type="down-circle"style={{fontSize: 20, color: '#ccc'}}/>
                      </Button>
                    </div>}
                    loading={loading}
                  >
                    <List
                      itemLayout="vertical"
                      size="large"
                      dataSource={sort_List}
                      pagination={{
                        pageSize: 5,
                      }}
                      renderItem={item => (
                        <List.Item
                          key={item.id}
                          actions={[
                            <IconText type="like-o" text={item.like_count} key="list-vertical-like-o" />,
                            <IconText type="eye"    text={item.view_count} key="list-vertical-message" />,
                          ]}
                          extra={
                            <div className="money">
                              <img
                                src={money}
                              />{item.price}</div>
                          }
                        >
                          <List.Item.Meta
                            avatar={<UserAvatar size="large" src={item.user && item.user.avatar} />}
                            title={<Link to={`/article/${item.id}`} target="_block">{item.title}</Link>}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col lg={8} sm={0} xs={0}>
                  <Flipcard/>
                </Col>
              </Row>
            </Col>
          </Row>
          <ToTop/>
        </div>
      </>
    );
  }
}

export default Sorttime;

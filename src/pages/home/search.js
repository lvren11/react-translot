import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  List, Avatar, Icon,
} from 'antd';
import './home.less';
import Banner1 from '@/components/common/Banner_pc/Banner1';
import ToTop from '@/components/common/toTop/ToTop';
import Link from 'umi/link';
import money from '@/assets/images/money.png';
import { Banner11DataSource } from '@/components/common/Banner_pc/data.source';
import '../../components/common/Banner_pc/less/antMotionStyle.less';
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

@connect(({ article,  }) => ({
  article,
}))

class Search extends Component {
  state={
    isMobile,
  };
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  };
  render() {
    const {
      article: { search_List},
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
                    title={"搜索的需求"}
                    loading={loading}
                  >
                    <List
                      itemLayout="vertical"
                      size="large"
                      pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 5,
                      }}
                      dataSource={search_List}
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
                            avatar={<UserAvatar size="large" src={item.user.avatar} />}
                            title={<Link to={`/article/${item.id}`} target="_block">{item.title}</Link>}
                            description={item.description}
                          />
                          {item.abstract}
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

export default Search;

import React, { Component } from 'react';
import { Card, Col, Row ,Menu} from 'antd';
import { connect } from 'dva';
import AcceptArticle from './AcceptArticle';
import Clock from '@/components/common/clock/clock';
import DFlipcard from '@/components/common/flipcard/Direct';


@connect(({ accept_user }) => ({
  accept_user
}))
class Direct extends Component {
  state={
    menucurrent:"1",
  }
  componentDidMount() {
    const { dispatch, match: {params: { id } }} = this.props;
    dispatch({
      type: 'accept_user/getaccept',
      payload:{
        uid:id,
      }

    });
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      menucurrent: e.key,
    });
  };
  render() {
    const { accept_user: {accept} }= this.props;
    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <Row type="flex" justify="center">
            <Col md={24} sm={24} xs={24}>
              <Row type="flex" justify="space-around">
                <Col lg={16} sm={16} xs={24}>
                  <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="1">
                      未完成
                    </Menu.Item>
                    <Menu.Item key="2">
                      已完成
                    </Menu.Item>
                  </Menu>
                  <Card
                    bordered={false}
                    title="接受的需求"
                  >
                    {<AcceptArticle
                      data={this.state.menucurrent === "1" ? (accept.filter((item) => {return item.progress <100;})):(accept.filter((item) => {return item.progress ===100;}))}
                    />}
                  </Card>
                </Col>
                <Col lg={6} sm={0} xs={0}>
                  <Clock />
                  <DFlipcard />
                </Col>
              </Row>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Direct;

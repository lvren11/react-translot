import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import SelfArticle from './SelfArticle';
import DFlipcard from '@/components/common/flipcard/Direct';
import Clock from '@/components/common/clock/clock';

@connect(({ user,article, loading }) => ({
  user, article, loading: loading.effects['article/selfarticle'],
}))
class Direct extends Component {
  state={
    len:50,
  }
  componentDidMount() {
    const { dispatch, match: {params: { id } }} = this.props;
      dispatch({
        type: 'article/selfarticle',
        payload: {
          uid: id,
          len: this.state.len,
        }
      });
  }
  render() {

    const { article: {selfarticleList} }= this.props;

    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <Row type="flex" justify="center">
            <Col md={23} sm={24} xs={24}>
              <Row type="flex" justify="space-around">
                <Col lg={15} sm={16} xs={24}>
                  <Card
                    bordered={false}
                    title="个人需求"
                  >
                    {<SelfArticle
                    data={selfarticleList}
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

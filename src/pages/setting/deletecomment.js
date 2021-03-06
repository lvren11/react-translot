import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import Comment_del from './comment_del';


@connect(({ article }) => ({
   article
}))
class Delete extends Component {
  componentDidMount() {
    const { dispatch, match: {params: { id } }} = this.props;
    dispatch({
      type: 'article/selfcomment',
      payload:{
        uid:id,
      }
    });
  }
  render() {

    const { article: {selfcomments} }= this.props;

    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <Row type="flex" justify="center">
            <Col md={24} sm={24} xs={24}>
              <Row type="flex" justify="space-around">
                <Col lg={16} sm={16} xs={24}>
                  <Card
                    bordered={false}
                    title="所有评论"
                  >
                    {<Comment_del
                      data={selfcomments}
                    />}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Delete;

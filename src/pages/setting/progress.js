import React, { Component } from 'react';
import { Card, Col, List, Pagination, Row,Progress, Button,Avatar } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Putprogress from '@/pages/setting/putprogress';
import UserAvatar from '@/components/UserAvatar';

@connect(({ article }) => ({
  article
}))
class Direct extends Component {
  state={
    current:1,
    len:5,
  };
  componentDidMount() {
    const { dispatch, match: {params: { id } }} = this.props;
    dispatch({
      type: 'article/selfarticle',
      payload:{
        uid:id,
        start:0,
        len:this.state.len,
      }
    });
  }

  onChange = pageNumber => {
    const { dispatch,match: {params: { id } }} = this.props;
    this.setState({
      current: pageNumber,
    });
    dispatch({
      type: 'article/selfarticle',
      payload:{
        uid:id,
        start:(pageNumber-1)*this.state.len+1,
        len:this.state.len,
      },
      callback:(res)=>{
        if(res.status === 0){
        }
      }
    });
  };
  render() {

    const { article: {selfarticleList}}= this.props;

    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <Row type="flex" justify="center">
            <Col md={24} sm={24} xs={24}>
              <Row type="flex" justify="space-around">
                <Col lg={16} sm={16} xs={24}>
                  <Card
                    bordered={false}
                    title="个人需求"
                  >
                    <List
                      size="large"
                      dataSource={selfarticleList}
                      renderItem={item => (
                        <List.Item
                          key={item.id}
                          actions={[]}
                          extra={item.accepts.length === 0 ? (<div>尚未有人接受</div>):
                              (item.accepts.map((a) => {
                                {
                                  if(a.progress >0)
                                  {
                                    return (<Putprogress data={a} />)
                                  }
                                }
                              } ))}
                        >
                          <List.Item.Meta
                            avatar={<UserAvatar src={item.user.avatar}/>}
                            title={<Link to={`/article/${item.id}`} target="_block">{item.title}</Link>}
                            description={item.description}
                          />
                          {item.abstract}
                        </List.Item>
                      )}
                    />
                    <Pagination total={50}  current={this.state.current} pageSize={this.state.len} onChange={this.onChange} />
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

export default Direct;

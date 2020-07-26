import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  Button,
  Icon,
  Timeline,
  Divider, Pagination,
} from 'antd';

import ClassCropperModal from '@/components/common/ClassCropperModal/ClassCropperModal';
import moment from 'moment';

@connect(({ user,article }) => ({
  user,article
}))
class Center extends Component {
  state={
    current:1,
    len:1,
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
    const{ user:{user},article: {selfarticleList} }= this.props;
    return (
      <div>
        <div style={{ padding: '1.5rem', background:"white" }}>
          <Row type="flex" justify="center">
            <Col md={19} sm={20} xs={24}>
              <Row type="flex" justify="space-between">
                <Col lg={8} sm={7} xs={24}>
                  <Row type="flex" justify="center">
                    <ClassCropperModal data={user.avatar}/>
                  </Row>
                  <div className="text-center">
                    <h2>昵称：{user && user.nickname}</h2>
                    <h5>
                      备注：{user && user.profession}
                    </h5>
                  </div>
                  <Row type="flex" justify="center">
                    <Button type="primary"><Link to={`/setting/${user.id}/changeother`}><Icon type="setting" />个人设置</Link></Button>
                  </Row>
                  <div className="text-center" style={{marginTop:'10px'}}>
                    <h2>Age：{user.age}</h2>
                  </div>
                  <div className="text-center" style={{marginTop:'10px'}}>
                    <h2>爱好：{user && user.hobbies}</h2>
                  </div>
                  <div className="text-center" style={{marginTop:'10px'}}>
                    <h2>生日：{moment(user.birth).format("LL")}</h2>
                  </div>
                  <Col lg={0} sm={0} xs={24} >
                    <Divider orientation="left">动态</Divider>
                    <Card title="近期">
                      {selfarticleList.length ===0  ? (
                        <div>无</div>
                      ):(selfarticleList.map((item)=>(
                        <Card tyle={{ marginTop: 16 }} type="inner" title="需求" extra={<Link to={`/article/${item.id}`}>更多</Link>}>
                          <Timeline mode="left">
                            <Timeline.Item>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}  发表需求</Timeline.Item>
                            <Timeline.Item>{item.accept ? moment(item.accepts && item.accepts[0].created_at).format('YYYY-MM-DD HH:mm:ss'):"none"}接受时间</Timeline.Item>
                            <Timeline.Item>需求标题:{item.title}</Timeline.Item>
                            <Timeline.Item>需求介绍:{item.description}</Timeline.Item>
                            <Timeline.Item color={item.display ? "green":"red"} >状态：{item.display ? "审核通过":"审核中或者审核未通过"}</Timeline.Item>
                          </Timeline>
                        </Card>
                      )))
                      }
                      <Pagination total={50}  current={this.state.current} pageSize={this.state.len} onChange={this.onChange} />
                    </Card>
                  </Col>
                </Col>
                <Col lg={15} sm={17} xs={0} >
                  <Divider orientation="left">动态</Divider>
                  <Card title="近期">
                    {selfarticleList.map((item)=>(
                      <Card tyle={{ marginTop: 16 }} type="inner" title="需求" extra={<Link to={`/article/${item.id}`}>更多</Link>}>
                        <Timeline mode="left">
                          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}  发表需求</Timeline.Item>
                          <Timeline.Item>{item.accept ? moment(item.accepts && item.accepts[0].created_at).format('YYYY-MM-DD HH:mm:ss'):"none"}接受时间</Timeline.Item>
                          <Timeline.Item>需求标题:{item.title}</Timeline.Item>
                          <Timeline.Item>需求介绍:{item.description}</Timeline.Item>
                          <Timeline.Item color={item.display ? "green":"red"} >状态：{item.display ? "审核通过":"审核中或者审核未通过"}</Timeline.Item>
                        </Timeline>
                      </Card>
                    ))
                    }
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

export default Center;

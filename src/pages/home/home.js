import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Empty,
  Row,
  Col,
  Icon,
  Tooltip,
  Pagination,
} from 'antd';
import HomeLeftSiderBar from '../../components/HomeLeftSiderBar';
import SiderList from '../../components/SiderList';
import HomeArticleList from '../../components/common/HomeArticleList/HomeArticleList';
import Calendarcard from '@/components/common/Calendar/Calendar';
import TagGroup from '@/components/common/tag/TagGroup';
import LeftContainer from '@/components/common/leftContainer/LeftContainer';
import ToTop from '@/components/common/toTop/ToTop';
import { enquireScreen } from 'enquire-js';
import Link from 'umi/link';
import Banner1 from '@/components/common/Banner_pc/Banner1';
import { Banner11DataSource, Feature51DataSource, Footer01DataSource } from '@/components/common/Banner_pc/data.source';
import Feature5 from '@/components/common/Banner_pc/Feature5';
import Footer0 from '@/components/common/Banner_pc/Footer0';
import '../../components/common/Banner_pc/less/antMotionStyle.less';
import './home.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

@connect(({ article, loading }) => ({
  article, loading: loading.effects['article/articleList'],
}))

class Home extends Component {
  state={
    isCategory:false,
    current:1,
    len:7,
    key:-1,
    isMobile,
  }
  componentDidMount() {
    const { dispatch} = this.props;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    dispatch({
      type: 'article/articleList',
      payload:{
        start:0,
        len:this.state.len,
      },
      callback:(res)=>{
        if(res.status === 0){
        }
      }
    });
    dispatch({
      type: 'article/hot',
      payload:{
        len:50,
        sortby:'view',
        sort:'desc',
        postsortbyview:'true',
      },
    });
    dispatch({
      type: 'article/category',
    });
  }
  onClickItem = e =>{
    const { dispatch} = this.props;
    console.log(e);
    dispatch({
      type: 'article/category_List',
      payload:{
        tag:e,
        start:0,
        len:this.state.len,
      }
    });
    this.setState({
      isCategory: true,
      key:e,
    })
  };
  onChange = pageNumber => {
    const { dispatch} = this.props;
    this.setState({
      current: pageNumber,
    });
    if(!this.state.isCategory) {
      dispatch({
        type: 'article/articleList',
        payload: {
          start: (pageNumber - 1) * this.state.len + 1,
          len: this.state.len,
        },
        callback: (res) => {
          if (res.status === 0) {
          }
        }
      });
    }
    else{
      dispatch({
        type: 'article/category_List',
        payload:{
          tag:this.state.key,
          start:(pageNumber - 1) * this.state.len + 1,
          len:this.state.len,
        }
      });
    }
  };
  render() {
    const {
      article: { category_List,hotList, categorys,articleList,isEmptyList},
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
    const childrenf = [
      <Feature5
        id="Feature5_0"
        key="Feature5_0"
        dataSource={Feature51DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    const childrent = [
      <Footer0
        id="Footer0_1"
        key="Footer0_1"
        dataSource={Footer01DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    const {isCategory}=this.state;
    return (
      <>
        <div className="templates-wrapper">
          {children}
        </div>
      <div style={{ padding: '1.5rem' }}>
        <Row type="flex" justify="center">
          <Col md={19} sm={20} xs={24}>
            <Row type="flex" justify="space-between">
              <Col lg={3} sm={7} xs={0}>
                { !isMobile ? (
                  <HomeLeftSiderBar
                    categorys={categorys}
                    loading={loading}
                    onClickItem={this.onClickItem}
                    isMobile={this.state.isMobile}
                  />):(<div />)
                }
              </Col>
              <Col lg={16} sm={16} xs={24}>
                {isMobile ? (
                  <HomeLeftSiderBar
                    categorys={categorys}
                    loading={loading}
                    onClickItem={this.onClickItem}
                    isMobile={this.state.isMobile}
                  />
                  ):(<div />)
                }
                <Card
                  bordered={false}
                  title={isMobile ? "":"全部需求" }
                  extra={<div>
                    <Tooltip title="时间排序"><Link to='/sorttime'><Icon type="clock-circle" style={{fontSize: 20, color: '#ccc',marginRight:'5px'}}/></Link></Tooltip>
                    <Tooltip title="价格排序"><Link to='/sortprice'><Icon type="money-collect" style={{fontSize: 20, color: '#ccc'}}/></Link></Tooltip>
                    </div>}
                  loading={loading}
                >
                  {!isCategory ? (
                     !isEmptyList ?( <HomeArticleList
                      data={articleList}
                    />)
                   :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  ) :
                    <HomeArticleList
                      data={category_List}
                    />}
                  <Pagination total={50}  current={this.state.current} pageSize={this.state.len} onChange={this.onChange} />
                </Card>
              </Col>
              <Col lg={4} sm={0} xs={0}>
                <Calendarcard/>
                <Card
                  bordered={false}
                  title="近期热门需求"
                  loading={loading}
                  style={{ marginTop: 20,width: 300 }}
                >
                  <SiderList
                    dataSource={hotList}
                    bordered={false}
                    split={false}
                  />
                </Card>
                <LeftContainer title="标签云">
                  <TagGroup categorys={categorys}
                            onClickItem={this.onClickItem}/>
                </LeftContainer>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="templates-wrapper">
          {childrenf}
        </div>
        <ToTop/>
        {
          isMobile ? (<div/>):(
            <div className="templates-wrapper">
              {childrent}
            </div>
          )
        }
      </div>
        </>
    );
  }
}

export default Home;

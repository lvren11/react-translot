import React, { Component } from 'react';
import { Layout, Menu, Badge, Icon,Input,Popover,List,Tooltip,Affix,Avatar} from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';

import Hidden from '@material-ui/core/Hidden';
import storageHelper from '../../../utils/storage';
import moment from 'moment'
import './Header.less';
import logo from '@/assets/images/logo.svg';
import router from 'umi/router';
import UserAvatar from '@/components/UserAvatar';
const { Header } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const tabs = [
  {
    title: '首页',
    category: 'article',
    path:'/',
  },
  // {
  //   title: 'App',
  //   category: 'download',
  //   path:'/translot.apk',
  // },
  /*{
    title: '排行榜',
    category: 'rank',
    path:'/index1',
  },*/
];
@connect(({ user,center }) => ({
  user,center
}))
class MainHeader extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const userInfos = storageHelper.get('web_user');
    if (userInfos) {
      dispatch({
        type: 'user/saveUser',
        payload: {
          user: userInfos,
        },
      });
      dispatch({
        type: 'center/inform',
      });
    }
  }

  logout=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/clearUser',
    });
    storageHelper.clear('web_user');
    storageHelper.clear('x-auth-token');
  };
  onAllNotificationsRead =() =>{
    const {dispatch} =this.props;
    dispatch({ type: 'center/allNotificationsRead' })
  };
  render () {
    const { user: { user },center:{notifications} } = this.props;
    const rightContent=[
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName="notificationPopover"
        getPopupContainer={() => document.querySelector('#primaryLayout')}
        content={
          <div className="notification">
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: <p>你已经清空通知了</p>,
              }}
              renderItem={item => (
                <List.Item className="notificationItem">
                  <List.Item.Meta
                    title={
                      <Tooltip placement="topLeft" title={item.title} arrowPointAtCenter>
                        {item.content}
                      </Tooltip>
                    }
                    description={moment(item.created_at).fromNow()}
                  />
                  <Icon type="right" style={{ fontSize: 10, color: '#ccc' }} />
                </List.Item>
              )}
            />
            {notifications.length ? (
              <div
                onClick={this.onAllNotificationsRead}
                className="clearButton"
              >
                <p>清空内容</p>
              </div>
            ) : null}
          </div>
        }
      >
        <Badge
          count={notifications.length}
          dot
          offset={[-10, 10]}
          className="iconButton"
        >
          <Icon type="bell" className="iconFont" />
        </Badge>
      </Popover>
  ];
    return (

      <>
      <Hidden only={['xs']}>
      <Header className="main-header">
        <div className="main-header-left">
          <img alt="logo" className="U-logo" src={logo} />
          <span className="title">Translot</span>
          <Menu mode="horizontal">
            {tabs.map(item => (
              <Menu.Item key={item.category}>
                <Link to={item.path} replace>{item.title}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key="download">
              <a href={`/translot.apk`} >App</a>
            </Menu.Item>
          </Menu>
        </div>
        <Search
          placeholder="输入搜索的关键词"
          onSearch={value => this.props.dispatch({
            type:'article/search_List',
            payload:value,
            callback:(res)=>{
              if(res.status === 0){
                router.push('/search');
              }
            }})}
          style={{ width: 200,}}
        />
        <div className="rightContainer">{rightContent}</div>
        <div className="main-header-right">
          {
            user && user.id
              ? (
                // <span>{user.nickname}</span>
                <Menu onClick={this.handleClick} mode="horizontal">
                    <SubMenu
                      title={
                        <UserAvatar src={user.avatar}  size="large"/>
                    }
                    >
                      <Menu.Item key="setting:1"><Link to='/publish'><Icon type="edit" />发表需求</Link></Menu.Item>
                      <Menu.Item key="setting:2"><Link to={`/direct/${user.id}`}><Icon type="zoom-in" />指定委托人</Link></Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="setting:3"><Link to={`/center/${user.id}`}><Icon type="home" />个人中心</Link></Menu.Item>
                      <Menu.Item key="setting:4"><Link to={`/accept_article/${user.id}`}><Icon type="check" />接受需求</Link></Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="setting:6" onClick={this.logout}><Link to={`/`}>退出</Link></Menu.Item>
                    </SubMenu>
                </Menu>
              )
              : (
                <span>
                  <Link to="/user/login">登录</Link>
                  <span style={{ padding: 10 }}>·</span>
                  <Link to="/user/register">注册</Link>
                </span>
              )
          }
        </div></Header>
      </Hidden>
        <Affix>
      <Hidden only={['xl','sm','md','lg']}>
        <div className="ant-layout-header">
          <Search
            placeholder="输入搜索的关键词"
            onSearch={value => this.props.dispatch({
              type:'article/search_List',
              payload:value,
              callback:(res)=>{
                if(res.status === 0){
                  router.push('/search');
                }
              }})}
            style={{ width: 170,}}
          />
          <div className="rightContainer">{rightContent}</div>
          {
            user && user.id
              ? (
                <div>
                  <Menu onClick={this.handleClick} mode="horizontal">
                    <SubMenu title={<Link to={`/center/${user.id}`}><UserAvatar src={user.avatar}  size="large"/></Link>}>
                        <Menu.Item key="setting:1" onClick={this.logout}><Link to={`/`}>退出</Link></Menu.Item>
                    </SubMenu>
                    <Link to={`/setting/${user.id}/changeother`}><Icon type="home" style={{ fontSize: 20}}/></Link>
                  </Menu>
                </div>
              ) : (
                <>
                  <span>
                    <Link to="/user/login">登陆</Link>
                  </span>
                  <span>
                    <Link to="/user/login">注册</Link>
                  </span>
                </>
                )
          }
        </div>
        </Hidden>
        </Affix>
        </>
    );
  }
}

export default MainHeader;

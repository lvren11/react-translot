import React, { Component } from 'react';
import { Layout, Menu, Icon,Avatar } from 'antd';
import  Link  from 'umi/Link';
import {connect} from 'dva';
import UserAvatar from '@/components/UserAvatar';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@connect(({ user }) => ({
  user
}))
class Sliderbar extends Component {
  state = {
    collapsed: this.props.collapsed,
    mode: 'inline',
    openKey: '',
    selectedKey: '',
    firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
  };
  componentDidMount() {
    this.setMenuOpen(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.onCollapse(nextProps.collapsed);
    this.setMenuOpen(nextProps)
  }
  setMenuOpen = props => {
    const {path} = props;
    if(path) {
      this.setState({
        openKey: path.substr(0, path.lastIndexOf('/')),
        selectedKey: path
      });
    }
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      firstHide: collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
    console.log(this.state);
    const { popoverHide } = this.props;
    popoverHide && popoverHide();
  };
  openMenu = v => {
    console.log(v);
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false,
    })
  };
  render() {
    const {user:{user}}=this.props;
    return (
      <Sider
        width={256}
        theme="light"
        trigger={this.props.trigger}
        breakpoint="lg"
        collapsed={this.props.collapsed}
        style={this.props.style}
      >
        <div className="py-3">
          <div className="mmb-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex',marginLeft:'1rem' }}>
              {user && user.avatar
              && <UserAvatar size={48} src={user.avatar}/>
              }
            </div>
          </div>
        </div>
        <Menu
          onClick={this.menuClick}
          theme="white"
          mode="inline"
          selectedKeys={[this.state.selectedKey]}
          openKeys={this.state.firstHide ? null : [this.state.openKey]}
          onOpenChange={this.openMenu}
        >
          <Menu.Item key="/setting/index">
            <Link to={'/'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
          </Menu.Item>
          <SubMenu
            key="/setting/inform"
            title={<span><Icon type="notification" /><span className="nav-text">消息中心</span></span>}
          >

            <Menu.Item key="/setting/inform/accept"><Link to={`/setting/${user.id}/inform`}>用户通知</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="/setting/normal"
            title={<span><Icon type="setting" /><span className="nav-text">基本设置</span></span>}
          >
            <Menu.Item key="/setting/normal/changepassword"><Link to={`/setting/${user.id}/changepassword`}>修改密码</Link></Menu.Item>
            <Menu.Item key="/setting/normal/changeinformation"><Link to={`/setting/${user.id}/changeother`}>修改资料</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="/setting/article"
            title={<span><Icon type="copy" /><span className="nav-text">需求管理</span></span>}
          >

            <Menu.Item key="/setting/article/basicTable"><Link to={`/setting/${user.id}/articledo`}>需求修改</Link></Menu.Item>
            <Menu.Item key="/setting/article/advancedTable"><Link to={`/setting/${user.id}/delete`}>需求删除</Link></Menu.Item>
            <Menu.Item key="/setting/article/asynchronousTable"><Link to={`/setting/${user.id}/progress`}>接受进度</Link></Menu.Item>
          </SubMenu>
          {/*<SubMenu
            key="/setting/rank"
            title={<span><Icon type="solution" /><span className="nav-text">排行</span></span>}
          >

            <Menu.Item key="/setting/rank/selfrank"><Link to={'/index1'}>排行名次</Link></Menu.Item>
          </SubMenu>*/}
          <SubMenu
            key="/setting/commet"
            title={<span><Icon type="aliwangwang" /><span className="nav-text">评论</span></span>}
          >
            <Menu.Item key="/setting/rank/publish"><Link to={`/setting/${user.id}/comment`}>修改评论</Link></Menu.Item>
            <Menu.Item key="/setting/rank/accept"><Link to={`/setting/${user.id}/deletecomment`}>删除评论</Link></Menu.Item>
          </SubMenu>
        </Menu>
        <style>
          {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
        </style>
      </Sider>
    )
  }
}
export default Sliderbar;

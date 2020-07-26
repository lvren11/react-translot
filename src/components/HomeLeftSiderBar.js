import React from 'react';
import { Card, Menu, Divider, Icon } from 'antd';


class HomeLeftSiderBar extends React.Component {

  onClickItem = e => {
    const{onClickItem}=this.props;
    onClickItem(e.key);
  };
  render() {
    return (
      <Card
        loading={this.props.loading}
        size="small"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div>
          <Divider orientation="left">
            <Icon type="unordered-list"/><small>全部推荐分类</small>
          </Divider>
          <Menu className="mbb-1 br-0" onClick={this.onClickItem} mode={this.props.isMobile?"horizontal":"vertical"}>
            {this.props.categorys && this.props.categorys.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  {item.tag_name}
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </Card>
    )
  }
};


export default HomeLeftSiderBar;

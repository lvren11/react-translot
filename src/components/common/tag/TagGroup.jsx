import React from "react";
import {Button} from 'antd';
import Tag from "./Tag";

const tagColorList = [
  "dark-blue",
  "light-green",
  "orange",
  "light-pink",
  "yellow",
  "grey",
  "light-blue",
  "pink"
];


class TagGroup extends React.Component {
  onClickItem = (e,event) => {
    const{onClickItem}=this.props;
    onClickItem(e);
    console.log(e)
  };
    render() {
        const { style,categorys } = this.props;
        let count = 0;
        return (
            <div style={style ? style : {}}>
                {categorys.map((item) => {
                    if (count === tagColorList.length - 1) {
                        count = 0;
                    }
                    const inner = (
                      <Button type="link" onClick={this.onClickItem.bind(this,item.id)} size='small' ghost>
                        <Tag
                            color={tagColorList[count]}
                            text={item.tag_name}
                            key={item.id}
                        />
                      </Button>
                    );
                    count++;
                    return inner;
                })}
            </div>
        );
    }
}
export default TagGroup;

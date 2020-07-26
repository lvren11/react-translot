import React from "react";
import { throttle } from "@/utils/util";
import {Icon, Tooltip} from 'antd';
import "./toTop.less";
const offset = 300;
export default class JoinUs extends React.Component {
    constructor(props) {
        super(props);
        this.listenScrollTop = this.listenScrollTop.bind(this);
    }
    state = {
        show: false
    };
    componentDidMount() {
        window.addEventListener("scroll", throttle(this.listenScrollTop, 200));
    }
    scrollToTop() {
        const timer = window.setInterval(() => {
            let top = document.documentElement.scrollTop;
            let speed = top / 8;
            if (top !== 0) {
                document.documentElement.scrollTop -= speed;
            } else {
                clearInterval(timer);
            }
        }, 20);
    }
    listenScrollTop(e) {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > offset) {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
    }
    render() {
        return (
          <Tooltip title="回到头部">
            <div
                className={
                    this.state.show
                        ? "to-top-container"
                        : "to-top-container hidden-to-top"
                }
                onClick={this.scrollToTop}
            >
              <Icon type="arrow-up" style={{fontSize:'2rem'}}/>
            </div>
          </Tooltip>
        );
    }
}

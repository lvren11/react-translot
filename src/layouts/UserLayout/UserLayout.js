import React from 'react';
import Particles from 'react-particles-js';
import {Row,Col} from 'antd';
import logo from '../../assets/images/logo.svg';
import './UserLayout.less';
const UserLayout = props => {
    return (
      <div className="container">
        <div className="lizi">
          <Particles
            params={{
              particles: {
                line_linked: {
                  shadow: {
                    enable: true,
                    color: "#000000",
                    blur: 1,
                    opacity:0.5
                  }
                },
                number: {
                  value: 50,
                  density: {
                    enable: true,
                    value_area: 1000
                  }
                },
                color: {
                  value: "#00BFFF"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "polygon": {
                    "nb_sides": 5
                  }
                },
                "opacity": {
                  "value": 1,
                  "random": true,
                  "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 10,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 180,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "move": {
                  "enable": true,
                  "speed": 6,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                },
              },
              interactivity: {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "repulse"
                  }
                },
                "modes": {
                  "grab": {
                    "distance": 100,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 100,
                    "size": 80,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 150,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              retina_detect:true
            }}
            style={{
              width: '100%',
              backgroundColor: "#fff",
            }}
          />
        </div>
        <div className="form">
            <Row type="flex" justify="center">
              <Col lg={12} md={14} sm={18} xs={24}>
                <Row type="flex" justify="space-around">
                  <Col lg={12} md={16} sm={18} xs={24}>
                    <div className="login-form">
                      <img alt="logo" className="U-logo" src={logo} />
                      <span className="title">Translot</span>
                      {props.children}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
      </div>
    );
}
export default UserLayout;

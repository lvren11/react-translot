import React, { Component } from 'react';

import {Affix} from 'antd';
import './index1.less';
import Logo from '../../components/common/logo/logo';
import Indexblock from '@/components/common/indexblock/indexblock';
import Flipcard from '@/components/common/flipcard/flipcard';
import Index from '@/components/common/rank';
class Index1 extends Component {
  render() {
    return (
      <div>
        <Affix>
        <div id="header">
          <h1><Logo/>TransLot <span>help and require</span></h1>
        </div>
        </Affix>
        <Indexblock/>
        <Flipcard/>
        <Index />
      </div>
    );
  }
}

export default Index1;

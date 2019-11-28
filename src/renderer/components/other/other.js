'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { axios } from 'utils/axios';

class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {

        return (
          <div className="Other-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>占位</Breadcrumb.Item>
              </Breadcrumb>
              这里是占位目录other-1~
          </div>
        )
    }

}

export default withRouter(Other);
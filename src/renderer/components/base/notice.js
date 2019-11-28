'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { axios } from 'utils/axios';

class Notice extends React.Component {
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
          <div className="Hots-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>公告</Breadcrumb.Item>
              </Breadcrumb>
              这里是一些公告说明~
          </div>
        )
    }

}

export default withRouter(Notice);
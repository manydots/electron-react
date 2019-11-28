'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { axios } from 'utils/axios';

class Errors extends React.Component {
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
                    <Breadcrumb.Item>访问异常</Breadcrumb.Item>
                    <Breadcrumb.Item>404</Breadcrumb.Item>
              </Breadcrumb>
              页面飞走了~
          </div>
        )
    }

}

export default withRouter(Errors);
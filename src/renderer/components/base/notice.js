'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb,Statistic,Row, Col } from 'antd';
import { axios } from 'utils/axios';

class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counts:0
        };
    }
    componentDidMount() {
        
    }
    componentWillMount(){
        this.onGetCount();
    }
    shouldComponentUpdate() {
        return true;
    }
    onGetCount() {
      let self = this;
      axios({
        method: 'get',
        url: '/',
        data:{
          apiType: 'musicAPI'
        }
      }).then(function(res) {
        let start = '<b class="apiTotals" style="color:#333;font-size:16px;">';
        let end = '</b>';
        self.setState({
            counts:res.slice(res.indexOf(start)+start.length, res.indexOf(end))
        })
      });
    }
    render() {

        return (
          <div className="Hots-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>公告</Breadcrumb.Item>
              </Breadcrumb>
              这里是一些公告说明~
              <div>
                 <Row gutter={16}>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <Statistic title="网易云音乐API累计调用次数" value={this.state.counts} precision={0} />
                  </Col>
                </Row>
              </div>
          </div>
        )
    }

}

export default withRouter(Notice);
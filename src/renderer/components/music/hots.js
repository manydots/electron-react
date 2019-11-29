'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb,Tag,message  } from 'antd';
import { axios } from 'utils/axios';

class Hots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:[],
            colors:['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
        };
    }
    componentDidMount() {
        this.onGetKeyWords();
    }
    shouldComponentUpdate() {
        return true;
    }
    onGetKeyWords() {
      let self = this;
      axios({
        method: 'get',
        url: '/v1/search/hot',
        data: {
          apiType: 'musicAPI'
        }
      }).then(function(res) {
        //console.log(res)
        if (res && res.code == 200) {
          message.success('hots load success.');
          self.setState({
            results: res.result.hots
          });
        }else{
          message.error('hots load error.');
        }

      });
    }
    render() {
        const { results,colors } = this.state;
        return (
          <div className="Hots-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>音乐</Breadcrumb.Item>
                    <Breadcrumb.Item>关键词</Breadcrumb.Item>
              </Breadcrumb>
              这里是网易云音乐热搜关键词~
              <div className="mt10">
                  {
                    results.map((item, index) => {
                        return (
                            <Tag  key={index} style={{color:`${colors[index]}`,marginBottom:'8px',lineHeight:'25px'}}>{item.first}</Tag>
                        )
                    })
                  }
              </div>

          </div>
        )
    }

}

export default withRouter(Hots);
'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb,Tag,message,List,Button,Collapse   } from 'antd';
import { axios } from 'utils/axios';


class Recommend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:[],
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
        url: '/v1/personalized/newsong',
        data: {
          apiType: 'musicAPI'
        }
      }).then(function(res) {
        //console.log(res)
        if (res && res.code == 200) {
          message.success('recommend load success.');
          self.setState({
            results: res.result
          });
        }else{
          message.error('recommend load error.');
        }

      });
    }
    onPlayer(id) {
      if (id) {
        this.playUrl(id);
      }
    }
    playUrl(id) {
      let self = this;
      axios({
        method: 'get',
        url: `/v1/music/url?id=${id}`,
        data: {
          apiType: 'musicAPI'
        }
      }).then(function(res) {
        if (res && res.data && res.data[0].url && res.data[0].url != null) {
          self.goPlay(res.data[0].url);
        } else {
          //alert('付费歌曲无资源');
          //console.log('vip付费歌曲无资源.');
          message.error('付费歌曲无资源');
          return;
        }
      });
    }
    goPlay(mp3){
      let sound = this.state.sound;
      if(!sound){
        sound = new Audio();
        this.onInputChange('sound',sound);
      }
      sound.src = mp3;
      sound.play();
    }
    onInputChange(name,val){
        if(name){
            this.state = Object.assign({},this.state,{
               [name]:val
            });
            this.setState(this.state);
        }
    }
    render() {
        const { results } = this.state;
        return (
          <div className="Hots-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>音乐</Breadcrumb.Item>
                    <Breadcrumb.Item>推荐</Breadcrumb.Item>
              </Breadcrumb>
              这里是网易云推荐音乐~
              <div className="mt10">
                  <Collapse defaultActiveKey={['1']} accordion>
                    {
                      results.map((item, index) => {
                          return (
                            <Collapse.Panel header={item.name} key={index+1}>
                                <Button className="playMusic" onClick={this.onPlayer.bind(this,item.id)}>点击试听</Button>
                            </Collapse.Panel>
                          )
                      })
                    }
                  </Collapse>
              </div>

          </div>
        )
    }

}

export default withRouter(Recommend);
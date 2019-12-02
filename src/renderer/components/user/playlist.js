'use strict';
import React from 'react';
import { withRouter,Link} from 'react-router-dom';
import { Breadcrumb,Drawer, Pagination,List, Avatar, Icon ,message,Card,Button } from 'antd';
import store from 'store';
import { axios } from 'utils/axios';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:[],
            visible:false,
            uid:store.get('Authorization') && store.get('Authorization').i ? store.get('Authorization').i.account.id :null,
            drawerList:[],
            sound:null,
            pageIndex:1,
            pageSize:20,
            pageTotal:1,
            ids:null
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
      if (!this.state.uid || this.state.uid == '') {
        self.props.history.push('/');
        return;
      }
      axios({
        method: 'get',
        url: `/v1/user/playlist?uid=${self.state.uid}`,
        data: {
          apiType: 'musicAPI'
        }
      }).then(function(res) {
        if (res && res.code == 200) {
          message.success('playlist load success.');
          self.setState({
            results: res.playlist
          });
        } else {
          message.error('playlist load error.');
        }
      });
    }
    showDrawer(item){
      //console.log(item.id)
      this.setState({
        ids:item.id
      })
      this.onGetDetails(item.id,null)
    }
    onClose(){
      this.setState({
        visible: false,
      });
    }

    LoadPage(page){
      this.onGetDetails(this.state.ids,page)
    }
    onGetDetails(id,pageIndex,isLoad) {
      let self = this;
      let current = pageIndex && pageIndex != null ? pageIndex : self.state.pageIndex;
      if (!this.state.uid || this.state.uid == '') {
        self.props.history.push('/');
        return;
      }
      axios({
        method: 'get',
        url: `/v1/playlist/detail?id=${id}`,
        data: {
          apiType: 'musicAPI',
        },
        params:{
           offset:(current-1) *self.state.pageSize,
           limit:self.state.pageSize,
           n:20
        }
      }).then(function(res) {
          console.log(res)
          if (res && res.code == 200) {
            message.success('playlist load success.');
            self.setState({
              visible: true,
              drawerList:res.playlist.tracks,
              pageTotal:res.playlist.trackCount,
              pageIndex:current,
            });

          } else {
            message.error('playlist load error.');
          }
      });
    }
    onInputChange(name,val){
        if(name){
            this.state = Object.assign({},this.state,{
               [name]:val
            });
            this.setState(this.state);
        }
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

    render() {
        const { results,drawerList } = this.state;
        return (
          <div className="Hots-Form">
              <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>音乐</Breadcrumb.Item>
                    <Breadcrumb.Item>歌单收藏</Breadcrumb.Item>
              </Breadcrumb>
              <List
                dataSource={results}
                bordered
                renderItem={item => (
                  <List.Item key={item.id}
                    actions={[<a onClick={this.showDrawer.bind(this,item)} key={`a-${item.id}`}>查看详情</a>,]}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.creator.avatarUrl} />
                      }
                      title={item.creator.nickname}
                      description={item.name}
                    />
                   </List.Item>
              )}/>

            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={this.onClose.bind(this)}
              visible={this.state.visible}>
                <List  grid={{column:4,gutter:10}}
                    dataSource={drawerList}
                    renderItem={item => (
                      <List.Item>
                        <Card title={item.name}><Button onClick={this.onPlayer.bind(this,item.id)}><Icon type="customer-service" />试听</Button></Card>
                      </List.Item>
                    )}
                />
                <Pagination hideOnSinglePage={true} onChange={this.LoadPage.bind(this)} current={this.state.pageIndex} showQuickJumper pageSize={this.state.pageSize} total={this.state.pageTotal} />
            </Drawer>
       

          </div>
        )
    }

}

export default withRouter(Playlist);
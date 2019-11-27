'use strict';
import React from 'react';
import { Input,message,Pagination,List,Button,Spin,BackTop } from 'antd';
import { axios } from 'utils/axios';
const { Search } = Input;
import './search.less';

class Searchs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songsName:'林中鸟',
            pageIndex:1,
            pageSize:10,
            pageTotal:1,
            results:[],
            sound:null,
            loading:false
        };
    }
    componentDidMount() {
        
    }
    shouldComponentUpdate() {
        return true;
    }
    handleSubmit(e) {
        let self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    onSearch(value){
      if(value == '' || !value){
        message.warning('试试脑海中的歌曲名...');
        return;
      }else{
        this.onInputChange('pageIndex',1)
        this.onInputChange('songsName',value)
        this.onGetSongs(value,1);
      }
    }
    onInputChange(name,val){
        if(name){
            this.state = Object.assign({},this.state,{
               [name]:val
            });
            this.setState(this.state);
        }
    }
    onGetSongs(songsName,pageIndex,isLoad){
      
      let self = this;
      let current =  pageIndex || self.state.pageIndex;
      this.onInputChange('loading',true);
      //console.log(current)
      axios({
        method: 'get',
        url: '/v1/search',
        data: {
          apiType: 'musicAPI'
        },
        params: {
          s: isLoad ? self.state.songsName : songsName,
          offset:(current-1) *self.state.pageSize,
          limit:self.state.pageSize,
          type:1
        }
      }).then(function(res) {
        //console.log(res)
        if (res.code == 200) {
          self.setState({
            pageTotal:res.result.songCount,
            results:res.result.songs,
            pageIndex:current,
            loading:false
          });
          let txt = 'search songs success.';
          if(isLoad){
            txt= 'load songs success.'
          };
          message.success(txt);
        } else {
          self.onInputChange('loading',true);
          message.error('search songs error.');
        };
      });
    }
    LoadPage(page){
      this.onGetSongs('',page,true)
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

        return (
          <div className="Search-Form">
              <Search placeholder="试试脑海中的歌曲名..." defaultValue={this.state.songsName} onChange={this.onInputChange.bind(this,'songsName')} enterButton="搜索" size="large" onSearch={this.onSearch.bind(this)} />
              <List
                header={<div>共有 <span style={{color:'red'}}>{this.state.pageTotal > 1 ? this.state.pageTotal :0 }</span> 个结果</div>}
                footer={<div>最后一行啦还瞅啥~</div>}
                className="Search-List"
                bordered
                locale={{emptyText:'暂无数据'}}
                loading={this.state.loading}
                dataSource={this.state.results}
                renderItem={item => (
                  <List.Item>
                    <span className="songName">{item.name}</span>
                    <span className="author">{item.ar[0].name}</span>
                    <span className="author-z">{`《${item.al.name}》`}</span>
                    <Button className="playMusic" onClick={this.onPlayer.bind(this,item.id)}>点击试听</Button>
                  </List.Item>
                )} />
                <BackTop style={{right:'50px'}} visibilityHeight={50}><div className="ant-back-top-inner">TOP</div></BackTop>
              <Pagination hideOnSinglePage={true} current={this.state.pageIndex} onChange={this.LoadPage.bind(this)} showQuickJumper pageSize={this.state.pageSize} total={this.state.pageTotal} />
          </div>
        )
    }

}

export default Searchs;
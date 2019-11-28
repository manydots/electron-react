'use strict';

import React from 'react';
import { Route, Switch, Redirect,withRouter,Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Modal, Button } from 'antd';
import store from 'store';
import { axios } from 'utils/axios';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

class WebBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: store.get('Authorization') ? store.get('Authorization').userName : 'guest',
      openKeys:[],
      selectedKeys:[]
    };
  }
  componentWillMount(){
    //提前处理匹配菜单栏
    if (this.props && this.props.location.pathname) {
      let pathname = this.props.location.pathname;
      if (pathname.slice(1).split('/').length == 2) {
        this.setState({
          selectedKeys: [pathname.slice(1).split('/')[1]],
          openKeys: [pathname.slice(1).split('/')[0]],
        });
      } else {
        this.setState({
          selectedKeys: [pathname.slice(1).split('/')[0]],
          openKeys: [],
        });
      }
    };
  }
  componentDidMount() {
    //console.log(store.get('Authorization'))
    //console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      let pathname = nextProps.location.pathname;
      if (pathname.slice(1).split('/').length == 2) {
        this.setState({
          selectedKeys: [pathname.slice(1).split('/')[1]],
          openKeys: [pathname.slice(1).split('/')[0]],
        });
      } else {
        this.setState({
          selectedKeys: [pathname.slice(1).split('/')[0]],
          openKeys: [],
        });
      }
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  onInputChange(name,val){
        if(name){
            this.state = Object.assign({},this.state,{
               [name]:val
            });
            this.setState(this.state);
        }
  }
  onSubmit(values) {
    let self = this;
    axios({
      method: 'post',
      url: '/commonuser/login',
      data: {
        apiType: 'devAPI',
        username: values.username,
        password: values.password,
        captcha: values.captcha
      }
    }).then(function(res) {
      if (res.code == 0) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  }
  onExit() {
    let self = this;
    confirm({
      title: '温馨提示',
      content: '确定退出本次登录吗？',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        let Authorizations = store.get('Authorization');
        Authorizations.isLogin = false;
        store.set('Authorization', Authorizations);
        self.props.history.push('/');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  goPath(path) {
    if (path != '' && this.props && this.props.history) {
      this.props.history.push(path);
    }else{
      console.log('this.props.history undefined')
    }
  }
  render() {
    //console.log(this.state)
    return (
      <div className="Music-Form">
               <Layout>
              <Header className="header">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['nav1']}
                  style={{ lineHeight: '64px' }} >
                  <Menu.Item key="nav1">欢迎，{this.state.userName}！</Menu.Item>
                  <Menu.Item key="nav2" onClick={this.onExit.bind(this)}>退出登录</Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>网易云音乐</Breadcrumb.Item>
                  <Breadcrumb.Item>音乐API</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={this.state.selectedKeys}
                      defaultOpenKeys={this.state.openKeys}
                      style={{ height: '100%' }} >
                      <Menu.Item key="notice" onClick={this.goPath.bind(this,'/notice')}>
                        <Icon type="notification" />
                        <span>系统公告</span>
                      </Menu.Item>
                      <SubMenu
                        key="music"
                        title={<span><Icon type="menu-fold" />常用菜单</span>} >
                        <Menu.Item key="search" onClick={this.goPath.bind(this,'/music/search')}>搜索音乐</Menu.Item>
                        <Menu.Item key="hot" onClick={this.goPath.bind(this,'/music/hot')}>关键词热搜</Menu.Item>
                      </SubMenu>
                      <SubMenu
                        key="other"
                        title={<span><Icon type="edit" />占位目录</span>} >
                        <Menu.Item key="other1" onClick={this.goPath.bind(this,'/other/other1')}>other-1</Menu.Item>
                        <Menu.Item key="other2" onClick={this.goPath.bind(this,'/other/other2')}>other-2-error</Menu.Item>
                      </SubMenu>
                      <Menu.Item key="error" onClick={this.goPath.bind(this,'/error')}>
                        <Icon type="rollback" />
                        <span>404</span>
                      </Menu.Item>
                    </Menu>
                  </Sider>
                  <Content style={{ padding: '0 24px', minHeight: 600,overflowX: 'visible' }}>
                    {this.props.children}
                  </Content>
                </Layout>
              </Content>
              <Footer style={{ textAlign: 'center' }}>浙ICP备17026693号-2 ©2018-2019 by Mo.chen</Footer>
            </Layout>
          </div>
    );
  }
}

export default withRouter(WebBase);

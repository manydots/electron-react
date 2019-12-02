'use strict';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Modal, Button } from 'antd';
import store from 'store';
import { axios } from 'utils/axios';
import Search from './search';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           userName:store.get('i') ? store.get('i').profile.nickname : 'guest'
        };
    }
    componentDidMount() {
        console.log(store.get('i'))
    }
    shouldComponentUpdate() {
        return true;
    }
    onSubmit(values){
      let self = this;
      axios({
        method:'post',
        url:'/commonuser/login',
        data: {
          apiType:'devAPI',
          username: values.username,
          password: values.password,
          captcha:values.captcha
        }
      }).then(function (res) {
        if(res.code == 0){
          message.success(res.msg);
        }else{
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
          store.set('Authorization',Authorizations);
          self.props.history.push('/');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    render() {
        return (
          <div className="Music-Form">
               <Layout>
              <Header className="header">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }} >
                  <Menu.Item key="1">欢迎，{this.state.userName}！</Menu.Item>
                  <Menu.Item key="2" onClick={this.onExit.bind(this)}>退出登录</Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>网易云音乐</Breadcrumb.Item>
                  <Breadcrumb.Item>音乐</Breadcrumb.Item>
                  <Breadcrumb.Item>搜索</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['sub-index']}
                      defaultOpenKeys={['sub-index']}
                      style={{ height: '100%' }} >
                      <Menu.Item key="sub-index">
                        <Icon type="pie-chart" />
                        <span>搜索音乐</span>
                      </Menu.Item>
                      <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" />占位目录1</span>} >
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                      </SubMenu>
                      <SubMenu
                        key="sub3"
                        title={<span><Icon type="notification" />占位目录2</span>} >
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                      </SubMenu>
                    </Menu>
                  </Sider>
                  <Content className="t344" style={{ padding: '0 24px', minHeight: 600,overflowX: 'visible' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>首页</Breadcrumb.Item>
                      <Breadcrumb.Item>搜索</Breadcrumb.Item>
                    </Breadcrumb>
                    <Search />
                </Content>
                </Layout>
              </Content>
              <Footer style={{ textAlign: 'center' }}>浙ICP备17026693号-2 ©2018-2019 by Mo.chen</Footer>
            </Layout>
          </div>
        )
    }

}

export default Music;
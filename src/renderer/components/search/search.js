'use strict';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { axios } from 'utils/axios';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Search extends React.Component {
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
    render() {
        return (
          <div className="Search-Form">
               <Layout>
              <Header className="header">
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }} >
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%' }} >
                      <Menu.Item key="sub-index">
                        <Icon type="pie-chart" />
                        <span>Option</span>
                      </Menu.Item>
                      <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" />subnav 1</span>} >
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                      </SubMenu>
                      <SubMenu
                        key="sub2"
                        title={<span><Icon type="laptop" />subnav 2</span>} >
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                      </SubMenu>
                      <SubMenu
                        key="sub3"
                        title={<span><Icon type="notification" />subnav 3</span>} >
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                      </SubMenu>
                    </Menu>
                  </Sider>
                  <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Index</Breadcrumb.Item>
                      <Breadcrumb.Item>Content</Breadcrumb.Item>
                    </Breadcrumb>
                </Content>
                </Layout>
              </Content>
              <Footer style={{ textAlign: 'center' }}>浙ICP备17026693号-2 ©2018-2019 by Mo.chen</Footer>
            </Layout>
          </div>
        )
    }

}


export default Search;
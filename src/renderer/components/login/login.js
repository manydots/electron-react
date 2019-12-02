'use strict';
import React from 'react';
import store from 'store';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { formatDate,basePath } from 'utils/es';
import { axios } from 'utils/axios';
import './index.less';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rememberUserName:'',
            rememberPassWord:'',
            isAutoLogin:false,
        };
    }
    componentDidMount() {
      let self = this;
      let Author = store.get('Authorization');
      //简单弱验证
      if (Author && Author.isLogin) {
        this.setState({
          rememberUserName: Author.phone,
          rememberPassWord: Author.password,
          isAutoLogin:true
        });
        setTimeout(function() {
          message.loading('授权登录成功', 2);
          self.props.history.push(`${basePath()}/user/playlist`);
        }, 1200);
      } else if (Author && Author.isLogin == false && Author.remember) {
        this.setState({
          rememberUserName: Author.phone,
          rememberPassWord: Author.password
        })
      }
    }
    shouldComponentUpdate() {
        return true;
    }
    handleSubmit(e) {
        let self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                self.onSubmit(values)
            }
        });
    }
    onSubmit(values) {
      let self = this;
      axios({
        method: 'get',
        url: '/v1/login/cellphone',
        data: {
          apiType: 'musicAPI',
          // username: values.username,
          // password: values.password,
          // captcha: values.captcha
        },
        params:{
          phone: values.phone,
          password: values.password,
        }
      }).then(function(res) {
        if (res.code == 200) {
          store.set('Authorization',{
            isLogin:true,
            phone: values.phone,
            password: values.password,
            remember:values.remember,
            lastLoginTime:formatDate(),
            i:res
          })
          //console.log(res)
          message.success('登录成功');
          setTimeout(function() {
            self.props.history.push(`${basePath()}/user/playlist`);
          }, 1200);

        } else {
          message.error(res.msg);
        }
      });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        //console.log(getFieldDecorator)
        return (
          <div className="LoginIn">
          <div className="LoginForm">
          
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <Form.Item className="tac"  style={{ fontSize: '26px'}}>
                <Icon type="customer-service" style={{ fontSize: '26px', color: '#08c' }} /> 网易云音乐
            </Form.Item>
            <Form.Item>
                {
                  getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入手机号'}],
                    initialValue:this.state.rememberUserName
                  })(
                  <Input 
                    size="large" 
                    disabled={this.state.isAutoLogin} 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    placeholder="手机号(网易云登录手机号)" />)
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                      initialValue:this.state.rememberPassWord
                    })(
                    <Input
                      disabled={this.state.isAutoLogin}
                      size="large"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码(网易云登录密码)"
                    />,)
                }
            </Form.Item>
            <Form.Item>
                {
                  getFieldDecorator('captcha', {
                    rules: [{ required: false, message: '请输入授权码' }],
                  })(<div><Input className="fl" size="large" style={{width:'40%'}} placeholder="授权码"/><img className="fr" src="http://dev.jeeas.cn/captcha.jpg" /></div>)
                }
            </Form.Item>
            <Form.Item>
              <div>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>记住密码</Checkbox>)}
                  <a className="login-form-forgot fr" href="">
                    忘记密码?
                  </a>
              </div>
              <div>
              <Button size="large" loading={this.state.isAutoLogin} disabled={this.state.isAutoLogin} type="primary" htmlType="submit" className="login-form-button">
                  {this.state.isAutoLogin == true ? '授权登录中...':'登录'}
              </Button>
              </div>
              <div>
              Or <a href="">注册</a>
              </div>
            </Form.Item>
          </Form>
          </div>
          </div>
        )
    }

}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
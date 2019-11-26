'use strict';
import React from 'react';
import store from 'store';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { formatDate } from 'utils/es';
import { axios } from 'utils/axios';
import './index.less';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
      let self = this;
      let Author = store.get('Authorization');
      //简单弱验证
      if (Author && Author.isLogin) {
        setTimeout(function() {
          message.loading('授权登录中...', 1);
          self.props.history.push('/music');
        }, 1200);
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
          store.set('Authorization',{
            isLogin:true,
            userName:values.username,
            lastLoginTime:formatDate()
          })
          message.success(res.msg);
          setTimeout(function() {
            self.props.history.push('/music')
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
          <div className="LoginForm">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <Form.Item className="tac"  style={{ fontSize: '26px'}}>
                <Icon type="html5" style={{ fontSize: '26px', color: '#08c' }} /> 公共平台
            </Form.Item>
            <Form.Item>
             
                {
                  getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名(admin)"/>)
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                    })(
                    <Input
                      size="large"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码(111111)"
                    />,)
                }
            </Form.Item>

             <Form.Item>
             
                {
                  getFieldDecorator('captcha', {
                    rules: [{ required: false, message: '请输入验证码' }],
                  })(<div><Input className="fl" size="large" style={{width:'40%'}} placeholder="验证码"/><img className="fr" src="http://dev.jeeas.cn/captcha.jpg" /></div>)
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
              <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              </div>
              <div>
              Or <a href="">注册</a>
              </div>
            </Form.Item>
          </Form>
          </div>
        )
    }

}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Test);
export default WrappedNormalLoginForm;
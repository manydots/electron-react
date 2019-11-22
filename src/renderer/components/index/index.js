'use strict';
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
import { build } from 'utils/es';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        //params data
        console.log(build)
     
    }
    shouldComponentUpdate() {
        return true;
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                  })(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/>)
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
                      placeholder="密码"
                    />,)
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
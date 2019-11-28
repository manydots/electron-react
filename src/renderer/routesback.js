
//废弃
// react-router 3.0 测试 this.props.router.push('/path')实现跳转

import React from 'react';
import { Route,IndexRoute,Router, hashHistory,withRouter} from 'react-router';
import store from 'store';
import { renderHtml } from 'utils/es';
import './default.less';
import Layout from './components/base/layout';
import Index from './components/index/index';
import Music from './components/music/music';


function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Component: AsyncComponent.Component || null
        };
    }


    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

let AsyncIndex = asyncComponent(() => import('./components/index/index'));
let AsyncMusic = asyncComponent(() => import('./components/music/music'));

export default class BasicRoute extends React.Component{
  componentDidMount() {
    let Author = store.get('Authorization');
    //简单弱验证
    if(!Author || !Author.isLogin){
      window.location.hash = '#/';
    }
  }
  render() {
    return (
      <Router history={hashHistory}>
            <Route path="/"  title="登录" component={Layout}>
              <React.Suspense fallback={<div></div>}>
                <Route path="music" component={AsyncMusic} title="音乐" />
                <Route path="*" component={AsyncIndex} title="登录"/>
                <IndexRoute component={AsyncIndex} title="首页"/>
              </React.Suspense>
            </Route>
      </Router>)
  }
}
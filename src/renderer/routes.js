import React from 'react';
import { Route, BrowserRouter,Switch,HashRouter,hashHistory,Redirect} from 'react-router-dom';
import store from 'store';
import { renderHtml } from 'utils/es';
import './default.less';
//import AsyncIndex from './components/login/login';

//桌面应用这里使用HashRouter
//使用React.lazy需要配合React.Suspense 若使用，需要改变main.js部分静态资源的访问路径
let AsyncLogin = React.lazy(() => import('./components/login/login'));
let AsyncMusic = React.lazy(() => import('./components/music/music'));
let AsyncLayout = React.lazy(() => import('./components/base/layout'));

const routes = [{ 
  path: '/',
  component: AsyncLogin,
  exact: true
},{ 
  path: '/music',
  component: AsyncMusic,
  exact: true
}];

// const routes = [{ 
//   path: '/',
//   component: AsyncLayout,
//   exact: true
// }];

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
      <HashRouter history={hashHistory}>
        <Switch>
          <React.Suspense fallback={renderHtml()}>
             <Route path="/" component={AsyncLayout}></Route>
          </React.Suspense>
        </Switch>
      </HashRouter>)
  }
}
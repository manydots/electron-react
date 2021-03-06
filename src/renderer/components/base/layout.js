'use strict';

import React from 'react';
import { Route, Switch,Redirect} from 'react-router-dom';
import { basePath} from 'utils/es';
import TopMenu from './menu';
import './layout.less';
const electron = window.electron;

//部分路由不可以使用异步加载 会直接进入到 <Redirect to="/error" />
let AsyncLogin = React.lazy(() => import('../login/login'));
let AsyncWebBase = React.lazy(() => import('./webBase'));
let AsyncSearch = React.lazy(() => import('../music/search'));
let AsyncHots = React.lazy(() => import('../music/hots'));
let AsyncNotice = React.lazy(() => import('./notice'));
let Async404 = React.lazy(() => import('./error'));
let AsyncOther1 = React.lazy(() => import('../other/other'));
let AsyncRecommend  = React.lazy(() => import('../music/recommend'));
let AsyncPlaylist = React.lazy(() => import('../user/playlist'));
// let AsyncLogin = React.lazy(() => import('../login/login'));
// let AsyncWebBase = React.lazy(() => import('./webBase'));
// import AsyncNotice from './notice';
// import Async404 from './error';
// import AsyncSearch from '../music/search';
// import AsyncHots  from '../music/hots';
// import AsyncOther1 from '../other/other';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  componentDidMount(){
    //console.log(electron)
  }
  shouldComponentUpdate() {
        return true; 
  }
  render() {
    return (
      <div className="react-router-dom-containers">
          {
            electron && electron != null ? (<TopMenu />):null
          }
          
          <Switch>
              <Route path={`${basePath()}/login`} component={AsyncLogin} exact={true} />
              <Route path={`${basePath(true)}`} component={AsyncLogin} exact={true} />
              <Route path={`${basePath(true)}`} render={()=> 
                <AsyncWebBase>
                      <Switch>
                        <React.Suspense fallback={<div></div>}>
                          <Route path={`${basePath()}/notice`} component={AsyncNotice} exact={true} />
                          <Route path={`${basePath()}/music/search`} component={AsyncSearch} exact={true} />
                          <Route path={`${basePath()}/music/recommend`} component={AsyncRecommend} exact={true} />
                          <Route path={`${basePath()}/music/hot`} component={AsyncHots} exact={true} />
                          <Route path={`${basePath()}/user/playlist`} component={AsyncPlaylist} exact={true} />
                          <Route path={`${basePath()}/other/other1`} component={AsyncOther1} exact={true} />
                          <Route path={`${basePath()}/error`} component={Async404} exact={true} />
                          {/*<Redirect to="/error" />*/}
                        </React.Suspense>
                      </Switch>
                </AsyncWebBase>
              } />
          </Switch>
      </div>
    );
  }
}

export default Layout;

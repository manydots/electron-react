'use strict';

import React from 'react';
import { Route, Switch,Redirect} from 'react-router-dom';
import TopMenu from './menu';
import './layout.less';

//部分路由不可以使用异步加载
//let AsyncMusic = React.lazy(() => import('../music/music'));
//let AsyncSearch = React.lazy(() => import('../music/search'));
//let AsyncHots = React.lazy(() => import('../music/hots'));

let AsyncLogin = React.lazy(() => import('../login/login'));
let AsyncWebBase = React.lazy(() => import('./webBase'));
import AsyncNotice from './notice';
import Async404 from './error';
import AsyncSearch from '../music/search';
import AsyncHots  from '../music/hots';
import AsyncOther1 from '../other/other';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  componentDidMount(){
     //console.log(this.props)
  }
  shouldComponentUpdate() {
        return true; 
  }
  render() {
    return (
      <div className="react-router-dom-containers">
          <TopMenu />
          <Switch>
              <Route path="/login" component={AsyncLogin} exact={true} />
              <Route path="/" component={AsyncLogin} exact={true} />
              <Route path="/" render={()=> 
                  <AsyncWebBase>
                      <Switch>
                          <Route path="/notice" component={AsyncNotice} exact={true} />
                          <Route path="/music/search" component={AsyncSearch} exact={true} />
                          <Route path="/music/hot" component={AsyncHots} exact={true} />
                          <Route path="/other/other1" component={AsyncOther1} exact={true} />
                          <Route path="/error" component={Async404} exact={true} />
                          <Redirect to="/error" />
                      </Switch>
                  </AsyncWebBase>
              } />
          </Switch>
      </div>
    );
  }
}

export default Layout;

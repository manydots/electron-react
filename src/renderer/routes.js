import React from 'react';
import { Route, BrowserRouter,Switch,HashRouter,hashHistory} from 'react-router-dom';
import store from 'store';
import { renderHtml } from 'utils/es';
import './default.less';
//import AsyncIndex from './components/index/index';

//桌面应用这里使用HashRouter
//使用React.lazy需要配合React.Suspense 若使用，需要改变main.js部分静态资源的访问路径
let AsyncIndex = React.lazy(() => import('./components/index/index'));
let AsyncSearch = React.lazy(() => import('./components/music/music'));

const routes = [{ 
	path: '/',
	component: AsyncIndex,
	exact: true
},{ 
	path: '/music',
	component: AsyncSearch,
	exact: true
}];

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
		    	    {
	                    routes.map((route) => {
	                      	return(
	                      		<Route key={route.path} path={route.path} component={route.component}  exact={route.exact} />
	                      	)
	                    })
                	}
           	</React.Suspense>
	    	</Switch>
    	</HashRouter>)
  }
}
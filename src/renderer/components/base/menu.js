'use strict';
import React from 'react';
import { Icon } from 'antd';
import './menu.less';
const electron = window.electron;

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull:false
        };
    }
    componentDidMount() {
        //console.log(store.get('Authorization'))
    }
    onIpc(cmd) {
      if (cmd && electron) {
        //启动 electron 生效
        electron.ipcRenderer.send(cmd);
        
        //切换全屏按钮
        if (cmd == 'ipcExitMax' || cmd == 'ipcMax') {
          let isFull = this.state.isFull;
          this.setState({
            isFull: !isFull
          })
        }
      }
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        return (
          <div className="TopMenu-Form pt5 pb5">
              <Icon className="TopMenuIcons TopMenuIcons-Close fr pointer mr10" type="close" onClick={this.onIpc.bind(this,'ipcClose')} />
              {
                this.state.isFull == true ? (<Icon className="TopMenuIcons fr pointer mr10" type="fullscreen-exit" onClick={this.onIpc.bind(this,'ipcExitMax')} />):(<Icon className="TopMenuIcons fr pointer mr10" type="fullscreen" onClick={this.onIpc.bind(this,'ipcMax')} />)
              }
              <Icon className="TopMenuIcons fr pointer mr10" type="minus" onClick={this.onIpc.bind(this,'ipcMin')} />
          </div>
        )
    }

}

export default TopMenu;
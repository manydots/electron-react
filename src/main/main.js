const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
  Notification,
  shell,
  autoUpdater,
  session,
  protocol
} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
//通知模块
//console.log(Notification.isSupported())

// 特点：
// 1、electron-builder 可以打包成msi、exe、dmg文件，macOS系统，只能打包dmg文件，window系统才能打包exe，msi文件；
// 2、几乎支持了所有平台的所有格式；
// 3、支持Auto Update；
// 4、支持CLI和JS API两种使用方式；

/**
 * 注册键盘快捷键
 * 其中：label: '切换开发者工具',这个可以在发布时注释掉
 */



let template = [{
  label: 'Edit ( 操作 )',
  submenu: [{
    label: 'Copy ( 复制 )',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste ( 粘贴 )',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Reload ( 重新加载 )',
    accelerator: 'CmdOrCtrl+R',
    click: function(item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function(win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }]
}, {
  label: 'Window ( 窗口 )',
  role: 'window',
  submenu: [{
    label: 'Minimize ( 最小化 )',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close ( 关闭 )',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    label: '切换开发者工具',
    accelerator: (function() {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }]
}, {
  label: 'Help ( 帮助 ) ',
  role: 'help',
  submenu: [{
    label: 'electronjs文档 ( 意见反馈 )',
    click: function() {
      shell.openExternal('https://electronjs.org/docs')
    }
  }]
}];


/**
 * 增加更新相关的菜单选项
 */
function addUpdateMenuItems(items, position) {
  if (process.mas) {
    return
  }

  const version = app.getVersion();
  let updateItems = [{
    label: `版本:${version}`,
    enabled: false
  }, {
    label: '检查更新',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: function() {
      autoUpdater.checkForUpdates();
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function() {
      autoUpdater.quitAndInstall();
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function(item) {
    if (item.submenu) {
      item.submenu.items.forEach(function(item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

// 针对Mac端的一些配置
if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: 'Quit ( 退出 )',
      accelerator: 'Command+Q',
      click: function() {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

// 针对Windows端的一些配置
if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0);
}



function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //autoHideMenuBar:true,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const entry = process.env.NODE_ENV === 'development' ? `http://localhost:8088` : `file://${__dirname}/index.html`;
  console.log(`浏览器api地址,file://${__dirname}`);

  //console.log(process.env.NODE_ENV)
  // session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
  //   console.log('details',details.method)
  //   //details.url = details.url.replace(/.*\/ntwechat\//ig, 'http://localhost:8088/ntwechat/')

  //   callback({
  //     cancel: false,
  //     url: details.url
  //   });
  // })


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../web/e-index.html'),
    protocol: 'file:',
    slashes: true
  }));
  //mainWindow.loadFile(path.join(__dirname, '../../index.html'));
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  if (mainWindow) {

    let isOpen = false;
    //Ctrl+Shift+I
    const ret = globalShortcut.register('CmdOrCtrl+U', function() {
      if (isOpen == false) {
        mainWindow.webContents.openDevTools();
        isOpen = true;
      } else {
        mainWindow.webContents.closeDevTools();
        isOpen = false;
      }
      //console.log('CmdOrCtrl+U is pressed');
    });

    if (!ret) {
      console.log('registration failed')
    }
    // 检查快捷键是否注册成功
    //console.log(globalShortcut.isRegistered('CmdOrCtrl+R'))
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  };
});
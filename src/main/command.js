const {
  globalShortcut,
  ipcMain
} = require('electron');

function listenCommander(mainWindow) {
  let isOpen = false;
  //Ctrl+Shift+I
  const ret = globalShortcut.register('CmdOrCtrl+F12', function() {
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

  //最小化
  ipcMain.on('ipcMin', function() {
    mainWindow.minimize();
  });

  //最大化
  ipcMain.on('ipcMax', function() {
    mainWindow.maximize();
  });

  //恢复
  ipcMain.on('ipcExitMax', function() {
    mainWindow.unmaximize();
  });

  //关闭
  ipcMain.on('ipcClose', function() {
    mainWindow.close();
  });

  //检查快捷键是否注册成功
  //console.log(globalShortcut.isRegistered('CmdOrCtrl+R'))
}

module.exports = {
  listenCommander: listenCommander
};
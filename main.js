const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to control keyboard shortcuts for our app
const globalShortcut = electron.globalShortcut
// Module to communicate between this main and the renderer script
const ipcMain = electron.ipcMain
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  // x:1080, y:620, focusable: false,backgroundColor: '#50FFFFFF'
  mainWindow = new BrowserWindow({width: 800, height: 600,frame: false, focusable: true,toolbar: true, transparent: true, alwaysOnTop: true})
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const ret = globalShortcut.register('CommandOrControl+B', () => {
    console.log('CommandOrControl+B is pressed')
    mainWindow.send("keyboard-shortcut", "pressed");
  })
  
  console.log("Is Ctrl+Z registered?"+globalShortcut.isRegistered('CommandOrControl+X'))

  
  if (!ret) {
    console.log('keyboard shortcut registration failed')
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.commandLine.appendSwitch('enable-transparent-visuals');
//app.commandLine.appendSwitch('disable-gpu');

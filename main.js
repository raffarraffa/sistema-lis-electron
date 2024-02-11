const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

let db = require('./database')
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), './index.js')
    }
  })

  win.loadFile('index.html');
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
ipcMain.handle('getMinBtn', () => {
   console.log('Recibido evento getMinBtn');
   win.minimize();
  });
ipcMain.handle('get', () => {
  getOrdenes();
});
ipcMain.on('toggleDrag', (event, enableDrag) => {
  win.webContents.send('toggleDrag', enableDrag);
});

ipcMain.on('minimizeWindow', () => {
  win.minimize();
});

ipcMain.on('maximizeWindow', () => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});

ipcMain.on('closeWindow', () => {
  app.quit();
});
function getOrdenes() {
  db.query("SELECT p.nombre as nombre, p.apellido as apellido, p.email as email, o.`observaciones` as observaciones, o.`createdAt` as creado FROM orden AS o JOIN paciente AS p ON p.id = o.id_paciente;", (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    console.log(results);
    win.webContents.send('ordenes', results)
  });
}






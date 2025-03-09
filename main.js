//Responsável por criar a janela do aplicativo e gerenciar processos do sistema.
//Tem acesso a módulos do Node.js, como filesystem (fs), banco de dados, etc..

const { app, BrowserWindow, ipcMain } = require('electron')
const nodePath = require('node:path')
require('dotenv').config()


const createWindow = () => {

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //icon: nodePath.join(__dirname),
        webPreferences: {
            preload: nodePath.join(__dirname, 'preload.js'),
            nodeIntegration: false
        }
    })

    win.setMenu(null)
    win.loadFile(nodePath.join(__dirname, 'src', 'pages', 'index.html'))
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('varAmbTest', () => process.env.TEST_VAR)
    app.setName('Solicitar Materiais')
    createWindow()

    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})
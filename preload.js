//Intermediário entre main.js e renderer.js
//Ajuda a evitar vulnerabilidades de segurança

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('backendMessage', {

  showMessage: () => alert('Secure message from the server!')
})

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  varAmb: () => ipcRenderer.invoke('varAmbTest')
})
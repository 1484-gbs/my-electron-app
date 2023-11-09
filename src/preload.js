const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('testapi', {
  testHoge: () => console.log(77),
  getEmployee: async (data) => await ipcRenderer.invoke('getEmployee', data),
  getPositions: async (data) => await ipcRenderer.invoke('getPositions', data),
  createExcel: async (path, data) => await ipcRenderer.invoke('createExcel', path,data)
})

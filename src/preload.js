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
  getPosition: async (data) => await ipcRenderer.invoke('getPosition', data),
  createPosition: async (data) => await ipcRenderer.invoke('createPosition', data),
  updatePosition: async (data) => await ipcRenderer.invoke('updatePosition', data),
  deletePosition: async (data) => await ipcRenderer.invoke('deletePosition', data),
  createExcel: async (data) => await ipcRenderer.invoke('createExcel', data),
  importCsv: async (data) => await ipcRenderer.invoke('importCsv', data)
})

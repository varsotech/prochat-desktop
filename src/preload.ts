import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    openURL: (url: string) => ipcRenderer.send('open-url', url),
    onDeepLink: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => ipcRenderer.on('deep-link', callback),
    envRequest: () => ipcRenderer.send('env-request'),
    envReply: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => ipcRenderer.on('env-reply', callback)
});
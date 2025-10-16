import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    openURL: (url: string) => ipcRenderer.send('open-url', url),
    onDeepLink: (callback: (event: IpcRendererEvent, message: string) => void) => ipcRenderer.on('deep-link', callback)
});
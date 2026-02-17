import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import {ElectronEnv} from "./components/ElectronEnv/ElectronEnv";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('prochat', process.execPath, [path.resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient('prochat');
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    frame: false,
    vibrancy: "sidebar",
  });

  // Load the index.html of the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

const handleDeepLink = (url: string) => {
  console.log('Received URL:', url);
  if (mainWindow) {
    mainWindow.webContents.send('deep-link', url);
  }
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handles URLs pointing to prochat:// (MacOS)
app.on('open-url', (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});


// Opens URL in a new browser window. Used for OAuth authentication.
ipcMain.on('open-url', (event, url) => {
  shell.openExternal(url).catch(error => {
    console.log("tried url", url);
    console.error(error);
  });
});

// Handles URLs pointing to prochat:// (MacOS)
ipcMain.on('env-request', (event) => {
  console.log("env requested");

  mainWindow?.webContents.send('env-reply', JSON.stringify({ isDev: !app.isPackaged } as ElectronEnv));
});


// Handle window creation
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }

    // Handles URLs pointing to prochat:// (Windows/Linux)
    handleDeepLink(commandLine.pop());
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow();
  });
}
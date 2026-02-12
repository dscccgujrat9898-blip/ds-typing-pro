const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // DevTools disable
  win.webContents.on("before-input-event", (event, input) => {
    const key = (input.key || "").toLowerCase();
    const ctrl = input.control || input.meta;
    if (key === "f12" || (ctrl && input.shift && (key === "i" || key === "j" || key === "c"))) {
      event.preventDefault();
    }
  });

  // Right-click disable
  win.webContents.on("context-menu", (e) => e.preventDefault());

  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

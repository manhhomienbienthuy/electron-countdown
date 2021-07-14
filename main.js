const { app, ipcMain, BrowserWindow, dialog } = require("electron");

let mainWin;

/**
 * Hàm dùng để khởi tạo Window
 */
const createWindow = () => {
    // Tạo Window mới với
    mainWin = new BrowserWindow({
        width: 800,
        height: 650,
        icon: "static/icon.jpeg",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Không cần menu
    mainWin.removeMenu();

    // Tải file html và hiển thị
    mainWin.loadFile("./index.html");

    // mainWin.webContents.openDevTools();
};

// Sau khi khởi động thì mở Window
app.whenReady().then(createWindow);

// Xử lý sau khi Window được đóng
app.on("window-all-closed", () => {
    app.quit();
});

// Xử lý khi app ở trạng thái active, ví dụ click vào icon
app.on("activate", () => {
    // Mở window mới khi không có window nào
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Xử lý các event được invoke từ renderer

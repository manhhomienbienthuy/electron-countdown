const { app, ipcMain, BrowserWindow, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWin;

/**
 * Hàm dùng để khởi tạo Window
 */
const createWindow = () => {
    // Tạo Window mới với
    mainWin = new BrowserWindow({
        width: 650,
        height: 440,
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
ipcMain.handle("select-folder", async () => {
    const pathObj = await dialog.showOpenDialog(mainWin, {
        properties: ["openDirectory"],
    });
    return pathObj;
});

ipcMain.handle("rename", (_, data) => {
    const randomName = (length) => {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    fs.readdir(data.folder, (_, files) => {
        files.forEach((file) => {
            oldPath = path.resolve(data.folder, file);
            ext = path.extname(file);
            newPath = path.resolve(data.folder, randomName(data.length) + ext);
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully renamed the file " + file);
                }
            });
        });
    });

    dialog.showMessageBoxSync(mainWin, {
        message: "Successfully renamed the all files in " + data.folder,
        type: "info",
    });
});

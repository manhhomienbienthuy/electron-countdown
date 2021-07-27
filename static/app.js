const { ipcRenderer } = require("electron");

document.querySelector("#folder-btn").addEventListener("click", () => {
    ipcRenderer
        .invoke("select-folder")
        .then((data) => {
            if (!data.canceled) {
                document.querySelector("#folder").value = data.filePaths[0];
            }
        })
        .catch((err) => {
            console.log(err)
        });
});

document.querySelector("#action-btn").addEventListener("click", () => {
    const folder = document.querySelector("#folder").value;
    const length = parseInt(document.querySelector("#length").value);

    ipcRenderer.invoke("rename", {folder: folder, length: length});
});

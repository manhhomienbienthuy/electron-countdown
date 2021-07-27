const builder = require("electron-builder");

builder.build({
    config: {
        appId: "electron.rename",
        productName: "SampleApp",
        win: {
            target: {
                target: "zip",
                arch: "x64",
            },
        },
    },
});

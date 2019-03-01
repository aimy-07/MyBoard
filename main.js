const { app, BrowserWindow } = require('electron');

// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト
// null にするとそのウィンドウにはアクセスできなくなる
let win;

function createWindow() {
    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadFile('index.html')
    // 起動オプションに "--debug"があれば開発者ツールを起動
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools()
    }
    // ブラウザウィンドウを閉じたときのイベントハンドラ
    win.on('closed', () => {
        win = null
    })
}

// Electronが初期化終了し、ブラウザウィンドウを作成する準備ができた時に呼び出されるメソッド
app.on('ready', createWindow)

// 全てのウィンドウオブジェクトが閉じた時に呼び出されるメソッド
app.on('window-all-closed', () => {
    // Macではウィンドウを閉じてもcmd+Qで終了するまでメインプロセスは終了しない
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // Macではウィンドウが閉じられていてもドックアイコンクリックでウィンドウを再構築する
    if (win === null) {
        createWindow()
    }
});
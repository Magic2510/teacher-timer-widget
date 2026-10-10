/* ============================================================
 * 教师课表倒计时桌面浮窗 —— 主进程 (main.js)
 * ------------------------------------------------------------
 * 职责：
 *  1. 创建「无边框 + 透明背景 + 始终置顶 + 可调整大小」的浮窗窗口
 *  2. 提供置顶切换 / 退出 的 IPC 接口
 *  3. 提供读取本地图片（自定义背景图）的 IPC 接口
 * 说明：本文件属逻辑代码，日常使用只需修改 index.html 顶部的「配置区」。
 * ============================================================ */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win = null; // 主窗口引用

function createWindow() {
  win = new BrowserWindow({
    width: 400,          // 默认宽度
    height: 900,         // 默认高度
    minWidth: 330,       // 最小宽度（小窗口适配下限）
    minHeight: 520,      // 最小高度
    frame: false,        // 无边框
    transparent: true,   // 窗口透明（页面透明，只显示圆角渐变面板）
    alwaysOnTop: true,   // 始终置顶
    resizable: true,     // 可拖动边缘调整大小
    hasShadow: true,     // 保留系统投影，增加层次感
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 隔离上下文，更安全
      nodeIntegration: false,
      spellcheck: false
    }
  });

  // 加载自包含页面（配置区在 index.html 最开头）
  win.loadFile('index.html');

  // 禁止页面内弹出任何新窗口 / 外部链接
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  /* ---------- IPC：置顶切换 ---------- */
  ipcMain.on('window:toggle-pin', () => {
    if (!win) return;
    win.setAlwaysOnTop(!win.isAlwaysOnTop());
  });

  /* ---------- IPC：退出应用 ---------- */
  ipcMain.on('window:quit', () => {
    app.quit();
  });

  /* ---------- IPC：读取本地图片转 dataURL（自定义背景图） ----------
   * 页面处于 file:// 协议，直接 <img src="E:\..."> 对中文/空格路径不稳，
   * 因此由主进程用 fs 读取并转为 base64 数据链接，最稳妥。 */
  ipcMain.handle('fs:read-image', (_event, filePath) => {
    try {
      if (!filePath || typeof filePath !== 'string') return null;
      const buf = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const mimeMap = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.bmp': 'image/bmp',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
      };
      const mime = mimeMap[ext] || 'image/png';
      return `data:${mime};base64,${buf.toString('base64')}`;
    } catch (err) {
      return null; // 文件不存在 / 无权限等 → 页面自动回退到渐变背景
    }
  });

  win.on('closed', () => { win = null; });
}

/* ---------- 单实例：防止重复开启多个浮窗 ---------- */
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(createWindow);

  // 浮窗关闭即退出（无托盘驻留）
  app.on('window-all-closed', () => app.quit());
}

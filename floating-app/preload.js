/* ============================================================
 * 教师课表倒计时桌面浮窗 —— 预加载脚本 (preload.js)
 * ------------------------------------------------------------
 * 通过 contextBridge 向页面安全地暴露最小化的桌面能力：
 *   window.desktop.togglePin()        → 通知主进程切换置顶
 *   window.desktop.quit()             → 通知主进程退出
 *   window.desktop.readImageAsDataUrl(路径) → 读取本地图片为 dataURL
 * 页面 JS 只能使用这三个接口，无法触碰 Node 全量能力，安全。
 * ============================================================ */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  /** 切换「始终置顶」开关 */
  togglePin: () => ipcRenderer.send('window:toggle-pin'),
  /** 退出应用 */
  quit: () => ipcRenderer.send('window:quit'),
  /** 读取本地图片文件并返回 dataURL；失败返回 null */
  readImageAsDataUrl: (filePath) => ipcRenderer.invoke('fs:read-image', filePath)
});

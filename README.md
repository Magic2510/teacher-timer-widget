# 教师课表倒计时桌面浮窗 (Teacher Class Schedule Countdown Widget)

一款**离线运行**的 Electron 桌面浮窗小组件，专为教师打造：无边框、背景透明、始终置顶、可拖动，自动读取电脑本地时间，秒级刷新上课 / 打卡 / 下班倒计时。

![浮窗效果-上部](浮窗效果-上部.png)
![浮窗效果-底部](浮窗效果-底部.png)

## 功能特性

- **双作息一键切换**（夏季 / 冬季）：切换后节次时间、打卡、下班时间整套联动，选择本地记住
- **顶部**：大号实时时钟 + 日期星期 + 当前作息名 + 切换按钮 + 置顶 / 退出
- **当前状态卡**：自动判断「上课中 / 集体备课中 / 休息备课 / 已下班 / 周末休息」，显示当前节次与倒计时、下一节提示
- **下一节课卡**：节次、科目、起止时间、开课倒计时（含晚自习）
- **打卡提醒**：早入校 / 上午放学 / 下午入校 / 下午放学，进入高亮时段自动亮起
- **下班进度卡**：下班时间 + 已过百分比 + 进度条 + 距下班剩余时长
- **今日课程滚动列表**：正课 + 晚自习，当前节高亮、已过变暗
- **本周课表概览**：今天一列高亮、当前节行高亮 + 科目图例
- **主题切换**：顶部圆形色块一键切换底色（含浅色主题自动切深色文字），支持自定义背景图，选择本地记住
- 无广告、无弹窗、无 emoji、不引外部字体 / CDN，CSS / JS 全内联，全程离线

## 快速开始

Windows 下直接双击 **`一键启动.bat`**：

- 自带 Electron 运行环境（`floating-app/node_modules`），无需安装 Node.js、无需联网
- 若拷贝到其他电脑缺少 `node_modules`，bat 会自动检测并提示安装 Node.js 后自动补齐依赖

### 手动方式

```bash
cd floating-app
npm install
npm start
```

## 配置课表

用记事本打开 `floating-app/index.html`，文件**最开头**的 `CONFIG` 即「配置区」：

| 配置项 | 说明 |
|---|---|
| `title` / `className` | 标题、班级名称 |
| `summer` / `winter` | 夏季 / 冬季作息：节次 `periods`、午休 `noon`、打卡 `punches`、集体备课 `meeting`、下班 `offDuty` |
| `schedule` | 周一 ~ 周五 × 9 节课表（键 1~5 = 周一~周五） |
| `evening` | 晚自习节次 + 各晚科目 |
| `subjectColors` | 科目配色（课表着色 + 图例） |
| `themes` | 顶部色块预设背景（`light:true` 为浅色主题） |
| `customBgPath` | 自定义背景图绝对路径，留空 `''` 用渐变背景 |

时间统一使用 24 小时制 `"HH:MM"`；`schedule` 中的科目名须与 `subjectColors` 键一致。

## 目录结构

```
├─ 一键启动.bat          # 双击启动
├─ 使用说明.md           # 详细使用文档
├─ 浮窗效果-*.png         # 效果截图
└─ floating-app/         # 程序本体
   ├─ main.js            # Electron 主进程（窗口、置顶、退出、读背景图）
   ├─ preload.js         # 安全桥接层
   ├─ package.json       # 依赖与启动脚本
   └─ index.html         # 浮窗页面（配置区在最开头，CSS/JS 全内联）
```

## 技术栈

- Electron（主进程 + preload 安全桥接，`contextIsolation` 开启）
- 原生 HTML / CSS / JavaScript（自包含单页，零外部依赖）
- `localStorage` 持久化用户偏好（作息、主题、背景图开关）

## License

[MIT](LICENSE)

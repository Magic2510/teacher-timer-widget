@echo off
rem ============================================================
rem  Teacher Class Schedule Countdown Widget - Launcher
rem  Double-click to start the floating widget.
rem  No Node.js / npm required when node_modules is present.
rem ============================================================
set "APP_DIR=%~dp0floating-app"
set "ELECTRON=%APP_DIR%\node_modules\electron\dist\electron.exe"

rem --- Runtime already installed: launch directly (offline) ---
if exist "%ELECTRON%" (
    start "" "%ELECTRON%" "%APP_DIR%"
    exit /b 0
)

rem --- Runtime missing: try to install via npm (needs Node.js) ---
where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Electron runtime not found.
    echo Please install Node.js from https://nodejs.org and run again,
    echo or use a complete floating-app folder that includes node_modules.
    pause
    exit /b 1
)
cd /d "%APP_DIR%"
echo [INFO] First run: installing Electron runtime, please wait...
call npm install --no-audit --no-fund --loglevel=error
if errorlevel 1 (
    echo [ERROR] Install failed. Check your network and retry.
    pause
    exit /b 1
)
start "" "%ELECTRON%" "%APP_DIR%"
exit /b 0

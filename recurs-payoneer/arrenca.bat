@echo off
chcp 65001 >nul
title Recurs 0488 - Pagaments amb Payoneer
cd /d "%~dp0"
echo ============================================================
echo   Recurs 0488 - Pagaments amb Payoneer Checkout (PratMerch)
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No trobo Node.js. Instal-la'l des de https://nodejs.org ^(versio 20 o superior^).
  pause
  exit /b 1
)

if not exist .env (
  copy .env.example .env >nul
  echo [1/3] Creat el fitxer .env ^(mode simulacio: no cal cap compte de Payoneer^)
) else (
  echo [1/3] El fitxer .env ja existeix
)

if not exist node_modules (
  echo [2/3] Instal-lant paquets ^(npm install^), nomes la primera vegada...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Ha fallat npm install.
    pause
    exit /b 1
  )
) else (
  echo [2/3] Paquets ja instal-lats
)

echo [3/3] Arrencant el servidor ^(3001^) i la web ^(5173^)...
echo        Per aturar-ho tot: Ctrl+C en aquesta finestra.
echo.
start "" cmd /c "timeout /t 5 >nul & start http://localhost:5173"
call npm run dev
pause

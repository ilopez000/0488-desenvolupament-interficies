@echo off
chcp 65001 >nul
title Recurs 0488 - Preparar la classe (login amb Google + D1)
cd /d "%~dp0"
echo ============================================================
echo   Preparar la classe: paquets + base de dades local amb dades
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No trobo Node.js. Instal-la'l des de https://nodejs.org ^(versio 20 o superior^).
  pause
  exit /b 1
)
if not exist .env copy .env.example .env >nul
findstr /C:"123456789012-exemple" .env >nul
if not errorlevel 1 (
  echo [!] El .env encara porta l'ID de client d'exemple. Posa-hi el teu VITE_GOOGLE_CLIENT_ID.
  pause
  exit /b 1
)

echo [1/3] Instal-lant paquets ^(npm install^)...
call npm install
if errorlevel 1 (
  echo [ERROR] Ha fallat npm install.
  pause
  exit /b 1
)
echo.
echo [2/3] Creant la taula users a la D1 local...
call npm run db:local
echo.
echo [3/3] Afegint 4 usuaris d'exemple ^(Marta, PauDev, Laia_DB, Nil^)...
call npm run db:exemple
echo.
echo ============================================================
echo   Llest. El dia de classe: arrenca.bat i tria l'opcio 1.
echo ============================================================
pause

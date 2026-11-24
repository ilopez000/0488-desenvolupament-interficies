@echo off
chcp 65001 >nul
title Recurs 0488 - Preparar la classe (pagaments amb Stripe)
cd /d "%~dp0"
echo ============================================================
echo   Preparar la classe: paquets de Windows + fitxer .env
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No trobo Node.js. Instal-la'l des de https://nodejs.org ^(versio 20 o superior^).
  pause
  exit /b 1
)
if not exist .env copy .env.example .env >nul

echo [1/2] Instal-lant paquets ^(npm install^)...
call npm install
if errorlevel 1 (
  echo [ERROR] Ha fallat npm install.
  pause
  exit /b 1
)
echo.
echo [2/2] Comprovant la clau de Stripe al .env...
findstr /b /c:"STRIPE_SECRET_KEY=sk_test_" .env >nul
if errorlevel 1 (
  echo   [!] Encara falta la clau. Obre el .env i enganxa la clau secreta de la
  echo       sandbox ^(sk_test_...^) darrere de STRIPE_SECRET_KEY=
) else (
  echo   Clau de proves trobada.
)
echo.
echo ============================================================
echo   Llest. El dia de classe: doble clic a arrenca.bat
echo ============================================================
pause

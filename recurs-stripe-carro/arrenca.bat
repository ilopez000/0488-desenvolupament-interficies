@echo off
chcp 65001 >nul
title Recurs 0488 - Botiga amb carro i Stripe
cd /d "%~dp0"
echo ============================================================
echo   Recurs 0488 - Botiga amb carro i Stripe
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
  echo [1/4] Creat el fitxer .env
) else (
  echo [1/4] El fitxer .env ja existeix
)

findstr /b /c:"STRIPE_SECRET_KEY=sk_test_" .env >nul
if errorlevel 1 (
  echo.
  echo [FALTA LA CLAU] Obro el fitxer .env amb el Bloc de notes.
  echo   1. Enganxa la clau secreta de la sandbox darrere de STRIPE_SECRET_KEY=
  echo   2. Desa el fitxer i torna a fer doble clic a arrenca.bat
  start "" notepad .env
  pause
  exit /b 1
)
echo [2/4] Clau de proves trobada

if not exist node_modules (
  echo [3/4] Instal-lant paquets ^(npm install^), nomes la primera vegada...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Ha fallat npm install.
    pause
    exit /b 1
  )
) else (
  echo [3/4] Paquets ja instal-lats
)

echo [4/4] Arrencant el servidor ^(3001^) i la web ^(5173^)...
echo        Per aturar-ho tot: Ctrl+C en aquesta finestra.
echo.
start "" cmd /c "timeout /t 5 >nul & start http://localhost:5173"
call npm run dev
pause

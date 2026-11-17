@echo off
chcp 65001 >nul
title Recurs 0488 - Login amb Google + Cloudflare D1
cd /d "%~dp0"
echo ============================================================
echo   Recurs 0488 - Login amb Google + Cloudflare D1 (PratPerfil)
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
  echo [!] He creat el fitxer .env. Obre'l i posa-hi el teu VITE_GOOGLE_CLIENT_ID.
)
findstr /C:"123456789012-exemple" .env >nul
if not errorlevel 1 (
  echo [!] ATENCIO: el .env encara porta l'ID de client d'exemple.
  echo     Posa-hi el teu ^(el mateix del recurs del login amb Google^) i torna a executar.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instal-lant paquets ^(npm install^), nomes la primera vegada...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Ha fallat npm install.
    pause
    exit /b 1
  )
)

echo.
echo Quina base de dades vols fer servir?
echo   1. LOCAL      - una copia de D1 a la carpeta .wrangler ^(no cal compte de Cloudflare^)
echo   2. CLOUDFLARE - la base de dades D1 de debo del teu compte de Cloudflare
choice /C 12 /N /M "Tria 1 o 2: "
if errorlevel 2 goto REMOTA

:LOCAL
echo.
echo Creant la taula users a la D1 local ^(si ja hi es, no fa res^)...
call npm run db:local
echo Arrencant http://localhost:5173 ...  ^(Ctrl+C per aturar^)
start "" cmd /c "timeout /t 6 >nul & start http://localhost:5173"
call npm run dev
goto FI

:REMOTA
echo.
call npx wrangler whoami | findstr /I /C:"not authenticated" >nul
if not errorlevel 1 (
  echo Cal entrar al teu compte de Cloudflare: s'obrira el navegador.
  call npx wrangler login
)
echo Creant la taula users a la D1 de Cloudflare ^(si et pregunta, prem Intro^)...
call npm run db:remote
echo Arrencant http://localhost:5173 amb la base de dades de Cloudflare ...  ^(Ctrl+C per aturar^)
start "" cmd /c "timeout /t 8 >nul & start http://localhost:5173"
call npm run dev:remota

:FI
pause

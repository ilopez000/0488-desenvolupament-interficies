@echo off
chcp 65001 >nul
title Recurs 0488 - Publicar a Cloudflare
cd /d "%~dp0"
echo ============================================================
echo   Publicar PratPerfil a Cloudflare (Worker + D1)
echo ============================================================
echo.
findstr /C:"00000000-0000-0000-0000-000000000000" wrangler.jsonc >nul
if not errorlevel 1 (
  echo [!] Primer crea la base de dades i posa'n l'id a wrangler.jsonc:
  echo       npx wrangler d1 create login-google-d1-db
  pause
  exit /b 1
)
if not exist node_modules call npm install

call npx wrangler whoami | findstr /I /C:"not authenticated" >nul
if not errorlevel 1 call npx wrangler login

echo [1/2] Migracions a la D1 de Cloudflare ^(si et pregunta, prem Intro^)...
call npm run db:remote
echo [2/2] Compilant i publicant...
call npm run deploy
echo.
echo Fet. Recorda afegir l'adreca https://...workers.dev que surt a dalt
echo als "Origens de JavaScript autoritzats" del client OAuth de Google Cloud.
pause

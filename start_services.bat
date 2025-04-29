@echo off
REM Avvia backend
start "Backend" cmd /k "cd Backend && dotnet run"
REM Avvia frontend
start "Frontend" cmd /k "cd frontend && npm start"
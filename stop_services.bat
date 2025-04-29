@echo off
REM Arresta il backend
for /f "tokens=2 delims==;" %%i in ('tasklist /FI "WINDOWTITLE eq Backend" /FO CSV /NH') do taskkill /PID %%~i /F
REM Arresta il frontend
for /f "tokens=2 delims==;" %%i in ('tasklist /FI "WINDOWTITLE eq Frontend" /FO CSV /NH') do taskkill /PID %%~i /F
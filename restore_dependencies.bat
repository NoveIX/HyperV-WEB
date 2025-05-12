@echo off
echo Ripristino delle dipendenze in corso...

echo.
echo === Ripristino dipendenze Frontend (React) ===
cd Frontend
echo Esecuzione di npm install...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Errore durante l'installazione delle dipendenze di React.
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo === Ripristino dipendenze Backend (.NET) ===
cd Backend
echo Esecuzione di dotnet restore...
call dotnet restore
if %ERRORLEVEL% NEQ 0 (
    echo Errore durante il ripristino delle dipendenze .NET.
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo Ripristino delle dipendenze completato con successo!
echo Ora puoi avviare l'applicazione con start_services.bat
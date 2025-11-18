@echo off
echo Cleaning up Python database files...

if exist "python_database" (
    rmdir /s /q "python_database"
    echo Deleted python_database folder
) else (
    echo python_database folder not found
)

if exist "DATABASE_INFO.md" (
    del /f /q "DATABASE_INFO.md"
    echo Deleted DATABASE_INFO.md
) else (
    echo DATABASE_INFO.md not found
)

if exist "PYTHON_DATABASE_GUIDE.md" (
    del /f /q "PYTHON_DATABASE_GUIDE.md"
    echo Deleted PYTHON_DATABASE_GUIDE.md
) else (
    echo PYTHON_DATABASE_GUIDE.md not found
)

echo.
echo Cleanup complete!
echo Listing remaining files:
dir /b

pause

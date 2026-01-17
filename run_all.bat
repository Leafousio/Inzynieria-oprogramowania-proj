@echo off
setlocal

REM ===============================
REM Paths
REM ===============================
set ROOT_DIR=%~dp0
set RESULTS_DIR=%ROOT_DIR%test_results

if not exist "%RESULTS_DIR%" mkdir "%RESULTS_DIR%"

cls
color 0F
echo ==============================================
echo   PROJECT TEST & BUILD PIPELINE
echo ==============================================
echo.

REM ===============================
REM Backend Unit Tests
REM ===============================
echo [1/4] Backend unit and component tests...
cd /d "%ROOT_DIR%backend"

pytest tests\unit_component --durations=10 ^
  -W ignore::Warning ^
  > "%RESULTS_DIR%\backend_unit_tests.txt" 2>&1

if errorlevel 1 goto :error
echo    OK

REM ===============================
REM Backend Performance Tests
REM ===============================
echo [2/4] Backend performance tests...

pytest tests\performance --durations=10 ^
  -W ignore::Warning ^
  > "%RESULTS_DIR%\backend_performance_tests.txt" 2>&1

if errorlevel 1 goto :error
echo    OK

REM ===============================
REM Backend Fuzz Tests
REM ===============================
echo [3/4] Backend fuzz tests...

pytest tests\fuzz --durations=5 --maxfail=1 ^
  -W ignore::Warning ^
  > "%RESULTS_DIR%\backend_fuzz_tests.txt" 2>&1

if errorlevel 1 goto :error
echo    OK

REM ===============================
REM Frontend Build
REM ===============================
echo [4/4] Frontend build...
cd /d "%ROOT_DIR%frontend"

npm install > "%RESULTS_DIR%\frontend_build.txt" 2>&1
if errorlevel 1 goto :error

npm run build >> "%RESULTS_DIR%\frontend_build.txt" 2>&1
if errorlevel 1 goto :error

cd /d "%ROOT_DIR%"

REM ===============================
REM SUCCESS
REM ===============================
color 0A
echo.
echo ==============================================
echo   ALL TESTS AND BUILD PASSED
echo   Results saved in test_results\
echo ==============================================
color 0F
exit /b 0

:error
REM ===============================
REM ERROR
REM ===============================
color 0C
echo.
echo ==============================================
echo   ERROR – PIPELINE STOPPED
echo   Check logs in test_results\
echo ==============================================
color 0F
exit /b 1

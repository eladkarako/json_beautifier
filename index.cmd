@echo off
set "EXIT_CODE=0"

chcp 65001 1>nul 2>nul

if ["%~1"] EQU [""] ( goto ERROR_NOARG )
if not exist "%~1"  ( goto ERROR_NOARG )
if exist "%~1\NUL"  ( goto ERROR_NOARG )

pushd "%~sdp0"

call "node.exe" "index.js" "%~1"
set "EXIT_CODE=%ErrorLevel%"

echo [INFO] success.

goto END

:ERROR_NO_ARG
  set "EXIT_CODE=111"
  echo [ERROR] please provide a text-file with JSON-content. 1>&2
  goto END
  
:END
  echo [INFO] Done.
  echo [INFO] [EXIT_CODE: %EXIT_CODE%].
  pause
  popd
  exit /b %EXIT_CODE%

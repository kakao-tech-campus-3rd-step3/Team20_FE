@echo off
echo "=== Cleaning build artifacts ==="
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo "=== Installing dependencies ==="
call npm ci

echo "=== Running lint ==="
call npm run lint
if %errorlevel% neq 0 (
    echo "Lint failed!"
    exit /b %errorlevel%
)

echo "=== Running type check ==="
call npm run type-check
if %errorlevel% neq 0 (
    echo "Type check failed!"
    exit /b %errorlevel%
)

echo "=== Running build test ==="
call npm run build
if %errorlevel% neq 0 (
    echo "Build failed!"
    exit /b %errorlevel%
)

echo "=== All tests passed! ==="
@echo off
echo ======================================
echo K6 TPS 성능 테스트 시작
echo ======================================
echo.

REM 결과 저장 디렉토리 생성
if not exist results mkdir results

REM 현재 시간
set TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo 1. Home (ISR) 테스트 실행 중...
k6 run --out json=results/home-isr-%TIMESTAMP%.json home-isr-test.js > results/home-isr-%TIMESTAMP%.txt
echo.

echo 2. Mixed SSR (Home + Content) 테스트 실행 중...
k6 run --out json=results/mixed-ssr-%TIMESTAMP%.json content-ssg-test.js > results/mixed-ssr-%TIMESTAMP%.txt
echo.

echo 3. Location (SSG) 테스트 실행 중...
k6 run --out json=results/location-ssg-%TIMESTAMP%.json location-ssg-test.js > results/location-ssg-%TIMESTAMP%.txt
echo.

echo ======================================
echo 모든 테스트 완료!
echo 결과는 results/ 디렉토리에 저장되었습니다.
echo ======================================
pause

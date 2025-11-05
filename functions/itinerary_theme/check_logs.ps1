# Cloud Function 로그 확인 스크립트

Write-Host "=== Cloud Function 로그 확인 ===" -ForegroundColor Yellow

# 최근 로그 50개 확인
Write-Host "최근 로그 50개 조회 중..." -ForegroundColor Cyan
gcloud functions logs read generate-itinerary --region=asia-northeast3 --limit=50

Write-Host "`n=== 실시간 로그 모니터링 ===" -ForegroundColor Yellow
Write-Host "실시간 로그를 보려면 다음 명령어 사용:" -ForegroundColor Green
Write-Host "gcloud functions logs tail generate-itinerary --region=asia-northeast3" -ForegroundColor White

Write-Host "`n=== 특정 시간대 로그 확인 ===" -ForegroundColor Yellow
Write-Host "특정 시간대 로그를 보려면:" -ForegroundColor Green
Write-Host "gcloud functions logs read generate-itinerary --region=asia-northeast3 --start-time=2025-11-04T17:00:00Z --end-time=2025-11-04T18:00:00Z" -ForegroundColor White

Write-Host "`n=== 에러 로그만 확인 ===" -ForegroundColor Yellow
Write-Host "에러 로그만 보려면:" -ForegroundColor Green
Write-Host "gcloud functions logs read generate-itinerary --region=asia-northeast3 --limit=50 | Select-String 'ERROR'" -ForegroundColor White
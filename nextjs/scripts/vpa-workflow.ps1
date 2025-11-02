# GKE VPA 리소스 최적화 워크플로우 스크립트 (PowerShell)
# 이 스크립트는 VPA 배포부터 추천값 확인까지 전체 과정을 자동화합니다

# 함수: 메시지 출력
function Print-Step {
    param([string]$Message)
    Write-Host "==> " -ForegroundColor Blue -NoNewline
    Write-Host $Message -ForegroundColor Green
}

function Print-Info {
    param([string]$Message)
    Write-Host "ℹ " -ForegroundColor Yellow -NoNewline
    Write-Host $Message
}

function Print-Error {
    param([string]$Message)
    Write-Host "✗ " -ForegroundColor Red -NoNewline
    Write-Host $Message
}

function Print-Success {
    param([string]$Message)
    Write-Host "✓ " -ForegroundColor Green -NoNewline
    Write-Host $Message
}

# 함수: kubectl 명령어 확인
function Check-Kubectl {
    if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
        Print-Error "kubectl이 설치되어 있지 않습니다"
        exit 1
    }
    Print-Success "kubectl 확인 완료"
}

# 함수: GKE 클러스터 연결 확인
function Check-ClusterConnection {
    try {
        kubectl cluster-info | Out-Null
        Print-Success "GKE 클러스터 연결 확인 완료"
    }
    catch {
        Print-Error "GKE 클러스터에 연결할 수 없습니다"
        Print-Info "다음 명령어로 클러스터에 연결하세요:"
        Print-Info "gcloud container clusters get-credentials [CLUSTER_NAME] --region [REGION]"
        exit 1
    }
}

# 함수: VPA 설치 확인
function Check-VpaInstalled {
    try {
        kubectl get apiservice v1.autoscaling.k8s.io | Out-Null
        Print-Success "VPA 설치 확인 완료"
    }
    catch {
        Print-Error "VPA가 클러스터에 설치되어 있지 않습니다"
        Print-Info "다음 명령어로 VPA를 활성화하세요:"
        Print-Info "gcloud container clusters update [CLUSTER_NAME] --enable-vertical-pod-autoscaling --region [REGION]"
        exit 1
    }
}

# 함수: VPA 배포
function Deploy-Vpa {
    Print-Step "VPA 리소스 배포 중..."
    kubectl apply -f k8s/vpa.yaml
    Start-Sleep -Seconds 3
    
    try {
        kubectl get vpa kspot-nextjs-vpa | Out-Null
        Print-Success "VPA 배포 완료"
        kubectl get vpa kspot-nextjs-vpa
    }
    catch {
        Print-Error "VPA 배포 실패"
        exit 1
    }
}

# 함수: VPA 상태 확인
function Check-VpaStatus {
    Print-Step "VPA 상태 확인 중..."
    kubectl describe vpa kspot-nextjs-vpa
}

# 함수: VPA 추천값 확인
function Get-VpaRecommendations {
    Print-Step "VPA 추천값 확인 중..."
    
    Write-Host ""
    Write-Host "=== VPA 추천값 ===" -ForegroundColor Cyan
    
    try {
        $recommendations = kubectl get vpa kspot-nextjs-vpa -o jsonpath='{.status.recommendation.containerRecommendations[0]}'
        if ($recommendations) {
            $recommendations | ConvertFrom-Json | ConvertTo-Json -Depth 10
        }
        else {
            Print-Info "아직 추천값이 생성되지 않았습니다"
            Print-Info "부하 테스트를 실행하고 10-15분 후에 다시 확인하세요"
        }
    }
    catch {
        Print-Info "추천값을 가져올 수 없습니다"
    }
    
    Write-Host ""
    Write-Host "=== 현재 Deployment 리소스 설정 ===" -ForegroundColor Cyan
    $resources = kubectl get deployment kspot-nextjs -o jsonpath='{.spec.template.spec.containers[0].resources}'
    $resources | ConvertFrom-Json | ConvertTo-Json -Depth 10
    
    Write-Host ""
    Write-Host "=== 현재 Pod 리소스 사용량 ===" -ForegroundColor Cyan
    try {
        kubectl top pods -l app=kspot-nextjs
    }
    catch {
        Print-Info "메트릭 서버가 준비되지 않았습니다"
    }
}

# 함수: 실시간 모니터링
function Monitor-Resources {
    Print-Step "실시간 리소스 모니터링 시작 (Ctrl+C로 종료)"
    Print-Info "Pod 리소스 사용량을 5초마다 업데이트합니다"
    
    while ($true) {
        Clear-Host
        Write-Host "=== Pod 리소스 사용량 ($(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')) ===" -ForegroundColor Cyan
        
        try {
            kubectl top pods -l app=kspot-nextjs
        }
        catch {
            Write-Host "메트릭 수집 중..."
        }
        
        Write-Host ""
        Write-Host "=== Pod 상태 ===" -ForegroundColor Cyan
        kubectl get pods -l app=kspot-nextjs
        
        Start-Sleep -Seconds 5
    }
}

# 함수: VPA 삭제
function Remove-Vpa {
    Print-Step "VPA 삭제 중..."
    kubectl delete vpa kspot-nextjs-vpa
    Print-Success "VPA 삭제 완료"
}

# 메인 메뉴
function Show-Menu {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "  GKE VPA 리소스 최적화 워크플로우" -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "1. 사전 요구사항 확인"
    Write-Host "2. VPA 배포"
    Write-Host "3. VPA 상태 확인"
    Write-Host "4. VPA 추천값 확인"
    Write-Host "5. 실시간 리소스 모니터링"
    Write-Host "6. VPA 삭제"
    Write-Host "7. 전체 워크플로우 실행"
    Write-Host "0. 종료"
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host -NoNewline "선택: "
}

# 메인 로직
function Main {
    Set-Location (Join-Path $PSScriptRoot "..")
    
    while ($true) {
        Show-Menu
        $choice = Read-Host
        
        switch ($choice) {
            "1" {
                Print-Step "사전 요구사항 확인 중..."
                Check-Kubectl
                Check-ClusterConnection
                Check-VpaInstalled
                Print-Success "모든 사전 요구사항이 충족되었습니다"
            }
            "2" {
                Deploy-Vpa
            }
            "3" {
                Check-VpaStatus
            }
            "4" {
                Get-VpaRecommendations
            }
            "5" {
                Monitor-Resources
            }
            "6" {
                Remove-Vpa
            }
            "7" {
                Print-Step "전체 워크플로우 실행"
                Check-Kubectl
                Check-ClusterConnection
                Check-VpaInstalled
                Deploy-Vpa
                Write-Host ""
                Print-Info "이제 k6 부하 테스트를 실행하세요:"
                Print-Info "  k6 run k6-load-test.js"
                Write-Host ""
                Print-Info "테스트가 완료되면 다시 이 스크립트를 실행하여 '4. VPA 추천값 확인'을 선택하세요"
            }
            "0" {
                Print-Info "종료합니다"
                exit 0
            }
            default {
                Print-Error "잘못된 선택입니다"
            }
        }
        
        Write-Host ""
        Read-Host "계속하려면 Enter를 누르세요"
    }
}

# 스크립트 실행
Main

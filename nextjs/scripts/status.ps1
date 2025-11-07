# NextJS Deployment Status Check Script

Write-Host "=== NextJS Deployment Status ===" -ForegroundColor Blue

function Show-DeploymentStatus {
    param($DeploymentName, $ServiceName, $EnvName)
    
    Write-Host "`n=== $EnvName Environment ===" -ForegroundColor Cyan
    
    # Deployment 상태
    Write-Host "Deployment Status:" -ForegroundColor Yellow
    kubectl get deployment $DeploymentName 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Deployment '$DeploymentName' not found" -ForegroundColor Red
        return
    }
    
    # Service 상태
    Write-Host "`nService Status:" -ForegroundColor Yellow
    kubectl get service $ServiceName 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Service '$ServiceName' not found" -ForegroundColor Red
        return
    }
    
    # Pod 상태
    Write-Host "`nPod Status:" -ForegroundColor Yellow
    kubectl get pods -l app=$DeploymentName 2>$null
    
    # 외부 IP 확인
    Write-Host "`nExternal Access:" -ForegroundColor Yellow
    $EXTERNAL_IP = kubectl get service $ServiceName -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null
    
    if ($EXTERNAL_IP -and $EXTERNAL_IP -ne "") {
        Write-Host "  URL: http://$EXTERNAL_IP" -ForegroundColor Green
    } else {
        Write-Host "  External IP: Pending or not available" -ForegroundColor Yellow
        Write-Host "  Check with: kubectl get service $ServiceName" -ForegroundColor Gray
    }
    
    # 최근 이벤트
    Write-Host "`nRecent Events:" -ForegroundColor Yellow
    kubectl get events --field-selector involvedObject.name=$DeploymentName --sort-by=.metadata.creationTimestamp --tail=3 2>$null
}

# GKE 클러스터 연결 확인
Write-Host "Checking GKE connection..." -ForegroundColor Yellow
kubectl cluster-info --request-timeout=5s >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Not connected to GKE cluster" -ForegroundColor Red
    Write-Host "Run: gcloud container clusters get-credentials kspot-cluster --zone asia-northeast3-a --project kspot-2025" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Connected to GKE cluster" -ForegroundColor Green

# 배포 상태 확인
Show-DeploymentStatus "kspot-nextjs" "kspot-nextjs-service" "Production"

Write-Host "`n=== Quick Commands ===" -ForegroundColor Blue
Write-Host "View logs: kubectl logs -l app=kspot-nextjs -f" -ForegroundColor Gray
Write-Host "Scale deployment: kubectl scale deployment kspot-nextjs --replicas=<number>" -ForegroundColor Gray
Write-Host "Restart deployment: kubectl rollout restart deployment kspot-nextjs" -ForegroundColor Gray
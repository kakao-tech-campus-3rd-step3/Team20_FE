# GCP 설정
$PROJECT_ID = "kspot-2025"
$CLUSTER_NAME = "kspot-cluster"
$ZONE = "asia-northeast3-a"  # Standard Zone 클러스터

Write-Host "=== GKE cluster connect ===" -ForegroundColor Blue

# GKE 클러스터 인증 정보 가져오기 (Zone 클러스터)
gcloud container clusters get-credentials $CLUSTER_NAME --zone=$ZONE --project=$PROJECT_ID

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ cluster connect failed" -ForegroundColor Red
    exit 1
}

Write-Host "✓ cluster connect complete" -ForegroundColor Green

Write-Host "=== Kubernetes resource deploy ===" -ForegroundColor Blue

# ConfigMap 적용
kubectl apply -f k8s/configmap.yaml

# Deployment 적용
kubectl apply -f k8s/deployment.yaml

# Service 적용
kubectl apply -f k8s/service.yaml

# HPA 적용
kubectl apply -f k8s/hpa.yaml

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ deploy complete" -ForegroundColor Green
} else {
    Write-Host "✗ deploy fialed" -ForegroundColor Red
    exit 1
}

Write-Host "=== deploy status check ===" -ForegroundColor Blue

# Pod 상태 확인
kubectl get pods -l app=kspot-nextjs

# Service 상태 확인
kubectl get service kspot-nextjs-service

# HPA 상태 확인
kubectl get hpa kspot-nextjs-hpa

Write-Host "=== deploy complete ===" -ForegroundColor Green
Write-Host "external IP check: kubectl get service kspot-nextjs-service" -ForegroundColor Cyan

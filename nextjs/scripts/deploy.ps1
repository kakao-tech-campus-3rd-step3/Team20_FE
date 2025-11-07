# NextJS Kubernetes Deployment Script
param(
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest"
)

# GCP 프로젝트 설정
$PROJECT_ID = "kspot-2025"
$REGION = "asia-northeast3"
$GKE_CLUSTER = "kspot-cluster"
$GKE_ZONE = "asia-northeast3-a"
$REPOSITORY = "kspot-repo"
$IMAGE_NAME = "kspot-nextjs"

Write-Host "=== NextJS Kubernetes Deployment ===" -ForegroundColor Blue
Write-Host "Image Tag: $ImageTag" -ForegroundColor Cyan

# Production 환경 설정
$DEPLOYMENT_NAME = "kspot-nextjs"
$SERVICE_NAME = "kspot-nextjs-service"
$K8S_FILES = @("k8s/configmap.yaml", "k8s/deployment.yaml", "k8s/service.yaml")

$IMAGE_FULL_PATH = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/${IMAGE_NAME}:$ImageTag"

Write-Host "=== Getting GKE credentials ===" -ForegroundColor Blue
gcloud container clusters get-credentials $GKE_CLUSTER `
    --zone $GKE_ZONE `
    --project $PROJECT_ID

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to get GKE credentials" -ForegroundColor Red
    exit 1
}

Write-Host "=== Applying Kubernetes configurations ===" -ForegroundColor Blue
foreach ($file in $K8S_FILES) {
    Write-Host "Applying $file..." -ForegroundColor Yellow
    kubectl apply -f $file
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to apply $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "=== Updating deployment image ===" -ForegroundColor Blue
kubectl set image deployment/$DEPLOYMENT_NAME `
    kspot-nextjs=$IMAGE_FULL_PATH `
    --record

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to update deployment image" -ForegroundColor Red
    exit 1
}

Write-Host "=== Waiting for rollout to complete ===" -ForegroundColor Blue
kubectl rollout status deployment/$DEPLOYMENT_NAME --timeout=300s

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Deployment rollout failed or timed out" -ForegroundColor Red
    exit 1
}

Write-Host "=== Deployment Status ===" -ForegroundColor Blue
kubectl get deployment $DEPLOYMENT_NAME
kubectl get service $SERVICE_NAME
kubectl get pods -l app=$DEPLOYMENT_NAME

# 외부 IP 확인
Write-Host "=== Getting External IP ===" -ForegroundColor Blue
$EXTERNAL_IP = kubectl get service $SERVICE_NAME -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null

if ($EXTERNAL_IP -and $EXTERNAL_IP -ne "") {
    Write-Host "✓ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "Application URL: http://$EXTERNAL_IP" -ForegroundColor Cyan
} else {
    Write-Host "✓ Deployment completed!" -ForegroundColor Green
    Write-Host "External IP is being assigned. Check later with:" -ForegroundColor Yellow
    Write-Host "kubectl get service $SERVICE_NAME" -ForegroundColor Yellow
}

Write-Host "=== Deployment Summary ===" -ForegroundColor Blue
Write-Host "Deployment: $DEPLOYMENT_NAME" -ForegroundColor Cyan
Write-Host "Service: $SERVICE_NAME" -ForegroundColor Cyan
Write-Host "Image: $IMAGE_FULL_PATH" -ForegroundColor Cyan
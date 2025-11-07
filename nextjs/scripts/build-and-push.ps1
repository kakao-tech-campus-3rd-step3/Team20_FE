# Parameters
param(
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest"
)

# GCP 프로젝트 ID 설정
$PROJECT_ID = "kspot-2025"
$REGION = "asia-northeast3"
$REPOSITORY = "kspot-repo"
$IMAGE_NAME = "kspot-nextjs"
$IMAGE_TAG = $ImageTag

Write-Host "=== Build Configuration ===" -ForegroundColor Blue
Write-Host "Image Tag: $IMAGE_TAG" -ForegroundColor Cyan

Write-Host "=== Artifact Registry check ===" -ForegroundColor Blue

# Artifact Registry 저장소가 없으면 생성
$repoExists = gcloud artifacts repositories describe $REPOSITORY `
  --location=$REGION `
  --project=$PROJECT_ID 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "no repository here making now ..." -ForegroundColor Blue
    gcloud artifacts repositories create $REPOSITORY `
      --repository-format=docker `
      --location=$REGION `
      --description="KSpot Next.js application repository" `
      --project=$PROJECT_ID
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ repository made success" -ForegroundColor Green
    } else {
        Write-Host "✗ repository made fail" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ repository check complete" -ForegroundColor Green
}

Write-Host "=== Docker image build start ===" -ForegroundColor Blue

# Docker 이미지 빌드
$IMAGE_FULL_PATH = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/${IMAGE_NAME}:$IMAGE_TAG"
docker build -t $IMAGE_FULL_PATH .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Docker image build complete" -ForegroundColor Green
} else {
    Write-Host "✗ Docker image build fail" -ForegroundColor Red
    exit 1
}

Write-Host "=== Artifact Registry push start ===" -ForegroundColor Blue

# Artifact Registry에 이미지 푸시
docker push $IMAGE_FULL_PATH

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ image push complete" -ForegroundColor Green
} else {
    Write-Host "✗ image push fail" -ForegroundColor Red
    exit 1
}

Write-Host "=== build and push complete===" -ForegroundColor Green
Write-Host "image: $IMAGE_FULL_PATH" -ForegroundColor Cyan

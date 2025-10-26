# KSpot Next.js - GKE 배포 빠른 시작

## 프로젝트 정보
- **프로젝트 ID**: kspot-2025
- **클러스터**: kspot-cluster (Standard Zone)
- **Zone**: asia-northeast3-a
- **레지스트리**: Artifact Registry (asia-northeast3)

## 빠른 배포 (PowerShell)

### 1. 사전 준비
```powershell
# GCP 로그인
gcloud auth login
gcloud config set project kspot-2025

# API 활성화
gcloud services enable container.googleapis.com artifactregistry.googleapis.com compute.googleapis.com

# Docker 인증
gcloud auth configure-docker asia-northeast3-docker.pkg.dev
```

### 2. 클러스터 생성 (최초 1회)
```powershell
gcloud container clusters create kspot-cluster `
  --zone=asia-northeast3-a `
  --num-nodes=1 `
  --machine-type=e2-medium `
  --enable-autoscaling `
  --min-nodes=1 `
  --max-nodes=3 `
  --enable-autorepair `
  --enable-autoupgrade

# 클러스터 연결
gcloud container clusters get-credentials kspot-cluster --zone=asia-northeast3-a
```

### 3. 이미지 빌드 및 푸시
```powershell
.\scripts\build-and-push.ps1
```

### 4. 배포
```powershell
.\scripts\deploy.ps1
```

### 5. 외부 IP 확인
```powershell
kubectl get service kspot-nextjs-service
```

## 주요 명령어

### 상태 확인
```powershell
# Pod 상태
kubectl get pods -l app=kspot-nextjs

# 로그 확인
kubectl logs -l app=kspot-nextjs --tail=100 -f

# HPA 상태
kubectl get hpa kspot-nextjs-hpa

# 리소스 사용량
kubectl top pods
```

### 업데이트 배포
```powershell
# 새 버전 빌드 및 푸시
.\scripts\build-and-push.ps1

# 이미지 업데이트
kubectl set image deployment/kspot-nextjs kspot-nextjs=asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:latest

# 롤아웃 상태 확인
kubectl rollout status deployment/kspot-nextjs
```

### 롤백
```powershell
kubectl rollout undo deployment/kspot-nextjs
```

## 환경 변수

현재 설정된 환경 변수:
- `NEXT_PUBLIC_KAKAO_MAP_API_KEY`: 974fe15b1f8a516653cb6536ae41b53e
- `NEXT_PUBLIC_API_BASE_URL`: https://d2d0fud3w2c5j6.cloudfront.net

환경 변수 수정: `k8s/deployment.yaml` 파일 편집 후 재배포

## 오토스케일링 설정

- **최소 복제본**: 2개
- **최대 복제본**: 3개
- **스케일 업 조건**: CPU 70% 또는 메모리 80%

## 비용 절감

### 개발 환경 일시 중지
```powershell
# 노드 수를 0으로 조정
gcloud container clusters resize kspot-cluster --num-nodes=0 --zone=asia-northeast3-a

# 재시작
gcloud container clusters resize kspot-cluster --num-nodes=1 --zone=asia-northeast3-a
```

### 클러스터 삭제
```powershell
gcloud container clusters delete kspot-cluster --zone=asia-northeast3-a
```

## 트러블슈팅

### Pod가 시작되지 않을 때
```powershell
kubectl describe pod POD_NAME
kubectl logs POD_NAME
```

### 이미지 Pull 오류
```powershell
# 권한 확인
gcloud artifacts repositories get-iam-policy kspot-repo --location=asia-northeast3

# 서비스 계정에 권한 부여
$PROJECT_NUMBER = (gcloud projects describe kspot-2025 --format="value(projectNumber)")
gcloud projects add-iam-policy-binding kspot-2025 `
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" `
  --role="roles/artifactregistry.reader"
```

## 상세 가이드

전체 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md) 참조

## 파일 구조

```
.
├── Dockerfile                    # Docker 이미지 빌드 설정
├── .dockerignore                 # Docker 빌드 제외 파일
├── k8s/
│   ├── deployment.yaml          # Pod 배포 설정 (2개 복제본)
│   ├── service.yaml             # LoadBalancer 설정
│   ├── hpa.yaml                 # 오토스케일링 설정 (2-3개)
│   ├── configmap.yaml           # 환경 변수 설정
│   └── ingress.yaml             # HTTPS/도메인 설정 (선택)
├── scripts/
│   ├── build-and-push.ps1       # 이미지 빌드/푸시 (PowerShell)
│   ├── build-and-push.sh        # 이미지 빌드/푸시 (Bash)
│   ├── deploy.ps1               # 배포 스크립트 (PowerShell)
│   └── deploy.sh                # 배포 스크립트 (Bash)
└── DEPLOYMENT.md                # 상세 배포 가이드
```

# GKE 배포 가이드 (Standard Zone + Artifact Registry)

이 문서는 Next.js 애플리케이션을 Google Kubernetes Engine(GKE) Standard Zone 클러스터에 Artifact Registry를 사용하여 배포하는 전체 과정을 설명합니다.

## 프로젝트 정보

- **프로젝트 ID**: kspot-2025
- **클러스터 타입**: Standard (Zonal)
- **Zone**: asia-northeast3-a (서울)
- **이미지 레지스트리**: Artifact Registry (GAR)
- **저장소 이름**: kspot-repo

## 사전 요구사항

1. **Google Cloud SDK 설치**
   ```powershell
   # Windows (PowerShell 관리자 권한)
   (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
   & $env:Temp\GoogleCloudSDKInstaller.exe
   ```

2. **Docker Desktop 설치**
   - https://www.docker.com/products/docker-desktop 에서 다운로드 및 설치

3. **kubectl 설치**
   ```powershell
   gcloud components install kubectl
   ```

## 1단계: GCP 프로젝트 설정

### 1.1 GCP 로그인 및 프로젝트 설정

```powershell
# GCP 로그인
gcloud auth login

# 프로젝트 설정
gcloud config set project kspot-2025

# 현재 설정 확인
gcloud config list
```

### 1.2 필요한 API 활성화

```powershell
# Container API (GKE)
gcloud services enable container.googleapis.com

# Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Compute Engine API
gcloud services enable compute.googleapis.com

# 활성화된 API 확인
gcloud services list --enabled
```

### 1.3 결제 계정 연결 확인

GCP Console에서 프로젝트에 결제 계정이 연결되어 있는지 확인:
- https://console.cloud.google.com/billing

## 2단계: Artifact Registry 저장소 생성

### 2.1 저장소 생성

```powershell
# Docker 저장소 생성
gcloud artifacts repositories create kspot-repo `
  --repository-format=docker `
  --location=asia-northeast3 `
  --description="KSpot Next.js application repository"

# 저장소 확인
gcloud artifacts repositories list --location=asia-northeast3
```

### 2.2 Docker 인증 설정

```powershell
# Artifact Registry 인증 설정
gcloud auth configure-docker asia-northeast3-docker.pkg.dev
```

## 3단계: GKE Standard Zone 클러스터 생성

### 3.1 클러스터 생성

```powershell
# Standard Zone 클러스터 생성
gcloud container clusters create kspot-cluster `
  --zone=asia-northeast3-a `
  --num-nodes=1 `
  --machine-type=e2-medium `
  --disk-size=30 `
  --enable-autoscaling `
  --min-nodes=1 `
  --max-nodes=3 `
  --enable-autorepair `
  --enable-autoupgrade `
  --addons=HorizontalPodAutoscaling,HttpLoadBalancing

# 클러스터 생성 확인 (약 5-10분 소요)
gcloud container clusters list
```

**클러스터 사양:**
- 타입: Standard (Zonal)
- Zone: asia-northeast3-a
- 노드 수: 1개 (오토스케일링: 1-3개)
- 머신 타입: e2-medium (2 vCPU, 4GB 메모리)
- 디스크: 30GB

### 3.2 클러스터 인증 정보 가져오기

```powershell
# 클러스터 연결
gcloud container clusters get-credentials kspot-cluster `
  --zone=asia-northeast3-a `
  --project=kspot-2025

# 연결 확인
kubectl cluster-info
kubectl get nodes
```

## 4단계: Docker 이미지 빌드 및 푸시

### 4.1 이미지 빌드 및 푸시 (PowerShell)

```powershell
# PowerShell 스크립트 실행
.\scripts\build-and-push.ps1
```

**또는 수동으로:**

```powershell
# 변수 설정
$PROJECT_ID = "kspot-2025"
$REGION = "asia-northeast3"
$REPOSITORY = "kspot-repo"
$IMAGE_NAME = "kspot-nextjs"
$IMAGE_TAG = "latest"

# 이미지 빌드
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG} .

# 이미지 푸시
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}
```

### 4.2 Git Bash 사용 시

```bash
# Bash 스크립트 실행
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh
```

### 4.3 이미지 확인

```powershell
# Artifact Registry에 업로드된 이미지 확인
gcloud artifacts docker images list asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo
```

## 5단계: Kubernetes 리소스 배포

### 5.1 환경 변수 확인

현재 설정된 환경 변수:
- `NEXT_PUBLIC_KAKAO_MAP_API_KEY`: 974fe15b1f8a516653cb6536ae41b53e
- `NEXT_PUBLIC_API_BASE_URL`: https://d2d0fud3w2c5j6.cloudfront.net

환경 변수는 `k8s/deployment.yaml` 파일에 이미 설정되어 있습니다.

### 5.2 리소스 배포 (PowerShell)

```powershell
# PowerShell 스크립트 실행
.\scripts\deploy.ps1
```

**또는 수동으로:**

```powershell
# ConfigMap 배포
kubectl apply -f k8s/configmap.yaml

# Deployment 배포
kubectl apply -f k8s/deployment.yaml

# Service 배포
kubectl apply -f k8s/service.yaml

# HPA 배포
kubectl apply -f k8s/hpa.yaml
```

### 5.3 Git Bash 사용 시

```bash
# Bash 스크립트 실행
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 5.4 배포 상태 확인

```powershell
# Pod 상태 확인
kubectl get pods -l app=kspot-nextjs

# Pod 로그 확인
kubectl logs -l app=kspot-nextjs --tail=100

# Service 상태 확인
kubectl get service kspot-nextjs-service

# HPA 상태 확인
kubectl get hpa kspot-nextjs-hpa

# 전체 리소스 확인
kubectl get all
```

## 6단계: 애플리케이션 접속

### 6.1 외부 IP 확인

```powershell
# Service의 외부 IP 확인 (EXTERNAL-IP가 할당될 때까지 대기)
kubectl get service kspot-nextjs-service --watch
```

외부 IP가 `<pending>` 상태에서 실제 IP로 변경될 때까지 약 1-2분 소요됩니다.

### 6.2 애플리케이션 접속

외부 IP가 할당되면 브라우저에서 접속:
```
http://EXTERNAL_IP
```

예시:
```
http://34.64.123.456
```

## 7단계: 오토스케일링 테스트

### 7.1 현재 설정

- **최소 복제본**: 2개
- **최대 복제본**: 3개
- **스케일 업 조건**: CPU 70% 또는 메모리 80%

### 7.2 부하 테스트

```powershell
# 부하 생성 Pod 실행
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh
```

Pod 내부에서 실행:
```sh
while true; do wget -q -O- http://kspot-nextjs-service; done
```

### 7.3 스케일링 모니터링

다른 PowerShell 창에서:

```powershell
# HPA 상태 실시간 확인
kubectl get hpa kspot-nextjs-hpa --watch

# Pod 개수 변화 확인
kubectl get pods -l app=kspot-nextjs --watch

# CPU/메모리 사용률 확인
kubectl top pods
```

## 8단계: 업데이트 배포

### 8.1 코드 변경 후 재배포

```powershell
# 1. 버전 태그 설정
$VERSION = "v1.0.1"

# 2. 새 이미지 빌드
docker build -t asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:$VERSION .

# 3. 이미지 푸시
docker push asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:$VERSION

# 4. Deployment 이미지 업데이트
kubectl set image deployment/kspot-nextjs kspot-nextjs=asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:$VERSION

# 5. 롤아웃 상태 확인
kubectl rollout status deployment/kspot-nextjs
```

### 8.2 롤백

```powershell
# 이전 버전으로 롤백
kubectl rollout undo deployment/kspot-nextjs

# 특정 리비전으로 롤백
kubectl rollout undo deployment/kspot-nextjs --to-revision=2

# 롤아웃 히스토리 확인
kubectl rollout history deployment/kspot-nextjs
```

## 모니터링 및 관리

### 로그 확인

```powershell
# 특정 Pod 로그 확인
kubectl logs POD_NAME

# 모든 Pod 로그 확인 (실시간)
kubectl logs -l app=kspot-nextjs --tail=100 -f

# 이전 컨테이너 로그 확인 (재시작된 경우)
kubectl logs POD_NAME --previous
```

### 리소스 사용량 확인

```powershell
# Metrics Server 설치 (필요한 경우)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Pod 리소스 사용량
kubectl top pods

# Node 리소스 사용량
kubectl top nodes
```

### Pod 내부 접속

```powershell
# Pod 내부 쉘 접속
kubectl exec -it POD_NAME -- /bin/sh

# 특정 명령 실행
kubectl exec POD_NAME -- env
```

### GCP Console에서 모니터링

1. **GKE 대시보드**: https://console.cloud.google.com/kubernetes/list
2. **Artifact Registry**: https://console.cloud.google.com/artifacts
3. **로그 탐색기**: https://console.cloud.google.com/logs

## 비용 최적화

### 현재 예상 비용 (월간)

- **GKE Standard Zone 클러스터**: 무료 (관리 비용 없음)
- **e2-medium 노드 1개**: 약 $24/월
- **LoadBalancer**: 약 $18/월
- **Artifact Registry 스토리지**: 0.5GB 무료, 이후 $0.10/GB
- **총 예상 비용**: 약 $42-50/월

### 비용 절감 방법

1. **개발 환경 클러스터 일시 중지**
   ```powershell
   # 클러스터 삭제
   gcloud container clusters delete kspot-cluster --zone=asia-northeast3-a
   
   # 필요시 재생성
   # (3단계 참조)
   ```

2. **노드 풀 크기 조정**
   ```powershell
   # 노드 수 조정
   gcloud container clusters resize kspot-cluster --num-nodes=0 --zone=asia-northeast3-a
   ```

3. **Preemptible VM 사용** (개발 환경)
   ```powershell
   # Preemptible 노드 풀 추가 (약 80% 저렴)
   gcloud container node-pools create preemptible-pool `
     --cluster=kspot-cluster `
     --zone=asia-northeast3-a `
     --preemptible `
     --machine-type=e2-medium `
     --num-nodes=1
   ```

### 리소스 정리

```powershell
# 모든 Kubernetes 리소스 삭제
kubectl delete -f k8s/

# 특정 리소스만 삭제
kubectl delete deployment kspot-nextjs
kubectl delete service kspot-nextjs-service
kubectl delete hpa kspot-nextjs-hpa

# 클러스터 삭제
gcloud container clusters delete kspot-cluster --zone=asia-northeast3-a

# Artifact Registry 저장소 삭제
gcloud artifacts repositories delete kspot-repo --location=asia-northeast3
```

## 트러블슈팅

### Pod가 시작되지 않는 경우

```powershell
# Pod 상세 정보 확인
kubectl describe pod POD_NAME

# 이벤트 확인
kubectl get events --sort-by=.metadata.creationTimestamp

# Pod 로그 확인
kubectl logs POD_NAME
```

### 이미지 Pull 오류

```powershell
# Artifact Registry 권한 확인
gcloud artifacts repositories get-iam-policy kspot-repo --location=asia-northeast3

# GKE 서비스 계정에 권한 부여
gcloud projects add-iam-policy-binding kspot-2025 `
  --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com `
  --role=roles/artifactregistry.reader

# 프로젝트 번호 확인
gcloud projects describe kspot-2025 --format="value(projectNumber)"
```

### LoadBalancer IP가 할당되지 않는 경우

```powershell
# Service 상세 정보 확인
kubectl describe service kspot-nextjs-service

# 방화벽 규칙 확인
gcloud compute firewall-rules list

# 외부 IP 할당 확인
gcloud compute addresses list
```

### HPA가 작동하지 않는 경우

```powershell
# Metrics Server 상태 확인
kubectl get deployment metrics-server -n kube-system

# HPA 상세 정보 확인
kubectl describe hpa kspot-nextjs-hpa

# Pod 메트릭 확인
kubectl top pods
```

### 환경 변수가 적용되지 않는 경우

```powershell
# Pod 환경 변수 확인
kubectl exec POD_NAME -- env | grep NEXT_PUBLIC

# Deployment 재시작
kubectl rollout restart deployment/kspot-nextjs
```

## 보안 권장사항

### 1. Secret 사용

민감한 정보는 환경 변수 대신 Secret 사용:

```powershell
# Secret 생성
kubectl create secret generic kspot-secrets `
  --from-literal=kakao-api-key=974fe15b1f8a516653cb6536ae41b53e

# Deployment에서 Secret 사용
# k8s/deployment.yaml 수정:
# env:
# - name: NEXT_PUBLIC_KAKAO_MAP_API_KEY
#   valueFrom:
#     secretKeyRef:
#       name: kspot-secrets
#       key: kakao-api-key
```

### 2. Network Policy 설정

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: kspot-network-policy
spec:
  podSelector:
    matchLabels:
      app: kspot-nextjs
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector: {}
    ports:
    - protocol: TCP
      port: 3000
```

### 3. 이미지 취약점 스캔

```powershell
# Artifact Registry 자동 스캔 활성화
gcloud artifacts repositories update kspot-repo `
  --location=asia-northeast3 `
  --enable-vulnerability-scanning

# 이미지 취약점 확인
gcloud artifacts docker images scan asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:latest
```

### 4. RBAC 설정

최소 권한 원칙 적용:

```yaml
# k8s/rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kspot-sa
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: kspot-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list"]
```

## CI/CD 통합

### GitHub Actions 예시

```yaml
# .github/workflows/deploy.yml
name: Deploy to GKE

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Cloud SDK
      uses: google-github-actions/setup-gcloud@v1
      with:
        project_id: kspot-2025
        service_account_key: ${{ secrets.GCP_SA_KEY }}
    
    - name: Configure Docker
      run: gcloud auth configure-docker asia-northeast3-docker.pkg.dev
    
    - name: Build and Push
      run: |
        docker build -t asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:${{ github.sha }} .
        docker push asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:${{ github.sha }}
    
    - name: Deploy to GKE
      run: |
        gcloud container clusters get-credentials kspot-cluster --zone=asia-northeast3-a
        kubectl set image deployment/kspot-nextjs kspot-nextjs=asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:${{ github.sha }}
```

## 추가 리소스

- [GKE 공식 문서](https://cloud.google.com/kubernetes-engine/docs)
- [Artifact Registry 문서](https://cloud.google.com/artifact-registry/docs)
- [Kubernetes 공식 문서](https://kubernetes.io/docs/)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

## 요약

이제 다음과 같은 구성이 완료되었습니다:

✅ **Standard Zone 클러스터** (asia-northeast3-a)
✅ **Artifact Registry** 사용 (kspot-repo)
✅ **기본 2개의 Pod**로 시작
✅ **CPU/메모리 사용률**에 따라 최대 3개까지 자동 스케일링
✅ **LoadBalancer**를 통한 외부 접근
✅ **환경 변수** 설정 완료
  - NEXT_PUBLIC_KAKAO_MAP_API_KEY
  - NEXT_PUBLIC_API_BASE_URL
✅ **무중단 배포** 지원
✅ **Health Check** 설정

## 빠른 배포 순서

```powershell
# 1. GCP 로그인 및 설정
gcloud auth login
gcloud config set project kspot-2025

# 2. API 활성화
gcloud services enable container.googleapis.com artifactregistry.googleapis.com

# 3. 클러스터 생성
gcloud container clusters create kspot-cluster --zone=asia-northeast3-a --num-nodes=1 --machine-type=e2-medium --enable-autoscaling --min-nodes=1 --max-nodes=3

# 4. Docker 인증
gcloud auth configure-docker asia-northeast3-docker.pkg.dev

# 5. 이미지 빌드 및 푸시
.\scripts\build-and-push.ps1

# 6. 배포
.\scripts\deploy.ps1

# 7. 외부 IP 확인
kubectl get service kspot-nextjs-service
```

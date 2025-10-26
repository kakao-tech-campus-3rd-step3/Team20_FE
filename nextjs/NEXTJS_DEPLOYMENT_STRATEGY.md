# Next.js 프로덕션 배포 전략: Docker 멀티 스테이지 빌드와 Kubernetes

## 개요

이 문서는 Next.js 애플리케이션을 프로덕션 환경에 배포하기 위한 최적화된 전략을 다룹니다. Docker 멀티 스테이지 빌드를 통한 이미지 최적화와 Kubernetes를 활용한 확장 가능한 배포 아키텍처를 중심으로 설명합니다.

## 1. Docker 멀티 스테이지 빌드 전략

### 1.1 멀티 스테이지 빌드의 핵심 원리

멀티 스테이지 빌드는 최종 프로덕션 이미지에 불필요한 빌드 도구와 의존성을 포함하지 않아 이미지 크기를 대폭 줄이는 기법입니다.

### 1.2 4단계 빌드 프로세스

#### Stage 1: Base (기본 이미지)
```dockerfile
FROM node:22-alpine AS base
```

**핵심 포인트:**
- `alpine` 리눅스 사용으로 기본 이미지 크기 최소화 (약 5MB)
- Node.js 22 LTS 버전 사용으로 최신 성능 최적화 활용
- 모든 후속 스테이지의 기반이 되는 공통 레이어

#### Stage 2: Dependencies (의존성 설치)
```dockerfile
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
```

**핵심 포인트:**
- `npm ci`를 사용하여 `package-lock.json` 기반의 정확한 버전 설치
- `npm install` 대신 `npm ci` 사용으로 빌드 속도 향상 및 재현성 보장
- `libc6-compat` 추가로 alpine 환경에서의 호환성 확보
- 의존성만 별도 레이어로 분리하여 Docker 캐시 효율성 극대화

**캐싱 전략:**
- `package.json`이 변경되지 않으면 이 레이어는 재사용됨
- 소스 코드 변경 시에도 의존성 재설치 불필요

#### Stage 3: Builder (애플리케이션 빌드)
```dockerfile
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build
```

**핵심 포인트:**
- 이전 스테이지의 `node_modules`를 복사하여 재사용
- 전체 소스 코드를 복사하여 빌드 수행
- `NODE_ENV=production` 설정으로 프로덕션 최적화 활성화
- Next.js 빌드 결과물 생성 (`.next` 디렉토리)

**Next.js 빌드 최적화:**
- Standalone 출력 모드 사용 (next.config.js에서 설정 필요)
- 정적 파일과 서버 코드 분리
- 트리 쉐이킹으로 불필요한 코드 제거

#### Stage 4: Runner (프로덕션 실행)
```dockerfile
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

**핵심 포인트:**
- 빌드 도구와 소스 코드 제외, 실행에 필요한 파일만 포함
- 비특권 사용자(`nextjs`)로 실행하여 보안 강화
- Standalone 모드의 `server.js`로 경량 서버 실행
- 최종 이미지 크기: 약 150-200MB (일반 빌드 대비 70% 감소)

### 1.3 빌드 결과물 분리 전략

**3가지 핵심 결과물:**

1. **Public 정적 파일** (`/app/public`)
   - 이미지, 폰트 등 변경되지 않는 정적 자산
   - CDN 배포 가능

2. **Standalone 서버** (`/app/.next/standalone`)
   - 최소한의 의존성만 포함된 서버 코드
   - `server.js`를 통한 독립 실행 가능
   - 불필요한 `node_modules` 제외

3. **정적 빌드 파일** (`/app/.next/static`)
   - 클라이언트 사이드 JavaScript 번들
   - CSS, 이미지 최적화 파일
   - 빌드 시 생성된 해시 파일명으로 캐싱 최적화

**분리의 이점:**
- 각 레이어를 독립적으로 캐싱 가능
- 정적 파일은 CDN으로 분리 배포 가능
- 서버 코드만 업데이트 시 정적 파일 재배포 불필요

## 2. Kubernetes 배포 전략

### 2.1 Deployment 구성

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kspot-nextjs
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: kspot-nextjs
        image: asia-northeast3-docker.pkg.dev/kspot-2025/kspot-repo/kspot-nextjs:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

**핵심 전략:**

#### 리소스 관리
- **Requests**: 최소 보장 리소스 (스케줄링 기준)
  - CPU 250m (0.25 코어): 일반적인 Next.js 앱의 기본 요구사항
  - Memory 256Mi: Standalone 모드의 최소 메모리
  
- **Limits**: 최대 사용 가능 리소스
  - CPU 500m: 트래픽 급증 시 대응
  - Memory 512Mi: OOM 방지를 위한 버퍼

#### 복제본 전략
- 최소 2개 복제본으로 고가용성 확보
- 롤링 업데이트 시 무중단 배포 가능
- 하나의 Pod 장애 시에도 서비스 지속

### 2.2 Health Check 전략

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 3
```

**Liveness Probe (생존 확인):**
- 컨테이너가 정상 작동 중인지 확인
- 실패 시 컨테이너 재시작
- `initialDelaySeconds: 30`: Next.js 서버 시작 시간 고려
- `failureThreshold: 3`: 3번 연속 실패 시 재시작

**Readiness Probe (준비 상태 확인):**
- 트래픽을 받을 준비가 되었는지 확인
- 실패 시 서비스 엔드포인트에서 제외 (재시작 없음)
- 더 짧은 `initialDelaySeconds`로 빠른 트래픽 수신

**차이점의 중요성:**
- Liveness는 "죽었는가?"를 확인
- Readiness는 "준비되었는가?"를 확인
- 분리 운영으로 불필요한 재시작 방지

### 2.3 Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: kspot-nextjs-hpa
spec:
  minReplicas: 2
  maxReplicas: 3
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        averageUtilization: 80
```

**자동 스케일링 전략:**

#### 스케일 아웃 조건
- CPU 사용률 70% 초과
- 메모리 사용률 80% 초과
- 두 조건 중 하나라도 만족 시 스케일 아웃

#### 스케일링 동작 제어
```yaml
behavior:
  scaleUp:
    stabilizationWindowSeconds: 60
    policies:
    - type: Percent
      value: 50
      periodSeconds: 60
  scaleDown:
    stabilizationWindowSeconds: 300
```

**핵심 포인트:**
- **Scale Up**: 60초 안정화 기간으로 급격한 증가 방지
- **Scale Down**: 300초(5분) 대기로 플래핑(flapping) 방지
- 50% 증가 정책: 한 번에 최대 50%까지만 증가
- 점진적 스케일링으로 비용 최적화

### 2.4 Service 구성

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kspot-nextjs-service
spec:
  type: LoadBalancer
  selector:
    app: kspot-nextjs
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  sessionAffinity: ClientIP
```

**핵심 전략:**
- **LoadBalancer 타입**: GKE에서 자동으로 외부 IP 할당
- **포트 매핑**: 외부 80 → 내부 3000
- **SessionAffinity**: 동일 클라이언트를 같은 Pod로 라우팅
  - WebSocket 연결 유지
  - 세션 기반 애플리케이션 지원

### 2.5 Ingress 전략 (선택사항)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kspot-nextjs-ingress
  annotations:
    kubernetes.io/ingress.class: "gce"
spec:
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: kspot-nextjs-service
            port:
              number: 80
```

**LoadBalancer vs Ingress:**

| 특성 | LoadBalancer | Ingress |
|------|--------------|---------|
| 비용 | 서비스당 별도 비용 | 여러 서비스 공유 |
| SSL/TLS | 별도 설정 필요 | 자동 인증서 관리 가능 |
| 도메인 라우팅 | 불가 | 경로/호스트 기반 라우팅 |
| 사용 시나리오 | 단일 서비스 | 다중 서비스, HTTPS 필요 시 |

## 3. CI/CD 파이프라인

### 3.1 빌드 및 푸시 스크립트

**PowerShell 버전 (Windows):**
```powershell
$PROJECT_ID = "kspot-2025"
$REGION = "asia-northeast3"
$REPOSITORY = "kspot-repo"
$IMAGE_NAME = "kspot-nextjs"
$IMAGE_TAG = "latest"

# 1. Artifact Registry 저장소 확인/생성
# 2. Docker 이미지 빌드
# 3. Artifact Registry에 푸시
```

**핵심 단계:**

1. **저장소 확인**
   - Artifact Registry 존재 여부 확인
   - 없으면 자동 생성

2. **이미지 빌드**
   - 멀티 스테이지 Dockerfile 실행
   - 레이어 캐싱 활용

3. **이미지 푸시**
   - GCP Artifact Registry에 업로드
   - 버전 태깅 (latest, semantic version)

### 3.2 배포 스크립트

```powershell
# kubectl apply로 Kubernetes 리소스 배포
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# 롤링 업데이트 강제 실행
kubectl rollout restart deployment/kspot-nextjs
```

**배포 전략:**
- **롤링 업데이트**: 무중단 배포
- **순차적 리소스 적용**: Deployment → Service → HPA
- **롤아웃 상태 확인**: `kubectl rollout status`

## 4. 최적화 체크리스트

### 4.1 Docker 이미지 최적화
- ✅ Alpine 리눅스 사용
- ✅ 멀티 스테이지 빌드로 레이어 분리
- ✅ `.dockerignore`로 불필요한 파일 제외
- ✅ Standalone 출력 모드 활성화
- ✅ 비특권 사용자로 실행

### 4.2 Kubernetes 최적화
- ✅ 리소스 requests/limits 설정
- ✅ Liveness/Readiness Probe 구성
- ✅ HPA로 자동 스케일링
- ✅ 최소 2개 복제본으로 고가용성
- ✅ SessionAffinity 설정

### 4.3 보안 강화
- ✅ 비root 사용자 실행
- ✅ 읽기 전용 파일 시스템 (선택)
- ✅ 환경 변수로 민감 정보 관리
- ✅ 이미지 취약점 스캔

## 5. 모니터링 및 로깅

### 5.1 권장 도구
- **Prometheus + Grafana**: 메트릭 수집 및 시각화
- **ELK Stack**: 로그 집계 및 분석
- **Google Cloud Monitoring**: GKE 네이티브 모니터링

### 5.2 주요 모니터링 지표
- Pod CPU/메모리 사용률
- 요청 응답 시간
- 에러율
- HPA 스케일링 이벤트
- 컨테이너 재시작 횟수

## 6. 트러블슈팅

### 6.1 일반적인 문제

**이미지 빌드 실패**
- `node_modules` 캐시 문제: `docker build --no-cache` 사용
- 메모리 부족: Docker Desktop 메모리 할당 증가

**Pod 시작 실패**
- Liveness Probe 실패: `initialDelaySeconds` 증가
- 이미지 풀 에러: Artifact Registry 권한 확인

**성능 저하**
- 리소스 제한 도달: HPA 설정 조정
- 메모리 누수: Node.js 힙 덤프 분석

## 결론

이 배포 전략은 다음을 달성합니다:

1. **효율성**: 멀티 스테이지 빌드로 70% 이미지 크기 감소
2. **확장성**: HPA로 트래픽에 따른 자동 스케일링
3. **안정성**: Health Check와 롤링 업데이트로 무중단 배포
4. **보안**: 비특권 사용자 실행 및 최소 권한 원칙
5. **비용 최적화**: 리소스 효율적 사용과 자동 스케일 다운

Next.js의 Standalone 모드와 Kubernetes의 강력한 오케스트레이션 기능을 결합하여 프로덕션 환경에 최적화된 배포 파이프라인을 구축할 수 있습니다.

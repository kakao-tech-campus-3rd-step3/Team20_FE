#!/bin/bash

# GCP 설정
PROJECT_ID="kspot-2025"
CLUSTER_NAME="kspot-cluster"
ZONE="asia-northeast3-a"  # Standard Zone 클러스터

# 색상 코드
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GKE 클러스터 연결 ===${NC}"

# GKE 클러스터 인증 정보 가져오기 (Zone 클러스터)
gcloud container clusters get-credentials ${CLUSTER_NAME} --zone=${ZONE} --project=${PROJECT_ID}

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ 클러스터 연결 실패${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 클러스터 연결 완료${NC}"

echo -e "${BLUE}=== Kubernetes 리소스 배포 ===${NC}"

# ConfigMap 적용
kubectl apply -f k8s/configmap.yaml

# Deployment 적용
kubectl apply -f k8s/deployment.yaml

# Service 적용
kubectl apply -f k8s/service.yaml

# HPA 적용
kubectl apply -f k8s/hpa.yaml

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 배포 완료${NC}"
else
    echo -e "${RED}✗ 배포 실패${NC}"
    exit 1
fi

echo -e "${BLUE}=== 배포 상태 확인 ===${NC}"

# Pod 상태 확인
kubectl get pods -l app=kspot-nextjs

# Service 상태 확인
kubectl get service kspot-nextjs-service

# HPA 상태 확인
kubectl get hpa kspot-nextjs-hpa

echo -e "${GREEN}=== 배포 완료 ===${NC}"
echo -e "${BLUE}외부 IP 확인: kubectl get service kspot-nextjs-service${NC}"

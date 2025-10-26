#!/bin/bash

# GCP 프로젝트 ID 설정
PROJECT_ID="kspot-2025"
REGION="asia-northeast3"
REPOSITORY="kspot-repo"
IMAGE_NAME="kspot-nextjs"
IMAGE_TAG="latest"

# 색상 코드
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Artifact Registry 저장소 확인 ===${NC}"

# Artifact Registry 저장소가 없으면 생성
gcloud artifacts repositories describe ${REPOSITORY} \
  --location=${REGION} \
  --project=${PROJECT_ID} > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${BLUE}저장소가 없습니다. 생성 중...${NC}"
    gcloud artifacts repositories create ${REPOSITORY} \
      --repository-format=docker \
      --location=${REGION} \
      --description="KSpot Next.js application repository" \
      --project=${PROJECT_ID}
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 저장소 생성 완료${NC}"
    else
        echo -e "${RED}✗ 저장소 생성 실패${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ 저장소 확인 완료${NC}"
fi

echo -e "${BLUE}=== Docker 이미지 빌드 시작 ===${NC}"

# Docker 이미지 빌드
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker 이미지 빌드 완료${NC}"
else
    echo -e "${RED}✗ Docker 이미지 빌드 실패${NC}"
    exit 1
fi

echo -e "${BLUE}=== Artifact Registry에 이미지 푸시 시작 ===${NC}"

# Artifact Registry에 이미지 푸시
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 이미지 푸시 완료${NC}"
else
    echo -e "${RED}✗ 이미지 푸시 실패${NC}"
    exit 1
fi

echo -e "${GREEN}=== 빌드 및 푸시 완료 ===${NC}"
echo -e "이미지: ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}"

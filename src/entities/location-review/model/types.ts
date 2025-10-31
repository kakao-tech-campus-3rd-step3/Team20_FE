export interface LocationReview {
  reviewId: number;
  locationId: number;
  userId: number;
  title: string;
  detail: string;
  rating: number;
}

export interface LocationReviewsResponse {
  locationReviews: LocationReview[];
  pagination: {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface CreateLocationReviewRequest {
  title: string;
  rating: number; // 1~5 정수
  detail?: string;
}

export type CreateLocationReviewResponse = LocationReview;

// 삭제 응답은 서버 예시에 따라 리뷰 개체를 반환하므로 동일 타입 사용
export type DeleteLocationReviewResponse = LocationReview;

export interface UpdateLocationReviewRequest {
  locationId: number; // 서버 요구사항에 따라 필요
  title: string;
  detail: string;
  rating: number; // 1~5 정수
}

export type UpdateLocationReviewResponse = LocationReview;

export interface LocationReview {
  reviewId: number;
  locationId: number;
  userId: number;
  title: string;
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

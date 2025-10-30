import type { LocationReview } from '@/entities/location-review/model/types';
import { useState } from 'react';
import { useCreateLocationReview, useDeleteLocationReview } from '@/entities/location-review';
import type { LocationReviewsProps } from '../model/types';
import { useAuth } from '@/shared/lib/auth';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: LocationReview }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
          {review.title}
        </h3>
        <StarRating rating={review.rating} />
      </div>
      <div className="text-xs sm:text-sm text-gray-500">
        리뷰 ID: {review.reviewId} | 사용자 ID: {review.userId}
      </div>
    </div>
  );
};

export const LocationReviews = ({
  reviews,
  isLoading,
  locationId,
}: LocationReviewsProps & { locationId: string }) => {
  const { isLoggedIn, user } = useAuth();
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const { mutate: createReview, isPending } = useCreateLocationReview(locationId);
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteLocationReview(locationId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createReview(
      { title: title.trim(), rating, detail: content.trim() || undefined },
      {
        onSuccess: () => {
          setTitle('');
          setRating(5);
          setContent('');
        },
      },
    );
  };
  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">리뷰</h2>
        </div>
        <div className="grid gap-4 sm:gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">리뷰</h2>
        </div>
        {isLoggedIn ? (
          <ReviewForm
            title={title}
            setTitle={setTitle}
            rating={rating}
            setRating={setRating}
            content={content}
            setContent={setContent}
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <p className="text-sm text-gray-700">리뷰를 작성하려면 로그인이 필요합니다.</p>
          </div>
        )}
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">아직 리뷰가 없습니다</h3>
          <p className="text-gray-500 text-sm">이 장소의 첫 번째 리뷰를 작성해보세요!</p>
        </div>
      </section>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">리뷰</h2>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviews.length}개 리뷰)
            </span>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <ReviewForm
          title={title}
          setTitle={setTitle}
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-sm text-gray-700">리뷰를 작성하려면 로그인이 필요합니다.</p>
        </div>
      )}
      <div className="grid gap-4 sm:gap-6">
        {reviews.map((review) => {
          const isOwner = user && String(review.userId) === user.userId;
          console.log('user', user, review.userId, isOwner);
          return (
            <div key={review.reviewId} className="relative">
              <ReviewCard review={review} />
              {isOwner && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('이 리뷰를 삭제하시겠습니까?')) {
                      deleteReview(review.reviewId);
                    }
                  }}
                  disabled={isDeleting}
                  className="absolute top-2 right-2 text-xs sm:text-sm text-red-600 hover:underline disabled:opacity-60"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ReviewForm = ({
  title,
  setTitle,
  rating,
  setRating,
  content,
  setContent,
  isPending,
  onSubmit,
}: {
  title: string;
  setTitle: (v: string) => void;
  rating: number;
  setRating: (n: number) => void;
  content: string;
  setContent: (v: string) => void;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-3"
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="리뷰 제목을 입력하세요"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}점
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md disabled:opacity-60"
        >
          {isPending ? '등록 중...' : '리뷰 등록'}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰 내용을 입력하세요"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
    </form>
  );
};

import type { LocationDetail, RelatedContent } from '@/entities/location';
import type { LocationReview } from '@/entities/location-review';

export interface LocationDescriptionProps {
  description: string;
  quickFacts: QuickFact[];
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface LocationHeroProps {
  location: LocationDetail;
}

export interface LocationRelatedContentsProps {
  relatedContents: RelatedContent[];
}

export interface LocationReviewsProps {
  reviews: LocationReview[];
  isLoading?: boolean;
  locationId: string;
}

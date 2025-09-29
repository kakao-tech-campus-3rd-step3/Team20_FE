import type { LocationDetail, RelatedContent } from '@/entities/location';

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

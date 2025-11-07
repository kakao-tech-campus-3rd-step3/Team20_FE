// 여행 일정 관련 타입 정의

export interface TransportHub {
    id: string;
    name: string;
    region: string;
}

export interface ItineraryRequest {
    departure_hub: string;
    arrival_hub: string;
    duration: '당일' | '1박2일' | '2박3일';
    theme: 'all' | 'drama' | 'movie' | 'pop';
}

export interface SelectedContent {
    content_id: number;
    title: string;
    category: string;
    reason: string;
    locations_count: number;
}

export interface ItineraryLocation {
    time: string;
    location_id?: number;
    location_name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    content_id?: number;
    content_title?: string;
    scene?: string;
    duration?: string;
    activities?: string[];
    tips?: string;
    type?: 'meal' | 'transportation';
    restaurant?: string;
    menu?: string;
    estimated_cost?: string;
    description?: string;
    estimated_time?: string;
}

export interface ItineraryDay {
    [key: string]: ItineraryLocation[];
}

export interface ItinerarySummary {
    total_locations: number;
    total_distance_km: number;
    transportation: string;
    estimated_cost_per_person: string;
    best_season: string;
}

export interface ItineraryMetadata {
    departure: TransportHub;
    arrival: TransportHub;
    duration: string;
    theme: string;
}

export interface ItineraryResponse {
    success: boolean;
    data?: {
        selected_contents: SelectedContent[];
        itinerary: ItineraryDay;
        summary: ItinerarySummary;
        metadata: ItineraryMetadata;
    };
    error?: string;
}

export interface LoadingStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    duration: number; // 예상 소요 시간 (초)
}
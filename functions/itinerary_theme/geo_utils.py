"""
Geographic utilities for distance calculations and region extraction.

This module provides functions for:
- Haversine distance calculation between coordinates
- Korean region extraction from addresses
- Distance-based location filtering with optimization
"""

import math
import re


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two coordinates using Haversine formula.
    
    The Haversine formula calculates the great-circle distance between two points
    on a sphere given their longitudes and latitudes.
    
    Args:
        lat1 (float): Latitude of first point in degrees
        lon1 (float): Longitude of first point in degrees
        lat2 (float): Latitude of second point in degrees
        lon2 (float): Longitude of second point in degrees
        
    Returns:
        float: Distance in kilometers
        
    Examples:
        >>> calculate_distance(37.5665, 126.9780, 35.1796, 129.0756)
        325.8  # Seoul to Busan approximately
        
        >>> calculate_distance(37.5665, 126.9780, 37.5665, 126.9780)
        0.0  # Same location
    """
    # Handle edge case: same location
    if lat1 == lat2 and lon1 == lon2:
        return 0.0
    
    # Earth radius in kilometers
    R = 6371.0
    
    # Convert degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    
    return distance


def extract_region(address):
    """
    Extract region name from Korean address.
    
    Supports all 17 major Korean administrative areas including special cities,
    metropolitan cities, provinces, and special autonomous regions.
    
    Args:
        address (str): Full Korean address
        
    Returns:
        str: Region name (e.g., "서울", "부산", "경기") or None if not found
        
    Examples:
        >>> extract_region("서울특별시 강남구 테헤란로")
        "서울"
        
        >>> extract_region("부산광역시 해운대구")
        "부산"
        
        >>> extract_region("경기도 수원시")
        "경기"
        
        >>> extract_region("제주특별자치도 제주시")
        "제주"
    """
    if not address:
        return None
    
    # Pattern list for all 17 Korean regions
    # Order matters: check full names before abbreviated forms
    patterns = [
        (r'^서울특별시|^서울', '서울'),
        (r'^부산광역시|^부산', '부산'),
        (r'^인천광역시|^인천', '인천'),
        (r'^대구광역시|^대구', '대구'),
        (r'^대전광역시|^대전', '대전'),
        (r'^광주광역시|^광주', '광주'),
        (r'^울산광역시|^울산', '울산'),
        (r'^세종특별자치시|^세종', '세종'),
        (r'^경기도|^경기', '경기'),
        (r'^강원특별자치도|^강원도|^강원', '강원'),
        (r'^충청북도|^충북', '충북'),
        (r'^충청남도|^충남', '충남'),
        (r'^전북특별자치도|^전라북도|^전북', '전북'),
        (r'^전라남도|^전남', '전남'),
        (r'^경상북도|^경북', '경북'),
        (r'^경상남도|^경남', '경남'),
        (r'^제주특별자치도|^제주', '제주'),
    ]
    
    for pattern, region in patterns:
        if re.search(pattern, address):
            return region
    
    return None


def preliminary_distance_filter(target_lat, target_lon, locations, threshold=0.5):
    """
    Fast preliminary filter using latitude/longitude difference.
    
    This function performs a quick approximation check before expensive Haversine
    calculations. It filters out locations that are definitely too far based on
    simple coordinate difference.
    
    Args:
        target_lat (float): Target latitude in degrees
        target_lon (float): Target longitude in degrees
        locations (list[dict]): List of location dictionaries with 'latitude' and 'longitude'
        threshold (float): Maximum degree difference (default: 0.5 degrees ≈ 55km)
        
    Returns:
        list[dict]: Filtered locations that pass preliminary check
        
    Note:
        This is an optimization step. Locations passing this filter still need
        accurate Haversine distance calculation.
    """
    filtered = []
    
    for location in locations:
        lat = location.get('latitude')
        lon = location.get('longitude')
        
        # Skip locations with missing coordinates
        if lat is None or lon is None:
            continue
        
        # Check if within threshold box
        lat_diff = abs(lat - target_lat)
        lon_diff = abs(lon - target_lon)
        
        if lat_diff <= threshold and lon_diff <= threshold:
            filtered.append(location)
    
    return filtered


def filter_locations_by_distance(target_lat, target_lon, locations, max_km=50):
    """
    Filter locations within distance threshold using Haversine formula.
    
    This function combines preliminary filtering with accurate Haversine distance
    calculation. It adds a 'distance' field to each location dictionary.
    
    Args:
        target_lat (float): Target latitude in degrees
        target_lon (float): Target longitude in degrees
        locations (list[dict]): List of location dictionaries with 'latitude' and 'longitude'
        max_km (float): Maximum distance in kilometers (default: 50)
        
    Returns:
        list[dict]: Filtered locations within max_km, each with added 'distance' field
        
    Examples:
        >>> locations = [
        ...     {'name': 'Location A', 'latitude': 37.5, 'longitude': 127.0},
        ...     {'name': 'Location B', 'latitude': 37.6, 'longitude': 127.1}
        ... ]
        >>> filtered = filter_locations_by_distance(37.5, 127.0, locations, max_km=20)
        >>> len(filtered)
        2
        >>> 'distance' in filtered[0]
        True
    """
    # Step 1: Preliminary filter for performance
    preliminary_filtered = preliminary_distance_filter(target_lat, target_lon, locations)
    
    # Step 2: Calculate accurate distances and filter
    result = []
    
    for location in preliminary_filtered:
        lat = location.get('latitude')
        lon = location.get('longitude')
        
        # Calculate accurate distance
        distance = calculate_distance(target_lat, target_lon, lat, lon)
        
        # Filter by distance threshold
        if distance <= max_km:
            # Add distance field to location dictionary
            location_with_distance = location.copy()
            location_with_distance['distance'] = round(distance, 2)
            result.append(location_with_distance)
    
    return result

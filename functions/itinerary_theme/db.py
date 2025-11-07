"""
Database module for MySQL connection and query operations.

This module provides functions to:
- Establish secure database connections using environment variables
- Query popular contents with region and theme filtering
- Query filming locations and location details
- Use parameterized queries to prevent SQL injection
"""

import os
import pymysql
from typing import List, Dict, Optional


def get_db_connection():
    """
    Create new MySQL connection using environment variables.
    
    Returns:
        pymysql.connections.Connection: Active database connection
        
    Raises:
        ValueError: If required environment variables are missing
        pymysql.Error: If database connection fails
    """
    # Validate required environment variables
    required_vars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
    
    try:
        connection = pymysql.connect(
            host=os.getenv('DB_HOST'),
            port=int(os.getenv('DB_PORT')),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except pymysql.Error as e:
        raise pymysql.Error(f"Database connection failed: {str(e)}")


def get_popular_contents(connection, region: str, theme: str, limit: int = 20) -> List[Dict]:
    """
    Query popular contents for region with theme filter.
    
    Args:
        connection: PyMySQL connection
        region (str): Korean region name (e.g., "서울", "부산")
        theme (str): Content theme - 'all', 'drama', 'movie', or 'pop'
        limit (int): Maximum number of results (default: 20)
        
    Returns:
        list[dict]: Content records with content_id, title, category, popularity
        
    Raises:
        ValueError: If theme is invalid
        pymysql.Error: If query execution fails
    """
    # Validate theme
    valid_themes = ['all', 'drama', 'movie', 'pop']
    if theme not in valid_themes:
        raise ValueError(f"Invalid theme '{theme}'. Must be one of: {', '.join(valid_themes)}")
    
    try:
        with connection.cursor() as cursor:
            # Base query
            base_query = """
                SELECT DISTINCT c.content_id, c.title, c.category, c.popularity
                FROM contents c
                INNER JOIN content_location cl ON c.content_id = cl.content_id
                INNER JOIN locations l ON cl.location_id = l.location_id
                WHERE l.address LIKE %s
            """
            
            # Parameters list (region is always included)
            params = [f'%{region}%']
            
            # Add theme-specific WHERE conditions dynamically
            if theme == 'drama':
                base_query += " AND c.category = %s"
                params.append('DRAMA')
            elif theme == 'movie':
                base_query += " AND c.category = %s"
                params.append('MOVIE')
            elif theme == 'pop':
                base_query += " AND c.category IN (%s, %s)"
                params.extend(['KPOP', 'POP'])
            # 'all' theme: no additional conditions
            
            # Add ordering and limit
            base_query += " ORDER BY c.popularity DESC LIMIT %s"
            params.append(limit)
            
            # Execute query with parameters as tuple
            cursor.execute(base_query, tuple(params))
            results = cursor.fetchall()
            return results
    except pymysql.Error as e:
        raise pymysql.Error(f"Failed to query popular contents: {str(e)}")


def get_content_locations(connection, content_id: int) -> List[Dict]:
    """
    Query filming locations for a content.
    
    Args:
        connection: PyMySQL connection
        content_id (int): Content ID
        
    Returns:
        list[dict]: Location records with location_id, scene_description
        
    Raises:
        pymysql.Error: If query execution fails
    """
    try:
        with connection.cursor() as cursor:
            query = """
                SELECT location_id, scene_description
                FROM content_location
                WHERE content_id = %s
            """
            cursor.execute(query, (content_id,))
            results = cursor.fetchall()
            return results
    except pymysql.Error as e:
        raise pymysql.Error(f"Failed to query content locations: {str(e)}")


def get_location_details(connection, location_id: int) -> Optional[Dict]:
    """
    Query detailed location information.
    
    Args:
        connection: PyMySQL connection
        location_id (int): Location ID
        
    Returns:
        dict: Location with name, address, latitude, longitude
        None: If location not found
        
    Raises:
        pymysql.Error: If query execution fails
    """
    try:
        with connection.cursor() as cursor:
            query = """
                SELECT location_id, name, address, latitude, longitude
                FROM locations
                WHERE location_id = %s
            """
            cursor.execute(query, (location_id,))
            result = cursor.fetchone()
            return result
    except pymysql.Error as e:
        raise pymysql.Error(f"Failed to query location details: {str(e)}")


def get_all_locations_for_contents(connection, content_ids: List[int]) -> List[Dict]:
    """
    Query all unique location details for given content IDs in a single query.
    This eliminates N+1 query problem by fetching all data at once.
    
    Args:
        connection: PyMySQL connection
        content_ids (list[int]): List of content IDs
        
    Returns:
        list[dict]: Location records with location_id, name, address, latitude, 
                    longitude, and scene_description
        
    Raises:
        pymysql.Error: If query execution fails
    """
    if not content_ids:
        return []
    
    try:
        with connection.cursor() as cursor:
            # Use IN clause with parameterized query
            # PyMySQL supports passing tuple/list for IN clause
            query = """
                SELECT DISTINCT
                    l.location_id, l.name, l.address, l.latitude, l.longitude,
                    cl.scene_description
                FROM locations l
                INNER JOIN content_location cl ON l.location_id = cl.location_id
                WHERE cl.content_id IN %s
            """
            
            # Execute query (content_ids as tuple for IN clause)
            cursor.execute(query, (tuple(content_ids),))
            results = cursor.fetchall()
            return results
    except pymysql.Error as e:
        raise pymysql.Error(f"Failed to query locations for contents: {str(e)}")

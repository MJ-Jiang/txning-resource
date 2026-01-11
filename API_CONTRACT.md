# TXNING Resource API Contract

This document defines the public API contract between frontend and backend.
It focuses on: endpoints, parameters, response shapes, error rules, and stability guarantees.

## Base URL

- Production (Render): `https://txning-resource.onrender.com`
- Local: `http://127.0.0.1:8000`

## General Rules

### Content Type
- Responses are JSON.
- Request/response encoding: UTF-8.

### Auth
- No authentication required (read-only public API).

### Pagination Convention
Endpoints returning a page use:
- `limit`: int (default varies by endpoint)
- `offset`: int (default 0)

Response shape:
```json
{
  "total": 123,
  "limit": 50,
  "offset": 0,
  "items": [ ... ]
}
Sorting Convention

Channels list and related list are sorted by id DESC unless stated otherwise.

Home sections are sorted by (is_featured DESC, id DESC) within a category set.

Error Convention

422 Unprocessable Entity: invalid query/path parameter types, missing required query parameter.

404 Not Found: entity does not exist (e.g. content id not found).

Health
GET /health

Health probe endpoint.

Response 200

{ "ok": true }


Notes:

This endpoint should remain fast and stable.

It is excluded from rate limiting on the backend.

Home
GET /home

Aggregated home page payload.

Response 200

{
  "banners": [ContentCardOut],
  "featured_drama": [ContentCardOut],
  "featured_endorsement": [ContentCardOut],
  "featured_event": [ContentCardOut],
  "featured_media": [ContentCardOut],
  "about": [ContentCardOut]
}


Limits

banners: max 3

featured_drama: max 6

featured_endorsement: max 4

featured_event: max 4

featured_media: max 6

about: max 1

Sorting (per section)

Ordered by: is_featured DESC, then id DESC.

Link rule used in home

If category_id in (4, 5) OR ugc_url is not null, then:

link_type = "external"

link_url = ugc_url (may be null if ugc_url is null; frontend should handle it)

Else:

link_type = "detail"

link_url = null

Dict (Filter Panel Dictionaries)

All dict endpoints return list of simple {id, code, name_zh} items.
Sorted by id ASC.

GET /dict/categories
GET /dict/statuses
GET /dict/types
GET /dict/genres
GET /dict/cities
GET /dict/platforms
GET /dict/booking-platforms
GET /dict/ugc-platforms

Response 200 (example)

[
  { "id": 1, "code": "drama", "name_zh": "剧" },
  { "id": 2, "code": "event", "name_zh": "活动" }
]

GET /dict/all

Returns all dictionaries in a single payload.

Response 200

{
  "statuses": [DictItem],
  "types": [DictItem],
  "genres": [DictItem],
  "platforms": [DictItem],
  "cities": [DictItem],
  "categories": [DictItem],
  "ugc_platforms": [DictItem],
  "booking_platforms": [DictItem]
}

Channels (Category Lists)
GET /channels/{category_id}

Returns paginated content cards for a category with optional filters.

Path Params

category_id (int): category id

Query Params

title (string, optional): case-insensitive substring match (ilike %title%)

release_year (int, optional)

status_id (int, optional)

type_id (int, optional)

limit (int, default 50)

offset (int, default 0)

Response 200

{
  "total": 123,
  "limit": 50,
  "offset": 0,
  "items": [ContentCardOut]
}


Sorting

items are ordered by Content.id DESC.

Error

422: invalid query parameter type (e.g. limit=abc).

Contents (Multi-category Lists + Detail)
GET /contents

Paginated list across multiple categories.

Query Params

category (required, repeatable int):

Example: ?category=4&category=5

limit (int, default 50)

offset (int, default 0)

Response 200

{
  "total": 123,
  "limit": 50,
  "offset": 0,
  "items": [ContentCardOut]
}


Sorting

Ordered by created_at DESC (via CRUD layer).

Errors

422: missing category query param, or invalid type.

GET /contents/{content_id}

Content detail endpoint.

Path Params

content_id (int)

Response 200

{
  "content": ContentDetailContent,
  "rating": RatingInfo,
  "genres": [DictItemLite],
  "cities": [DictItemLite],
  "platforms": [PlatformLink],
  "booking_platforms": [PlatformLink]
}


Where:

DictItemLite is { "id": int, "name_zh": string | null }

PlatformLink:

{
  "platform": { "id": int, "code": string | null, "name_zh": string | null },
  "url": "https://..." | null
}


RatingInfo:

{ "source": "douban", "value": 8.6 | null, "url": "https://..." | null }


Error

404: when content not found

{ "detail": "Content not found" }

GET /contents/{content_id}/related

Paginated list of related contents (source -> target mapping).

Path Params

content_id (int): source content id

Query Params

title (string, optional): ilike

release_year (int, optional)

type_id (int, optional)

limit (int, default 20)

offset (int, default 0)

Response 200

{
  "total": 0,
  "limit": 20,
  "offset": 0,
  "items": [ContentCardOut]
}


Behavior

If source content does not exist: 404

If source exists but has no related targets: returns total=0 and items=[]

Sorting

Related items ordered by Content.id DESC.

GET /contents/related-from-map

Reverse related mapping for building a “source category options by target content” map.

Query Params

target_category (repeatable int, optional)

Example: ?target_category=10&target_category=11

source_category (repeatable int, optional)

Example: ?source_category=1&source_category=2

Response 200
A JSON object keyed by target_content_id as string, with values being a sorted list of distinct source category ids:

{
  "401": [1, 2],
  "999": [3]
}


Notes

Keys are strings for stability in JSON object maps.

Each list is sorted ascending.

If no filters are provided, returns the mapping for all relations (may be large).

Schemas
ContentCardOut

Used in list pages and home sections.

{
  "id": 101,
  "category_id": 1,
  "title": "Drama A",
  "cover_url": "https://...",
  "link_type": "detail" | "external",
  "link_url": "https://..." | null,

  "release_year": 2024,
  "status_id": 1,
  "type_id": 1,

  "platform_ids": [1,2],
  "city_ids": [10,11],
  "genre_ids": [20,21],
  "related_ids": [201,301],

  "role": "..." | null,
  "location": "..." | null,
  "time_text": "..." | null,
  "event_date": "YYYY-MM-DD" | null,

  "ugc_platform_id": 1 | null,

  "created_at": "ISO-8601 datetime" | null,
  "href": "https://..." | null,

  "is_featured": true | false | null,
  "ugc_type": "..." | null
}

ContentDetailContent
{
  "id": 101,
  "category_id": 1,
  "title": "Drama A",
  "description": "...",
  "cover_url": "https://...",
  "release_year": 2024,
  "episode_count": 10,

  "type_id": 1,
  "status_id": 1,
  "role": "...",

  "location": "...",
  "event_date": "YYYY-MM-DD" | null,
  "time_text": "..." | null,
  "date_granularity": "..." | null,

  "href": "https://..." | null,
  "created_at": "ISO-8601 datetime" | null,

  "related_ids": [201,301],
  "ugc_type": "..." | null
}

Stability Promises

The following are considered API contract and should not change without coordinated frontend updates:

Endpoint paths and HTTP methods.

Response top-level structure and key names.

Pagination fields: total, limit, offset, items.

ContentCardOut core keys used by UI: id, title, link_type, cover_url, and id list fields.

Error status codes: 422 for validation, 404 for missing content.

Testing

Backend whitebox tests (FastAPI/TestClient) live in: txning-backend/app/tests/

Blackbox API tests live in: tests_blackbox/

Run blackbox against production:

cd tests_blackbox
BASE_URL="https://txning-resource.onrender.com" pytest


Run blackbox against local backend:

cd tests_blackbox
BASE_URL="http://127.0.0.1:8000" pytest
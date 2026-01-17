from backend.tests.helpers import register_and_login
from io import BytesIO


def setup_artwork(client):
    headers = register_and_login(client, "reviewer@test.com")

    r = client.post(
        "/artworks/upload",
        headers=headers,
        files={
            "file": ("art.jpg", BytesIO(b"img"), "image/jpeg"),
        },
        data={
            "title": "Art for review",
            "category": "photography",
        },
    )

    assert r.status_code == 200
    return headers, r.json()["id"]


def test_review_word_limit(client):
    headers, art_id = setup_artwork(client)

    r = client.post(
        "/reviews/",
        headers=headers,
        json={
            "artwork_id": art_id,
            "content": "too short " * 5,
        },
    )

    assert r.status_code in (400, 422)


def test_review_success(client):
    headers, art_id = setup_artwork(client)

    content = "word " * 80

    r = client.post(
        "/reviews/",
        headers=headers,
        json={
            "artwork_id": art_id,
            "content": content,
        },
    )

    assert r.status_code == 200
    assert r.json()["artwork_id"] == art_id

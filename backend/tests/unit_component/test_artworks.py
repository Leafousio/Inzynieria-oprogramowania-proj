from backend.tests.helpers import register_and_login
from io import BytesIO


def test_artwork_upload(client):
    headers = register_and_login(client, "artist@test.com")

    file_content = BytesIO(b"fake image content")

    r = client.post(
        "/artworks/upload",
        headers=headers,
        files={
            "file": ("test.jpg", file_content, "image/jpeg"),
        },
        data={
            "title": "Test Artwork",
            "category": "digital painting",
        },
    )

    assert r.status_code == 200
    data = r.json()
    assert "id" in data
    assert data["title"] == "Test Artwork"

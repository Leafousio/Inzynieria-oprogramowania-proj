from backend.tests.helpers import register_and_login
from io import BytesIO


def upload_art(client, email, title):
    headers = register_and_login(client, email)

    client.post(
        "/artworks/upload",
        headers=headers,
        files={"file": ("f.jpg", BytesIO(b"x"), "image/jpeg")},
        data={
            "title": title,
            "category": "crafts",
        },
    )
    return headers


def test_random_artwork(client):
    upload_art(client, "a@test.com", "A1")
    headers = upload_art(client, "b@test.com", "B1")

    r = client.get("/artworks/random", headers=headers)

    assert r.status_code == 200
    assert "id" in r.json()

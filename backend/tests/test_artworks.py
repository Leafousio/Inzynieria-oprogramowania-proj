import io

def auth_header(client):
    data = {"username": "u1@example.com", "password": "123"}
    client.post("/users/register", json={"email": "u1@example.com", "password": "123"})
    r = client.post("/users/token", data=data)
    token = r.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_upload_and_limit(client):
    headers = auth_header(client)
    for i in range(5):
        f = io.BytesIO(b"fake image data")
        files = {"file": ("img.png", f, "image/png")}
        r = client.post("/artworks/upload?title=t&category=test", headers=headers, files=files)
        assert r.status_code == 200

    # 6 upload - błąd
    f = io.BytesIO(b"fake")
    files = {"file": ("img.png", f, "image/png")}
    r = client.post("/artworks/upload?title=t&category=test", headers=headers, files=files)
    assert r.status_code == 400
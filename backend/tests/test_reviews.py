import io

def setup_user_and_art(client):
    client.post("/users/register", json={"email": "a@b.com", "password": "123"})
    login = client.post("/users/token", data={"username": "a@b.com", "password": "123"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    #upload
    f = io.BytesIO(b"abc")
    files = {"file": ("x.png", f, "image/png")}
    r = client.post("/artworks/upload?title=test&category=test", headers=headers, files=files)
    return headers, r.json()["id"]

def test_review_word_limit(client):
    headers, art_id = setup_user_and_art(client)
    short = "too short"
    r = client.post("/reviews", json={"artwork_id": art_id, "content": short}, headers=headers)
    assert r.status_code == 400

def test_review_daily_limit(client):
    headers, art_id = setup_user_and_art(client)
    long_text = "word " * 100
    for i in range(5):
        r = client.post("/reviews", json={"artwork_id": art_id, "content": long_text}, headers=headers)
        assert r.status_code == 200
    r2 = client.post("/reviews", json={"artwork_id": art_id, "content": long_text}, headers=headers)
    assert r2.status_code == 400
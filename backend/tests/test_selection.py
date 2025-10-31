import io

def create_user_with_artworks(client, email):
    client.post("/users/register", json={"email": email, "password": "123"})
    login = client.post("/users/token", data={"username": email, "password": "123"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    for i in range(3):
        f = io.BytesIO(b"imgdata")
        files = {"file": (f"{i}.png", f, "image/png")}
        client.post(f"/artworks/upload?title=t{i}&category=c{i%2}", headers=headers, files=files)
    return headers

def test_random_selection(client):
    # user1 dodaje prace
    create_user_with_artworks(client, "x@x.com")
    # user2 loguje się i losuje prace
    client.post("/users/register", json={"email": "y@y.com", "password": "123"})
    login = client.post("/users/token", data={"username": "y@y.com", "password": "123"})
    headers = {"Authorization": f"Bearer {login.json()['access_token']}"}
    r = client.get("/artworks/random", headers=headers)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
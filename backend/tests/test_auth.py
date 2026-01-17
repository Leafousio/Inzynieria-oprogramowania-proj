def test_register_and_login(client):
    r = client.post("/users/register", json={"email": "test@example.com", "password": "secret123"})
    assert r.status_code == 200
    user = r.json()
    assert user["email"] == "test@example.com"

    r2 = client.post("/users/register", json={"email": "test@example.com", "password": "secret123"})
    assert r2.status_code == 400

    data = {"username": "test@example.com", "password": "secret123"}
    r3 = client.post("/users/token", data=data)
    assert r3.status_code == 200
    token = r3.json()["access_token"]
    assert len(token) > 10
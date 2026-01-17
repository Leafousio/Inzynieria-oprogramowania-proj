def test_invalid_password(client):
    r = client.post(
        "/users/register",
        json={"email": "x@x.com", "password": "abc"},
    )
    assert r.status_code in (400, 422)


def test_valid_password(client):
    r = client.post(
        "/users/register",
        json={"email": "y@y.com", "password": "ValidPass1"},
    )
    assert r.status_code in (200, 201)

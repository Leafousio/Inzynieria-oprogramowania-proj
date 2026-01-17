from backend.tests.utils import VALID_PASSWORD


def register_and_login(client, email):
    r = client.post(
        "/users/register",
        json={"email": email, "password": VALID_PASSWORD},
    )
    assert r.status_code in (200, 201, 400)  

    r = client.post(
        "/users/token",
        data={"username": email, "password": VALID_PASSWORD},
    )
    assert r.status_code == 200

    token = r.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

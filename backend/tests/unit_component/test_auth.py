from backend.tests.helpers import register_and_login


def test_register_and_login(client):
    headers = register_and_login(client, "auth@test.com")
    assert "Authorization" in headers

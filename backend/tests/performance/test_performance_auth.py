import time
from backend.tests.helpers import register_and_login
from backend.tests.utils import VALID_PASSWORD


def test_register_performance(client):

    start = time.perf_counter()

    client.post(
        "/users/register",
        json={"email": "perf@test.com", "password": VALID_PASSWORD},
    )

    client.post(
        "/users/token",
        data={"username": "perf@test.com", "password": VALID_PASSWORD},
    )

    duration = time.perf_counter() - start

    #threshold funkcjonalny 
    assert duration < 1.0, f"Auth flow too slow: {duration:.3f}s"

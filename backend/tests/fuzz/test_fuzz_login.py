from hypothesis import given, strategies as st, settings, HealthCheck
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.database import get_db
from backend.tests.fuzz.db_override import override_get_db


app.dependency_overrides[get_db] = override_get_db


@settings(
    max_examples=10,
    deadline=200,
    phases=["generate"],
    suppress_health_check=[HealthCheck.too_slow],
)
@given(
    email=st.text(
        min_size=1,
        max_size=64,
        alphabet=st.characters(blacklist_categories=("Cs",)),
    ),
    password=st.text(
        min_size=1,
        max_size=64,
        alphabet=st.characters(blacklist_categories=("Cs",)),
    ),
)
def test_login_fuzz(email, password):
    client = TestClient(app)

    r = client.post(
        "/users/token",
        data={"username": email, "password": password},
    )

    assert r.status_code in (200, 400, 401, 422)

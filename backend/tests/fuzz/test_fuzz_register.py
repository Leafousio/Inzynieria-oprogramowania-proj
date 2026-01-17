from hypothesis import given, strategies as st, settings, HealthCheck
from fastapi.testclient import TestClient
from backend.app.main import app


@settings(
    max_examples=10,
    deadline=200,
    phases=["generate"],  
    suppress_health_check=[HealthCheck.too_slow],
)
@given(
    password=st.text(
        min_size=1,
        max_size=64,
        alphabet=st.characters(blacklist_categories=("Cs",)),
    )
)
def test_register_fuzz(password):

    client = TestClient(app)

    response = client.post(
        "/users/register",
        json={
            "email": "fuzz@example.com",  
            "password": password,
        },
    )

    assert response.status_code in (200, 400, 409, 422)
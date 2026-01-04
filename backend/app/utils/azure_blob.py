import os
import uuid
from azure.storage.blob import BlobServiceClient
from ..config import settings
from typing import Optional

LOCAL_UPLOAD_DIR = "/shared_uploads"


blob_service_client = None
container_client = None
if settings.AZURE_STORAGE_CONNECTION_STRING:
    try:
        blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_STORAGE_CONNECTION_STRING)
        container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)
        print("Azure Blob Storage client initialized.")
    except Exception as e:
        print(f"Failed to initialize Azure Blob Storage client: {e}")




def upload_file_to_blob(file_bytes: bytes, filename: str) -> str:
    os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)

    blob_name = f"{uuid.uuid4().hex}_{filename}"
    file_path = os.path.join(LOCAL_UPLOAD_DIR, blob_name)

    with open(file_path, "wb") as f:
        f.write(file_bytes)

    # URL IDEALNY POD NGINX
    return f"/uploads/{blob_name}"
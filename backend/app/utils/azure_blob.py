#helper Azure Blob Storage
from azure.storage.blob import BlobServiceClient
from ..config import settings
import uuid

# Inicjalizacja
blob_service_client = None
container_client = None
if settings.AZURE_STORAGE_CONNECTION_STRING:
    blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_STORAGE_CONNECTION_STRING)
    container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)

def upload_file_to_blob(file_bytes: bytes, filename: str) -> str:
    #unikalna nazwa generowana przez uuid4()
    blob_name = f"{uuid.uuid4().hex}_{filename}"
    if not blob_service_client:
        # jeśli brak konfiguracji AZURE, wzrot do pseudo-path
        return f"./local_uploads/{blob_name}"
    try:
        container_client.create_container()
    except Exception:
        pass
    blob_client = container_client.get_blob_client(blob_name)
    blob_client.upload_blob(file_bytes, overwrite=True)
    account_url = blob_service_client.url 
    return f"{account_url}/{settings.AZURE_CONTAINER_NAME}/{blob_name}"

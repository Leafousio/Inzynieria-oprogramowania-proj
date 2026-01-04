FROM python:3.11-slim

WORKDIR /app
#caching
COPY requirements.txt .
#zainstaluj wymagane biblioteki
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/local_uploads

#zkopiuj kod
COPY ./app ./app 


#uruchom testowy serwer
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
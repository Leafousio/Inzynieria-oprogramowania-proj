# Budowanie etapu
FROM node:18-alpine as build

WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalowanie zależności
RUN npm ci

# Kopiowanie kodu źródłowego
COPY . .

# Budowanie aplikacji
RUN npm run build

# Etap produkcyjny
FROM nginx:alpine

# Kopiowanie pliku konfiguracyjnego nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf



# Kopiowanie zbudowanej aplikacji
COPY --from=build /app/dist /usr/share/nginx/html

# Otwieranie portu
EXPOSE 80

# Uruchamianie serwera nginx
CMD ["nginx", "-g", "daemon off;"]
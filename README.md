# Giscademy Prototype

Dette depotet gir et startpunkt for å bygge læringsplattformen **Giscademy**. Det er organisert som et
docker‑basert fullstack‑prosjekt med en React‑frontend, et FastAPI‑backend, en PostGIS‑database
og en sandbox‑tjeneste for trygg kjøring av kode.

## Struktur

```
giscademy_skeleton/
├── docker-compose.yml   # Definerer tjenester for frontend, backend, database og sandbox
├── frontend/            # React‑klient med monaco‑editor og Leaflet
│   ├── package.json     # Avhengigheter og scripts
│   ├── vite.config.js   # Vite‑konfigurasjon
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── main.py          # FastAPI med eksempel‑endepunkter
└── sandbox/
    └── README.md        # Plassholder for sandkassekode
```

## Forutsetninger

Du trenger [Docker](https://www.docker.com/) og [Docker Compose](https://docs.docker.com/compose/) installert på serveren.
På lokal utviklingsmaskin anbefales Node.js ≥ 18 for å kjøre frontend.

## Komme i gang

### 1. Klon prosjektet

Last ned eller klon denne mappen til serveren din:

```bash
git clone <REPO_URL> giscademy
cd giscademy
```

Eller kopier filene manuelt hvis du ikke bruker Git.

### 2. Konfigurer database (PostGIS)

Docker Compose starter en `postgis/postgis`‑container automatisk med bruker/passord definert i
`docker-compose.yml`. Første gang må du legge til PostGIS‑utvidelser:

```bash
# Start bare databasen for å initialisere dataområdet
docker-compose up -d db

# Kjør følgende kommando for å koble til databasen og aktivere PostGIS
docker exec -it $(docker-compose ps -q db) \
  psql -U giscademy_user -d giscademy -c "CREATE EXTENSION IF NOT EXISTS postgis; CREATE EXTENSION IF NOT EXISTS postgis_topology;"

# Stopp databasen igjen hvis du vil bygge resten
docker-compose stop db
```

### 3. Bygg og start alle tjenester

Dette bygger Docker‑image for backend og frontend og starter alle tjenestene:

```bash
docker-compose build
docker-compose up
```

Når containerne kjører:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000/docs) (Swagger UI generert av FastAPI)
- Database: tilgjengelig på port `5432` fra andre containere

Frontenden vil automatisk lastes i utviklingsmodus (hot reload). Backend kjører med `--reload` for
å plukke opp endringer.

### 4. Installer avhengigheter lokalt (valgfritt)

Vil du utvikle uten Docker på din egen maskin?

```bash
cd frontend
npm install # eller pnpm install/yarn install
npm run dev

# I nytt terminalvindu
cd ../backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend vil da være tilgjengelig på port 5173 (Vite standard) og backend på port 8000.

### 5. Utvidelsesforslag

- **Sandbox**: implementer ekte kjøring av Python/SQL i en isolert container. Du kan bruke
  [jailer](https://github.com/jamesking/binderbox) eller `pyodide` i nettleseren.
- **Autentisering**: legg til brukersystem i backend (FastAPI’s OAuth2 eller Auth0) og knytt
  økter i frontenden.
- **State management**: for eksempel Redux eller Zustand i React.
- **Styling**: bruk et rammeverk som Tailwind eller Material UI for et profesjonelt utseende.

## Command Line‑referanse

| Kommando | Beskrivelse |
|---------|-------------|
| `docker-compose build` | Bygger alle image basert på `Dockerfile`. |
| `docker-compose up` | Starter alle tjenester interaktivt. |
| `docker-compose up -d` | Starter alle tjenester i bakgrunnen. |
| `docker-compose stop` | Stopper kjørende containere. |
| `docker-compose down` | Stopper og fjerner containere og nettverk. |
| `docker exec -it <container> bash` | Kjør en shell i en container. |
| `npm install` | Installerer npm‑avhengigheter for frontenden. |
| `npm run dev` | Starter Vite dev-server. |
| `pip install -r requirements.txt` | Installerer Python‑avhengigheter for backend. |
| `uvicorn main:app --reload` | Starter backend i utviklingsmodus. |

Dette er bare et utgangspunkt; tilpass prosjektet etter behov. Lykke til med utviklingen av Giscademy!
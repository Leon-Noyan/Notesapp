Kort beskrivning av applikationen.

## App

Detta är en enkel anteckningsapp, applikationen har två routes/ sidor där användaren kan skapa anteckningar, radera, uppdatera och läsa dem. Applikationen består alltså av en enkel CRUD.

## Ramverk

Val av ramverk och motivering.
Applikationen använder sig av next.js. Ramverket valdes av olika anledningar dels då den har support för client och server-side rendering vilket gör det enkelt att arbeta med. Next.js ramverket låter även oss sätta upp ett fullstack projekt utan att behöva skapa en separat backend med exempelvis en express server. Detta gör uppsättningen och konfigurationen enklare och smidigare. Vi behöver dessutom endast driftsätta/ deploya en enda container.

## Intrsuktioner lokalt

Instruktioner för att starta applikationen lokalt.
Vid start lokalt se till att köra:

- git clone https://github.com/Leon-Noyan/Notesapp
- cd Notesapp
- npm install
- konfigurera miljövariabel enligt .env.example MONGO_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/<database_name>?retryWrites=true&w=majority"

- npm run dev
- Öppna http://localhost:3000

## Instruktioner Docker-container

Instruktioner för att bygga och köra Docker-containern.

Dockerfile är multi-stage, beroendena installeras och Next.js byggs bia standalone. Sista steget kör node server.js med node. Container lyssnar på 0.0.0.0:3000, HOSTNAME OCH PORT som Render behöver.

Utgå från dessa steg för att bygga och köra applikationen i en isolerad docker-container.

- Se till så att du har Docker installerat, starta sedan Docker.
- Skapa en env fil om du ska skicka miljövariabel via en fil istället för terminalen.
- Kör: docker build -t notesapp .
- docker run -p 3000:3000 -e MONGO_URI="din_anslutningsstrang_här" notesapp
- Alternativt med env-fil: docker run --rm -p 3000:3000 --env-file .env notesapp
- öppna http://localhost:3000
- Health check: http://localhost:3000/health

## Miljöveriabler & hemlighetshantering

Beskrivning av miljövariabler och hemlighetshantering:
Projektet använder sig av miljö variabler deploy yml och Render. Projektet använder sig även av github secret för att behålla applikationen säker.

Lokalt: Använder .env.local och npm run dev.
Produktion: Använder samma variabelnamn (MONGO_URI), men värdet sätts i Render Dashboard. Containern körs med NODE_ENV=production.

Hemligheter:

- env filer ignoreras via .gitignore.
- Deploy Hook Url hämtas från secret RENDER_DEPLOY_HOOK_URL.
- MONGO_URI används endast i server mongodb.ts.

## Loggning & health

Beskrivning av loggning och health check.
Projektet använder loggning för att underlätta både övervakning och felsökning.

- Start: instrumentation.ts loggar INFO: Server started vid uppstart.
- Health Check: GET/ health returnerar status 'ok' för att visa att tjänsten körs. Med detta ser vi hur servern mår.
- Databas & fel: mongodb.ts loggar anslutningstatusen med INFO: samt fel med ERROR vid anslutningsfel eller vid felaktiga miljövariabler.
- Alla loggar visas även i Render under fliken Logs.

Länk till Health enpoint: https://notesapp-qrxr.onrender.com/health

## Github actions

Beskrivning av GitHub Actions-workflowen.
Trigger

- Pipeline triggas igång automatiskt när kod pushas till main branchen
  Miljövariabler (env)
- Github actions hämtar hemliga nycklar från Github repository secrets (`MONGO_URI` och `RENDER_DEPLOY_HOOK_URL`).
  Steps
- Checkout code hämtar den senaste koden från Github repot
- Set up node: Sätter upp node versionen och caching för paketinstallation.
  Install dependencies: Hanterar nedladdning av projektets beroenden genom npm ci.
  Build Next.js application: Bygger själva next.js app för undvika kompliering och byggfel i koden.
  Build Docker image: Bygger en lokal docker image utifrån Dockerfile för att testa container.
  Trigger Render Deploy Hook: När allt annat lyckats så skickas curl förfrågan till Render Deploy Hook-URL som uppdaterar live appen som ligger i Render. Skulle build misslyckas så kommer jobbet inte köras. Detta innebär att Hook stoppas och den föregående versionen ligger kvar.

## Render-driftsättning

Förklaring av hur Render-driftsättningen fungerar.

- Actions verifierar npm run build och docker build.
- Deploy Hook anropas vid lycka.
- Nu kan Render hämta koden och bygga image från Dockerfile.
- Mongo_URI tas från Render Dashboard och appen lyssnar på 0.0.0.0:3000 HOSTNAME / PORT i Dockerfile
- Notera att auto deploy är avstängt i Render.

## Kostnadsmedveten drift

Svar på frågorna om kostnadsmedveten drift.
Projektet använder Renders free tier vilket gör att det inte kostar något.
Projektet använder även MongoDb Atlas molnbaserade cluster för databasen vilket även är gratis. Detta går dock att uppgradera ifall projektet skulle växa och det skulle visa sig nödvändigt då både Render och MongoDB Atlas har betalda versioner.

## Länkar

Länk till den driftsatta applikationen.
https://notesapp-qrxr.onrender.com/
https://github.com/Leon-Noyan/Notesapp
https://notesapp-qrxr.onrender.com/health

## Arkitekturdiagram

```mermaid
flowchart LR
Dev[Utvecklare] -->|push till main| GH[Github]
GH --> GHA[Github Actions]
GHA -->|npm run build| AppBuild[Next.js-build]
AppBuild -->|docker build| Image[Docker-image]
Image -->|Deploy Hook om allt lyckas| Render[Render Web Service]
Render -->|bygger från Dockerfile| App[Next.js standalone]
App --> Atlas[MongoDB Atlas]
User[Användare] --> App
```

## Frågor & Svar

Vilken Render-plan använder du?

Jag använder free tier planen.

Varför har du valt den?

Jag valde free planen då den är tillräcklig för ett litet skol projekt. Sidan har inte någon hög trafik för att uppgradera till en högre plan med starkare CPU.

Vilka faktorer påverkar kostnaden för att driva applikationen?

Det finns flera faktorer som kan påverka, exempel kan vara hur mycket trafik webbsidan har. Trafiken påverkar mängden bandwidth som platformen kräver, CPU och RAM är även stora faktorer. Här behöver vi kika på hur mycket dator kraft servern behöver för att rulla smidigt. Vill man att servern ska hålla sig vaken i render så kostar det också då servern i gratisversionen endast går igång när man besöker den.

Hur kan du minska applikationens resursanvändning?

Vi kan använda standalone vilket gör Docker image mindre vilket i sig minskar mängden RAM som behövs. Vi kan även använda cache för att minska den mängd databas anrop som sker. Ytterligare en sak vi kan göra är att optimera koden med server components samt hur vi gör databas anrop.

Vilka begränsningar har din nuvarande driftlösning?

Den nuvarande driftlösningen orsakar att servern sover och endast startar vid besök. Detta beteende är inget vi egentligen vill ha vid ett verkligt projekt med riktiga användare. Den är heller inte kraftfull när det gäller saker som CPU, det räcker dock för ett skoltprojekt. En annan begränsning är Render i sig eftersom att vi använder Renders server så är det en server vi lånar/ hyr. Detta innebär att vi har inte full frihet att sätta upp servern exakt hur som helst.

Vad skulle du behöva förändra om applikationen fick betydligt fler användare?

Om applikationen fick fler användare skulle jag behöva uppgradera planen. Innan jag uppgraderar hade jag dock kikat i analytics/ monitorerat för att se vilken plan som hade passat bäst så att jag inte överskjuter. Utöver att uppgradera planen vilket klassas som att göra en vertikal scaling så hade jag även kunnat kika på horisontell scaling. Med horisontell scaling menar man att man kör serverinstanser eller containers parallelt vilket ska ge oss en obegränsad skalbarhet. Man hade exempelvis kunnat kika på load balancer för att fördela trafiken jämnt mellan noderna samt flytta trafiken från de noder som inte fungerar som de ska.

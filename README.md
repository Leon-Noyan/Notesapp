
Kort beskrivning av applikationen.
 ## App
 Detta är en enkel anteckningsapp, applikationen består av två routes/ sidor där användaren kan skapa anteckningar, radera, uppdatera och läsa dem. Applikationen har alltså en enkel CRUD.

 ## Ramverk
Val av ramverk och motivering.
Applikationen använder sig av next.js

 ## Intrsuktioner lokalt
Instruktioner för att starta applikationen lokalt.

 ## Instruktioner Docker-container
Instruktioner för att bygga och köra Docker-containern.

 ## Miljöveriabler & hemlighetshantering
Beskrivning av miljövariabler och hemlighetshantering.

 ## Loggning & health
Beskrivning av loggning och health check.

 ## Github actions
Beskrivning av GitHub Actions-workflowen.

 ## Render-driftsättning
Förklaring av hur Render-driftsättningen fungerar.

 ## Kostnadsmedveten drift
Svar på frågorna om kostnadsmedveten drift.

 ## Länkar
Länk till den driftsatta applikationen.




Vilken Render-plan använder du?

Jag använder free planen.

Varför har du valt den?

Jag valde free planen då den är tillräcklig för ett litet skol projekt. Sidan har inte någon hög trafik för att uppgradera till en högre plan med starkare CPU.

Vilka faktorer påverkar kostnaden för att driva applikationen?

Det finns flera faktorer som exempelvis trafiken då den påverkar mängden bandwidth som platformen kräver, CPU och RAM är även stora faktorer. Här behöver vi kika på hur mycket dator kraft servern behöver för att rulla smidigt. Vill man att servern ska hålla sig vaken i render så kostar det också då servern i gratisversionen endast går igång när man besöker den.

Hur kan du minska applikationens resursanvändning?

Vi kan använda cache för att minska databas anroppen, vi kan även optimera koden med server components samt hur vi gör databas anrop.

Vilka begränsningar har din nuvarande driftlösning?

Den nuvarande driftlösningen orsakar att servern sover och endast startar vid besök, den är heller inte väldigt kraftfull när det gäller saker som CPU. Och eftersom att det är render så är det en server som vi lånar/ hyr så vi har inte full frihet att sätta upp servern exakt hur som helst.

Vad skulle du behöva förändra om applikationen fick betydligt fler användare?

Om applikationen fick fler användare skulle jag behöva uppgradera planen. Innan jag uppgraderar hade jag dock kikat i analytics/ monitorerat för att se vilken plan som hade passat bäst så att jag inte överskjuter.

# Eindverslag programmeer project 2016
###### Sanne Strikkers 11170816

### Inleiding

Men heeft vaak geen idee meer hoeveel stroom en gas er worden verbruikt. De laatste paar jaren zijn daarbij ook nog het aantal energieleveranciers flink gestegen. Vroeger was er alleen Eneco of Nuon, maar nu zijn er wel meer dan 10 bij gekomen. Door deze flinke stijging weten huishoudens in Nederland ook niet meer welke energieleveranciers er zijn.

Met dit probleem ben ik aan de slag gegaan. De website laat ten eerste een uitleg zien hoe de energiewereld er in Nederland eigenlijk uit ziet. Daarbij wil ik laten zien of Nederland wel zoveel stroom en gas verbruikt ten opzichte van andere landen in de wereld. Dan wordt er dieper in Nederland gekeken. Welke gemeentes verbruiken veel stroom en gas? Gaat Nederland steeds meer verbruiken over de jaren heen of neemt het juist af?

Als laatste wil ik aan de hand van een donut grafiek laten zien welke energieleveranciers er zijn. Daarbij wil ik ook de afkomst van stroom laten zien bij elke leverancier. Zo kan men ten eerste zien waar de stroom vandaan komt. Ten tweede kan men tegelijkertijd ook zien welke energieleveranciers er zijn in Nederland.

![Voorbeeld website van de pagina netherlands.html](doc/voorbeeld_website.jpg)

### Technisch ontwerp

```
proj
  - data
    - netherlands
      - electricity
        - netherlands_elek_2010.json
        - netherlands_elek_2012.json
        - netherlands_elek_2014.json
      - gas
        - netherlands_gas_2010.json
        - netherlands_gas_2012.json
        - netherlands_gas_2014.json
    - suppliers
      - suppliers.json
    - world
      - sjv_world_2000.json
      - sjv_world_2005.json
      - sjv_world_2010.json
      - sjv_world_2014.json
  - scripts
    - csv
      - country_codes.csv
      - energyuse_world.csv
      - gemeente_codes.csv
      - nl_sjv.csv
      - suppliers.csv
    - netherlands.py
    - suppliers.py
    - world.py
  - src
    - css
      - style.css
    - img
      - logo.png
      - nederland_gemeenten.svg
    - js
      - app.js
      - netherlands.js
      - suppliers.js
      - world.js
  - index.html
  - netherlands.html
  - suppliers.html
  - world.html
```

Elk bestand is aan elkaar gerelateerd. Bijvoorbeeld de pagina ‘Netherlands.html’ maakt gebruik van netherlands.js en netherlands.py, die bestanden aanmaakt in de folder ‘netherlands’. Deze map bevindt zich weer in de folder data. Dit geldt ook zo voor ‘suppliers.html’ en ‘world.html’. 

Elk bestand maakt gebruik van ‘app.js’ en ’style.css’. Deze twee bestanden bevatten functies die voor meerdere bestanden kan werken en stijlen die elke pagina bevat.

### Uitdagingen

De eerste obstakel die op het pad is gekomen zijn de bargrafieken op de ‘world.html’ pagina. Deze moest dynamisch worden zodat er geen dubbele code ontstaat. Het obstakel was meer om de grafieken te updaten. Ten eerste kwamen er meerdere grafieken onder elkaar. Ten tweede toen het updaten eenmaal was gelukt, kon er geen tweede of meerdere grafieken worden aangemaakt. Uiteindelijk heb ik ervoor gekozen om het vlak te legen en opnieuw te vullen met een grafiek.

Er waren enkele kleine obstakels op de pagina ‘suppliers.html’. Een langdurige obstakel was het plaatsen van de labels en lijnen langs de donut grafiek. Dit heeft wel twee weken geduurd voordat deze zichtbaar waren.

De grootste obstakel was de hele pagina ‘netherlands.html’. Voor deze pagina was er een enorme dataset beschikbaar. De dataset bestond uit het gemiddelde verbruik per postcode in Nederland. Het waren iets meer dan zeven miljoen resultaten. Het idee was om een kaart van Nederland te weergeven waarbij elke postcode is gekleurd aan de hand van de beschikbare dataset. Als eerste is het niet gelukt om een Nederlandse SVG bestand te vinden die elke postcode weergeeft. Als tweede mislukte het inladen van de enorme dataset. Het duurde een enige tijd voordat de pagina was geladen.

### Keuzes

Bij de pagina ‘world.html’ zou er eigenlijk een kaart moeten worden getoond waarbij men door de jaren heen kan selecteren. Dit was als eerste geïmplementeerd, maar uiteindelijk bleek het geen toegevoegde waarde te geven. Na deze tegenvaller kwam er een bargrafiek. Zodra men op een land klikt komen er twee bargrafieken tevoorschijn. Een statische bargrafiek van Nederland die vergeleken wordt met het geselecteerde land.

Op de pagina ‘suppliers.html’ wordt er een donut grafiek weergegeven met een lijst van energieleveranciers. Ten eerste was de lijst en de donut vrij snel gelukt. Alleen de labels met de bijbehorende strepen wilde maar niet lukken. Bij de eerste poging kwam er geen tekst. Toen stond er tekst, wilde de tekst niet updaten. Door deze tegenvallers had ik als alternatief een legenda gemaakt en wanneer men over de donut heen gaat kwam er een tool-tip. Naderhand waren de labels en bijbehorende strepen wel gelukt! Waardoor het alternatief verviel.

Ook was er een overweging gemaakt om een dropdown te plaatsen in plaats van de grote lijst. Na de presentatie kwamen er toch meningen naar voren waarbij een lijst veel overzichtelijker is dan een dropdown. Door de presentatie is de lijst weer terug gezet.

Als laatste kwam de pagina ‘netherlands.html’ aan de beurt. Hierbij is de keuze gevallen op een kleinere dataset en een kaart van de gemeentes in Nederland. Men kan wel kiezen tussen stroom en gas. Ook kan er gekozen worden tussen drie verschillende jaren waardoor er interactie ontstaat in de kaart.
In de meest ideale situatie was er eerder een kaart van alle postcodes in Nederland geïmplementeerd (met behulp van een externe bronnen, zoals leaflet.js). Waarbij er een grote dataset wordt ingeladen met het verbruik per postcode in Nederland. Hierbij kon men naar de postcode zoeken waardoor de kaart wordt ingezoomd naar de desbetreffende postcode. Ook zou de enorme dataset efficient moeten worden ingeladen, zodat men niet te lang hoeft te wachten. 
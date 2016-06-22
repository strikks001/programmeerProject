# Eindverslag programmeer project 2016
###### Sanne Strikkers 11170816

### Inleiding

Men heeft vaak geen idee meer hoeveel stroom en gas er worden verbruikt. De laatste paar jaren zijn daarbij ook nog het aantal energieleveranciers flink gestegen. Vroeger was er alleen Eneco of Nuon, maar nu zijn er wel meer dan 10 bij gekomen. Door deze flinke stijging weten huishoudens in Nederland ook niet meer welke energieleveranciers er zijn.

Met dit probleem ben ik aan de slag gegaan. De website laat ten eerste een uitleg zien hoe de energiewereld er in Nederland eigenlijk uit ziet. Daarbij wil ik laten zien of Nederland wel zoveel stroom en gas verbruikt ten opzichte van andere landen in de wereld. Dan wordt er dieper in Nederland gekeken. Welke gemeentes verbruiken veel stroom en gas? Gaat Nederland steeds meer verbruiken over de jaren heen of neemt het juist af?

Als laatste wil ik aan de hand van een donut grafiek laten zien welke energieleveranciers er zijn. Daarbij wil ik ook de afkomst van stroom laten zien bij elke leverancier. Zo kan men ten eerste zien waar de stroom vandaan komt. Ten tweede kan men tegelijkertijd ook zien welke energieleveranciers er zijn in Nederland.

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

Er waren enkele kleine obstakels op de pagina ‘suppliers.html’. Een langdurige obstakel was het plaatsen van de labels en lijnen langs de donut grafiek.

De grootste obstakel was de hele pagina ‘netherlands.html’. Voor deze pagina was er een enorme dataset beschikbaar. De dataset bestond uit het gemiddelde verbruik per postcode in Nederland. Het waren iets meer dan zeven miljoen resultaten. Het idee was om een kaart van Nederland te weergeven waarbij elke postcode is gekleurd aan de hand van de beschikbare dataset. Als eerste is het niet gelukt om een Nederlandse SVG bestand te vinden die elke postcode weergeeft. Als tweede mislukte het inladen van de enorme dataset. Het duurde een enige tijd voordat de pagina was geladen.

### Keuzes




how is the functionality implemented in your code? 
This should be like your DESIGN.md but updated to reflect the final application. 

First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). 
Second, go into detail, and describe the modules/classes and how they relate.
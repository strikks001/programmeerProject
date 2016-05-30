# Programmeer Project Data 2016 

### Het probleem
Het probleem bij de inwoners van Nederland is dat men geen inzicht heeft in het gemiddeld energie (stroom en gas) verbruik. De meeste mensen houden niet bij hoeveel energie zij verbruiken. Zo kan er vergeleken worden per jaar of men meer energie verbruikt. 

Ook heeft de Nederlandse inwoner geen overzicht meer van alle energieleveranciers die lopende der jaren zijn bijgekomen. Vroeger begon het met twee of drie energieleverancier, maar nu zijn er wel meer dan tien bijgekomen. Men ziet daarbij ook niet waar deze Nederlandse energieleverancier hun energie vandaan halen. Zijn deze energieleveranciers wel zo groen of grijs zoals ze beweren? De gemiddelde Nederlander laat zich misleiden doordat sommige leveranciers beweren dat zij groen zijn terwijl ze helemaal niet groen zijn. Om voor dat soort leveranciers te kiezen beïnvloedt toch de keuze van de gemiddelde Nederlandse inwoner.

### Visualisatie
* Een wereldmap met daarop het gemiddeld energieverbruik per land;
  * In de wereldmap kan er gekozen worden tussen stroom en gas;
  * Eventueel kan er gekozen worden tussen verschillende jaren;
* Een map van Nederland die het gemiddeld energieverbruik per postcode laat zien;
  * In de map kan er gekozen worden tussen stroom en gas;
  * Hierbij kan men het energieverbruik per jaar met elkaar vergelijken;
* Een map van Nederland waar men de energieleveranciers kan bekijken;
  * Op deze map kan men zien waar deze energieleveranciers hun energie (stroom en gas) vandaan halen;
  * Als men op een leverancier klikt wordt er een bargrafiek weergegeven waar te zien komt waar het stroom en gas vandaan komt. Zoals kernenergie of windmolen parken.

### Pagina’s
In ieder geval komen er vier verschillende pagina’s. Een pagina met uitleg over energie in het algemeen, groene en grijze stroom, welke leveranciers bestaan er in Nederland, wat zijn de netbeheerders. Op deze pagina wordt er ook uitgelegd wat de website wil laten zien. Daarbij worden er nog drie pagina’s toegevoegd waarop de drie verschillende visualisaties worden geplaatst. 

Een pagina met een wereldmap met het gemiddelde energie verbruik over de jaren heen. Zodat men kan vergelijken of er meer energie wordt verbruikt. Onder de wereldmap wordt een uitleg gegeven over de visualisatie en een legenda onder de visualisatie. De pagina met de wereldmap legt ook alvast een link met Nederland. Hierin wordt verduidelijkt dat Nederland onder de loop wordt genomen. 

De pagina erna wordt de visualisatie weergeven die een kaart van Nederland laat zien met het gemiddeld energieverbruik per postcode. Ook hier wordt weer een uitleg en conclusie gegeven over de kaart. Daarbij wordt er weer een link gelegd wat er voor energieleveranciers er zijn in Nederland, want de laatste pagina laat de energieleveranciers van Nederland zien. Door op een leverancier te klikken komt er een bargrafiek tevoorschijn die laat zien waar het stroom en gas vandaan komt.

### Schetsen

### Data
* Data World Bank stelt het gemiddeld verbruik van stroom en gas per land beschikbaar;
* Netbeheerders, zoals Enexis, Stedin of Liander, hebben inzicht in het gemiddeld verbruik per postcode. Deze gegevens zijn in csv formaat beschikbaar. Daarbij hebben deze netbeheerders het gemiddeld verbruik per jaar in aparte csv bestanden beschikbaar gesteld;
* De energieleveranciers, zoals Essent, Qurrent of GreenChoice beweren dat zij groene energie leveren. Hierbij moet er gezocht worden naar data die gegevens laat zien waar deze energieleveranciers hun energie vandaan halen;
  * www.consuwijzer.nl laat de bron van herkomst zien bij elke leverancier.

### Externe componenten
Om de visualisaties tot stand te laten komen moet er D3 JavaScript (www.d3js.org) worden geïmplementeerd. Daarbij moet de website er representatief uit zien. Hiervoor wordt de library Bootstrap (www.getbootstrap.com) gebruikt.

### Technische problemen of limieten
Er zou een probleem kunnen komen bij het visualiseren van het laatste component die de energieleveranciers laat zien. Hier is nog vrij weinig data van of verwarrende data van beschikbaar. Waardoor de visualisatie moeilijk te visualiseren wordt, maar deze visualisatie is wel het belangrijkst. Dit is het belangrijkste visualisatie, omdat het de link legt tussen de vorige visualisaties (wereldmap en een map met een focus op Nederland).

###### Sanne Strikkers 11170816
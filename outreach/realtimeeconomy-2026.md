# Declarative Company Protocol: reaalajamajanduse järgmine kiht

*Mustand, mai 2026. Esitatud aruteluks MKM-i reaalajamajanduse meeskonnale.*

## Kokkuvõte

Reaalajamajanduse 2020–2027 tööplaan jõuab kolme sõlme — G2B nõusoleku-mehhanism, Aruandlus 3.0 taksonoomia ja ettevõtte identiteedi mitmekülgsus —, kus järgmiseks sammuks ei jää andmesilla parandamine, vaid **silla otsas seisva objekti, ettevõtte enda, ümbermõtestamine**. Declarative Company Protocol (DCP) on avatud spetsifikatsioon, mis muudab ettevõtte krüptograafiliselt allkirjastatud sündmustelogiks ja sellelt projitseeritavaks olekuks. DCP ei ole reaalajamajanduse asendus — see on selle loogiline järgmine kiht, ehitatud Eesti olemasolevale digi-taristule.

## Kus praegune roadmap takerdub

Reaalajamajanduse alaprogrammid on tehniliselt õigetes kohtades, aga jõuavad punktidesse, kus praegune lähenemine ei skaleeru:

1. **G2B andmevahetuse nõusoleku-probleem.** Eesmärk on jagada ettevõtte värskeid andmeid kolmandate osapooltega 2027-ks, "nõusoleku alusel". Aga kes annab nõusoleku ettevõtte nimel? Praegu on see seotud platvormi-kasutajaga (raamatupidaja kontoga panga keskkonnas, juhatuse liikme istumisega EMTA-s). Iga uus suund vajab uut platvormi-integratsiooni.

2. **Aruandlus 3.0 tõlkekiht.** XBRL GL on **tõlge** raamatupidamistarkvara väljundi ja riigi sisendi vahel. Iga tarkvara tõlgendab seda erinevalt; iga uus aruanne lisab uue mappingu. Aruandlus 3.0 mittesubstantsiks on praegu täidetav nimekiri — mitte muutuv arusaam sellest, mis ettevõte üldse on.

3. **Identiteedi mitmekülgsus.** Sama ettevõte on EMTA-s üks asi, äriregistris teine, panga CRM-is kolmas, raamatupidamistarkvaras neljas. G2B andmevahetus liigutab andmeid nende vaadete vahel, aga ei tee neist üht.

Kõik kolm sõlme on lõpuks sama probleemi avaldumised: **ettevõte ei ole täna iseseisev, masinloetav objekt — ta on platvormipõhiste vaadete kogum**.

## Mida DCP standardiseerib

DCP defineerib ettevõtte kuue konventsiooniga:

- **Identiteet** — ettevõte on krüptoviide, mis seostub registrikoodi ja eIDAS-i identiteediga, aga ei sõltu ühe platvormi andmebaasist.
- **Juhtimisartefaktid** — põhikiri, rollid, mandaadid, delegeeringud, resolutsioonid kvalifitseeritud allkirjaga dokumentidena, mille volitusi kontrollib mistahes vastav implementatsioon.
- **Allkirjad** — ettevõtte teod on autoriseeritud Smart-ID, Mobile-ID, eID kvalifitseeritud allkirjadega; kandevormingud BDOC ja ASiC-E.
- **Sündmuste logi** — kõik teod (lepingud, deklaratsioonid, otsused, e-arved, e-veoselehed, makse-autoriseerimised, mandaadi-muudatused) on append-only järjestus allkirjastatud sündmustest.
- **Hetkeseis kui projektsioon** — praegused juhid, aktiivsed mandaadid, lahtised kohustused arvutatakse logist, mitte ei hoita eraldi tõeallikana.
- **Riigi-suunalised konventsioonid** — kuidas vastav ettevõte esitleb end riigiteenustele ühtse liidese kaudu, mitte iga teenuse eraldi API kaudu.

DCP ei ole runtime, toode ega platvorm. DCP on **konventsioonide kogum**, mille võib implementeerida igaüks — sealhulgas olemasolevate raamatupidamistarkvarade pakkujad oma toodete sees.

## Suhe olemasolevasse reaalajamajanduse kavasse

DCP on praeguse kava **jätkuks ette nähtud, mitte konkurendiks**:

| Reaalajamajanduse alaprogramm | DCP suhe |
|---|---|
| G2B andmevahetus | DCP mandaat asendab platvormi-põhise nõusoleku allkirjastatud, masinkontrollitava artefaktiga. Sama nõusolek kehtib igal pool, mitte iga platvormi puhul eraldi. |
| Aruandlus 3.0 / XBRL GL | DCP käsitleb XBRL GL-i sündmuse payloadi formaadina. "Aruanne" muutub projektsiooniks olemasolevast logist — riik teeb sama päringu, mida ettevõte ise teeks. |
| E-arve, e-veoseleht, e-CMR | Igaüks on DCP sündmuse-tüüp olemasoleva semantikaga. Praegused standardid säilivad, neid lihtsalt manustatakse logisse. |
| Andmesektsioon, andmefaili valideerimine | DCP-le manustatud sündmus on niikuinii allkirjastatud — valideerimine on sissehitatud, mitte lisatöö. |
| Eesti.ai | Sama logi on AI-süsteemidele puhas struktureeritud sisend. Kõrvalkasu, mitte primaarne põhjendus. |

## Miks Eesti, miks praegu

Enamikus jurisdiktsioonides oleks DCP käivitamine 5+ aasta töö. Eestis on eeldused juba olemas ja juriidiliselt siduvad:

- registrikood + e-Residency
- Smart-ID, Mobile-ID, eID kvalifitseeritud allkirjadega (eIDAS)
- BDOC ja ASiC-E vaikimisi formaadid
- X-Tee 20+ aastat tootmistaristuna
- Äriregister API-ga; EMTA, Töötamise register, e-arved juba M2M
- eIDAS2 piiriüleseks ülekantavuseks

Põhjamaade tasandil on Nordic Smart Government & Business 2021–2027 roadmap heaks kiidetud ministrite poolt, hinnatav potentsiaal **14 mld € aastas** Põhjamaades reaalajaandmete täisrakenduse korral. Eesti DCP-implementatsioon on selle regionaalse standardi referents, mitte kõrvalprojekt.

## Mõõdetav mõju reaalajamajanduse mõõdikutele

- **14 mln töötundi aastas (~7000 inimese täiskoht)** — olemasolev MKM-i hinnang reaalajamajanduse täisrakenduse mõjust. DCP eemaldab struktuurselt platvormipõhise integratsiooniga seotud korduvtöö, mis on selle hinnangu suurim ühekordne komponent.
- **SME halduskoormus** — täna ~1000–3000 €/aastas raamatupidamine ühe FIE kohta. DCP-le rajatud ettevõte ei vaja eraldi aruandlust ega kuust kuusse korduvat täitmist.
- **Faktooringu, krediidi, kindlustuse hõõrdumine** — reaalaja-andmevoog asendab kuude lõpu väljavõtteid.
- **Piiriülese kaubanduse hõõrdumine** — eIDAS2-baasne ülekantavus EL-i tasemel.

## Kolm 18-kuu pilooti olemasolevate toetusmehhanismide raames

Kõik kolm mahuvad reaalajamajanduse 10 M€ toetuste mehhanismi (kuni 150 000 € projekti kohta) ja kasutavad olemasolevaid partnereid:

1. **Aruandlus 3.0 + DCP ühilduvuse pilot.** EMTA, Statistikaamet, Eesti Pank. DCP sündmuste logi XBRL GL payloadiga; tõestada, et "aruanne" tekib projektsioonina ilma eraldi sammuta raamatupidamistarkvarast välja võtmiseta. Mõõdik: aruandeesituste arv pilootettevõtte kohta nullini.

2. **G2B nõusoleku-mehhanismi DCP-baasne pilot.** RIK, üks pank (LHV või SEB), 1000 e-resident OÜ-d. DCP mandaat asendab platvormi-spetsiifilise nõusoleku. Mõõdik: integratsioonide arv ühe nõusoleku kohta.

3. **E-arve + e-veoseleht ühtse logi pilot.** Olemasolev e-veoseleht-vooruga liitunud 320 ettevõtet. DCP lisab nende tehingutele ühtse logi-positsiooni. Mõõdik: ühe ettevõtte kõigi tehingute saadavus ühe päringuga, sõltumata tarkvarast.

Iga pilootprojekt on iseseisvalt mõõdetav. Kõik kolm pannakse alla 18 kuu, kasutades olemasolevaid raha- ja partneri-kanaleid.

## DCP staatus täna

- Avatud spetsifikatsioon, MIT litsents: <https://github.com/programmable-company/dcp-spec>
- Pre-alpha; vision ja principles avaldatud, esimesed spetsifikatsiooni mustandid avaldatakse 2026 jooksul
- 2027 luuakse Eesti Sihtasutus pikaajaliseks haldamiseks. Esialgne autor on andnud avaliku kohustuse mitte saada selle juhiks.
- Ühelgi kommertsrakendusel — sealhulgas autoriga seotud üksusel — ei ole ega tule eelisseisundit.
- Disainivalik, mille kohta ootame MKM-i tagasisidet: DCP käsitleb XBRL GL-i sündmuse payloadi formaadina (mitte alternatiivina), et säilitada olemasolev Aruandlus 3.0 töö.

## Mida me palume

1. **Kohtumine MKM-i reaalajamajanduse meeskonnaga**, eelistatult koos Aruandlus 3.0 partneritega (EMTA + Statistikaamet + Eesti Pank).
2. **Hinnang DCP positsioneerimisele 2025–2027 tööplaani lõpus** — kas see on sobiv kandidaat järgmise reaalajamajanduse-tööplaani (post-2027) raamiks.
3. **Tehniline dialoog RIK-iga** äriregistri suunal — kuidas DCP sündmuste logi suhestub registrikande mehhanismiga.
4. **Põhjamaade kontakt** — DCP esitlemine NSG&B töörühmas Eesti panusena 2027 roadmapi finišikilomeetrile.

## Lõpetuseks

Reaalajamajandus on kandnud Eesti viimase viie aasta digi-arengu visiooni. Selle järgmine versioon ei ole "veel kiirem andmevahetus" — see on **erinev ettevõte**: selline, mille olek on niikuinii loetav kõikidele osapooltele, sest see on ehitatud allkirjastatud, masinkontrollitavale alusele. DCP on sellise ettevõtte konventsiooni-kogum, ja Eesti on ainus koht, kus selle täna käima saab panna.

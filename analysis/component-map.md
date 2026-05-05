# DCP komponendi-kaart

*Tööversioon, mai 2026. Mitte spetsifikatsiooni-mustand — analüütiline alusdokument järgmiste sammude valikuks.*

## Eesmärk

Kui hüpotees on, et **ettevõtte olemus ise peab muutuma**, siis tuleb kaardistada: millistest osadest ettevõte koosneb, mis nendest on Eestis ja EL-is juba standardiseeritud, ja kus on lüngad, mille DCP peab täitma.

Lähenemine on "*tugineda olemasolevale, defineerida puuduv*" (PRINCIPLES.md p. 8). Iga osa kohta:

- **Olemas** — mis standard, register või taristu kannab seda täna
- **Lünk** — kus on jätkuv hõõrdumine või puudub standard üldse
- **DCP roll** — kas DCP integreerib (kasutab olemasolevat), harmoneerib (paneb killud kokku), või defineerib uue konventsiooni

## Kuus komponendi-kategooriat

### 1. Identiteet ja juriidiline olemasolu

| Element | Olemas | Lünk | DCP roll |
|---|---|---|---|
| Registrikood | RIK äriregister | Tekstistring, mitte krüptoviide; sõltuvus ühe registri vaates | Defineerib krüpto-identiteedi-viite, mis seostub registrikoodiga |
| e-Residency | RIK + PPA | Erikohaste reeglite hajutatus | Integreerib (rakendab samu identiteedi-primitiive) |
| Juriidiline vorm (OÜ, AS, MTÜ, FIE) | Äriseadustik, MTÜS | Vormi-spetsiifilised reeglid hajutatud koodi kõrval | Harmoneerib (vorm kui artefakti omadus) |
| EMTAK tegevusala | Statistikaamet | Olemas, masinloetav | Integreerib |
| Olek (aktiivne/peatatud/lõpetatud) | Äriregistri kanne | Sünkroniseerimine teiste süsteemidega aeglane | Defineerib (olek kui projektsioon logist) |

### 2. Juhtimisartefaktid (governance)

| Element | Olemas | Lünk | DCP roll |
|---|---|---|---|
| Põhikiri | PDF, BDOC kandeformaadis | **Masinloetav formaat puudub** — iga ettevõtte põhikiri on vabatekst | **Defineerib** struktureeritud põhikirja-skeemi |
| Juhatuse otsused | Vabavormis paberid, BDOC | **Tsentraalne kataloog puudub**; otsused asuvad e-postis | **Defineerib** otsuse-artefakti formaadi |
| Osanike otsused | Sama | Sama | Sama |
| Mandaadid (volikirjad) | BDOC allkirjastatud volikirjad | **Cross-platform formaat puudub** — pangamandaat, EMTA volitus, raamatupidaja roll on eraldi süsteemides | **Defineerib** ühtse mandaadi-formaadi (kriitiline) |
| Delegeerimine | Mitteformaalne või paberil | Standard puudub | **Defineerib** |
| Rollid | Vabavormis ametinimetused | Ontoloogia puudub | **Defineerib** rollide ontoloogia skeleti |
| Allkirjad | Smart-ID, Mobile-ID, eID, eIDAS, BDOC, ASiC-E | — | Integreerib (siduvad olemasolevatele kvalifitseeritud allkirjadele) |

### 3. Sündmuste logi — ettevõtte teod

| Sündmuse tüüp | Olemas | Lünk | DCP roll |
|---|---|---|---|
| **E-arve** (saatja & saaja) | EVS-EN 16931, PEPPOL, e-arve operaatorid | Logi-positsioon ja ettevõtte-tasandi seos puudub | **Integreerib** (e-arve = sündmus DCP logis) |
| **E-veoseleht / e-CMR** | Maanteeamet, e-CMR; 320 ettevõtet juba liitumas | Sama | Integreerib |
| **E-kviitung** | EVS, fiskaalseadmed | Sama | Integreerib |
| **Maksed (SEPA, BIS)** | Pangad, PSD2 API-d | Pangakonto-keskne, mitte ettevõtte-keskne | Integreerib (PSD2 API-de kaudu sissetõmme) |
| **Lepingud** | BDOC allkirjastatud dokumendid | **Lepingu-tasandi register puudub**; viited ei ole standardiseeritud | **Defineerib** lepingu-sündmuse formaadi |
| **Resolutsioonid (otsused)** | (vt p. 2) | (vt p. 2) | Defineerib |
| **Töösuhted** | Töötamise register (TÖR) | TÖR API olemas | Integreerib |
| **TSD, KMD deklaratsioonid** | EMTA | Praegu eraldi esitamine | **Asendab projektsiooniga** (DCP loogiline tagajärg) |
| **Aastaaruanne** | RIK, XBRL | Praegu eraldi esitamine | Asendab projektsiooniga |
| **Statistilised aruanded** | Statistikaamet | Sama | Asendab projektsiooniga |
| **Kohtumenetlused** | Kohturegister | Hilinev sünkroniseerimine | Integreerib (väline sündmus logis) |
| **Sanktsioonid, hoiatused** | EMTA, RIK | Sama | Integreerib |

**Logi enda formaat** (sündmuste järjestus, sõnumi struktuur, viited, integreeritus) — **DCP defineerib**. Praegu pole sellist asja Eestis ega EL-is.

### 4. Hetkeseis kui projektsioon

| Vaade | Olemas | Lünk | DCP roll |
|---|---|---|---|
| Praegused juhid | Äriregistri kanne | Ainult registriviide hetkeks | Defineerib (projektsioon logist) |
| Aktiivsed mandaadid | Killustunud platvormide järgi | Ühtne vaade puudub | Defineerib |
| Lahtised kohustused | EMTA väljavõte | Ainult maksu-kohustused | Defineerib (laiem mõiste) |
| Bilanss reaalajas | Raamatupidamistarkvara | Standardiseerimata | Harmoneerib (olemasolev tarkvara, DCP päring) |
| Kassaseis | Pangakonto, PSD2 | Mitme panga konsolideerimine puudub | Harmoneerib |
| UBO (tegelik kasusaaja) | UBO register RIK-is | Hilinemisega sünkroniseerimine | Defineerib |
| Kohtumenetlused | Kohturegister | Sünkroniseerimine | Integreerib |
| Vastavus (KYC, AML, sanktsioonid) | Hajutatud | Standard puudub | **Defineerib** vastavus-projektsiooni |

**Projektsiooni-mehhanism ise** (kuidas päring logist hetkeseisuks taandub, mis on standardse päringu vorm) — **DCP defineerib**.

### 5. Riigi-suunalised konventsioonid

| Suund | Olemas | Lünk | DCP roll |
|---|---|---|---|
| EMTA suund | e-MTA, X-Tee | Iga teenus eraldi liides | **Defineerib** ühtse esitusliidese |
| Äriregistri suund | RIK API | Sama | Defineerib |
| Statistikaamet | Aruandlus 3.0 (XBRL GL) | Eraldi esitamine | **Asendab projektsiooniga** (DCP logist) |
| Eesti Pank | Aruandlus 3.0 | Sama | Sama |
| Maanteeamet (e-CMR, e-veoseleht) | Olemas | — | Integreerib |
| Kohtud | e-toimik | Tihedat M2M ühendust pole | Integreerib (väline sündmus logis) |
| Tööinspektsioon | TÖR + erivalvemenetlused | Eraldi liidesed | Defineerib |

### 6. Juurdepääs ja privaatsus

| Element | Olemas | Lünk | DCP roll |
|---|---|---|---|
| Selektiivne avalikustus | eIDAS2 EUDI Wallet, ZK-proovid | EI ole rakendatud ettevõtte-tasandil | **Defineerib** ettevõtte-tasandi selektiivse avalikustuse |
| Nõusolek (G2B andmevahetus) | Kavandatud, platvormi-põhine | Cross-platform nõusolek puudub | **Defineerib** (sama mehhanism kui mandaat) |
| Auditi-juurdepääs | Audiitorid platvormide kaudu | Tsentraalne reaalajas-juurdepääs puudub | Defineerib |
| GDPR-i andmekontroll | Üldiselt olemas | Ettevõtte-spetsiifiline rakendamine puudub | Harmoneerib |

## Mida sellest järeldada

### DCP-l on kolm tüüpi tööd

1. **Integreerimine olemasolevaga.** Suurem osa konkreetseid sündmuse-tüüpe (e-arve, e-veoseleht, TSD, KMD, töötamise register, SEPA maksed) on **juba standardiseeritud**. DCP roll on neid logisse manustada, mitte üle defineerida. **Risk siin on madal, väärtus on praktilises terviklahenduses.**

2. **Killustunud killustunud asjade harmoneerimine.** Mandaadid, juhatuse otsused, lepingud, finantsseis, vastavus — eksisteerivad eraldi platvormidel ja formaatides. DCP teeb neist ühe vaate. **Risk siin on poliitiline (platvormi-omanikel on lockin-huvi), aga tehniliselt tehtav.**

3. **Tegelikult uue defineerimine.** Ettevõtte-tasandi sündmuste logi formaat, projektsiooni-mehhanism, mandaadi-formaat, põhikirja-skeem, rollide ontoloogia. **Risk siin on, et meie disainivalikud määravad järgnevad 20 aastat.** Need on prioriteet 1.

### Töömahu prioriteetjärjekord

**Esmane (2026 H2 — esimesed mustandid)**
- Mandaadi-formaat (cross-platform, signed) — kriitiline lukk kõigi muude komponentide jaoks
- Sündmuste logi formaat (struktuur, allkiri, viited)
- Identiteedi-viite formaat (registrikoodi sidumine krüpto-viitega)
- Põhikirja struktuur (esimene mustand, mitte täielik)

**Teisene (2027 H1)**
- Otsuste/resolutsioonide artefaktid
- Projektsiooni-mehhanism (päringu vorm, päringu semantika)
- Sündmuste tüpoloogia katalog (kuidas olemasolevad e-arve / e-veoseleht / TSD jne logisse mahuvad)
- Rollide ontoloogia esimene versioon

**Kolmas (2027 H2)**
- Selektiivse avalikustuse mehhanismid
- G2B nõusoleku-formaadid (mandaadi laiendus)
- Vastavus-projektsiooni standardid
- Inter-company sündmused (kui ühe ettevõtte tegu nõuab teise tunnistamist)

**Neljas (2028+)**
- Piiriülesus eIDAS2 kaudu
- Vaidluste, kohtuotsuste, pankroti äriloogika logis
- Migratsioon legacy-ettevõttelt DCP-ettevõtteks
- Disaster recovery, logi terviklikkuse tagatis

### Esimene konkreetne pilot

Kõige loomulikum esimene pilot on **e-arve sündmusena DCP logis**, sest:
- Sisu juba struktureeritud (EVS-EN 16931 / PEPPOL)
- Allkirjad olemas (BDOC)
- 320+ ettevõtet on niikuinii e-veoseleht-vooru kaudu juba liitumas
- KMD on otsene projektsioon e-arve logist — kohene näitlik tagajärg
- Riski-mõõde madal: kui DCP-osa ei tööta, jääb e-arve ise ikka tööle

**See on koht, kust spetsifikatsiooni esimene mustand võiks ka praktiliselt välja kasvada**, mitte teoreetiliselt: defineerime sündmuse-tüübi e-arvele, sealt tuleb logi-formaat, sealt projektsioon, sealt KMD-vaade.

## Avatud küsimused, mis vajavad otsust enne mustandit

1. **XBRL GL kui sündmuse payload?** Kui jah, milline alamhulk? (Aruandlus 3.0 ühilduvuse tagamiseks)
2. **Sündmuste logi salvestus** — kas DCP määrab, kus log asub (ettevõte ise vs jagatud taristus vs hibriid)?
3. **Mandaadi tühistamine** — append-only logis kuidas väljendada ümberlükkamist?
4. **Inter-company sündmused** — kas DCP defineerib *teise* ettevõtte vaate ka, või ainult oma ettevõtte logi?
5. **Päringukeel** — kas DCP defineerib oma päringu-vormi või tugineb olemasolevale (SPARQL, GraphQL, OData)?
6. **Versioonimine** — kuidas DCP iseennast versioonib ilma murdmata?

Iga neist on kolme-kahe-kuu uurimise teema, enne kui esimene spetsifikatsiooni-mustand vastu pidada suudab.

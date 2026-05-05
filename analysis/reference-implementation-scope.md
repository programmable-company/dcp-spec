# Reference implementation: scope esimeste 10–50 ettevõtte jaoks

*Tööversioon, mai 2026. Defineerib minimaalse funktsionaalsuse, millega võib esimesed kümned Eesti ettevõtted DCP-baasil reaalselt opereerima panna.*

## Lähtekohad

1. Reference implementation ei ole SaaS-toode tavalises mõttes. **DCP-formaadis log on kanooniline** — rakendus on vaid üks kasutajaliides selle peale. Kasutaja andmed kuuluvad logi-omanikule (ettevõttele), mitte rakendusele.
2. **Avatud lähtekood päevast üks** (MIT või Apache 2.0). Igaüks saab forkida või konkureeriva rakenduse ehitada.
3. **Eksport on first-class funktsionaalsus**, mitte hilinenud lisand. Kui klient läheb teisele rakendusele, saab ta logi tervikuna kaasa ja jätkab seal.
4. **Self-hostable** — kuigi enamik kliente kasutab hostitud versiooni, peab self-host olema dokumenteeritud ja töötav. See on tõestus sõltumatusele.
5. **Audit trail kõigest** — iga kasutajaliidese-poolne tegevus genereerib allkirjastatud sündmuse logis. Rakendus ei muuda andmeid muul viisil.

## Sihtkasutaja MVP-faasis

**Profiil A: Solo OÜ või FIE konsultant.** See profiil katab Eestis ~kümnete tuhandete ettevõtete vajaduse ja on kõige väiksem realistlik täisrakenduse-juhtum. Kui MVP toetab profiil A-d **täielikult** (mitte osaliselt), on see rakendus juba kasutuskõlbulik vahetuses olemasolevatele raamatupidamistarkvaradele.

Konkreetne kasutusprofiil:
- Üks juhatuse liige, kes on samaaegselt ainuosanik ja töötaja
- 5–50 väljaminevat e-arvet kuus
- 10–100 sissetulevat e-arvet kuus
- Üks pangakonto (LHV, SEB, Swedbank või Coop)
- Vajab: e-arved, KMD, TSD, pangakanne, lihtne pearaamat, dokumentide allkirjastamine, eksport

**Mis on MVP-st välja jäetud:**
- E-veoseleht / e-CMR (transpordispetsiifiline, tuleb hiljem)
- Multivaluuta tehingute keerukam haldamine
- Mitme ettevõtte haldus ühe konto alt
- Aastaaruanne (tuleb 6 kuud pärast esimest klienti)
- Statistikaameti aruanded
- Inventar, projektihaldus, ajaarvestus
- Cap table / osanike registreerimine osas, mida äriregister ei kata
- Töötajate isikuandmete täielik haldamine (alguses minimaalne — vaid TSD jaoks vajalik)

## MVP funktsionaalne kogum

### A. Identiteet ja juurdepääs

- Smart-ID, Mobile-ID, eID sisselogimine (Estonia-EID OAuth lib või vastav)
- Ettevõtte algseisu initsialiseerimine registrikoodi ja äriregistri päringu põhjal
- Mandaadi-kontroll iga toimingu eel (alguses: omanik = täisõigus)

**DCP-komponendid:** identiteedi-viide, mandaadi formaat, ettevõtte algseisu sündmus

### B. Sündmuste logi alus

- Iga tegevus (arve väljastamine, makse kinnitamine, dokumendi allkirjastamine, mandaadi muudatus) on **allkirjastatud sündmus logis**
- Logi on kohalikult salvestatud + sünkroniseeritud hostitud koopiaga (toesta mõlemat režiimi)
- Sündmuse formaat järgib DCP esmast mustandit (vajab lukustamist enne MVP-d)

**DCP-komponendid:** sündmuste logi formaat, sündmuse-tüpoloogia esimene versioon, projektsiooni-mehhanism

### C. E-arved (kriitiline)

- **Väljaminevad**: EVS-EN 16931 / PEPPOL formaadis arve koostamine, allkirjastamine, saatmine PEPPOL võrku, sündmusena logisse kandmine
- **Sissetulevad**: PEPPOL kaudu vastuvõtt, sündmusena logisse, kasutaja-poolne kinnitus / vaidlustamine
- Klassifitseerimine (manuaalne + lihtne automaatika tarnija/teenuse järgi)

**DCP-komponendid:** e-arve sündmuse-tüüp (PEPPOL XML payload sündmuse sees), allkirjastamine BDOC-ASiC-E vormingus

### D. Pangakanne (PSD2)

- Read-only PSD2 ühendus LHV, SEB, Swedbanki, Coop'iga
- Tehingute pull (mitte just last-day, vaid kogu olemasoleva ajalugu liitumise hetkel)
- Sobitamine arvete sündmustega (auto + manuaalne)
- Iga sobitus on omakorda sündmus

**DCP-komponendid:** välise sündmuse import logisse (panga-tehing), seose-sündmus

### E. Maksu-projektsioonid

- **KMD** (käibedeklaratsioon): projektsioon väljaminevate ja sissetulevate arve-sündmuste pluss panga-sündmuste põhjal. Arvutatud iga kuu lõpus, esitatav e-MTA kaudu (esmasel etapil "esita käsitsi" — automaatne esitamine on järgmise faasi asi).
- **TSD** (tulu- ja sotsiaalmaksu deklaratsioon): projektsioon palga-sündmuste põhjal. Sama loogika.

**DCP-komponendid:** projektsiooni-päringud, päringukeele esimene versioon (vt avatud küsimust spec'is)

### F. Pearaamat (lihtne)

- Tulu, kulu, käive, kasum vaateid logist projitseerituna
- Bilanss: lihtsustatud (kõik logi-järgsed positsioonid)
- Kuu, kvartal, aasta filtrid

Ei ole eraldi salvestatud andmeallikas — alati arvutatud logist. See on kriitiline disainivalik: kui pearaamat oleks eraldi tabel, oleks kogu DCP idee mõttetu.

### G. Dokumendid ja allkirjad

- BDOC-ASiC-E allkirjastamine Smart-ID / Mobile-ID / eID kaudu
- Dokumendid on logi-sündmuste **manus**, mitte eraldi entiteet
- Levinumad dokumendi-tüübid: leping, otsus, mandaat, volikiri

### H. Mandaadi-haldus

- Vaade: kes on praegu volitatud mida tegema
- Toiming: lisa mandaat (allkirjastatud), tühista mandaat (uus allkirjastatud sündmus)
- Esmases versioonis ei ole keerulist rolli-hierarhiat — ainult "täisvolitus" ja "lugemine"

**DCP-komponendid:** mandaadi-formaat (kriitiline), tühistamise semantika append-only logis

### I. Töötajad (minimaalne)

- TÖR (töötamise registri) integratsioon — sissetulevate kannete pull, palga-sündmuste loomine logis
- Üks töötaja-vorm minimaalse infoga (isikukood, palk)
- Kasutatakse TSD projektsiooni jaoks

### J. Eksport

- **DCP logi täielik eksport** (JSON-LD või protokolli poolt valitud formaadis) igal hetkel, mitme klikiga
- **Klassikaline eksport** Excel/CSV (raamatupidamise üleviimine olemasolevasse tarkvarasse, kui klient soovib)
- **Kolmanda osapoole import** (oluline, mitte mainitud, aga tegelikult sama oluline kui eksport): klient saab oma olemasolevad andmed (raamatupidamistarkvarast) sisse importida

## Mis on MINIMUM, et esimene reaalne klient võiks alustada

Üksiku Profiil A ettevõtte täielikuks operatsiooniks vajalik kogum on:
1. Sisselogimine + ettevõtte initsialiseerimine
2. E-arvete väljastamine ja vastuvõtt
3. Pangakanne ühe pangaga
4. KMD esitatav projektsioon
5. Eksport
6. Audit-trail kõigest

See on **6 funktsionaalset komponenti**. Kui need töötavad otsast lõpuni ühe ettevõtte peal, on rakendus alpha-tasemel. Kõik muu (TSD, mandaadid, dokumendid, pearaamat, töötajad) lisanduvad alpha → beeta üleminekul.

## Faasid

| Faas | Aeg | Kogum | Klientide arv | Eesmärk |
|---|---|---|---|---|
| **Phase 0** — proof of concept | 0–3 kuud | A, B, C, D, E (KMD), J | 1 (kontrollitud, autori enda OÜ) | Tõestada, et DCP-logi loop töötab otsast lõpuni |
| **Phase 1** — closed alpha | 3–6 kuud | + F, G, I | 5–10 (käsitsi onboardituud) | Reaalne kasutus, intensiivne tagasiside |
| **Phase 2** — beta | 6–12 kuud | + H (täielikult), polish | 10–50 (self-serve sisselogimine) | Skaleeritud kogemus, esimene avalik tagasiside |
| **Phase 3** — public | 12–18+ kuud | + aastaaruanne, e-veoseleht, mitme-ettevõtte haldus | 100+ | Tugev kasutusbaas reaalajamajanduse-meeskonnaga rääkimisel |

## Tehnilised eeldused (mida spec peab pakkuma enne kui kood saab edasi liikuda)

Reference implementation ei saa olla parem kui spec'i tase. Need on miinimum-otsused, mis spec peab pakkuma **enne** Phase 0 käivitamist:

1. **Sündmuste logi formaat** (struktuur, allkirja-binding, viited sündmuste vahel) — see on luku, mida ei saa hiljem muuta klientidele murdmata
2. **Identiteedi-viite formaat** — kuidas registrikood seostub krüpto-viitega
3. **Mandaadi-formaat** — alguses võib olla minimaalne (2 rolli: täisvolitus, lugemine), aga peab olema kuluma proof-vorm
4. **Sündmuse-tüpoloogia esmane kogum** — vähemalt: ettevõtte-algatamine, mandaadi-kanne, mandaadi-tühistamine, e-arve-väljaminev, e-arve-sissetulev, panga-tehing, makse-sobitus, palga-sündmus
5. **Projektsiooni-päringu vorm** — vähemalt KMD jaoks. Esmases versioonis võib olla "raske kodeeritud", aga vorm tuleb spec'i panna

**Avatud spec-küsimused, mis MVP-d ei blokeeri**, aga tuleb hiljem fikseerida:
- Logi salvestus-arhitektuur (ettevõte, jagatud, hibriid)
- Inter-company sündmused
- Päringukeele lõplik valik
- Versioonimine
- Selektiivse avalikustuse mehhanismid

Need otsused tehakse Phase 1 → Phase 2 ülemineku piirialasel, kui reaalsetelt kasutusjuhtudelt tuleb tagasiside.

## Riskid ja tähelepanu-kohad

1. **Spec'i lukustamise tempo** — kui MVP läheb tootmisesse enne kui spec on stabiilne, on hilisemad muudatused murdvad. Soovitus: enne Phase 0 lõppu paneme spec'is lukku (1)–(5) ülal.
2. **Self-host vs hostitud kvaliteedikäärid** — self-host peab töötama, aga ei pea olema sama poleeritud. Risk on, et hostitud versioon saab niivõrd palju paremaks, et self-host muutub teoreetiliseks. Mitigation: foundation-pärane infrastruktuur jaotusena (nt Docker image), mida kasutatakse mõlemas.
3. **PSD2 partnerite koostöö** — mõned pangad vastavad halvasti. Mitigation: alustada ühe panga (LHV) tugeva integratsiooniga, laiendada hiljem.
4. **EMTA e-MTA muudatused** — riigi API-d võivad muutuda, mis nõuab korduvat kohanemist. Mitigation: kapseldamine kihti, mis on kerge uuendada.
5. **Klientide ootus "tavalisele raamatupidamistarkvarale"** — kasutajad ei taha protokolli, nad tahavad probleemi lahendamist. UI peab maskeerima DCP-d, mitte teda eksponeerima. Risk: rakenduse ehitajatel kiusatus DCP-osa rõhutada — see ei aita kliente.
6. **Ärimudeli paine vs printsiibid** — kui klient kasvab kiiresti, võib tekkida kiusatus lukustamine sisse tuua. Mitigation: ärimudel peab algusest peale olema "hosting + support + integratsioonid", mitte "data lock-in". Eraldi äriüksus aitab seda hoida selgelt.
7. **Foundation-firewall** — kommertsüksuse suhtumine spec-arendustesse peab olema avalikult dokumenteeritud enne kui MVP läheb avalikuks (mitte kõige kiireldas, aga enne Phase 2 algust).

## Soovitus — kus ja kuidas alustada

**Esimene konkreetne sprint (Sprint 1, 2 nädalat):**
- Spec'is lukustada sündmuste logi formaadi v0.1 (struktuur + allkirja-binding)
- Spec'is lukustada e-arve-väljamineva sündmuse-tüüp v0.1
- Repo struktuuri otsus: kas reference implementation on `dcp-spec/implementation/` alamrepo või eraldi repo
- Tehnoloogia-stack otsus (vaikimisi soovitus: TypeScript/Node või Rust + Postgres + minimal SPA frontend)

**Esimene 4 nädalat:**
- Identiteedi-loop töötab (Smart-ID sisselogimine + ettevõtte algatamine logist)
- E-arve väljastamine sündmusena (PEPPOL-väljund + logi-kanne)
- Logi vaatamine

**Esimene 12 nädalat (= Phase 0 lõpp):**
- E-arve sissetulev pool töötab
- Üks pank PSD2 kaudu kannet andmas
- KMD projektsioon arvutab õige numbri (võib olla esitatav ainult käsitsi)
- Eksport JSON-LD vormingus

Selle 12 nädala lõpus on **autori enda OÜ tegelikult selle peale läinud** ja loobitud olemasolevast raamatupidamistarkvarast. See on kõige tugevam dogfooding-test ja ühtlasi sisuline filter — kui see ei tööta autori enda jaoks, pole mõtet teisi peale võtta.

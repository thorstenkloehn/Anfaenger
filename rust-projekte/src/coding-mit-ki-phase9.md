# 💡 Phase 9: Fortgeschrittene Integration & APIs (RAG & Risikomanagement)

Willkommen in der Profiliga der KI-gestützten Softwareentwicklung! 🚀

In den bisherigen Phasen hast du gelernt, wie du die KI als intelligenten Chat-Partner im Programmieralltag nutzt. Jetzt gehen wir einen großen Schritt weiter: Wir holen die künstliche Intelligenz direkt in unsere eigenen Anwendungen. Du wirst lernen, wie du Programme schreibst, die über Schnittstellen (APIs) mit Sprachmodellen kommunizieren, wie du KI mit eigenem Wissen fütterst (RAG) und wie du natürliche Sprache in präzise Datenbankabfragen übersetzt.

Doch mit großer Macht kommt große Verantwortung: Wenn deine Software in echten Unternehmen skaliert werden soll, musst du Risiken kontrollieren. Wir sprechen in diesem Kapitel auch über Lizenzrechte (Urheberrecht), Datenschutz und die Vermeidung von gefährlichen "Halluzinationen" in sicherheitskritischem Code. Egal ob du mit Python, Rust, JavaScript, Java oder C++ programmierst – die Prinzipien der Integration und des Risikomanagements sind universell.

---

## 🧠 Theorie: Intelligente Integration & Risikominimierung

Bevor wir Code schreiben, müssen wir die architektonischen Muster verstehen. Lass uns die wichtigsten Konzepte anhand von anschaulichen Analogien betrachten.

### 1. Eigene KI-Werkzeuge bauen (Kofler, Kap. 9)

#### LLM-APIs in eigenen Anwendungen
Eine API (Application Programming Interface) ist wie eine Telefonleitung zu einem hochspezialisierten Dienstleister. Anstatt über ein Webinterface (wie ChatGPT) zu chatten, sendet deine Anwendung eine strukturierte Anfrage (Request) an die API der KI und erhält eine strukturierte Antwort (Response, meist als JSON-Dokument).
*   **Request (Anfrage):** Du übergibst das Modell, die System-Prompts, Benutzereingaben und Parameter wie die *Temperatur* (bestimmt, wie kreativ oder präzise die KI antworten soll).
*   **Response (Antwort):** Deine Anwendung muss das JSON-Format parsen und die gewünschten Daten extrahieren.

#### Retrieval-Augmented Generation (RAG)
Ein Sprachmodell weiß extrem viel über die Welt, kennt aber nicht deine privaten Notizen, die Dokumente deines Unternehmens oder brandneue Daten. RAG löst dieses Problem.
*   **Die Analogie:** Stell dir ein offenes Buch (Open-Book) bei einer Prüfung vor. Anstatt dass die KI aus dem Gedächtnis antwortet und rät (Halluzination), schlägst du zuerst in deiner lokalen Wissensdatenbank nach, suchst die passenden Seiten heraus und legst sie der KI zusammen mit der Frage vor.
*   **Der Ablauf:**
    1. **Vektorisierung (Embeddings):** Deine Dokumente werden in Zahlenkolonnen übersetzt, die deren Bedeutung repräsentieren.
    2. **Vektorsuche:** Stellt der Benutzer eine Frage, suchst du in der Vektordatenbank nach den inhaltlich ähnlichsten Textabschnitten.
    3. **Context Injection:** Du fügst diese Abschnitte in den Prompt ein (*"Beantworte die Frage nur basierend auf folgendem Kontext: ..."*).

#### SQL-to-Text und Datenbankabfragen
Die KI übersetzt einen einfachen menschlichen Wunsch (*"Zeige mir alle Kunden aus Berlin, die im letzten Monat bestellt haben"*) in ein präzises SQL-Statement (*`SELECT * FROM kunden ...`*). 
*   **Das Risiko:** Eine KI versteht zwar Datenbankstrukturen, kann aber fehlerhaftes SQL erzeugen oder bei böswilligen Eingaben (Prompt Injections) sogar Daten löschen! Deshalb ist eine Sicherheitsüberprüfung (Guardrails) zwingend notwendig.

#### Context Pollution (Kontext-Verschmutzung) (nach Tomasz Lelek & Artur Skowroński)
Jedes Sprachmodell hat ein begrenztes "Kontextfenster" – eine maximale Menge an Text (Tokens), die es auf einmal lesen und verarbeiten kann. Bei einem Chatverlauf wird mit jeder neuen Frage der *gesamte* bisherige Chatverlauf an das Modell geschickt. Wenn dieser Verlauf lang und unübersichtlich wird, kommt es zur sogenannten **Context Pollution (Kontext-Verschmutzung)**.
*   **Das Problem:** Wenn dein Chatverlauf voll von alten Fehlversuchen, irrelevanten Fehlermeldungen, veraltetem Code oder Abschweifungen ist, sinkt die Leistung der KI. Sprachmodelle leiden unter dem "Lost in the Middle"-Effekt: Sie schenken Informationen am Anfang und am Ende des Prompts viel Aufmerksamkeit, übersehen aber wichtige Details in der Mitte.
*   **Die Auswirkung:** Die KI wiederholt plötzlich bereits gelöste Fehler, ignoriert neue Anweisungen oder fängt an zu halluzinieren.
*   **Die Lösung:** 
    1. **Frische Chats:** Starte regelmäßig neue, saubere Chat-Sitzungen für neue Probleme.
    2. **Zusammenfassung (Refactoring des Kontexts):** Wenn ein Chat zu lang wird, bitte die KI zuerst um eine kurze Zusammenfassung des aktuellen Stands und der funktionierenden Codeteile. Kopiere diese Zusammenfassung in einen brandneuen Chat.
    3. **Selektiver Kontext:** Übergib der KI nur den Code, der für das aktuelle Problem wirklich relevant ist.

#### Datenbank-Migrationen & Schema-Design mit KI (nach Michael Kofler)
Der Entwurf von Datenbankschemata und die Durchführung von Schema-Änderungen (Migrationen) gehören zu den kritischsten Aufgaben in der Softwareentwicklung. Fehler können zu Datenverlust oder Systemausfällen im Live-Betrieb führen. KI kann dich hierbei als wertvoller Sparringspartner unterstützen, wenn du strukturiert vorgehst.
*   **Schema-Design entwerfen:** Du kannst der KI deine fachlichen Anforderungen beschreiben und sie bitten, ein normalisiertes Tabellendesign vorzuschlagen. Die KI hilft dir dabei, Fremdschlüsselbeziehungen, Indizes und Datentypen sauber zu planen.
*   **Sicher planen mit KI:** Wenn du ein bestehendes Schema ändern willst (z. B. eine Tabelle aufteilen oder Spalten umbenennen), nutze die KI, um die Migrationsschritte abwärtskompatibel zu planen.
*   **Die Goldenen Regeln für sichere KI-Migrationen:**
    1. **Trennung von Struktur (DDL) und Daten (DML):** Lass dir DDL-Skripte (`CREATE TABLE`, `ALTER TABLE`) getrennt von DML-Skripten (`UPDATE`, `INSERT` zur Datenkonvertierung) generieren.
    2. **Rollback-Pläne einfordern:** Lass dir von der KI zu jeder Migration immer ein korrespondierendes "Down-Skript" (Rollback) erstellen, mit dem die Änderungen im Fehlerfall rückgängig gemacht werden können.
    3. **Abwärtskompatibilität ("Expand and Contract"):** Frage die KI nach abwärtskompatiblen Wegen. Bei einer Spaltenaufteilung bedeutet das z. B.: Erst neue Spalten hinzufügen (Expand), dann Daten per DML im Hintergrund migrieren, Anwendungscode anpassen, und erst nach erfolgreichem Deployment die alte Spalte löschen (Contract).
    4. **Sandbox-Validierung:** Führe niemals von einer KI generierte SQL-Skripte ungeprüft auf deiner Live-Datenbank aus! Teste sie lokal in einer Testdatenbank mit synthetischen Testdaten.

#### Fine-Tuning vs. RAG für Code-Modelle (nach Durgesh Rajubhai Pawar & Michael Kofler)

Wenn du KI tief in deine Code-Prozesse integrieren möchtest, stehst du vor einer grundlegenden Entscheidung: Sollst du das Modell mit eigenen Daten füttern (RAG) oder das Modell selbst trainieren (Fine-Tuning)? Beide Ansätze haben völlig unterschiedliche Stärken.

*   **Die Analogie zur Veranschaulichung:**
    *   **RAG (Retrieval-Augmented Generation):** Stell dir vor, du gehst mit einem großen Ordner voller Handbücher in eine Prüfung (Open-Book-Klausur). Du musst das Wissen nicht auswendig lernen. Du suchst im Moment der Frage einfach schnell das passende Kapitel heraus und liest es ab.
    *   **Fine-Tuning:** Stell dir vor, du lernst wochenlang Vokabeln und Grammatik einer neuen Fremdsprache oder übst einen ganz bestimmten Schreibstil. Das Wissen geht dir "in Fleisch und Blut" über. Du veränderst dauerhaft die Art und Weise, wie dein Gehirn Verknüpfungen herstellt.

##### Unterschiede und Arbeitsweise
*   **RAG** lässt das eigentliche Sprachmodell unangetastet. Stattdessen nutzt du ein separates System (wie eine Vektordatenbank), das bei einer Anfrage deines Entwicklers nach relevanten Code-Schnipseln oder Dokumenten sucht. Diese Ergebnisse werden als Kontext (Zusatzwissen) an das Sprachmodell übergeben.
*   **Fine-Tuning** modifiziert die internen Gewichte (Parameter) des Modells. Du nimmst ein bereits vortrainiertes Code-Modell und trainierst es mit einer sorgfältig vorbereiteten Liste von Codebeispielen weiter.

##### Vor- und Nachteile im Überblick

| Kriterium | RAG (Retrieval-Augmented Generation) | Fine-Tuning (Feinabstimmung) |
| :--- | :--- | :--- |
| **Wissens-Aktualität** | **Sehr hoch:** Du musst nur deine Dokumente aktualisieren. Keine Wartezeit. | **Statisch:** Das Modell weiß nur, was zum Trainingszeitpunkt da war. |
| **Lernaufwand & Kosten** | **Gering:** Keine teuren Grafikkarten (GPUs) für das Training nötig. | **Hoch:** Das Aufbereiten der Daten und das Training kosten viel Zeit und Geld. |
| **Stilanpassung** | **Mittel:** Die KI kann Stile nachahmen, wenn sie gute Beispiele im Prompt bekommt. | **Sehr hoch:** Ändert die Syntax-Fähigkeiten und den Ausgabe-Stil grundlegend. |
| **Kontextfenster** | **Belastend:** Verbraucht viele Tokens, da Kontext mitgeschickt wird (Context Pollution). | **Sparsam:** Das Modell benötigt keinen zusätzlichen Kontext für gelerntes Wissen. |
| **Nachvollziehbarkeit** | **Sehr gut:** Du kannst genau zeigen, aus welcher Quelldatei das Wissen stammt. | **Gering:** Die Antwort entsteht direkt aus den Gewichten (Black-Box-Effekt). |

##### Die Einsatzgebiete bei Codebasen
Wann nutzt du was?
*   **Verwende RAG für:**
    *   Die Einbindung von sich häufig ändernden Projekt-Dokumentationen.
    *   Das Durchsuchen deiner tagesaktuellen Codebase.
    *   Das Anbinden von Schnittstellenbeschreibungen (APIs) von Drittanbietern.
*   **Verwende Fine-Tuning für:**
    *   Die Anpassung an eine firmeninterne, proprietäre Programmiersprache (DSL).
    *   Das Erzwingen eines sehr spezifischen Code-Stils (z. B. Namenskonventionen, feste Formatierungsvorgaben).
    *   Die Optimierung von kleineren Modellen, die lokal offline auf Entwickler-Laptops laufen sollen (spart Ressourcen).

---

### 2. Enterprise-Skalierung & Risikomanagement

Wenn Anwendungen von Tausenden Menschen gleichzeitig genutzt werden oder in sicherheitskritischen Bereichen laufen, gelten härtere Regeln.

#### Skalierung in großen Infrastrukturen (Kim & Yegge, Teil 4)
*   **Kostenkontrolle:** Jedes Token kostet Geld. Unkontrollierte API-Aufrufe können die Kosten explodieren lassen. Caching (Speichern von häufigen Antworten) ist hier Pflicht.
*   **Rate Limits:** APIs begrenzen die Anzahl der Anfragen pro Minute. Deine Anwendung muss darauf vorbereitet sein, API-Fehler (z. B. HTTP 429 Too Many Requests) abzufangen und Anfragen automatisch nach einer Pause erneut zu versuchen (Exponential Backoff).
*   **Asynchronität:** Lange API-Anfragen dürfen deine Benutzeroberfläche nicht blockieren. Nutze Warteschlangen (Queues) und asynchrone Tasks.

#### Governance, Urheberrecht & Compliance (Kofler, Kap. 10; Taulli)

Wenn du Code mithilfe von KI generierst, bewegst du dich rechtlich auf Neuland. Es gibt drei zentrale Problemfelder, die du kennen musst:

1. **Das Urheberrechtsproblem (Wer hat's erfunden?):**
   In den meisten Ländern (einschließlich Deutschland) gilt: Nur eine *menschliche Schöpfung* kann urheberrechtlich geschützt sein. Das bedeutet:
   *   Reiner, von einer KI generierter Code ist in der Regel **nicht urheberrechtlich geschützt** und gehört der Allgemeinheit.
   *   **Aber Achtung:** KIs wurden mit Open-Source-Code trainiert. Manchmal schlägt dir die KI Code vor, der eins zu eins (oder fast identisch) aus einem existierenden, geschützten Projekt stammt. Verwendest du diesen Code, begehst du eventuell eine Urheberrechtsverletzung!

2. **Copyleft-Lizenzen (Die "GPL-Infektion"):**
   Lizenzen wie die **GPL (General Public License)** nutzen das sogenannte *Copyleft*-Prinzip. Es besagt: Wenn du GPL-Code in deinem Projekt verwendest, muss dein gesamtes Projekt unter der GPL lizenziert und somit als Open Source veröffentlicht werden.
   *   **Das Risiko:** Schlägt dir ein KI-Assistent eine Funktion vor, die aus einem GPL-Projekt stammt, und du baust sie in deine kommerzielle, geschlossene Software ein, riskierst du eine "Lizenz-Infektion". Konkurrenten oder Lizenzinhaber könnten dich zwingen, deinen gesamten Quellcode offenzulegen oder die Nutzung einzustellen.
   *   **Gegenmittel:** Lizenzen wie MIT oder Apache 2.0 sind "permissiv" (freizügig) und erlauben die Nutzung in kommerziellen Produkten ohne diese Pflicht.

3. **Intellectual Property (IP)-Schutz & Datengeheimnis:**
   *   **IP-Schutz:** Wenn dein Startup eine innovative Software baut, die fast vollständig von einer KI geschrieben wurde, kannst du diesen Code rechtlich kaum vor Nachahmern schützen, da ihm die menschliche Schöpfungshöhe fehlt.
   *   **Datenabfluss:** Sendest du proprietären Firmencode oder Kundendaten an eine öffentliche KI-API, um ihn optimieren zu lassen, landen diese Daten eventuell auf den Servern des Betreibers und werden zum Weitertrainieren genutzt. Dies verstößt gegen Datenschutzgesetze (DSGVO) und Geheimhaltungsvereinbarungen (NDA).

#### Audit-Verfahren: Wie schützen sich Profis?
Um diese Risiken zu minimieren, setzen Unternehmen auf strukturierte Compliance-Prozesse:
*   **Software Composition Analysis (SCA):** Tools wie FOSSA, Snyk oder Black Duck scannen den Code automatisch auf bekannte Open-Source-Schnipsel und deren Lizenzen.
*   **IP-Filter in IDEs:** Professionelle KI-Assistenten (wie GitHub Copilot) bieten Einstellungen, um Vorschläge zu blockieren, die mit öffentlichem Code auf GitHub übereinstimmen.
*   **Clean-Room-Implementierung:** Wenn die KI eine gute Idee liefert, schreiben Entwickler den Code oft in eigenen Worten komplett neu, um sicherzustellen, dass keine exakten Kopien vorliegen.

#### Vermeidung von Halluzinationen in sicherheitskritischem Code (Taulli, Kap. 3; Osmani)
*   **Die Gefahr:** KI-Modelle arbeiten probabilistisch – sie berechnen Wahrscheinlichkeiten für das nächste Wort. Sie haben kein echtes Verständnis für Logik. In einer medizinischen App oder einer Steuerung für Züge kann ein winziger logischer Fehler im Code fatale Folgen haben.
*   **Die Abhilfe:** 
    *   **Kein Code ohne menschliches Review:** Nutze das Vier-Augen-Prinzip.
    *   **Strikte Validierung:** Schreibe automatisierte Tests für alle Grenzbereiche (Edge Cases).
    *   **Defensives Programmieren:** Gehe immer davon aus, dass der KI-generierte Code fehlerhaft sein könnte, und sichere ihn mit Typprüfungen und Zusicherungen (Assertions) ab.

---

## 🛠️ Praxis-Aufgaben: Kleine Fingerübungen

Probiere diese Aufgaben aus, um die theoretischen Grundlagen in der Praxis zu festigen:

### Aufgabe A: Den API-JSON-Payload entwerfen (sprachneutral)
Entwirf ein JSON-Objekt für einen API-Request an ein Sprachmodell. Es soll folgende Anforderungen erfüllen:
1. Eine System-Nachricht, die der KI sagt, sie sei ein sachlicher Übersetzer für technische Fachbegriffe.
2. Eine Benutzer-Nachricht mit dem zu übersetzenden Text.
3. Die Temperatureinstellung soll auf maximale Präzision (sehr niedrig) gesetzt werden.

**Leitfrage für dich:** Wie sieht die JSON-Struktur aus und welche Rolle spielt das Feld `temperature` für die Stabilität deiner App?

### Aufgabe B: Das RAG-Ablaufdiagramm skizzieren
Zeichne auf einem Blatt Papier oder in einem Text-Editor den Datenfluss eines RAG-Systems auf. Verwende folgende Komponenten:
`Benutzer-Frage` ➔ `Vektorisierung` ➔ `Vektordatenbank` ➔ `Kontext-Extraktion` ➔ `Prompt-Zusammenstellung` ➔ `LLM-API` ➔ `Antwort an Benutzer`.

**Leitfrage:** Warum schicken wir nicht einfach das gesamte Benutzerhandbuch (1000 Seiten) bei jeder Frage an das LLM, sondern nutzen stattdessen die Vektorsuche?

### Aufgabe C: Sicherheits-Check für SQL-Generierung entwerfen
Stell dir vor, deine Anwendung lässt Nutzer Abfragen in natürlicher Sprache eingeben, übersetzt diese per KI in SQL und führt sie direkt aus.
*   Schreibe eine Liste von 5 Sicherheitsregeln (Guardrails) auf, die deine Software anwenden muss, bevor der generierte SQL-Befehl an die echte Datenbank geschickt wird.

### Aufgabe D: Risiko- & Compliance-Audit (Praxis-Szenario)
Stell dir vor, du arbeitest an einer proprietären Zeiterfassungs-App für ein Kundenunternehmen. Dein Kollege schlägt vor, eine komplexe Funktion zur Feiertagsberechnung zu nutzen, die ihm Copilot generiert hat. Bei einer Websuche stellst du fest, dass der Code exakt einer Funktion aus einem GPLv3-lizenzierten Open-Source-Projekt entspricht.
*   Erstelle eine kurze Checkliste mit 3 Schritten, wie du und dein Team in dieser Situation reagieren solltet, um rechtliche Risiken auszuschließen.

**Leitfrage:** Warum reicht es in diesem Fall nicht aus, einfach den Autor des ursprünglichen Codes im Quelltext als Kommentar zu erwähnen?

### Aufgabe E: Strategie gegen Context Pollution entwerfen
Stell dir vor, du hast stundenlang mit einem KI-Assistenten an einem Fehler gearbeitet. Der Chatverlauf ist extrem lang. Die KI fängt nun an, dir Code vorzuschlagen, der deine bereits behobenen Fehler wieder einführt, und übersieht deine expliziten Anweisungen zur Variablenbenennung.
*   Schreibe eine kurze, dreistufige Strategie auf, wie du deinen Chatverlauf "refaktorieren" kannst, um die Konzentration der KI wiederherzustellen, ohne dein bisher erarbeitetes Wissen zu verlieren.

### Aufgabe F: Prompt für eine abwärtskompatible Migration formulieren
Du möchtest eine bestehende SQL-Tabelle `benutzer` ändern. Die Spalte `adresse` (enthält z. B. "Musterstraße 12, 12345 Musterstadt") soll in drei separate Spalten aufgeteilt werden: `strasse_hausnummer`, `plz` und `ort`.
*   Formuliere einen präzisen, didaktischen Prompt für eine KI, um diese Migration sicher und abwärtskompatibel zu planen. 
*   Der Prompt soll die KI explizit anweisen, die Migration in DDL, DML und ein Rollback-Skript aufzuteilen. (Du musst die SQL-Statements hierfür nicht selbst schreiben, sondern nur den Prompt entwerfen!).

### Aufgabe G: Entscheidungsszenario RAG vs. Fine-Tuning
Lies dir die folgenden Szenarien durch und entscheide, ob du RAG oder Fine-Tuning (oder beides) einsetzen würdest. Begründe deine Entscheidung kurz:
1. **Szenario 1:** Dein Team entwickelt eine Web-App. Die verwendeten externen JavaScript-Bibliotheken werden fast jede Woche aktualisiert und verändern ihre API.
2. **Szenario 2:** Deine Firma nutzt eine sehr alte, selbst geschriebene Datenbanksprache ("Legacy-DSL"), die im Internet nirgends dokumentiert ist. Das KI-Modell soll lernen, diese Sprache fehlerfrei zu schreiben und zu verstehen.
3. **Szenario 3:** Die KI soll dir beim Schreiben von Code helfen und dabei zwingend eure internen Programmierrichtlinien (z. B. bestimmte Sicherheitsüberprüfungen vor jedem Datenbankzugriff) einhalten, ohne dass du diese Richtlinien jedes Mal manuell in den Chat kopieren musst.

---

## 🚀 Projektvorschläge

### 🧑‍🍳 Projekt 1: Der "API-Chefkoch" (Universeller LLM-API-Connector)
*Fokus: API-Kommunikation, JSON-Parsing und sichere Fehlerbehandlung*

**Beschreibung:**
Schreibe eine modulare Klasse oder Funktion in deiner Wunschsprache, die eine Verbindung zu einer LLM-API herstellt. Sie soll eine strukturierte Prompt-Anfrage senden, die HTTP-Statuscodes auswerten (insbesondere Ratenbegrenzungen und Netzwerkfehler abfangen) und die Antwort der KI sicher parsen.

**Didaktischer Nutzen:**
Du verstehst, wie man asynchrone Netzwerkaufrufe absichert und defensive Mechanismen wie automatisches Wiederholen bei Fehlern implementiert.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
STRUCT APIResponse
    status_code: Integer
    antwort_text: String
    fehler_meldung: String
END STRUCT

FUNCTION sende_ki_anfrage(prompt: String, api_key: String) -> APIResponse
    URL = "https://api.ki-provider.com/v1/chat/completions"
    
    // 1. TODO: Bereite den JSON-Payload mit System- und User-Prompts vor
    payload = PLATZHALTER_JSON
    
    // 2. TODO: Führe den HTTP-POST-Request asynchron durch
    VERSUCHE
        response = HTTP_POST(URL, headers=[api_key], body=payload)
        
        WENN response.status_code == 200 DANN
            // 3. TODO: Parse die Antwort und liefere den Text zurück
            daten = PARSE_JSON(response.body)
            RETURN APIResponse(200, daten.choices[0].text, "")
        SONST WENN response.status_code == 429 DANN
            // Ratenbegrenzung erreicht
            RETURN APIResponse(429, "", "Zu viele Anfragen. Bitte kurz warten.")
        SONST
            RETURN APIResponse(response.status_code, "", "API-Fehler")
        ENDE WENN
        
    FANG_AB (NetzwerkFehler)
        RETURN APIResponse(500, "", "Netzwerkverbindung fehlgeschlagen")
    ENDE VERSUCH
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte in [DEINE SPRACHE] eine Funktion schreiben, die eine Verbindung zu einer REST-API aufbaut. Sie soll einen JSON-Body senden und die Antwort parsen. Bitte erstelle mir ein Code-Gerüst für diese Netzwerkverbindung mit didaktischen Platzhaltern im Funktionsrumpf. Erkläre mir auch, wie ich typische Netzwerkfehler und den Statuscode 429 (Rate Limit) sauber in [DEINE SPRACHE] abfangen kann."*

---

### 📚 Projekt 2: Der "Wissens-Bibliothekar" (Lokales Mini-RAG)
*Fokus: Context Injection und lokale Wissensdatenbanken*

**Beschreibung:**
Entwickle ein Konzept-Programm, das eine lokale Textdatei (z. B. ein kurzes FAQ-Dokument) als Wissensquelle nutzt. Bei einer Benutzerfrage sucht das Programm nach dem passenden Abschnitt in der Datei und fügt diesen als Kontext in den Prompt ein, bevor es die API aufruft.

**Didaktischer Nutzen:**
Du lernst das Herzstück von RAG-Systemen kennen – die gezielte Anreicherung des Prompts mit externen Daten, um Halluzinationen zu verhindern.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION lade_wissensbasis(dateipfad: String) -> Liste_aus_Texten
    // TODO: Lade die Dokumente und teile sie in Abschnitte (Chunks) auf
    RETURN PLATZHALTER_DOKUMENTE
END FUNCTION

FUNCTION finde_relevanten_kontext(frage: String, chunks: Liste_aus_Texten) -> String
    // Für dieses einfache Projekt: Nutze eine einfache Schlagwortsuche (Keyword-Match)
    // TODO: Durchsuche die Chunks nach Wortüberschneidungen mit der Frage
    bester_chunk = PLATZHALTER_SUCHE
    RETURN bester_chunk
END FUNCTION

FUNCTION baue_erweiterten_prompt(frage: String, kontext: String) -> String
    // Context Injection: Wir zwingen die KI, nur das bereitgestellte Wissen zu nutzen
    erweiterter_prompt = "Hier ist das exklusive Hintergrundwissen: \n" 
                        + kontext 
                        + "\n\nFrage des Nutzers: " + frage
                        + "\n\nAntworte kurz und stütze dich NUR auf das Hintergrundwissen. Wenn du es nicht weißt, sage 'Ich weiß es nicht'."
    RETURN erweiterter_prompt
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich baue ein einfaches RAG-System in [DEINE SPRACHE]. Ich möchte eine Textdatei einlesen, sie in Absätze unterteilen und nach Schlüsselwörtern durchsuchen, um den passenden Absatz als Kontext in meinen API-Prompt einzubetten. Bitte zeige mir ein strukturiertes Code-Gerüst für das Einlesen und Filtern von Text in [DEINE SPRACHE]. Verwende Platzhalter für die Logik und erkläre mir das didaktische Konzept der 'Context Injection'."*

---

### 🛡️ Projekt 3: Der "SQL-Dolmetscher" (Sicherer SQL-Generator)
*Fokus: SQL-to-Text und Sicherheits-Guardrails (Risikomanagement)*

**Beschreibung:**
Erstelle ein Programm, das Benutzereingaben entgegennimmt und an eine KI sendet, um ein SQL-Abfragestatement zu generieren. Bevor dieses SQL-Statement ausgeführt wird, durchläuft es eine Sicherheitsüberprüfung (Guardrail), um sicherzustellen, dass nur lesende Abfragen (`SELECT`) zugelassen sind und destruktive Operationen blockiert werden.

**Didaktischer Nutzen:**
Du erfährst, wie wichtig defensive Programmierung bei KI-generierten Daten ist, um die Integrität von Produktivsystemen zu schützen.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
FUNCTION generiere_sql_abfrage(benutzer_wunsch: String) -> String
    // TODO: Sende den Wunsch an die KI mit der Anweisung, ein SQL-Statement zu generieren
    sql_code = PLATZHALTER_KI_ANTWORT
    RETURN sql_code
END FUNCTION

FUNCTION ist_sql_statement_sicher(sql_query: String) -> Boolean
    // Konvertiere in Großbuchstaben für die Sicherheitsprüfung
    suche_query = TO_UPPERCASE(sql_query)
    
    // 1. TODO: Prüfe, ob die Abfrage mit "SELECT" beginnt
    WENN NICHT (suche_query STARTET_MIT "SELECT") DANN
        RETURN FALSE
    ENDE WENN
    
    // 2. TODO: Definiere eine Blacklist mit verbotenen Befehlen (DROP, DELETE, UPDATE, INSERT)
    blacklist = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"]
    
    // 3. TODO: Überprüfe, ob ein verbotenes Wort im SQL-Statement vorkommt
    FUER JEDES wort IN blacklist
        WENN suche_query ENTHAELT wort DANN
            RETURN FALSE
        ENDE WENN
    ENDE FUER
    
    RETURN TRUE
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte in [DEINE SPRACHE] ein Programm schreiben, das von einer KI generiertes SQL überprüft, bevor es ausgeführt wird. Es darf nur SELECT-Abfragen erlauben und muss destruktive Befehle wie DROP oder DELETE blockieren. Bitte erstelle mir ein Code-Gerüst für diese Überprüfungsfunktion mit didaktischen Platzhaltern und erkläre mir, welche Risiken (z. B. SQL Injection durch Prompt Injection) ich bei der automatischen Code-Generierung beachten muss."*

---

### 🔍 Projekt 4: Der "Lizenz-Wächter" (Einfacher Code-Compliance-Scanner)
*Fokus: Datei-Analyse, String-Matching und Lizenz-Compliance*

**Beschreibung:**
Entwickle ein Konzept-Tool, das Quellcode-Dateien einliest und nach Hinweisen auf unfreie Lizenzen (z. B. GPL) oder typische Plagiats-Signaturen durchsucht. Das Programm soll Entwickler warnen, wenn im Code verdächtige Schlüsselwörter auftauchen, die auf eine unbeabsichtigte Übernahme von Copyleft-Code hindeuten.

**Didaktischer Nutzen:**
Du verstehst, wie automatisierte Audit-Verfahren (Static Analysis) im Ansatz funktionieren und wie man Sicherheits- und Compliance-Prüfungen in den Build-Prozess integriert.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
STRUCT AuditBericht
    datei_pfad: String
    ist_konform: Boolean
    gefundene_risiken: Liste_aus_Strings
END STRUCT

FUNCTION scanne_datei_auf_lizenzen(dateipfad: String) -> AuditBericht
    risiken = LEERE_LISTE
    
    // 1. TODO: Lies den Inhalt der Datei ein
    code_inhalt = LIES_DATEI(dateipfad)
    
    // 2. TODO: Definiere Indikatoren für Copyleft-Lizenzen (z. B. "GPL", "Copyleft", "GNU")
    kritische_begriffe = ["GPL", "General Public License", "Copyleft", "gnu.org"]
    
    // 3. TODO: Durchsuche den Quellcode nach diesen Begriffen
    FUER JEDES begriff IN kritische_begriffe
        WENN code_inhalt ENTHAELT begriff DANN
            FUEGE_HINZU(risiken, "Möglicher Copyleft-Code gefunden: " + begriff)
        ENDE WENN
    ENDE FUER
    
    // 4. TODO: Bewerte, ob die Datei compliance-konform ist
    ist_sicher = (LAENGE(risiken) == 0)
    
    RETURN AuditBericht(dateipfad, ist_sicher, risiken)
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte in [DEINE SPRACHE] ein kleines Tool schreiben, das lokale Quellcodedateien nach bestimmten Textmustern durchsucht, um unsichere Open-Source-Lizenzen wie GPL aufzuspüren. Bitte erstelle mir ein strukturiertes Code-Gerüst mit didaktischen Platzhaltern, das Dateien einliest, Zeile für Zeile scannt und einen Bericht ausgibt. Erkläre mir auch, wie ich dieses Tool um reguläre Ausdrücke (Regex) erweitern kann, um komplexere Lizenz-Header zu erkennen."*

---

### 🗃️ Projekt 5: Der "Migration-Architect" (Sichere DB-Migration mit KI)
*Fokus: Schema-Design, Abwärtskompatibilität und Rollback-Strategien*

**Beschreibung:**
Entwirf ein Konzept oder ein einfaches Hilfsprogramm in deiner Wunschsprache, das ein bestehendes Datenbankschema (z. B. eine DDL-SQL-Datei) einliest und einen strukturierten Prompt für ein Sprachmodell generiert, um eine Schema-Änderung abwärtskompatibel zu planen. Das Programm soll die Antwort der KI (die getrennte DDL-, DML- und Rollback-Skripte enthalten soll) entgegennehmen und in separate Dateien wegschreiben.

**Didaktischer Nutzen:**
Du verstehst, wie man KI gezielt als Architektur-Assistent einsetzt, um komplexe, risikoreiche Operationen wie Datenbank-Migrationen abzusichern, indem man sie zur Einhaltung bewährter Patterns zwingt.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
STRUCT MigrationsPlan
    ddl_skript: String      // Schema-Änderungen (CREATE, ALTER...)
    dml_skript: String      // Daten-Änderungen (UPDATE, INSERT...)
    rollback_skript: String // Wiederherstellung des alten Zustands
END STRUCT

FUNCTION plane_migration(aktuelles_schema: String, aenderungswunsch: String) -> MigrationsPlan
    // 1. TODO: Baue den Prompt zusammen. Weise die KI an, die Migration 
    //    unbedingt in abwärtskompatible DDL-, DML- und Rollback-Blöcke zu trennen.
    prompt = "Aktuelles Schema:\n" + aktuelles_schema + "\n"
             + "Gewünschte Änderung:\n" + aenderungswunsch + "\n"
             + "Erstelle eine sichere Migration. Teile das Ergebnis strikt in "
             + "die Abschnitte DDL, DML und ROLLBACK auf."

    // 2. TODO: Rufe die LLM-API auf (wie in Projekt 1 gelernt)
    antwort_text = sende_ki_anfrage(prompt, PLATZHALTER_API_KEY)

    // 3. TODO: Parse die Antwort der KI und trenne sie in die drei Teilskripte
    ddl = extrahiere_abschnitt(antwort_text, "DDL")
    dml = extrahiere_abschnitt(antwort_text, "DML")
    rollback = extrahiere_abschnitt(antwort_text, "ROLLBACK")

    RETURN MigrationsPlan(ddl, dml, rollback)
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte in [DEINE SPRACHE] ein Programm schreiben, das eine bestehende Schema-Datei einliest und einen Prompt generiert, um ein Sprachmodell nach einer abwärtskompatiblen Datenbankmigration zu fragen. Die Antwort soll in DDL, DML und Rollback aufgeteilt und in separate Dateien gespeichert werden. Bitte zeige mir ein strukturiertes Code-Gerüst für dieses Tool in [DEINE SPRACHE] mit Platzhaltern und erkläre mir die Wichtigkeit der Trennung von Schema- und Datenänderungen."*

---

### ⚖️ Projekt 6: Der "Architektur-Entscheider" (RAG- vs. Fine-Tuning-Evaluator)
*Fokus: Kriterienkataloge, bedingte Logik und Architekturentscheidungen*

**Beschreibung:**
Entwickle ein interaktives Programm, das Software-Architekten durch einen Fragenkatalog führt. Das Tool bewertet Kriterien wie Budget, Datenaktualität und Stilanpassung und berechnet am Ende eine prozentuale Empfehlung, ob RAG oder Fine-Tuning für das jeweilige Projekt besser geeignet ist.

**Didaktischer Nutzen:**
Du lernst, wie du komplexe Kriterienkataloge und logische Gewichtungen in Code übersetzt. Gleichzeitig festigst du dein Verständnis der Unterschiede zwischen RAG und Fine-Tuning.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
STRUCT Bewertung
    rag_score: Integer
    fine_tuning_score: Integer
END STRUCT

FUNCTION evaluiere_architektur() -> Bewertung
    rag_punkte = 0
    ft_punkte = 0
    
    // 1. Kriterium: Datenaktualität
    drucke("Ändern sich die Daten des Projekts täglich oder wöchentlich? (ja/nein)")
    antwort_aktualitaet = LIES_EINGABE()
    WENN antwort_aktualitaet == "ja" DANN
        // TODO: Welcher Ansatz profitiert von dynamischen Echtzeitdaten?
        rag_punkte = rag_punkte + 3
    SONST
        ft_punkte = ft_punkte + 1
    ENDE WENN
    
    // 2. Kriterium: Budget und Ressourcen
    drucke("Steht ein großes Budget für GPU-Training und Datenaufbereitung zur Verfügung? (ja/nein)")
    antwort_budget = LIES_EINGABE()
    WENN antwort_budget == "nein" DANN
        // TODO: Welcher Ansatz ist besonders kostengünstig?
        rag_punkte = rag_punkte + 2
    SONST
        ft_punkte = ft_punkte + 2
    ENDE WENN

    // 3. Kriterium: Spezifischer Code-Stil oder proprietäre Sprache
    drucke("Soll das Modell eine unbekannte, proprietäre Sprache erlernen oder einen strikten Stilausdruck erzwingen? (ja/nein)")
    antwort_stil = LIES_EINGABE()
    WENN antwort_stil == "ja" DANN
        // TODO: Welcher Ansatz verändert das Verhalten und die Syntax-Fähigkeiten grundlegend?
        ft_punkte = ft_punkte + 3
    SONST
        rag_punkte = rag_punkte + 1
    ENDE WENN

    RETURN Bewertung(rag_punkte, ft_punkte)
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte in [DEINE SPRACHE] ein kleines Konsolenprogramm schreiben, das dem Benutzer Fragen zu seinem KI-Projekt stellt und bewertet, ob RAG oder Fine-Tuning besser geeignet ist. Bitte erstelle mir ein strukturiertes Code-Gerüst mit didaktischen Platzhaltern, das die Kriterien abfragt, die Punkte gewichtet und das Ergebnis als Empfehlung ausgibt. Erkläre mir auch, wie ich die Gewichtungen mathematisch normalisieren kann, um eine prozentuale Wahrscheinlichkeit auszugeben."*

---

## 💡 Zusammenfassung: Welches Projekt übt was?

| Projekt | Programmier-Konzepte | KI-Lernkonzept | Didaktischer Fokus |
| :--- | :--- | :--- | :--- |
| **1. API-Chefkoch** | Netzwerk-Requests, JSON-Parsing, Fehlerbehandlung | API-Integration & Ratenbegrenzung | Robustheit im Umgang mit externen Web-Diensten lernen |
| **2. Wissens-Bibliothekar** | Dateiverarbeitung, String-Operationen, Filterung | Retrieval-Augmented Generation (RAG) | Vermeidung von Halluzinationen durch Context Injection |
| **3. SQL-Dolmetscher** | Zeichenketten-Prüfung, Listen-Matching, Validierung | Risikomanagement & Guardrails | Schutz der Infrastruktur vor unsicherem KI-Code |
| **4. Lizenz-Wächter** | Datei-Analyse, Musterabgleich (String-Matching), Validierung | Compliance & IP-Schutz | Schutz vor Lizenz-Infektionen (GPL) und Einhalten von Firmenrichtlinien |
| **5. Migration-Architect** | Schema-Entwurf, Datei-Ausgabe, Text-Parsing | Sicheres Schema-Design & Migrationen | Gefahrenfreie Datenbank-Updates mit abwärtskompatiblen Phasen (Expand/Contract) |
| **6. Architektur-Entscheider** | Entscheidungslogik, Kriterienkatalog, Eingabeverarbeitung | Architekturmuster: RAG vs. Fine-Tuning | Bewertung von Kosten, Aktualität und Anpassungsbedarf im Team lernen |

---

## 📚 Links
* [OpenAI API Reference](https://platform.openai.com/docs/api-reference) & [Anthropic API Docs](https://docs.anthropic.com/) - Offizielle Dokumentationen der führenden API-Anbieter.
* [LangChain (Conceptual Guide)](https://python.langchain.com/docs/concepts/) - Einführung in Frameworks zur Orchestrierung von KI-Pipelines.
* [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) - Die wichtigsten Sicherheitsrisiken bei der Arbeit mit Sprachmodellen im Detail erklärt.
* [Die offiziellen Dokumentationen deiner Programmiersprache zur sicheren Datenbankanbindung und Netzwerkprogrammierung.]

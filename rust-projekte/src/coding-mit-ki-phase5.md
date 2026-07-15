# 💡 Phase 5: Generics & Interfaces (Schnittstellen & Abstraktion)

## Willkommen in der Welt der erweiterbaren Software-Architektur! 🚀

Bisher hast du gelernt, wie man konkrete Logik schreibt und Daten strukturiert. Doch was passiert, wenn dein Programm wächst? Wenn du plötzlich nicht mehr nur eine Art von Daten verarbeiten willst, sondern viele verschiedene? Oder wenn du Funktionalitäten austauschen möchtest, ohne den bestehenden Code komplett umzuwerfen?

In Phase 5 betreten wir die Welt der **Abstraktion**. Du wirst lernen, wie du mit **Generics** (generischen Typen) Schablonen für Code erstellst, die mit beliebigen Datentypen funktionieren, und wie du mit **Interfaces** (Schnittstellen) Verträge im Code definierst. Du schreibst damit Code, der nicht nur für heute funktioniert, sondern auch für zukünftige Erweiterungen offen ist – und das völlig unabhängig von deiner gewählten Programmiersprache!

---

## 🧠 Theorie: Flexibilität durch Verträge und Schablonen

Wenn wir Systeme entwerfen, hilft uns die KI dabei, die Brücke zwischen der konkreten Problemlösung und dem abstrakten Software-Design zu schlagen. Zwei Konzepte stehen dabei im Mittelpunkt:

### 1. Schnittstellendesign mit KI (nach Kofler)
Eine Schnittstelle (in vielen Sprachen **Interface**, in Rust **Trait**, in Python **Protokoll** oder **Abstrakte Basisklasse**) ist wie ein Vertrag im echten Leben. Sie legt fest, *was* eine Komponente tun kann (welche Methoden sie hat), aber nicht, *wie* sie es tut.
*   **Die USB-Analogie:** Dein Laptop hat einen USB-Anschluss (das Interface). Es ist ihm völlig egal, ob du eine Maus, eine Tastatur oder eine Festplatte anschließt. Hauptsache, das Gerät hält sich an den USB-Standard (den Vertrag).
*   **Generische Typen (Generics):** Sie erlauben dir, Klassen, Strukturen oder Funktionen zu schreiben, bei denen der genaue Datentyp erst später festgelegt wird. Stell dir eine Versandbox vor: Sie kann Äpfel transportieren oder Bücher. Die Logik des Transports bleibt genau gleich.

**Wie dir die KI hilft:**
Die KI ist ein hervorragender Sparringspartner beim Brainstorming von Schnittstellen. Bevor du eine einzige Zeile Code schreibst, kannst du die KI fragen, welche Kernfunktionen ein bestimmtes Interface benötigt, um flexibel genug für spätere Anforderungen zu sein.

### 2. Stabile Verträge entwerfen (Contract-First-Design für APIs, nach Pawar)
Beim **Contract-First-Design** definieren wir zuerst die Schnittstellen und Typen-Signaturen unseres Programms, bevor wir die eigentliche Logik ausimplementieren.
*   **Warum?** Wenn wir zuerst den "Vertrag" (die Schnittstellen) festlegen, können verschiedene Entwickler (oder du und die KI) parallel an verschiedenen Teilen des Programms arbeiten. Die Implementierung kann sich ändern, aber solange die Schnittstelle bleibt, bricht das Gesamtsystem nicht zusammen.
*   **Generische APIs:** Wenn wir Schnittstellen generisch gestalten, machen wir sie maximal wiederverwendbar. Der Vertrag besagt dann zum Beispiel: *"Ich kann Daten vom Typ X laden und filtern, egal welcher Typ X am Ende tatsächlich ist."*

### 3. API Schema-Driven Code Generation (nach Pawar)
Wenn Systeme über Netzwerke miteinander kommunizieren (z. B. eine App mit einem Webserver), müssen sie sich auf ein gemeinsames Daten- und Kommunikationsformat einigen. Bei der **Schema-Driven Code Generation** (schema-gesteuerten Code-Generierung) nutzen wir eine maschinenlesbare Schnittstellenbeschreibung (meist als YAML oder JSON in Formaten wie OpenAPI oder gRPC), um Schnittstellen und Datenmodelle automatisch in echten Code zu übersetzen.

*   **Der Bauplan-Vergleich:** Stell dir vor, du baust ein Fertighaus. Statt dass der Elektriker und der Klempner auf der Baustelle raten, wo die Leitungen liegen, gibt es einen präzisen 3D-Bauplan (das Schema). Auf Knopfdruck werden die exakten Steckdosen und Rohrleitungen (die Code-Gerüste für Client und Server) im Werk vorgefertigt.
*   **Schnittstellen-Scaffolding:** "Scaffolding" bedeutet Gerüstbau. Wir lassen die KI oder Generierungswerkzeuge den lästigen Boilerplate-Code erzeugen (z. B. HTTP-Routing, JSON-Serialisierung und Typsicherheits-Validierung). Du musst dann nur noch das "Gerüst" mit der eigentlichen Logik füllen.

**Wie dir die KI hilft:**
Die KI kann für dich aus einer informellen Beschreibung (z. B. *"Ich brauche einen API-Endpunkt für eine Aufgabenverwaltung"*) eine vollständige OpenAPI-Spezifikation schreiben. Anschließend kann sie diese Spezifikation nutzen, um typensicheren Client- und Server-Code in deiner Wunschsprache zu generieren – inklusive aller benötigten Datenstrukturen. Dadurch ist garantiert, dass Client und Server ohne Tippfehler perfekt zusammenpassen.

---

## 🛠️ Praxis-Aufgaben: Kleine Fingerübungen

Nutze diese Übungen, um die Konzepte der Abstraktion sprachenunabhängig mit deiner KI zu trainieren:

### Aufgabe A: Den USB-Anschluss entwerfen (Interface-Design)
Überlege dir ein System für ein einfaches Logging (Protokollieren von Nachrichten). Du möchtest Log-Nachrichten in die Konsole schreiben, in eine Datei speichern oder an einen Server senden können.
Entwirfe die Schnittstelle, die alle diese Logger-Typen erfüllen müssen.

#### Dein Lern-Prompt für Aufgabe A:
> *"Ich lerne gerade das Konzept von Interfaces/Schnittstellen in [DEINE WUNSCHSPRACHE, z. B. TypeScript/Rust/Python]. Ich möchte ein Interface namens `Logger` entwerfen, das Methoden zum Protokollieren von Fehlern, Warnungen und Info-Meldungen vorgibt. Bitte erstelle mir ein leeres Code-Gerüst für dieses Interface und zwei Klassen/Strukturen (`ConsoleLogger` und `FileLogger`), die dieses Interface implementieren. Nutze in den Implementierungen didaktische Platzhalter wie [z. B. pass / todo!() / TODO-Kommentare] in den Funktionsrümpfen, damit ich die Logik selbst schreiben kann."*

### Aufgabe B: Die universelle Aufbewahrungsbox (Generics-Verständnis)
Schreibe eine generische Struktur oder Klasse `Schachtel`, die einen einzelnen Wert eines beliebigen Typs aufbewahren kann. Sie soll Methoden zum Hineinlegen (`einpacken`) und Herausnehmen (`auspacken`) besitzen.

#### Dein Lern-Prompt für Aufgabe B:
> *"Ich möchte in [DEINE WUNSCHSPRACHE] verstehen, wie generische Typen (Generics) funktionieren. Ich möchte eine generische Klasse/Struktur namens `Schachtel` entwerfen, die einen Wert eines beliebigen Typs `T` speichern kann. Erstelle mir bitte ein Code-Gerüst für diese Klasse mit den Methoden `einpacken(wert)` und `auspacken()`. Verwende didaktische Platzhalter für die Implementierung und erkläre mir kurz, wie in [DEINE WUNSCHSPRACHE] der Typparameter syntaktisch definiert wird."*

### Aufgabe C: API-Schnittstellen-Scaffolding (Schema-Driven)
Stell dir vor, du möchtest einen Online-Buchladen programmieren. Die API-Spezifikation ist bereits in YAML definiert. Deine Aufgabe ist es, daraus die Schnittstellengerüste für deine Anwendung erzeugen zu lassen.

#### Dein Lern-Prompt für Aufgabe C:
> *"Ich lerne gerade Schema-Driven Code Generation. Ich habe folgende einfache API-Spezifikation im OpenAPI/YAML-Format:
> ```yaml
> openapi: 3.0.0
> info:
>   title: Buchladen-API
>   version: 1.0.0
> paths:
>   /books:
>     get:
>       summary: Gibt eine Liste aller Bücher zurück
>       responses:
>         '200':
>           description: Erfolgreiche Antwort
>           content:
>             application/json:
>               schema:
>                 type: array
>                 items:
>                   $ref: '#/components/schemas/Book'
> components:
>   schemas:
>     Book:
>       type: object
>       required:
>         - id
>         - titel
>       properties:
>         id:
>           type: integer
>         titel:
>           type: string
> ```
> Bitte generiere mir aus dieser Spezifikation ein typensicheres Server-Schnittstellen-Gerüst (Interface) und das Datenmodell `Book` in [DEINE WUNSCHSPRACHE]. Verwende didaktische Platzhalter für die tatsächliche Implementierung (z. B. `todo!()` oder `TODO`), damit ich die Logik selbst ausfüllen kann."*

---

## 🚀 Projektvorschläge

### 🔌 Projekt 1: Das modulare Benachrichtigungssystem (Plugin-Architektur)
*Fokus: Schnittstellen, lose Kopplung & Contract-First*

**Beschreibung:**
Entwickle ein Benachrichtigungssystem, das Nachrichten über verschiedene Kanäle (z. B. E-Mail, SMS oder Messenger-Dienste) senden kann. Ein zentraler `BenachrichtigungsManager` soll eine Liste von Diensten verwalten und eine Nachricht an alle registrierten Kanäle gleichzeitig senden können, ohne die konkreten Details der Dienste zu kennen.

**Didaktischer Nutzen:**
Du lernst das Prinzip der "losen Kopplung" kennen. Der Manager verlässt sich nur auf den Vertrag (das Interface), was es extrem einfach macht, später neue Dienste (z. B. WhatsApp) hinzuzufügen, ohne den Manager-Code anzufassen.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
// Der Vertrag: Jeder Dienst muss diese Schnittstelle erfüllen
INTERFACE BenachrichtigungsDienst
    FUNCTION sende_nachricht(empfaenger: Text, inhalt: Text) -> Boolean
END INTERFACE

// Die konkrete Umsetzung für E-Mail (Erfüllt das Interface)
CLASS EmailDienst IMPLEMENTS BenachrichtigungsDienst
    FUNCTION sende_nachricht(empfaenger: Text, inhalt: Text) -> Boolean
        // TODO: Implementiere den E-Mail-Versand
        RETURN PLATZHALTER
    END FUNCTION
END CLASS

// Die Verwaltungseinheit
CLASS BenachrichtigungsManager
    DiensteListe: Liste von BenachrichtigungsDienst

    FUNCTION registriere_dienst(dienst: BenachrichtigungsDienst)
        // TODO: Füge den Dienst zur Liste hinzu
    END FUNCTION

    FUNCTION sende_an_alle(empfaenger: Text, inhalt: Text)
        // TODO: Iteriere über alle Dienste und rufe 'sende_nachricht' auf
    END FUNCTION
END CLASS
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte ein modulares Benachrichtigungssystem in [DEINE WUNSCHSPRACHE] programmieren. Ich habe mir ein Interface `BenachrichtigungsDienst` überlegt, das von verschiedenen Diensten (wie `EmailDienst` und `SmsDienst`) implementiert wird. Ein `BenachrichtigungsManager` soll diese Dienste verwalten. Bitte erstelle mir ein Code-Gerüst für diese Struktur in [DEINE WUNSCHSPRACHE]. Verwende didaktische Platzhalter für alle Funktionsrümpfe und zeige mir, wie ich eine Liste/ein Array von Objekten definiere, die das Interface erfüllen."*

---

### 📦 Projekt 2: Der typensichere Daten-Cache
*Fokus: Generische Klassen/Strukturen, Typsicherheit & Wiederverwendbarkeit*

**Beschreibung:**
Erstelle einen universellen Datenspeicher (Cache) im Arbeitsspeicher, der einen Schlüssel (Key) mit einem Wert (Value) verknüpft. Der Cache soll generisch sein, sodass du ihn für `Cache<String, Zahl>`, `Cache<Zahl, BenutzerObjekt>` oder jede andere Kombination nutzen kannst, während die Programmiersprache sicherstellt, dass keine falschen Typen eingefügt werden.

**Didaktischer Nutzen:**
Du verstehst, wie Generics Typsicherheit garantieren. Anstatt für jeden Datentyp einen eigenen Cache zu schreiben, schreibst du ihn einmal generisch und verhinderst gleichzeitig Typfehler zur Laufzeit.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
// K und V sind Typparameter (Key und Value)
CLASS Cache<K, V>
    // Eine interne Datenstruktur, die Schlüssel K auf Werte V abbildet
    InterneMap: Map/Wörterbuch von K zu V

    FUNCTION speichere(schluessel: K, wert: V)
        // TODO: Speichere den Wert unter dem Schlüssel
    END FUNCTION

    FUNCTION hole(schluessel: K) -> Option/Optional von V
        // TODO: Suche den Wert und gib ihn zurück (falls vorhanden)
        RETURN PLATZHALTER
    END FUNCTION

    FUNCTION loesche(schluessel: K)
        // TODO: Entferne den Eintrag
    END FUNCTION
END CLASS
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte einen generischen In-Memory-Cache in [DEINE WUNSCHSPRACHE] erstellen, der Schlüssel vom Typ `K` und Werte vom Typ `V` speichert. Bitte erstelle mir ein sprachenkonformes Code-Gerüst mit den Methoden `speichere`, `hole` und `loesche`. Verwende didaktische Platzhalter für die Logik. Erkläre mir auch, wie in [DEINE WUNSCHSPRACHE] mit nicht vorhandenen Werten bei der Rückgabe (z. B. über Optional, Nullable-Typen oder Option-Monaden) umgegangen wird."*

---

### 🚰 Projekt 3: Die generische Pipeline (Daten-Transformator)
*Fokus: Generische Funktionen, Delegation & Funktionale Abstraktion*

**Beschreibung:**
Entwirf eine Pipeline, die eine Liste von Daten entgegennimmt, eine Transformationsfunktion auf jedes Element anwendet und die transformierten Daten zurückgibt. Die Pipeline selbst soll völlig unabhängig vom Datentyp der Eingabe und der Ausgabe sein (z. B. Umwandlung von einer Liste von Strings in eine Liste von Zahlen).

**Didaktischer Nutzen:**
Du lernst, wie generische Funktionen mit Callback-Funktionen (oder Closures/Lambdas) zusammenarbeiten, um mächtige Datenverarbeitungsketten zu bauen.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
// T_IN ist der Eingabetyp, T_OUT der Ausgabetyp
FUNCTION transformiere_liste<T_IN, T_OUT>(
    eingabe: Liste von T_IN, 
    transformations_funktion: Funktion(T_IN) -> T_OUT
) -> Liste von T_OUT

    ErgebnisListe: Liste von T_OUT
    
    // TODO: Iteriere über die Eingabeliste, wende die
    // transformations_funktion auf jedes Element an und
    // füge das Ergebnis der ErgebnisListe hinzu.
    
    RETURN ErgebnisListe
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte eine generische Transformationsfunktion in [DEINE WUNSCHSPRACHE] schreiben, die eine Liste eines Typs in eine Liste eines anderen Typs konvertiert, indem sie eine übergebene Funktion auf jedes Element anwendet (ähnlich wie eine eigene Implementierung von `map`). Erstelle mir ein Code-Gerüst mit didaktischen Platzhaltern und zeige mir ein Anwendungsbeispiel, wie ich diese Funktion aufrufen würde, um eine Liste von Texten in eine Liste von deren Längen (Zahlen) zu konvertieren."*

---

### 🌐 Projekt 4: Der schema-basierte Wetter-Dienst
*Fokus: OpenAPI, Client/Server-Scaffolding & Typensicherheit*

**Beschreibung:**
Erstelle einen einfachen Wetter-Service. Zuerst definierst du zusammen mit der KI ein OpenAPI-Schema für einen Endpunkt `/wetter/{stadt}`, der die Temperatur und die Windgeschwindigkeit zurückgibt. Danach lässt du dir das Server-Gerüst und einen passenden API-Client generieren.

**Didaktischer Nutzen:**
Du erlebst den gesamten "Contract-First"-Workflow auf Netzwerkebene. Du siehst, wie ein einziges Schema ausreicht, um sowohl die Server-Schnittstelle als auch den Client typensicher und synchron zu halten.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
// Server-Schnittstelle generiert aus dem Schema
INTERFACE WetterServerSchnittstelle
    FUNCTION hole_wetter(stadt: Text) -> WetterDaten
END INTERFACE

// Datenstruktur generiert aus dem Schema
STRUCT WetterDaten
    temperatur: Dezimalzahl
    windgeschwindigkeit: Dezimalzahl
END STRUCT

// Server-Implementierungs-Gerüst
CLASS WetterServer IMPLEMENTS WetterServerSchnittstelle
    FUNCTION hole_wetter(stadt: Text) -> WetterDaten
        // TODO: Implementiere die Abfrage der Wetterdaten
        RETURN PLATZHALTER
    END FUNCTION
END CLASS
```

#### Dein Lern-Prompt für dieses Projekt:
> *"Ich möchte ein Projekt zum Thema Schema-Driven Code Generation machen. Ich will einen Wetter-Dienst umsetzen. Bitte erstelle mir zuerst eine einfache OpenAPI-Spezifikation (YAML) für einen Endpunkt `/wetter/{stadt}`, der die Felder `temperatur` und `windgeschwindigkeit` zurückgibt. Generiere mir anschließend das passende Server-Interface und das Datenmodell in [DEINE WUNSCHSPRACHE] als Code-Gerüst mit didaktischen Platzhaltern, damit ich die Logik selbst implementieren kann."*

---

## 💡 Zusammenfassung: Welches Projekt übt was?

| Projekt | Programmier-Konzepte | KI-Lernkonzept | Didaktischer Fokus |
| :--- | :--- | :--- | :--- |
| **1. Benachrichtigungssystem** | Interfaces, lose Kopplung | Contract-First-Design | Erweiterbarkeit von Systemen verstehen |
| **2. Typensicherer Cache** | Generische Typen, Key-Value Maps | Typsicherheit zur Compile-/Laufzeit | Wiederverwendbare Datenstrukturen entwerfen |
| **3. Generische Pipeline** | Generische Funktionen, Callbacks / Lambdas | Funktionale Abstraktion | Datenströme flexibel transformieren |
| **4. Schema-basierter Wetter-Dienst** | API-Scaffolding, Datenmodelle | Schema-Driven Code Generation | Typensichere Client- und Server-Gerüste aus API-Specs generieren |

---

## 📚 Links
* [Clean Code Developer - Das Prinzip der lose Kopplung](https://clean-code-developer.de/)
* [Refactoring Guru - Schnittstellen und Entwurfsmuster](https://refactoring.guru/design-patterns)
* [Die offizielle Dokumentation deiner Wunschsprache zum Thema Generics / Schnittstellen]

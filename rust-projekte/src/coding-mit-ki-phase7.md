# 💡 Phase 7: Nebenläufigkeit & Asynchronität (Frameworks & Deployment)

## Willkommen in der Welt der Gleichzeitigkeit! 🤹‍♂️

Bis jetzt lief dein Code wahrscheinlich wie ein braves Rezept ab: Schritt für Schritt, Zeile für Zeile. Doch in der realen Softwareentwicklung ist das oft zu langsam. Wenn dein Programm auf eine Antwort aus dem Internet wartet oder eine riesige Datei von der Festplatte liest, steht der Prozessor still. Das ist so, als würde ein Koch in der Küche untätig warten, bis das Wasser kocht, anstatt schon einmal das Gemüse zu schneiden.

In dieser Phase lernst du, wie du Programme schreibst, die mehrere Dinge gleichzeitig (nebenläufig) oder ohne zu blockieren (asynchron) tun. Außerdem schauen wir uns an, wie du solchen komplexen Code mit automatisierten Tests absicherst und ihn per CI/CD-Pipelines sicher in die Produktion bringst (Deployment).

Egal ob du **Python, JavaScript/TypeScript, Java, C, C++ oder Rust** nutzt – die Prinzipien dahinter sind universell. Die KI wird in dieser Phase dein Co-Pilot beim Entwirren von asynchronen Knoten im Kopf sein!

---

## 🧠 Theorie: Dein sprachenunabhängiger Werkzeugkasten

Bevor wir in die Praxis einsteigen, müssen wir die grundlegenden Konzepte verstehen. Die Konzepte sind in almost allen modernen Sprachen gleich, auch wenn sich die Syntax unterscheidet.

### 1. Asynchrone Workflows: Threads vs. Async/Await & Promises

Wenn wir von "mehreren Dingen gleichzeitig" sprechen, gibt es zwei Hauptansätze:

*   **Multithreading (Nebenläufigkeit):** Das Betriebssystem startet mehrere "Threads" (Ausführungsfäden). Sie laufen echt parallel (auf mehreren CPU-Kernen) oder wechseln sich so schnell ab, dass es so aussieht. Jeder Thread hat seinen eigenen Ablauf, teilt sich aber den Speicher mit den anderen.
    *   *Analogie:* Mehrere Köche arbeiten gleichzeitig in einer Küche. Sie teilen sich die Arbeitsplatte und die Töpfe.
*   **Asynchrone Programmierung (Async/Await & Promises):** Hier gibt es oft nur einen einzigen Thread (oder einen kleinen Pool), der Aufgaben extrem effizient verwaltet. Sobald eine Aufgabe warten muss (z. B. auf ein Netzwerksignal), gibt sie die Kontrolle ab, und das System arbeitet an einer anderen Aufgabe weiter.
    *   *Analogie:* Ein einzelner Koch bereitet ein Drei-Gänge-Menü zu. Während die Nudeln kochen (Wartezeit), schneidet er die Zwiebeln. Er wartet nicht blockiert vor dem Topf.

#### Didaktische Platzhalter für asynchrone Funktionen:
Da asynchroner Code oft spezielle Rückgabetypen (wie `Promise`, `Future` oder `Task`) verlangt, nutzen wir auch hier Platzhalter:
*   **Rust:** `async fn meine_funktion() { todo!() }`
*   **JavaScript:** `async function meineFunktion() { throw new Error("Nicht implementiert"); }`
*   **Python:** `async def meine_funktion(): raise NotImplementedError()`

#### Dein Lern-Prompt für asynchrone Grundlagen:
> *„Ich lerne gerade das Konzept der asynchronen Programmierung. Ich verwende [DEINE PROGRAMMIERSPRACHE]. Bitte erkläre mir den Unterschied zwischen Multithreading und Asynchronität (Async/Await) in dieser Sprache. Verwende eine anschauliche Analogie und zeige mir, wie eine minimale asynchrone Funktion in dieser Sprache strukturell deklariert wird, ohne die Logik zu implementieren.“*

---

### 2. Debugging von Race Conditions und Deadlocks

Nebenläufiger Code bringt neue Arten von Fehlern mit sich, die extrem schwer zu finden sind. Die zwei bekanntesten sind:

*   **Race Conditions (Wettlaufsituationen):** Zwei Threads greifen gleichzeitig auf diese Variable zu. Mindestens einer schreibt hinein. Wer zuerst kommt, mahlt zuerst – das Ergebnis des Programms hängt vom Zufall des Betriebssystem-Schedulers ab.
    *   *Beispiel:* Zwei Threads erhöhen einen Kontostand von 100 € um jeweils 10 €. Wenn beide gleichzeitig den alten Wert (100 €) lesen und dann schreiben, ist das Ergebnis 110 € statt 120 €.
*   **Deadlocks (Verklemmungen):** Thread A besitzt Ressource 1 und wartet auf Ressource 2. Thread B besitzt Ressource 2 und wartet auf Ressource 1. Beide blockieren sich gegenseitig für immer.
    *   *Beispiel:* Koch A hat das Messer und wartet auf das Schneidebrett. Koch B hat das Schneidebrett und wartet auf das Messer. Keiner gibt sein Werkzeug ab.

#### Dein Lern-Prompt für das Debugging:
> *„Mein nebenläufiges Programm in [DEINE PROGRAMMIERSPRACHE] verhält sich unvorhersehbar oder friert ab und zu komplett ein. Bitte erkläre mir, was eine Race Condition und ein Deadlock sind. Welche Tools (z. B. Thread Sanitizer, Debugger-Optionen) oder Programmiertechniken (wie Mutex/Locks) gibt es in [DEINE PROGRAMMIERSPRACHE], um diese Fehler systematisch zu finden und zu verhindern?“*

---

### 3. Deployment, CI/CD & Automatisches Testen

Wenn du asynchronen Code geschrieben hast, musst du sicherstellen, dass er stabil läuft und automatisiert getestet wird.

*   **Automatisierte Tests für Nebenläufigkeit:** Da nebenläufiger Code nicht-deterministisch (vom Zufall beeinflusst) ist, laufen normale Tests oft lokal durch, scheitern aber auf dem Server. Man nennt diese Tests "Flaky Tests". Gute Tests für asynchronen Code nutzen Timeouts, simulieren Netzwerkverzögerungen (Mocking) oder testen unter künstlicher Last.
*   **CI/CD (Continuous Integration / Continuous Deployment):** Jedes Mal, wenn du deinen Code auf GitHub oder GitLab hochlädst, läuft eine automatisierte Pipeline. Sie baut deinen Code, führt alle Tests aus und bereitet das Deployment (z. B. über Docker) vor.

#### Dein Lern-Prompt für CI/CD und Tests:
> *„Ich möchte für eine kleine Konsolenanwendung in [DEINE PROGRAMMIERSPRACHE] eine automatisierte Testsuite schreiben. Die Anwendung nutzt asynchronen Code. Wie schreibe ich in dieser Sprache Unit-Tests, die auf das Ende einer asynchronen Operation warten? Und wie könnte eine einfache CI-Konfiguration (z. B. für GitHub Actions) aussehen, die diese Tests bei jedem Push automatisch ausführt?“*

---

### 4. DevOps & Infrastructure as Code (IaC) - Docker, Kubernetes, Terraform mit KI

Sobald deine Anwendung zuverlässig läuft, stellt sich die Frage: Wie wird sie betrieben? Anstatt Server manuell einzurichten, beschreiben moderne Entwicklerteams ihre Infrastruktur deklarativ in Konfigurationsdateien (Infrastruktur als Code / IaC).

Die KI kann dich dabei unterstützen, diese komplexen Textformate zu verstehen und zu entwerfen:

*   **Container-Konfigurationen (z. B. Docker):** Ein `Dockerfile` beschreibt die isolierte Laufzeitumgebung deiner Anwendung. Die KI hilft dir dabei, effiziente Basis-Images auszuwählen und Multi-Stage-Builds zu strukturieren, um kleine und sichere Container-Images zu bauen.
*   **Infrastructure as Code (IaC-Manifeste z. B. Terraform, Kubernetes):** Ob Kubernetes-Pods oder Terraform-Ressourcen für Cloud-Anbieter – die KI kann dir dabei helfen, Ressourcen-Deklarationen strukturell aufzubauen, ohne dass du die gesamte Syntax auswendig lernen musst.
*   **Sicherheitsprüfungen (Security Audits):** Infrastruktur-Code enthält oft unbemerkt Risiken (z. B. Container, die als Administrator/Root ausgeführt werden, oder unnötig geöffnete Ports). Nutze die KI, um deine Konfigurationsdateien auf Sicherheitsmängel und Fehlkonfigurationen prüfen zu lassen.

> [!WARNING]
> Verwende in deinen Prompts niemals echte Passwörter, API-Keys oder Zugangsdaten! Nutze stattdessen immer Platzhalter (z. B. `YOUR_DATABASE_PASSWORD`) und reiche sensible Werte zur Laufzeit über Umgebungsvariablen an deinen Container weiter.

#### Dein Lern-Prompt für IaC & Container:
> *„Ich möchte eine Anwendung in [DEINE PROGRAMMIERSPRACHE] containerisieren. Bitte erstelle mir eine Vorlage für ein Dockerfile und eine einfache Docker-Compose-Datei. Verwende didaktische Platzhalter für die spezifischen Startbefehle und erkläre mir die wichtigsten Direktiven kurz.“*

---

## 🛠️ Praxis-Aufgaben: Kleine Fingerübungen

Probiere diese Übungen aus, um ein Gespür für asynchrone Abläufe zu bekommen:

### Aufgabe A: Den asynchronen Timer verstehen
Schreibe eine Funktion, die eine Nachricht ausgibt, dann eine Sekunde wartet (ohne den gesamten Thread schlafen zu legen!) und danach eine zweite Nachricht ausgibt.
*   *Tipp:* Verwende in JavaScript `setTimeout` oder ein `Promise`, in Python `await asyncio.sleep(1)`, in Rust `tokio::time::sleep`.
*   **Lern-Prompt:** *„Ich möchte in [DEINE PROGRAMMIERSPRACHE] eine asynchrone Verzögerung von einer Sekunde einbauen, ohne das gesamte Programm zu blockieren. Welche Funktion muss ich dafür nutzen und wie sieht die Struktur aus? Zeige mir ein Gerüst mit Platzhaltern.“*

### Aufgabe B: Den Deadlock provozieren
Überlege dir, wie du zwei Sperrobjekte (Locks/Mutexes) so in zwei Threads aufrufst, dass das Programm nach dem Start sofort einfriert.
*   **Lern-Prompt:** *„Ich möchte lernen, wie ein Deadlock entsteht, indem ich absichtlich einen in [DEINE PROGRAMMIERSPRACHE] provoziere. Kannst du mir ein minimales Code-Gerüst zeigen, das zwei Threads und zwei Sperren (Mutex/Lock) definiert, bei dem die Sperren in unterschiedlicher Reihenfolge angefordert werden? Verwende Platzhalter für die Rumpf-Logik.“*

### Aufgabe C: Sicherheitsprüfung einer Container-Konfiguration
Entwerfe mithilfe der KI eine Strategie, um eine Container-Konfiguration auf Sicherheitsrisiken zu überprüfen. Achte dabei auf Benutzerrechte (Root vs. Non-Root) und den Umgang mit sensiblen Daten.
*   **Lern-Prompt:** *„Hier ist ein Entwurf für ein Dockerfile: [FÜGE DEINEN ENTWURF EIN ODER NUTZE PLATZHALTER]. Bitte führe eine Sicherheitsanalyse durch. Welche Best Practices bezüglich Benutzerrechten, Image-Größe und Secrets-Management wurden hier missachtet? Erkläre mir die Konzepte didaktisch, ohne mir direkt ein fertiges Dockerfile zu präsentieren.“*

---

## 🚀 Projektvorschläge

Hier sind drei sprachenunabhängige Projekte, mit denen du dein Wissen vertiefen kannst.

### 🌐 Projekt 1: Der asynchrone Daten-Aggregator (Web-Scraper-Gerüst)
*Fokus: Asynchrone HTTP-Requests, Fehlerbehandlung & Timeouts*

**Beschreibung:**
Du möchtest Daten von drei verschiedenen Webseiten (z. B. Wetterdaten) gleichzeitig abfragen. Statt die Webseiten nacheinander anzufragen (was 3 Sekunden dauern würde, wenn jede Seite 1 Sekunde braucht), feuerst du alle drei Anfragen gleichzeitig ab. Das Programm wartet, bis alle Antworten da sind, und führt sie zusammen.

**Didaktischer Nutzen:**
Du verstehst, wie man asynchrone Aufgaben bündelt und wie man mit dem Scheitern einzelner Anfragen umgeht (z. B. durch Timeouts).

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
ASYNC FUNCTION hole_daten_von_url(url: Text) -> Text
    // TODO: Simuliere eine Netzwerk-Verzögerung
    // TODO: Führe den eigentlichen asynchronen Request aus
    RETURN PLATZHALTER
END FUNCTION

ASYNC FUNCTION main()
    Urls = ["https://api.wetter.de", "https://api.nachrichten.de", "https://api.sport.de"]
    
    // TODO: Starte alle drei Requests GLEICHZEITIG (Nebenläufig)
    Tasks = PLATZHALTER_START_ALL(Urls)
    
    // TODO: Warte, bis alle fertig sind (z. B. Promise.all oder join!)
    Ergebnisse = await PLATZHALTER_AWAIT_ALL(Tasks)
    
    PRINT "Alle Daten geladen: " + Ergebnisse
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich möchte einen asynchronen Daten-Aggregator in [DEINE PROGRAMMIERSPRACHE] bauen. Ich möchte drei URLs parallel abfragen und auf alle Ergebnisse warten. Bitte erstelle mir ein leeres Code-Gerüst für diese Logik. Zeige mir, wie man in dieser Sprache mehrere asynchrone Operationen gleichzeitig startet und auf deren gemeinsame Fertigstellung wartet, ohne sie nacheinander auszuführen.“*

---

### 🎟️ Projekt 2: Das Ticket-Buchungssystem (Thread-safe)
*Fokus: Race Conditions verhindern mit Locks/Mutex*

**Beschreibung:**
Ein Konzert hat nur noch 5 freie Tickets. 10 Kunden (simuliert durch 10 parallele Threads) versuchen im exakt selben Moment, jeweils ein Ticket zu buchen. Ohne Absicherung wird das System mehr Tickets verkauft, als vorhanden sind (Überbuchung). Sichere den kritischen Bereich ab.

**Didaktischer Nutzen:**
Du lernst das Konzept der Synchronisation kennen. Du erfährst, wie du "kritische Sektionen" im Code sperrst (Locking), sodass immer nur ein Thread auf einmal die Ticketanzahl verändern darf.

#### Das abstrakte Code-Gerüst (Pseudocode):
```text
SHARED VARIABLE verfuegbare_tickets = 5
SHARED VARIABLE ticket_sperre = NEUES_SPERR_OBJEKT()

FUNCTION buche_ticket(kunden_id: Zahl) -> Boolean
    // TODO: Sichere diese Funktion ab, damit nicht mehrere Threads 
    // gleichzeitig den Wert von 'verfuegbare_tickets' manipulieren!
    
    SPERRE_AKTIVIEREN(ticket_sperre)
    
    WENN verfuegbare_tickets > 0 DANN
        // Simuliere Bearbeitungszeit
        WARTE_KURZ()
        verfuegbare_tickets = verfuegbare_tickets - 1
        Ergebnis = TRUE
    SONST
        Ergebnis = FALSE
    ENDE WENN
    
    SPERRE_FREIGEBEN(ticket_sperre)
    
    RETURN Ergebnis
END FUNCTION
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich programmiere ein Ticket-Buchungssystem in [DEINE PROGRAMMIERSPRACHE] mit mehreren Threads. Ich habe das Problem, dass Race Conditions auftreten und zu viele Tickets verkauft werden. Bitte zeige mir ein leeres Code-Gerüst, das zeigt, wie man in [DEINE PROGRAMMIERSPRACHE] einen kritischen Code-Bereich mithilfe von Locks (oder Mutexen) schützt, sodass immer nur ein Thread Zugriff hat. Gib mir Tipps, wie ich Deadlocks beim Freigeben der Sperre vermeide.“*

---

### 📦 Projekt 3: Die CI/CD-Pipeline für dein Miniprojekt
*Fokus: Deployment vorbereiten & Automatisierung*

**Beschreibung:**
Erstelle für eines deiner bisherigen Projekte eine automatisierte Build- und Test-Pipeline. Schreibe ein einfaches Skript, das dein Programm in einen isolierten Container (z. B. Docker) packt, und eine Konfigurationsdatei für GitHub Actions oder GitLab CI, die bei jedem Code-Upload automatisch prüft, ob dein Code baut und alle Tests bestehen.

**Didaktischer Nutzen:**
Du verstehst, wie moderne Softwareteams Qualität sichern und wie "Infrastructure as Code" funktioniert. Du lernst, dass deine Entwicklungsumgebung nicht der einzige Ort ist, an dem dein Code laufen können muss.

#### Das abstrakte Pipeline-Gerüst (YAML-Pseudocode):
```yaml
# GitHub Actions CI-Gerüst
name: Test- und Build-Pipeline

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Code auschecken
        uses: actions/checkout@v4

      # TODO: Wähle die passende Laufzeitumgebung (Node.js, Python, Rust, JDK, etc.)
      - name: Setup der Programmiersprache
        uses: actions/setup-PLATZHALTER

      - name: Abhängigkeiten installieren
        run: PLATZHALTER_INSTALL_COMMAND

      # TODO: Starte die automatisierten Tests
      - name: Tests ausführen
        run: PLATZHALTER_TEST_COMMAND
```

#### Dein Lern-Prompt für dieses Projekt:
> *„Ich habe ein Projekt in [DEINE PROGRAMMIERSPRACHE] geschrieben und möchte nun eine CI/CD-Pipeline mit GitHub Actions aufsetzen. Mein Projekt benötigt zum Bauen bestimmte Abhängigkeiten und hat ein paar Unit-Tests. Kannst du mir eine einfache `.github/workflows/ci.yml` Struktur für [DEINE PROGRAMMIERSPRACHE] erstellen? Verwende Platzhalter für die konkreten Installations- und Testbefehle und erkläre mir kurz, was die einzelnen Schritte bedeuten.“*

---

## 💡 Zusammenfassung: Welches Projekt übt was?

| Projekt / Aufgabe | Programmier-Konzepte / Technologien | KI-Lernkonzept | Didaktischer Fokus |
| :--- | :--- | :--- | :--- |
| **1. Daten-Aggregator** | Asynchronität, HTTP-Requests, Promises/Futures | Parallele Ausführung steuern | Effizienzsteigerung durch asynchrones Warten |
| **2. Ticket-Buchung** | Threads, Shared State, Locks/Mutex, Race Conditions | Thread-Sicherheit & Synchronisation | Datenintegrität bei gleichzeitigem Zugriff sichern |
| **3. CI/CD-Pipeline** | YAML-Konfiguration, Docker, CI/CD-Pipelines | KI als DevOps-Assistent | Automatisierte Qualitätssicherung & Deployment-Bereitschaft |
| **Aufgabe C / IaC** | Docker, Kubernetes, Terraform, Security Auditing | Deklarative Infrastruktur & Sicherheit | Container-Sicherheit & deklarative Konfigurationen |

---

## 📚 Links
* [MDN Web Docs: Asynchrones JavaScript](https://developer.mozilla.org/de/docs/Learn/JavaScript/Asynchronous) (Hervorragende Erklärung von Promises und async/await)
* [Real Python: Async IO in Python](https://realpython.com/async-io-python/) (Ausführliches Tutorial zu asynchronem Python)
* [Rust Book: Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html) (Das Standardwerk zu Threads und Sicherheit in Rust)
* [GitHub Actions Dokumentation](https://docs.github.com/de/actions) (Einstieg in automatisierte Workflows)
* [Docker Docs: Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) (Leitfaden für effiziente und sichere Dockerfiles)
* [Terraform Developer Tutorials](https://developer.hashicorp.com/terraform/tutorials) (Einstieg in deklarative Infrastruktur)

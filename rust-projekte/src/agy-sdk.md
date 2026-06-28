# 🚀 Antigravity (`agy`) – Das SDK nutzen

*Wie du eigene Agenten-Workflows und Automationen programmierst, indem du Antigravity direkt als SDK in deinen Code integrierst.*

---

## 🧠 Theorie: Programmierte Agenten

Die AGY CLI ist ein überragendes Tool für die interaktive Arbeit im Terminal. Aber wenn du ein Backend baust, das vollautomatisch Code-Reviews durchführt, auf GitHub-Pull-Requests reagiert oder extrem komplexe, mehrstufige Workflows unsichtbar steuern soll, reicht die CLI oft nicht aus. Hier benötigst du das **Antigravity SDK**.

* **Subagenten per Code orchestrieren:** Im SDK kannst du nicht nur einen Agenten isoliert starten, sondern dynamisch in deinem Code eine Hierarchie aus Subagenten aufbauen, die Daten miteinander austauschen.
* **Benutzerdefinierte, native Tools:** Anstatt Werkzeuge mühsam über JSON-Konfigurationen und Shell-Wrappern anzubinden, kannst du im SDK einfach echte native Funktionen schreiben (z.B. einen direkten Datenbank-Zugriff über ein ORM) und diese dem Agenten nativ als Werkzeug zur Verfügung stellen.
* **Event-Hooks:** Das SDK bietet Event-Listener. Du kannst per Code genau dann eingreifen, Logs mitschreiben oder die UI aktualisieren, wenn der Agent im Hintergrund eine Datei liest, ein Kommando ausführt oder eine Entscheidung trifft.

## ⚙️ Einstellungen & Setup

Um das SDK zu nutzen, richtest du dein Programmier-Environment ein:
* **Das SDK-Paket:** Antigravity bietet SDKs für gängige Sprachen an (z.B. Python). Finde heraus, wie du das Paket in dein lokales Environment lädst (z.B. über `pip` oder `uv`).
* **Initialisierung & Workspace:** Um das SDK zu nutzen, musst du im Code oft einen "Client" instanziieren und ihm den absoluten Pfad zu dem Verzeichnis (Workspace URI) übergeben, in dem der Agent aktiv sein darf.
* **API Keys:** Stelle sicher, dass die Umgebungsvariablen für das zugrundeliegende LLM-Modell (wie Gemini oder Claude) korrekt exportiert sind, da das SDK diese im Hintergrund für die Agenten-Hirne aufruft.

---

## 🛠️ Praxis-Übungen: Das SDK meistern (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine Code-Vorlagen! Lies die Dokumentation des AGY SDKs im Netz (oder nutze die CLI-Skills wie `antigravity-guide`, um danach zu fragen) und implementiere die Logik selbstständig in deinem Code.

### 🧭 Grundlagen: Agenten instanziieren

#### Übung 1: Der erste SDK-Agent
* **Aufgabe:** Schreibe ein kleines Skript, das das AGY SDK importiert, einen neuen asynchronen Agenten im aktuellen Verzeichnis initialisiert und ihm einen einfachen Prompt ("Fasse die README-Datei zusammen") sendet.
* **Hinweis:** Achte darauf, wie das SDK asynchrone Antworten (Async/Await Pattern) handhabt und fange den Output sauber ab.

#### Übung 2: Die Tool-Liste hart beschneiden
* **Aufgabe:** Wenn du einen Agenten im SDK startest, hat er oft sofort Zugriff auf gefährliche Standard-Werkzeuge (z.B. `run_command` oder `write_file`). Beschneide diese Rechte im Code.
* **Hinweis:** Finde die passenden Initialisierungs-Parameter, um dem Agenten z.B. nur reine Lese-Rechte (`read_file`, `list_dir`) zu erteilen.

#### Übung 3: Workspace Branching (Isolation)
* **Aufgabe:** Starte über das SDK einen Agenten, weise ihn aber per Parameter an, seine Arbeit in einem separaten, verzweigten Workspace (`branch` Modus) durchzuführen, um die Original-Dateien niemals zu überschreiben.
* **Hinweis:** Suche in der Dokumentation nach Konzepten wie "Workspace Branching", "Sandbox" oder "Share Mode".

### 🛡️ Erweiterte Steuerung & Tools

#### Übung 4: Ein natives Python/Rust-Tool injizieren
* **Aufgabe:** Schreibe eine normale Funktion `calculate_taxes(amount)`. Nutze die Decorators oder Registrierungs-Methoden des SDKs, um genau diese Funktion dem Agenten als von ihm ausführbares Werkzeug zu übergeben.
* **Hinweis:** Oft geschieht das vollautomatisch über Type-Hints und Docstrings, aus denen das SDK intern das nötige JSON-Schema für das LLM generiert.

#### Übung 5: Agenten-Events abhören (Observability)
* **Aufgabe:** Schreibe einen Event-Listener im SDK, der immer dann in der Konsole `Print("Agent liest gerade Datei X...")` ausgibt, wenn der Agent im Hintergrund eine Datei berührt.
* **Hinweis:** Untersuche, ob das SDK Callback-Funktionen (wie `on_tool_call` oder `on_step`) oder Streaming-Events unterstützt, an die du dich dranhängen kannst.

#### Übung 6: Den State inspizieren
* **Aufgabe:** Lass den Agenten im SDK asynchron arbeiten. Wenn er seine Aufgabe beendet hat, lies den gesamten generierten Konversations-Baum (`transcript`) über das SDK aus und speichere ihn als rohe `.json` Datei.
* **Hinweis:** Der Agent gibt am Ende oft ein Objekt oder einen Iterator zurück, der die komplette Historie aller Prompts und Tool-Aufrufe enthält.

### 🔄 Multi-Agenten Systeme

#### Übung 7: Zwei Agenten verknüpfen (Pipelines)
* **Aufgabe:** Initialisiere zwei völlig separate Agenten im SDK (einen "Writer" und einen kritischen "Reviewer"). Lass den Writer einen Text generieren und übergib diesen Text direkt per Code als Prompt an den Reviewer-Agenten.
* **Hinweis:** Baue eine logische Pipeline im Code auf: Der String-Output von Agent A wird der Prompt-Input von Agent B.

#### Übung 8: Hintergrund-Tasks (Background Tasks)
* **Aufgabe:** Starte einen Agenten über das SDK und sende ihn explizit in den Hintergrund ("Fire and forget"), sodass dein Haupt-Skript nicht blockiert wird, sondern sofort weiterläuft.
* **Hinweis:** Prüfe, wie man asynchrone Tasks im SDK managt und deren Status später (z.B. über `task.status()`) abfragen kann, um zu prüfen, ob die Aufgabe fertig ist.

#### Übung 9: Der automatische GitHub-Reviewer (Der Meta-Workflow)
* **Aufgabe:** Die absolute Königsdisziplin: Schreibe ein Skript, das bei jedem Push in dein Repository aufgerufen wird. Das Skript soll das AGY SDK nutzen, um einen dedizierten Code-Review-Agenten zu starten, der ein Diff (Git) analysiert und bei Architektur-Fehlern Alarm schlägt.
* **Hinweis:** Kombiniere Subprocesses (`git diff`) mit dem Prompt-Input für das AGY SDK. So baust du dir deinen eigenen, lokalen CI/CD KI-Bot!

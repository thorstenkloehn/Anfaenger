# 🚀 Antigravity CLI (`agy`) – Automatisieren

*Wie du den AGY-Agenten für unbeaufsichtigte Workflows, Hintergrund-Tasks und programmierbare Abläufe nutzt.*

---

## 🧠 Theorie: "Alle wissen" bei der Automatisierung

Die Antigravity CLI (`agy`) geht weit über einen simplen Chat hinaus. Sie bietet echte Automatisierungswerkzeuge. Damit der Agent "alles weiß" und im Hintergrund fehlerfrei agieren kann, nutzt AGY fortschrittliche Konzepte:

* **Background Tasks (`/tasks`):** AGY kann langlaufende Befehle, Refactorings oder Agenten-Schleifen im Hintergrund ausführen, während du weiter ungestört im Terminal arbeitest.
* **Lifecycle Hooks (`/hooks`):** Du kannst Automatisierungen an bestimmte Ereignisse binden (z. B. "Führe immer ein Skript aus, bevor der Agent startet" oder "Analysiere den Code, nachdem eine Datei gespeichert wurde").
* **Das Python SDK:** Für die absolute Kontrolle kannst du AGY über das offizielle Python-SDK fernsteuern (z.B. für "Agent Leasing" und Orchestrierung), statt die CLI manuell zu bedienen.

## ⚙️ Einstellungen & Setup

Wenn AGY selbstständig (automatisiert) arbeiten soll, musst du in den Einstellungen (`/config`) die Sicherheitsleinen anpassen:
* **`toolPermission`:** Wenn der Agent Aufgaben im Hintergrund löst, darf er nicht stundenlang auf dein "Ja/Nein" bei jedem Shell-Befehl warten. Ändere die Berechtigung auf `always-proceed` oder `proceed-in-sandbox`.
* **Terminal Sandbox (`enableTerminalSandbox`):** Um zu verhindern, dass ein unbeaufsichtigter Agent dein System beschädigt, solltest du die Sandbox aktivieren. Gefährliche Befehle laufen dann in einer geschützten, isolierten Umgebung ab.
* **Benachrichtigungen (`notifications`):** Wenn Tasks im Hintergrund laufen, aktiviere System-Benachrichtigungen, damit dir dein Betriebssystem mitteilt, sobald der Agent fertig ist.

---

## 🛠️ Praxis-Übungen: Automatisierungs-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Skripte zum Kopieren! Nutze die Befehle der CLI (z.B. `/help`), ändere die Einstellungen und lerne durch eigenes Ausprobieren.

### 🧭 Steuerung von Hintergrund-Aufgaben

#### Übung 1: Fire-and-Forget
* **Aufgabe:** Beauftrage den Agenten damit, eine komplexe Dateianalyse in einem großen Ordner durchzuführen. Statt im Chat auf die Antwort zu warten, soll er den Job als Hintergrundaufgabe ausführen.
* **Hinweis:** Finde heraus, wie du dem Agenten im Prompt klar machst, dass dies eine langlaufende Aufgabe ist, die er "im Hintergrund" oder als Task starten soll.

#### Übung 2: Task-Monitoring
* **Aufgabe:** Dein Agent arbeitet unsichtbar im Hintergrund an einem Refactoring. Wie überprüfst du in der aktiven CLI den aktuellen Status und Fortschritt dieser Aufgabe?
* **Hinweis:** Welcher Slash-Befehl (z.B. `/tasks`) zeigt dir die aktuell laufenden Hintergrund-Prozesse an?

#### Übung 3: System-Benachrichtigungen aktivieren
* **Aufgabe:** Du willst nicht ständig prüfen müssen, ob der Agent fertig ist. Wie richtest du ein, dass dein Betriebssystem dir eine Benachrichtigung (Pop-up) sendet?
* **Hinweis:** Öffne die Einstellungen mit `/config` und suche nach dem Schlüsselwort `notifications`. Setze den Wert auf `true`.

### 🛡️ Sicherheit & Hooks in der Automatisierung

#### Übung 4: Die Sandbox testen
* **Aufgabe:** Bevor du dem Agenten für ein automatisiertes Skript uneingeschränkte Rechte gibst, möchtest du den Sandbox-Modus testen. Wie aktivierst du ihn?
* **Hinweis:** Suche in den Einstellungen (`/config`) nach `enableTerminalSandbox`. Versuche danach, den Agenten eine Datei absichtlich außerhalb deines Arbeitsbereichs (z.B. in `/tmp/`) erstellen zu lassen. Was passiert?

#### Übung 5: Vollautomatische Rechte
* **Aufgabe:** In deinem sicheren Sandbox-Workspace soll der Agent *alle* Tools und Befehle ohne deine Bestätigung ausführen.
* **Hinweis:** Wie setzt du die Option `toolPermission` in den Einstellungen auf den Modus, der "immer fortfahren" bedeutet?

#### Übung 6: Lifecycle Hooks erkunden
* **Aufgabe:** Du hast gelesen, dass AGY "Hooks" unterstützt, um Aktionen an Ereignisse zu koppeln. Wie lässt du dir alle aktuell registrierten Lifecycle-Hooks deines Projekts auflisten?
* **Hinweis:** Welcher Slash-Befehl listet diese auf? (Tipp: Gib `/` ein und drücke Tab, um die verfügbaren Befehle zu sehen).

### 🔄 Komplexe Schnittstellen & SDKs

#### Übung 7: Eigene Tools über MCP anbinden
* **Aufgabe:** Du möchtest, dass der Agent über das Model Context Protocol (MCP) automatisch auf deine lokale Datenbank zugreift. Wie prüfst du, ob dein MCP-Server von AGY erkannt wurde?
* **Hinweis:** Nutze den Befehl `/mcp` in der CLI. Wie sieht die Liste der aktiven Server aus und welche "Tools" werden dort aufgeführt?

#### Übung 8: Das Python SDK recherchieren
* **Aufgabe:** Finde heraus, wie das "Google Antigravity Python SDK" funktioniert. Welche Konzepte bietet das SDK, um Agenten per Python-Skript zu orchestrieren?
* **Hinweis:** Da wir hier keine Lösung vorgeben: Fordere deinen AGY-Agenten in der CLI direkt auf, dir eine Zusammenfassung der Funktionen des Antigravity Python SDKs auszugeben.

#### Übung 9: Langläufer-Planung
* **Aufgabe:** Du möchtest über Nacht eine komplette Test-Coverage deines Projekts erzeugen lassen. Der Agent soll extrem gründlich sein und nicht bei kleinen Fehlern stoppen.
* **Hinweis:** Gibt es einen speziellen Slash-Befehl (z.B. `/goal`), den du dem Agenten mitgeben kannst, um zu signalisieren, dass er ein weitreichendes Ziel ohne Zeitdruck vollenden soll?

# 🚀 Antigravity CLI (`agy`) – Workflows & Steuerung

*Wie du den Antigravity KI-Agenten im Terminal lenkst, den Kontext optimal nutzt und Einstellungen anpasst.*

---

## 🧠 Theorie: "Alle wissen" – Das Kontext-Management

Antigravity (AGY) ist ein mächtiges Tool, aber der Agent ist blind, bis du ihm den richtigen Kontext gibst. "Alle wissen" bedeutet, dass der Agent die relevanten Dateien, den Projektstatus und deine Vorgaben kennen muss.

* **Der Pilot bist du:** Du entscheidest, welche Dateien relevant sind. Ein zu großer Kontext verwirrt den Agenten und kostet unnötig Token. Lade nur das ein, was für die konkrete Aufgabe gebraucht wird.
* **Das Kontext-Fenster überprüfen:** Im Terminal kannst du jederzeit nachsehen, was der Agent aktuell "weiß" und welche Dateien er geladen hat.
* **Neustart und Fokus:** Wenn sich der Kontext verhakt hat oder das Thema wechselt, ist es oft besser, den Verlauf zu leeren oder abzuzweigen, anstatt in einem riesigen Chatverlauf weiterzuarbeiten.

## ⚙️ Einstellungen & Setup

Die Antigravity CLI bringt eine interaktive Konfigurationsoberfläche (TUI) mit, die du direkt im Terminal aufrufen kannst. Wichtige Konzepte:
* **Werkzeug-Berechtigungen (Permissions):** Darf der Agent Befehle direkt ausführen oder muss er immer um Erlaubnis fragen (`toolPermission`)?
* **Sandbox-Modus:** Um dein System zu schützen, können Befehle in einer isolierten Umgebung (Sandbox) laufen.
* **Arbeitsbereich (Workspace):** Standardmäßig darf der Agent dein Projekt-Verzeichnis nicht verlassen, es sei denn, du erlaubst den Zugriff nach außen (`allowNonWorkspaceAccess`).

---

## 🛠️ Praxis-Übungen: Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Lösungs-Codes! Finde die Antworten selbst heraus, indem du in der CLI die Befehle testest (z.B. mit `/help`).

### 🧭 Steuerung & Kontext ("Alle wissen")

#### Übung 1: Den aktuellen Kontext prüfen
* **Aufgabe:** Wie lässt du dir als Liste anzeigen, welche Dateien und Symbole der Agent gerade im Kopf (Kontext) hat?
* **Hinweis:** Suche nach einem Slash-Befehl (beginnt mit `/`), der den aktuellen "Context" aufzeigt.

#### Übung 2: Kontext bereinigen
* **Aufgabe:** Du startest ein neues Teilprojekt und möchtest, dass der Agent seine bisherige Konversation und den Kontext "vergisst", ohne die CLI komplett neu zu starten.
* **Hinweis:** Gibt es einen Befehl wie `/clear` oder `/new`? Probiere aus, was passiert, wenn du ihn eingibst.

#### Übung 3: Abzweigungen erstellen (Forking)
* **Aufgabe:** Du bist mitten in einer guten Session, möchtest aber eine riskante Code-Änderung ausprobieren. Wie speicherst du den aktuellen Stand ab und zweigst eine neue Diskussion ab, ohne die alte kaputt zu machen?
* **Hinweis:** Finde heraus, wie die Befehle `/fork` oder `/branch` in Antigravity funktionieren.

### 🛡️ Einstellungen & Berechtigungen

#### Übung 4: Die Konsole einrichten
* **Aufgabe:** Wie öffnest du das interaktive Einstellungs-Menü (TUI) von Antigravity direkt im Terminal?
* **Hinweis:** Teste Befehle wie `/config` oder `/settings`. Wo findest du dort die Option, das Farbschema (`colorScheme`) zu ändern?

#### Übung 5: Automatisches Ausführen erlauben
* **Aufgabe:** Der Agent fragt dich bei jedem `cargo build`, ob er den Befehl ausführen darf. Das stört den Workflow. Wie passt du die Einstellungen so an, dass er nicht mehr nachfragen muss?
* **Hinweis:** Schau dir in den Einstellungen die Option für "Tool Permission" an. Kannst du den Modus lockern (z.B. auf "always-proceed")?

#### Übung 6: Feinmaschige Rechte (`/permissions`)
* **Aufgabe:** Du willst, dass Datei-Lesezugriffe immer erlaubt sind, aber Bash-Befehle *immer* manuell von dir bestätigt werden müssen.
* **Hinweis:** Wie nutzt du den Befehl `/permissions`, um feingranulare Allow- und Deny-Listen (Erlaubt/Verboten) zu verwalten?

### 🔄 Komplexe Workflows

#### Übung 7: Zwischen-Fragen stellen
* **Aufgabe:** Du bist mitten in einer großen Aufgabe, musst aber nur schnell wissen, wie ein bestimmter Shell-Befehl funktioniert, ohne den Agenten-Fokus von der Hauptaufgabe abzulenken.
* **Hinweis:** Welcher "Nebenbei"-Befehl (`/btw`) hilft dir, eine schnelle Frage zu stellen, ohne einen vollständigen Agenten-Lauf zu starten?

#### Übung 8: Code-Änderungen prüfen
* **Aufgabe:** Der Agent hat gerade selbstständig 5 Dateien geändert. Bevor du die Änderungen testest, willst du sehen, *was genau* verändert wurde.
* **Hinweis:** Wie nutzt du den Befehl `/diff`, um dir die Code-Änderungen direkt im Terminal anzeigen zu lassen?

#### Übung 9: Fähigkeiten (Skills) überprüfen
* **Aufgabe:** Du hast gelesen, dass Antigravity erweiterte Fähigkeiten ("Skills") laden kann. Wie findest du heraus, welche Skills aktuell in deinem Projekt aktiv sind?
* **Hinweis:** Welcher Slash-Befehl (z.B. `/skills`) listet dir alle geladenen Agenten-Skills auf?

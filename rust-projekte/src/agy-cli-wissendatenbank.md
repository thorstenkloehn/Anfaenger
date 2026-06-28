# 🚀 Antigravity CLI (`agy`) – Projekt Wissendatenbank

*Wie du dem AGY-Agenten ein Langzeitgedächtnis gibst, Projektregeln durchsetzt und ihm eigene Fähigkeiten (Skills) beibringst.*

---

## 🧠 Theorie: "Alle wissen" – Das Gedächtnis aufbauen

Wenn du mit einem Agenten arbeitest, möchtest du ihm nicht jeden Tag aufs Neue erklären müssen, wie dein Projekt funktioniert. AGY löst das "Alle wissen"-Problem elegant durch ein modulares System aus **Regeln (Rules)** und **Fähigkeiten (Skills)**. 

Dieses Wissen bildet deine "Wissendatenbank" und kann auf zwei Ebenen angelegt werden:
* **Globales Wissen:** Gilt für *alle* deine Projekte (gespeichert unter `~/.gemini/config/`).
* **Projekt-Wissen:** Gilt *nur* für das aktuell geöffnete Projekt (gespeichert im versteckten Ordner `.agents/` in deinem Workspace).

Sobald du dieses Wissen aufbaust, liest AGY es beim Start automatisch ein. Der Agent agiert dann nicht mehr wie ein ahnungsloser Anfänger, sondern wie ein erfahrener Senior-Entwickler, der die internen Firmenrichtlinien auswendig kennt.

## ⚙️ Einstellungen & Setup

Die Wissendatenbank steuerst du hauptsächlich über spezielle Ordnerstrukturen und Markdown-Dateien:
* **`AGENTS.md`:** Hier trägst du allgemeine Projektregeln, Programmierrichtlinien und Architektur-Entscheidungen ein.
* **Der Ordner `skills/`:** Hier legst du Unterordner an (z.B. `skills/mein-skill/`), in denen sich jeweils zwingend eine Datei namens `SKILL.md` befindet. Diese definiert komplexe, spezialisierte Workflows, die der Agent lernen soll.
* **Workspace-Vertrauen:** AGY arbeitet nur in freigegebenen Verzeichnissen. Um externe Ordner in die Wissendatenbank aufzunehmen, kannst du den Slash-Befehl `/add-dir` nutzen oder die Liste `trustedWorkspaces` in der TUI-Konfiguration (`/config`) anpassen.

---

## 🛠️ Praxis-Übungen: Wissendatenbank aufbauen (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Konfigurations-Codes zum einfachen Kopieren! Erarbeite dir die Struktur selbst, nutze die CLI-Hilfe (`/help`) und teste interaktiv, wie der Agent auf deine neuen Regeln reagiert.

### 🧭 Steuerung der Projektregeln

#### Übung 1: Die AGENTS.md anlegen
* **Aufgabe:** Erstelle in deinem Rust-Projekt einen Ordner `.agents/` und darin eine Datei `AGENTS.md`. Schreibe eine strikte Regel auf Deutsch hinein (z.B. "Der Agent darf niemals `unwrap()` in Rust verwenden, sondern muss Fehler immer mit `match` oder `?` behandeln").
* **Hinweis:** Starte die AGY-CLI nach dem Speichern neu. Frage den Agenten: "Wie gehst du in diesem Projekt mit Errors um?" Beachtet er deine neue Regel?

#### Übung 2: Globale vs. Lokale Regeln
* **Aufgabe:** Lege eine *globale* Regel an (im Verzeichnis `~/.gemini/config/AGENTS.md`), die besagt, dass der Agent dich immer mit einem speziellen Spitznamen anreden soll. Prüfe, ob die Regel auch in deinem lokalen Rust-Projekt greift.
* **Hinweis:** Was passiert, wenn sich eine lokale Projekt-Regel und eine globale Regel inhaltlich widersprechen? Probier es aus!

#### Übung 3: Projekt-Kontext permanent erweitern
* **Aufgabe:** Dein Rust-Projekt nutzt Quellcode aus einem zweiten lokalen Verzeichnis (z.B. eine geteilte Bibliothek in `../shared_lib/`). Wie zwingst du AGY dazu, dieses externe Verzeichnis permanent in sein Gedächtnis aufzunehmen?
* **Hinweis:** Teste den CLI-Befehl `/add-dir`. Überprüfe danach mit `/context`, ob die Dateien erfasst wurden.

### 🛡️ Skills beibringen (Eigene Fähigkeiten)

#### Übung 4: Einen einfachen Skill anlegen
* **Aufgabe:** Bringe AGY bei, wie er einen perfekten "Rust Release Build" macht. Erstelle dafür die Ordnerstruktur `.agents/skills/rust-release/` und lege darin eine Datei `SKILL.md` an.
* **Hinweis:** Die `SKILL.md` braucht zwingend einen YAML-Kopf (Frontmatter) mit den Feldern `name` und `description`. Darunter schreibst du im normalen Markdown die exakten Schritte auf, die AGY ausführen soll (z.B. Linter laufen lassen, Tests ausführen, `--release` Flag setzen).

#### Übung 5: Skills aktivieren und prüfen
* **Aufgabe:** Wie findest du in der laufenden AGY-CLI heraus, ob dein neu angelegter "rust-release" Skill erfolgreich vom System erkannt und geladen wurde?
* **Hinweis:** Welcher Slash-Befehl (z.B. `/skills`) listet dir alle dem Agenten bekannten Fähigkeiten auf?

#### Übung 6: Skills auslösen (Triggern)
* **Aufgabe:** Löse deinen neuen Skill aus, ohne den exakten Namen des Skills zu tippen.
* **Hinweis:** Nutze natürliche Sprache im Chat (z.B. "Mach das Projekt bitte bereit für die Produktion"). AGY gleicht deine Worte mit der `description` deines Skills ab. Wurde dein Workflow korrekt ausgelöst?

### 🔄 Komplexe Wissens-Workflows

#### Übung 7: Skill mit Hilfs-Skripten erweitern
* **Aufgabe:** Ein Skill soll nicht nur Text lesen, sondern ein komplexes lokales Hilfs-Skript ausführen. Erstelle neben deiner `SKILL.md` einen Unterordner `scripts/` und lege dort ein einfaches Bash-Skript ab.
* **Hinweis:** Wie instruierst du den Agenten in der `SKILL.md` so, dass er versteht, dass er das Skript aus dem `scripts/`-Ordner relativ zum Skill-Verzeichnis aufrufen darf?

#### Übung 8: Skill-Referenzdokumentation
* **Aufgabe:** Du willst AGY beibringen, ein völlig neues Framework zu nutzen, dessen Dokumentation hunderte Seiten umfasst. 
* **Hinweis:** Packe extrem lange Texte nicht direkt in die `SKILL.md` (diese sollte kurz und prägnant bleiben). Erstelle stattdessen einen Ordner `.agents/skills/framework/references/` und speichere die Doku dort. Wie formulierst du den Prompt in der `SKILL.md`, damit AGY bei Bedarf in diesen Referenzen liest?

#### Übung 9: Wissens-Check vor großen Aufgaben
* **Aufgabe:** Bevor AGY ein großes Refactoring beginnt, soll er dir beweisen, dass er alle Projektregeln aus der `AGENTS.md` gelesen und den neu gelernten Skill verstanden hat.
* **Hinweis:** Formuliere einen Prompt: "Erstelle erst einen Plan. Liste im Plan auf, welche spezifischen Projektregeln du anwenden wirst und welchen Skill du dafür triggerst, bevor du Code änderst."

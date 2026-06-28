# 🐚 Claude Code – Projekt Wissendatenbank

*Wie du Claude Code ein Langzeitgedächtnis verpasst und ihm spezifische Projektrichtlinien beibringst.*

---

## 🧠 Theorie: "Alle wissen" – Das Memory-System

Ein interaktiver Agent wie Claude Code startet im Standard oft mit einer leeren Tafel. Wenn du an einem komplexen Rust-Projekt arbeitest, muss der Agent jedoch "alles wissen", was deine spezifischen Richtlinien angeht. Das erreichst du durch zwei Mechanismen:

* **Das Agent Memory (Gedächtnis):** Claude Code kann sich Dinge über Sessions hinweg merken. Er extrahiert selbstständig (oder auf deinen expliziten Befehl) wichtige Fakten aus euren Gesprächen und speichert sie lokal ab.
* **Kontext-Dateien (`CONTEXT.md`):** Für harte, in Stein gemeißelte Regeln (z.B. "Verwende immer das Crate `tokio` für asynchronen Code") ist es oft sicherer, eine statische Datei zu pflegen, die Claude bei jedem Start als Basis-Wissen lesen muss.

## ⚙️ Einstellungen & Setup

Um das Wissen in Claude Code zu steuern, brauchst du keine komplizierten Menüs. Du nutzt deine Sprache und einfache Dateisystem-Konventionen:
* **Memory steuern:** Du kannst Claude im Chat direkt anweisen, sich etwas zu merken ("Remember that...") oder etwas zu vergessen ("Forget that...").
* **Basis-Prompts:** Über CLI-Argumente beim Start (z.B. Übergabe einer Datei) kannst du erzwingen, dass Claude deine `CONTEXT.md` sofort beim Booten verinnerlicht.
* **Global vs. Lokal:** Das Tool verwaltet oft lokales Wissen (nur für den aktuellen Projektordner) und globales Wissen (in den Benutzer-Einstellungen deines Betriebssystems).

---

## 🛠️ Praxis-Übungen: Wissendatenbank aufbauen (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Skripte oder Lösungswege zum Abschreiben! Nutze die CLI, rede mit Claude und erarbeite dir das System selbst.

### 🧭 Steuerung des Agent Memory

#### Übung 1: Fakten einprägen
* **Aufgabe:** Bringe Claude in der aktuellen Session bei, dass dein Projekt in "Rust Edition 2021" geschrieben ist und Variablen-Namen zwingend auf Deutsch sein müssen.
* **Hinweis:** Schreibe einen klaren Prompt (z.B. "Ich möchte, dass du dir für die Zukunft folgendes fest merkst..."). Frage ihn danach, ob er es sicher gespeichert hat.

#### Übung 2: Wissen über Sessions hinweg testen
* **Aufgabe:** Beende die aktuelle Sitzung mit `/exit` oder `Ctrl+C`. Starte Claude Code neu. Prüfe, ob er sich noch an die Regeln aus Übung 1 erinnert.
* **Hinweis:** Ein einfacher Test-Prompt: "Was sind die grundlegenden Namenskonventionen für dieses Projekt, die wir gestern besprochen haben?"

#### Übung 3: Falsches Wissen löschen
* **Aufgabe:** Du hast deine Meinung geändert. Du willst ab sofort englische Variablen-Namen. Zwinge Claude dazu, die alte Regel aus seinem Gedächtnis vollständig zu löschen.
* **Hinweis:** Nutze direkte, strikte Anweisungen wie "Bitte lösche/vergiss die alte Regel bezüglich...". Kontrolliere danach erneut sein abrufbares Gedächtnis.

### 🛡️ Feste Kontext-Dateien (Die robuste Variante)

#### Übung 4: Eine `CONTEXT.md` anlegen
* **Aufgabe:** Erstelle eine Datei namens `CONTEXT.md` in deinem Projekt-Root. Definiere darin 3 harte Architektur-Regeln für dein Rust-Projekt.
* **Hinweis:** Halte die Sätze kurz und prägnant (z.B. "1. Kein Einsatz von `unsafe` Rust. 2. Immer `clippy` Warnungen beheben.").

#### Übung 5: Kontext-Datei beim Start übergeben
* **Aufgabe:** Wie startest du die Claude CLI so im Terminal, dass der Agent gezwungen wird, deine `CONTEXT.md` zu lesen, bevor du deine erste Frage stellst?
* **Hinweis:** Schau dir die Startparameter (`claude --help`) an. Kannst du eine Datei anhängen? (Alternativ über eine Bash-Pipe: `cat CONTEXT.md | claude ...`).

#### Übung 6: Die Projekt-ReadMe nutzen
* **Aufgabe:** Sehr oft nutzt Claude von sich aus die `README.md` eines Projekts, um sich initial zu orientieren. Teste, ob Claude eine neu angelegte `README.md` beim Start selbstständig scannt.
* **Hinweis:** Schreibe ein fiktives "Projekt-Geheimnis" in die ReadMe. Frage Claude direkt nach dem Start danach, ohne ihn explizit auf die Datei hinzuweisen.

### 🔄 Komplexe Wissens-Workflows

#### Übung 7: Memory Limitierung & Pruning
* **Aufgabe:** Was passiert, wenn Claude's Langzeitgedächtnis über Monate hinweg mit hunderten irrelevanten Fakten vollgestopft wird? Finde heraus, wie du das Gedächtnis aufräumst ("pruning").
* **Hinweis:** Frage Claude selbst: "Wie organisierst du intern dein Memory und wie kann ich es überprüfen oder komplett zurücksetzen?"

#### Übung 8: Globale Entwickler-Vorlieben
* **Aufgabe:** Du möchtest, dass Claude dich in *jedem* Projekt auf deinem Computer daran erinnert, falls du den Rust-Formatierungs-Standard (`rustfmt`) verletzt.
* **Hinweis:** Wie bringst du Claude dazu, sich etwas projektunabhängig (also global für deinen Nutzer) zu merken? Recherchiere, ob es ein globales Einstellungsverzeichnis für Claude Code gibt.

#### Übung 9: Wissens-Check beim Refactoring
* **Aufgabe:** Du hast deine `CONTEXT.md` mit strikten Performance-Regeln definiert. Lass Claude einen langsamen Block Code neu schreiben und fordere ihn auf, die Schritte exakt an deinen Regeln auszurichten.
* **Hinweis:** Formuliere den Prompt so: "Refactore diese Datei und verweise in deiner Erklärung explizit auf die Regeln aus der `CONTEXT.md`, die du angewendet hast."

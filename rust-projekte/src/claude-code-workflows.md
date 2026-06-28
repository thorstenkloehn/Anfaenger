# 🐚 Claude Code – Workflows & Steuerung

*Wie du den KI-Agenten im Terminal effektiv lenkst, den Kontext verwaltest und Einstellungen optimierst.*

---

## 🧠 Theorie: "Alles wissen" – Das Kontext-Management

Damit Claude Code dir optimal helfen kann, muss der Agent "alles wissen" – also den richtigen Kontext deines Projekts verstehen. 
Anders als bei klassischem Chat musst du hier nicht mühsam Code kopieren. Claude Code kann selbst Dateien lesen, aber **du** bist der Pilot!

* **Steuerung ist der Schlüssel:** Ein KI-Agent ist nur so gut wie die Anweisungen, die du ihm gibst. Ohne klare Richtung verläuft er sich in deinem Projekt.
* **Kontext-Fenster:** Auch wenn Claude viel lesen kann, ist der Speicherplatz (Kontext) begrenzt. Du musst lernen, wie du Claude dazu bringst, nur die *richtigen* Dateien zu betrachten.
* **Kompaktierung:** Lerne, wann und wie du den Chat-Verlauf aufräumst, um Token zu sparen und Verwirrung bei längeren Sessions zu vermeiden.

## ⚙️ Einstellungen & Setup

Die Standard-Einstellungen von Claude Code sind oft auf Sicherheit getrimmt. Du kannst (und solltest) das Verhalten anpassen:
* Welche Befehle darf der Agent automatisch ausführen? (Lese- vs. Schreibrechte)
* Wie viel Token/Budget darf er pro Session ausgeben?
* Wie nutzt man Ignorier-Regeln, um sensible oder irrelevante Daten zu schützen?

---

## 🚀 Praxis-Übungen: Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Lösungs-Codes! Finde die Antworten selbst heraus, indem du die CLI nutzt, in der Dokumentation nachliest oder durch Experimentieren lernst.

### 🧭 Steuerung & Navigation

#### Übung 1: Den aktuellen Kontext prüfen
* **Aufgabe:** Wie findest du heraus, welche Dateien Claude in der aktuellen Session bereits "gelesen" hat und im Kontext hält?
* **Hinweis:** Welche Slash-Befehle (beginnend mit `/`) gibt es in Claude Code, die den aktuellen Status oder den Kontext-Verbrauch anzeigen?

#### Übung 2: Gezieltes Einlesen
* **Aufgabe:** Du willst, dass Claude sich *ausschließlich* die Datei `src/main.rs` ansieht, ohne den Rest des Projekts zu scannen. Wie lautet dein genauer Prompt an den Agenten?
* **Hinweis:** Formuliere eine klare Anweisung im Chat, die den genauen Dateinamen enthält und explizit verbietet, andere Verzeichnisse zu durchsuchen.

#### Übung 3: Der `/compact` Workflow
* **Aufgabe:** Dein Chat mit Claude ist sehr lang geworden. Der Agent wird langsam und teuer. Wie startest du den Verlauf neu, behältst aber die wichtigsten Zusammenfassungen der bisherigen Arbeit?
* **Hinweis:** Finde heraus, was der Befehl `/compact` genau macht und probiere ihn in einer langen Session aus.

### 🛡️ Einstellungen & Sicherheit

#### Übung 4: Auto-Approve für Lese-Rechte
* **Aufgabe:** Claude fragt dich jedes Mal, wenn er eine Datei lesen will. Das stört den Flow. Wie stellst du ein, dass *Lesezugriffe* (Read-Only) auf dein Projekt immer automatisch erlaubt sind?
* **Hinweis:** Erkunde die Einstellungen über den Befehl `/config`. Welche Berechtigungsstufen (Permissions) gibt es für Datei-Leseoperationen?

#### Übung 5: Verbotene Zonen (`.claudeignore`)
* **Aufgabe:** Dein Projekt enthält einen Ordner `geheim/` mit privaten Passwörtern. Claude darf diesen niemals scannen. Wie richtest du das ein?
* **Hinweis:** Funktioniert eine Datei namens `.claudeignore` ähnlich wie eine `.gitignore`? Leg sie an und teste das Verhalten!

#### Übung 6: Kostenlimit setzen
* **Aufgabe:** Du möchtest sicherstellen, dass Claude in deiner aktuellen Session nicht mehr als ein festes Limit an Budget verbraucht. Wie erzwingst du das?
* **Hinweis:** Schau dir die Optionen an, die du direkt beim Start des Programms (`claude --help`) mitgeben kannst. 

### 🔄 Komplexe Workflows

#### Übung 7: Der Planungs-Modus
* **Aufgabe:** Bevor Claude deinen Code ändert, soll er dir erst einen Schritt-für-Schritt-Plan aufschreiben, den du absegnen kannst. Wie zwingst du ihn, nicht sofort loszucoden?
* **Hinweis:** Wie formulierst du deinen ersten Prompt? (Beispiel: "Schreibe noch keinen Code. Erstelle zuerst einen Plan...")

#### Übung 8: Fehlersuche (Debugging) Workflow
* **Aufgabe:** Dein Rust-Programm bricht mit einem "Panic" ab. Wie sieht der perfekte Workflow aus, um Claude den Fehler finden zu lassen?
* **Hinweis:** Lässt du Claude den Befehl `cargo run` selbst ausführen und den Output im Terminal lesen? Oder kopierst du die Fehlermeldung manuell in den Chat? Vergleiche beide Ansätze!

#### Übung 9: Iteratives Feedback (Code Review)
* **Aufgabe:** Du hast eine Funktion geschrieben und möchtest konstruktives Feedback. Wie bittest du Claude Code, ein "Code Review" zu machen und *nur* Tipps als Text auszugeben, anstatt die Datei direkt eigenmächtig umzuschreiben?
* **Hinweis:** Nutze stringente Einschränkungen in deinem Prompt ("Bearbeite die Datei nicht, gib mir nur 3 Hinweise, wie ich es besser machen kann").

# 🐙 GitHub Copilot in VS Code – Workflows & Steuerung

*Wie du Copilot im Editor richtig anleitest, den Kontext steuerst und die Einstellungen optimierst.*

---

## 🧠 Theorie: "Alle wissen" – Den Kontext steuern

Anders als vollautonome Agenten agiert GitHub Copilot stark innerhalb des Editors (VS Code). Damit er "alles weiß", musst du verstehen, wie er sich seinen Kontext zusammenbaut:

* **Geöffnete Tabs:** Copilot liest standardmäßig die Dateien mit, die in deinem Editor gerade als Tabs geöffnet sind.
* **Das Chat-Fenster vs. Inline:** Im Seitenleisten-Chat (`Ctrl+Shift+I`) kannst du das gesamte Projekt befragen. Beim Inline-Chat (`Ctrl+I`) konzentriert sich Copilot auf den markierten Code-Block.
* **Mentions nutzen:** Mit dem Befehl `@workspace` sagst du dem Copilot-Chat, dass er das ganze Projekt durchsuchen soll. Mit `#file` kannst du gezielt einzelne Dateien in den Kontext laden.

## ⚙️ Einstellungen & Setup

In VS Code kannst du Copilot über die normalen Settings (`Ctrl+,`) an deine Bedürfnisse anpassen:
* **Copilot Edits:** Du kannst erlauben, dass Copilot Änderungen über mehrere Dateien hinweg vorschlägt (in den neuen VS Code Versionen).
* **Ausschließen von Dateien:** Über die Einstellungen kannst du festlegen, welche Dateien oder Ordner Copilot *niemals* lesen darf, um sensible Daten zu schützen.
* **Inline-Vorschläge:** Du kannst konfigurieren, ob Vorschläge sofort beim Tippen erscheinen sollen oder erst, wenn du eine bestimmte Taste drückst.

---

## 🛠️ Praxis-Übungen: Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Es gibt hier keine fertigen Code-Schnipsel zum Abschreiben! Lerne, indem du die Shortcuts selbst in VS Code ausprobierst und die Chat-Funktionen testest.

### 🧭 Steuerung & Kontext ("Alle wissen")

#### Übung 1: Gezielter Datei-Kontext
* **Aufgabe:** Du hast einen Fehler in `src/main.rs`, aber die Definition der Funktion liegt in `src/utils.rs`. Wie zwingst du Copilot im Chat dazu, beide Dateien für seine Antwort zu berücksichtigen?
* **Hinweis:** Probiere im Copilot Chat das Symbol `#` aus (z.B. `#file`). Wie fügst du eine Datei zum Chat hinzu?

#### Übung 2: Das gesamte Projekt befragen
* **Aufgabe:** Du möchtest wissen, wo im gesamten Rust-Projekt eine bestimmte Funktion aufgerufen wird.
* **Hinweis:** Nutze den `@workspace` Befehl im Seitenleisten-Chat. Wie formulierst du die Frage am besten?

#### Übung 3: Geöffnete Tabs als Kontext
* **Aufgabe:** Schließe alle Tabs in VS Code außer `src/main.rs` und stelle Copilot eine Frage zu einer anderen Datei im Projekt. Öffne danach die andere Datei in einem Tab und stelle die Frage noch einmal.
* **Hinweis:** Beobachte, wie sich die Qualität der Antwort verändert. Was sagt uns das über die Arbeitsweise von Copilot?

### 🛡️ Einstellungen & Sicherheit

#### Übung 4: Geheime Dateien ignorieren
* **Aufgabe:** Dein Projekt enthält eine Datei `.env` mit Passwörtern. Wie verhinderst du in VS Code, dass Copilot diese Datei liest oder Vorschläge daraus generiert?
* **Hinweis:** Suche in den VS Code Einstellungen nach Begriffen wie "Copilot Ignore" oder prüfe, wie Copilot standardmäßig mit `.gitignore`-Dateien umgeht.

#### Übung 5: Inline-Vorschläge pausieren
* **Aufgabe:** Du möchtest eine Weile ungestört programmieren, ohne dass ständig grauer Text (Ghost Text) aufpoppt. Wie schaltest du Copilot temporär stumm?
* **Hinweis:** Klicke unten rechts in der VS Code Statusleiste auf das kleine Copilot-Icon. Welche Optionen gibt es dort?

### 🔄 Komplexe Workflows

#### Übung 6: Der Inline-Chat (`Ctrl+I`)
* **Aufgabe:** Markiere eine Funktion, die du geschrieben hast. Öffne den Inline-Chat mit `Ctrl+I` und fordere Copilot auf: "Mache diesen Code lesbarer".
* **Hinweis:** Akzeptiere die Änderung nicht sofort! Wie kannst du dir in VS Code den Unterschied (Diff) zwischen deinem und Copilots Code anzeigen lassen, bevor du zustimmst?

#### Übung 7: Commit-Nachrichten generieren
* **Aufgabe:** Du hast einige Änderungen gemacht. Lass Copilot die Git-Commit-Nachricht für dich schreiben.
* **Hinweis:** Wechsel in VS Code in den "Quellcodeverwaltung" (Source Control) Tab. Welches kleine Sternchen-Icon hilft dir hier weiter?

#### Übung 8: Code erklären lassen (`/explain`)
* **Aufgabe:** Finde im Internet ein komplexes Rust-Snippet (z.B. mit Lebenszeiten/Lifetimes), kopiere es in deinen Editor und lass es dir von Copilot erklären.
* **Hinweis:** Markiere den Code und nutze den eingebauten Slash-Befehl `/explain` im Chat.

#### Übung 9: Tests generieren (`/tests`)
* **Aufgabe:** Schreibe eine kleine Funktion, die zwei Zahlen addiert. Lass Copilot automatisch einen passenden Unit-Test dafür schreiben.
* **Hinweis:** Markiere die Funktion und nutze den `/tests` Befehl im Inline-Chat. Wo schlägt Copilot vor, den Test-Code zu platzieren?

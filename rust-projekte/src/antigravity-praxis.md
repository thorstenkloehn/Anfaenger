# 🤖 Antigravity Praxis-Projekte: 50 Schritte zum KI-gestützten Entwickler

*Stand: 2026 – Modern, praxisnah, Schritt für Schritt.*

---

Willkommen in der Welt des kollaborativen Lernens mit KI. Dieses Kapitel ist kein gewöhnliches Tutorial. Es ist eine **Reise** – von deinem ersten `agy`-Befehl im Terminal bis hin zu einem vollständig personalisierten KI-Agenten, der genau weiß, wie er dir beim Rust-Lernen helfen soll.

Wir arbeiten hier immer **gemeinsam**: Du und Antigravity als Lernpartner auf Augenhöhe. Der Agent schreibt deinen Code nicht für dich – er stellt dir die richtigen Fragen, damit du selbst zur Lösung findest.

> 🦀 **Prinzip dieser Projekte:** Wir lernen nicht *über* KI – wir lernen *mit* KI. Der Unterschied ist riesig.

---

## 🗺️ Übersicht: Die 6 Lerngruppen

| Gruppe | Projekte | Thema |
|--------|----------|-------|
| 🖥️ Gruppe 1 | 1 – 10 | Antigravity CLI – Die Kommandozeile |
| 📋 Gruppe 2 | 11 – 20 | AGENTS.md – Den Agenten formen |
| 🔧 Gruppe 3 | 21 – 30 | Skills – Den Agenten erweitern |
| 🖼️ Gruppe 4 | 31 – 40 | Antigravity 2.0 – Die Desktop-App |
| 💻 Gruppe 5 | 41 – 45 | Antigravity IDE – KI im Editor |
| 🚀 Gruppe 6 | 46 – 50 | Alles zusammen – Der vollständige Workflow |

---

# 🖥️ Gruppe 1: Antigravity CLI – Die Kommandozeile

Die CLI (Command Line Interface) ist das Herzstück von Antigravity. Hier lernen wir, direkt und schnell mit dem Agenten zu kommunizieren – ohne grafische Oberfläche, ohne Ablenkung. Nur du, das Terminal und ein KI-Agent.

---

## 🖥️ Projekt 1: Der erste Start – `agy` und was dann passiert

**Was wir bauen:** Unsere allererste Sitzung mit Antigravity CLI.

### Schritt 1: Das Terminal öffnen und `agy` starten

```bash
agy
```

**Zeilenweise Dekonstruktion:**

- `agy` ist der Name des Programms – kurz für **Antigravity**. Wir tippen es ins Terminal und drücken `Enter`.
- Beim ersten Start öffnet sich ein **Browser-Fenster** für die Authentifizierung. Wir melden uns mit unserem Google-Konto an.
- Nach der Anmeldung erscheint im Terminal ein **Code**. Diesen kopieren wir und fügen ihn ins Terminal ein.
- Dann erscheint der Prompt: `>` – der Agent wartet auf unsere Eingabe.

### Schritt 2: Die erste Frage stellen

```
> Was ist Rust und warum sollte ich es lernen?
```

Der Agent antwortet sofort. Wichtig: **Er liest unsere `AGENTS.md`**, falls vorhanden. Da wir noch keine haben, antwortet er allgemein.

### Schritt 3: Die Antwort bewusst lesen

Lies die Antwort langsam durch. Beachte:
- Erklärt der Agent zu technisch oder zu einfach?
- Fehlen dir Informationen?
- Stellst du dir neue Fragen?

> 🔍 **Nachdenk-Aufgabe:** Was würde sich ändern, wenn wir dem Agenten vorher sagen, dass wir Anfänger sind? Das lernen wir in Projekt 11.

**Vorschau:** In Projekt 2 erkunden wir die Slash-Befehle – die geheimen Superkräfte der CLI.

---

## 🖥️ Projekt 2: Slash-Befehle – Die Superkräfte des Terminals

**Was wir bauen:** Ein Verständnis für die wichtigsten Slash-Befehle.

### Schritt 1: `/help` aufrufen

```
> /help
```

**Zeilenweise Dekonstruktion:**

- Das `/` am Anfang signalisiert: Das ist **kein Satz an den Agenten**, sondern ein **Befehl an die CLI selbst**.
- `help` zeigt uns alle verfügbaren Befehle mit Kurzbeschreibungen an.
- Wir sehen eine lange Liste – das ist gut! Jeder dieser Befehle ist ein Werkzeug.

### Schritt 2: `/context` aufrufen

```
> /context
```

**Was passiert:** Der Agent zeigt uns, welche Dateien und Informationen er gerade „sieht". Denke dir das wie seinen **Arbeitstisch** vor – alles, was dort liegt, beeinflusst seine Antworten.

**Zeilenweise Dekonstruktion:**

- Ohne `AGENTS.md` ist der Kontext meist leer oder enthält nur die aktuelle Konversation.
- Mit `AGENTS.md` sehen wir alle geladenen Regeln und Projektinformationen.
- Der Kontext ist wie das **Kurzzeitgedächtnis** des Agenten.

### Schritt 3: `/skills` aufrufen

```
> /skills
```

Skills sind vorgefertigte Fähigkeiten des Agenten. Wir sehen hier, welche aktiv sind. In Gruppe 3 bauen wir unsere eigenen.

> 🔍 **Nachdenk-Aufgabe:** Welche der angezeigten Befehle klingen für dein Rust-Lernen besonders nützlich?

**Vorschau:** In Projekt 3 lernen wir, wie wir Konversationen mit `/fork` verwalten – perfekt, wenn wir mehrere Rust-Themen gleichzeitig erkunden.

---

## 🖥️ Projekt 3: Konversationen verwalten – `/fork`, `/resume`, `/clear`

**Was wir bauen:** Einen strukturierten Umgang mit langen Gesprächen.

### Schritt 1: Eine Konversation starten und benennen

```
> Erkläre mir das Ownership-Modell in Rust.
> /rename rust-ownership-grundlagen
```

**Zeilenweise Dekonstruktion:**

- `/rename` gibt unserer Konversation einen **Namen**. Statt einer langen ID sehen wir: `rust-ownership-grundlagen`.
- Das ist wie ein **Ordner im Aktenschrank** – wir können später genau hierher zurückkehren.

### Schritt 2: Eine Konversation forken

```
> /fork
```

**Was passiert:** Eine exakte **Kopie** unserer Konversation entsteht, aber als neuer Thread. Der gesamte Verlauf bleibt erhalten.

**Analogie:** Stell dir vor, du hast ein Gespräch mit einem Freund. Mit `/fork` öffnest du ein **paralleles Universum** dieses Gesprächs – du kannst in eine andere Richtung fragen, ohne das Original zu verlieren.

**Zeilenweise Dekonstruktion:**

- `fork` kommt aus der Programmierung: Wie ein Gabelung in einem Fluss – zwei Wege aus einem Punkt.
- Wir können nun im geforkten Thread tiefer in ein Thema eintauchen.
- Der Original-Thread bleibt unberührt.

### Schritt 3: Zur alten Konversation zurückkehren

```
> /resume rust-ownership-grundlagen
```

**Zeilenweise Dekonstruktion:**

- `/resume` gefolgt vom **Namen** der Konversation bringt uns zurück.
- Alternativ: `/switch` hat dieselbe Funktion.
- Wir können auch `/conversation` tippen, um eine Liste aller gespeicherten Konversationen zu sehen.

### Schritt 4: Aufräumen mit `/clear`

```
> /clear
```

**Was passiert:** Der Terminal-Bildschirm wird geleert. Die Konversation ist aber noch gespeichert – wir können jederzeit mit `/resume` zurückkehren.

> 🔍 **Nachdenk-Aufgabe:** Welche Rust-Themen würdest du in separaten Konversationen verwalten? Mach eine Liste.

**Vorschau:** In Projekt 4 wechseln wir das KI-Modell – denn verschiedene Modelle haben verschiedene Stärken.

---

## 🖥️ Projekt 4: Das richtige Modell wählen – `/model`

**Was wir bauen:** Ein Verständnis dafür, dass nicht alle KI-Modelle gleich sind.

### Schritt 1: Das aktuelle Modell anzeigen

```
> /model
```

**Was wir sehen:** Eine Liste verfügbarer Modelle. Das aktuell aktive ist markiert.

**Zeilenweise Dekonstruktion:**

- Modelle wie `gemini-flash` sind **schnell** – ideal für kurze Fragen.
- Leistungsfähigere Modelle denken **tiefer** – besser für komplexe Rust-Konzepte wie Lifetimes.
- Das Modell ist wie der **Experte**, den wir befragen: Ein Auszubildender antwortet schnell, ein Senior-Entwickler antwortet durchdachter.

### Schritt 2: Das Modell wechseln

```
> /model gemini-2.5-pro
```

**Was passiert:** Ab der nächsten Antwort nutzt der Agent das neue Modell.

### Schritt 3: Denselben Frage vergleichen

Stelle nun dieselbe Rust-Frage wie in Projekt 1 nochmals. Vergleiche:
- Ist die Antwort länger oder kürzer?
- Mehr Details oder mehr Übersicht?
- Welches Modell passt besser zu deinem Lernstil?

> 🔍 **Nachdenk-Aufgabe:** Wann würdest du ein schnelles Modell bevorzugen, wann ein leistungsfähiges?

**Vorschau:** In Projekt 5 lernen wir, den Token-Verbrauch zu verstehen – denn Tokens sind die „Währung" der KI-Kommunikation.

---

## 🖥️ Projekt 5: Token-Verbrauch verstehen – `/usage`

**Was wir bauen:** Ein Gespür für den Ressourcenverbrauch unserer KI-Interaktionen.

### Schritt 1: Usage anzeigen

```
> /usage
```

**Was wir sehen:** Eine Statistik über verwendete Tokens in dieser Sitzung.

**Zeilenweise Dekonstruktion:**

- **Token:** Nicht ganz ein Wort, nicht ganz ein Buchstabe – ein Token ist ein **Textstück**, ca. 4 Zeichen lang. „Rust" = 1 Token. „fn main() {" = 4 Tokens.
- **Input-Tokens:** Was wir an den Agenten schicken (unsere Fragen + Kontext).
- **Output-Tokens:** Was der Agent zurückschickt (seine Antworten).
- **Gesamtkosten** (falls sichtbar): Tokens kosten Ressourcen – je länger unsere Konversation, desto mehr.

### Schritt 2: Kontext bewusst klein halten

Je mehr Dateien und Text in unserer `AGENTS.md` stehen, desto mehr Input-Tokens verbrauchen wir bei jeder Frage.

**Analogie:** Stell dir vor, du schreibst jeden Tag einen Brief an einen Freund. Aber am Anfang jedes Briefes kopierst du immer den gesamten vorherigen Briefwechsel. Das wird schnell sehr lang!

### Schritt 3: Effizienz üben

Starte eine neue Konversation mit `/clear` und stelle eine **präzise, kurze Frage**. Vergleiche den Token-Verbrauch mit einer langen, umständlichen Frage.

> 🔍 **Nachdenk-Aufgabe:** Wie formulierst du eine Frage so kurz wie möglich, aber so klar wie nötig?

**Vorschau:** In Projekt 6 schauen wir uns `/diff` an – damit sehen wir, was der Agent an unserem Code verändert hat.

---

## 🖥️ Projekt 6: Änderungen nachverfolgen – `/diff`

**Was wir bauen:** Einen Überblick über alle Dateiänderungen, die der Agent gemacht hat.

### Schritt 1: Den Agenten eine Datei erstellen lassen

```
> Erstelle eine neue Datei namens "notizen.md" mit drei Stichpunkten über Rust-Ownership.
```

### Schritt 2: Die Änderungen anzeigen

```
> /diff
```

**Was wir sehen:** Eine **Diff-Ansicht** – grüne Zeilen wurden hinzugefügt, rote wurden entfernt.

**Zeilenweise Dekonstruktion:**

```diff
+ # Rust Ownership – Meine Notizen
+ 
+ - Jeder Wert hat genau einen Besitzer (Owner)
+ - Wird der Owner ungültig, wird der Wert gelöscht
+ - Nur ein Besitzer gleichzeitig – Weitergabe heißt „Move"
```

- `+` am Zeilenanfang: Diese Zeile wurde **hinzugefügt**.
- `-` am Zeilenanfang: Diese Zeile wurde **entfernt** (hier noch keine).
- Keine Markierung: Diese Zeile ist **unverändert**.

### Schritt 3: Änderungen verstehen und bewusst akzeptieren

Bevor wir den Agenten etwas ändern lassen, sollten wir immer mit `/diff` prüfen, was er getan hat. Das ist kein Misstrauen – es ist **professionelle Praxis**.

> 🔍 **Nachdenk-Aufgabe:** Warum ist es wichtig, Änderungen des Agenten zu überprüfen, auch wenn wir ihm vertrauen?

**Vorschau:** In Projekt 7 lernen wir `/rewind` – den „Undo"-Knopf für alles.

---

## 🖥️ Projekt 7: Fehler rückgängig machen – `/rewind`

**Was wir bauen:** Sicherheit im Umgang mit dem Agenten – wir können immer zurück.

### Schritt 1: Den Agenten etwas tun lassen

```
> Füge in notizen.md noch einen vierten Stichpunkt über Borrowing hinzu.
```

### Schritt 2: Merken, dass wir es rückgängig machen wollen

Vielleicht hat der Agent etwas falsch formuliert. Oder wir wollen eine andere Erklärung. Kein Problem:

```
> /rewind
```

**Was passiert:** Der Agent macht seinen **letzten Schritt rückgängig**. Die Datei sieht wieder aus wie vorher.

**Zeilenweise Dekonstruktion:**

- `/rewind` ist wie `Ctrl+Z` – aber für alles, was der Agent getan hat.
- Alternativ: `/undo` hat dieselbe Funktion.
- Wir können `/rewind` mehrfach aufrufen, um mehrere Schritte zurückzugehen.

**Analogie:** Denke dir den Agenten als einen Freund, der dir beim Aufräumen hilft. Wenn er etwas an die falsche Stelle räumt, rufst du „Nein, warte" – und er stellt es zurück.

### Schritt 3: Einen präziseren Befehl geben

Nach dem Rewind formulieren wir unsere Anweisung genauer:

```
> Füge in notizen.md einen vierten Stichpunkt hinzu. Er soll erklären, 
  dass Borrowing bedeutet, einen Wert zu leihen ohne ihn zu besitzen.
  Formuliere es in einem einzigen kurzen deutschen Satz.
```

> 🔍 **Nachdenk-Aufgabe:** Was macht eine gute Anweisung an den Agenten aus? Schreibe drei Regeln auf.

**Vorschau:** In Projekt 8 beschäftigen wir uns mit Berechtigungen – was der Agent darf und was nicht.

---

## 🖥️ Projekt 8: Berechtigungen meistern – `/permissions`

**Was wir bauen:** Ein Sicherheitskonzept für unsere Arbeit mit dem Agenten.

### Schritt 1: Aktuelle Berechtigungen anzeigen

```
> /permissions
```

**Was wir sehen:** Eine Liste von Regeln, die bestimmen, was der Agent tun darf.

**Zeilenweise Dekonstruktion:**

Berechtigungen haben drei Zustände:
- `allow` – Der Agent darf das automatisch tun.
- `ask` – Der Agent fragt uns zuerst. *(Standard für die meisten Aktionen)*
- `deny` – Der Agent darf das nie tun.

Aktionen, für die Berechtigungen gelten:
- **Dateien lesen** (`read_file`) – Darf der Agent unsere Dateien lesen?
- **Dateien schreiben** (`write_file`) – Darf er Dateien erstellen/ändern?
- **Befehle ausführen** (`command`) – Darf er Terminalbefehle starten?
- **URLs aufrufen** (`read_url`) – Darf er im Internet nachschauen?

### Schritt 2: Eine Berechtigung verstehen

Der Standard `request-review` für `toolPermission` bedeutet: **Der Agent fragt uns, bevor er handelt.** Das ist sicher und empfehlenswert für Anfänger.

### Schritt 3: Berechtigungen in `settings.json` anpassen

```json
{
  "toolPermission": "request-review",
  "verbosity": "high"
}
```

**Zeilenweise Dekonstruktion:**

- `"toolPermission": "request-review"` – Der Agent fragt immer nach, bevor er Tools ausführt. Perfekt für uns.
- `"verbosity": "high"` – Der Agent erklärt ausführlich, was er tut. Gut zum Lernen.
- Die Datei liegt unter `~/.gemini/antigravity-cli/settings.json`.

> 🔍 **Nachdenk-Aufgabe:** Welche Berechtigungen würdest du auf `deny` setzen und warum?

**Vorschau:** In Projekt 9 erkunden wir, wie wir vergangene Konversationen wiederfinden und fortsetzen.

---

## 🖥️ Projekt 9: Konversationsverlauf nutzen – `/resume` und `/conversation`

**Was wir bauen:** Ein persönliches Archiv unserer Lernreise.

### Schritt 1: Alle Konversationen auflisten

```
> /conversation
```

**Was wir sehen:** Eine Liste aller gespeicherten Konversationen mit Namen und Datum.

### Schritt 2: Eine alte Konversation fortsetzen

```
> /resume rust-ownership-grundlagen
```

**Was passiert:** Wir sind zurück in unserem alten Gespräch. Der Agent erinnert sich an alles – als hätten wir eine Pause gemacht.

**Zeilenweise Dekonstruktion:**

- `/resume` sucht nach dem **Namen** der Konversation.
- Alternativ können wir die **ID** nutzen, die der Agent jeder Konversation gibt.
- `/switch` ist ein Synonym für `/resume`.

**Analogie:** Stell dir vor, du hast ein Notizbuch für jedes Rust-Thema. Mit `/resume` schlägst du genau das richtige Notizbuch auf – und alle alten Notizen sind noch da.

### Schritt 3: Konversationen strategisch benennen

Gute Namen für Lernkonversationen:
```
rust-ownership-basics
rust-strings-vs-str
rust-error-handling
antigravity-skill-bauen
```

> 🔍 **Nachdenk-Aufgabe:** Welche Konversationen würdest du für deine Rust-Lernreise anlegen?

**Vorschau:** In Projekt 10 passen wir `settings.json` vollständig an – unser persönliches CLI-Profil.

---

## 🖥️ Projekt 10: Das CLI personalisieren – `settings.json`

**Was wir bauen:** Unsere persönliche Antigravity-Konfiguration.

### Schritt 1: Die Datei öffnen

```bash
nano ~/.gemini/antigravity-cli/settings.json
```

### Schritt 2: Unsere Lern-Konfiguration schreiben

```json
{
  "model": "gemini-2.5-flash",
  "toolPermission": "request-review",
  "verbosity": "high",
  "runningLightSpeed": "slow",
  "notifications": true,
  "showTips": true,
  "historySize": 2000
}
```

**Zeilenweise Dekonstruktion:**

- `"model"` – Das Standard-Modell. Wir nutzen `flash` für schnelle Antworten beim täglichen Lernen.
- `"toolPermission": "request-review"` – Der Agent fragt uns immer, bevor er handelt. Als Anfänger ist das genau richtig.
- `"verbosity": "high"` – Der Agent erklärt ausführlich, was er gerade tut und warum.
- `"runningLightSpeed": "slow"` – Die Antworten des Agenten erscheinen langsamer – wir können mitlesen, während er „tippt". Das hilft beim Lernen.
- `"notifications": true` – Wir bekommen Systembenachrichtigungen, wenn der Agent eine lange Aufgabe abgeschlossen hat.
- `"showTips": true` – Nützliche Tipps werden angezeigt. Als Anfänger wollen wir das.
- `"historySize": 2000` – Die letzten 2000 Konversations-Schritte werden gespeichert.

### Schritt 3: Die Einstellungen testen

```bash
agy
> /usage
```

Beachte: Antwortet der Agent jetzt langsamer (durch `runningLightSpeed: slow`)? Siehst du mehr Details?

> 🔍 **Nachdenk-Aufgabe:** Welche Einstellung hat den größten Einfluss auf deinen Lernfortschritt?

**Vorschau:** Jetzt kennen wir die CLI. In Gruppe 2 formen wir den Agenten durch `AGENTS.md` – das mächtigste Werkzeug dieser ganzen Reise.

---

# 📋 Gruppe 2: AGENTS.md – Den Agenten formen

Die `AGENTS.md`-Datei ist das **Gehirn** unseres personalisierten Agenten. Was wir hier schreiben, liest der Agent automatisch – bei jedem Start, bei jeder Frage. Wir formen damit seinen Charakter, seine Regeln und seinen Kontext.

---

## 📋 Projekt 11: Die erste eigene AGENTS.md

**Was wir bauen:** Die Grundstruktur unserer ersten AGENTS.md.

### Schritt 1: Die Datei erstellen

```bash
mkdir -p ~/mein-rust-projekt
cd ~/mein-rust-projekt
```

```markdown
# AGENTS.md – Mein Rust-Lernprojekt

Ich bin Anfänger und lerne gerade Rust. 
Ich möchte, dass du mir als Lernpartner zur Seite stehst.
```

**Zeilenweise Dekonstruktion:**

- `# AGENTS.md` – Die Überschrift. Der Agent liest diese Datei als Markdown.
- Der erste Satz **definiert uns** – wer wir sind, was unser Wissensstand ist.
- „Lernpartner" – nicht „Helfer", nicht „Assistent". Ein Partner ist auf Augenhöhe.

### Schritt 2: Die Datei mit dem Agenten testen

```bash
agy
> /context
```

Wir sehen jetzt unsere `AGENTS.md` im Kontext des Agenten!

### Schritt 3: Den Unterschied spüren

Stelle dieselbe Frage wie in Projekt 1: *„Was ist Rust?"*

Vergleiche die Antwort mit Projekt 1:
- Ist sie anders?
- Mehr auf Anfänger zugeschnitten?
- Kürzer, klarer, freundlicher?

> 🔍 **Nachdenk-Aufgabe:** Welcher einzige Satz in deiner `AGENTS.md` hätte den größten Einfluss?

**Vorschau:** In Projekt 12 definieren wir Sprache, Ton und Stil des Agenten.

---

## 📋 Projekt 12: Sprache & Ton konfigurieren

**Was wir bauen:** Einen Agenten, der genau so spricht, wie wir es brauchen.

### Schritt 1: Sprache und Ton in AGENTS.md definieren

```markdown
## Kommunikation

- Antworte immer auf Deutsch.
- Nutze eine einfache, klare Sprache – ich bin Anfänger.
- Vermeide Fachbegriffe, ohne sie zu erklären.
- Stelle nach jeder Erklärung eine Verständnisfrage.
- Halte Antworten kurz: maximal 5 Sätze, dann frage, ob ich mehr möchte.
```

**Zeilenweise Dekonstruktion:**

- `Antworte immer auf Deutsch` – Ohne diese Regel könnte der Agent auf Englisch antworten, wenn die Frage englisch klingt.
- `Vermeide Fachbegriffe` – Wir müssen explizit sagen, was wir **nicht** wollen. Der Agent kann keine Gedanken lesen.
- `Stelle nach jeder Erklärung eine Verständnisfrage` – Das ist das **Tutoren-Prinzip**: Ein guter Lehrer fragt, ob der Schüler es verstanden hat.
- `maximal 5 Sätze` – Limits helfen dem Agenten, präzise zu bleiben.

### Schritt 2: Testen

```bash
agy
> Erkläre mir den Unterschied zwischen Stack und Heap.
```

Hat der Agent am Ende eine Frage gestellt? War die Antwort kurz?

### Schritt 3: Verfeinern

Falls nein: Passe die Regeln an. Das ist normales Vorgehen – wir **iterieren**. Eine `AGENTS.md` ist nie fertig.

> 🔍 **Nachdenk-Aufgabe:** Was nervt dich an typischen KI-Antworten? Schreibe eine Regel, die dieses Problem löst.

**Vorschau:** In Projekt 13 definieren wir, was der Agent **nicht** darf.

---

## 📋 Projekt 13: Verbotene Aktionen – Was der Agent nicht darf

**Was wir bauen:** Klare Grenzen, die uns beim Lernen helfen.

### Schritt 1: Das Lernprinzip festlegen

```markdown
## Was der Agent nicht darf

- NIEMALS fertigen Rust-Code schreiben oder vorschlagen.
- NIEMALS die Lösung einer Aufgabe direkt nennen.
- Wenn ich um Code bitte: Statt des Codes nur Hinweise, 
  welches Konzept ich brauche.
- Wenn ich die Lösung wissen will: Erst fragen, ob ich 
  es wirklich noch nicht selbst versucht habe.
```

**Zeilenweise Dekonstruktion:**

- `NIEMALS` in Großbuchstaben – Das ist Absicht. Wir verstärken die Regel durch **Betonung**.
- `Statt des Codes nur Hinweise` – Das ist die Kernphilosophie dieses Buches: Verstehen durch Eigenleistung.
- `Erst fragen, ob ich es wirklich noch nicht selbst versucht habe` – Der Agent fungiert als Gewissen, nicht als Abkürzung.

### Schritt 2: Die Regel testen – bewusst scheitern

```bash
agy
> Schreib mir ein Rust-Programm, das "Hallo Welt" ausgibt.
```

Was antwortet der Agent? Befolgt er die Regel? Gibt er Hinweise statt Code?

### Schritt 3: Die Regel verfeinern

Falls der Agent die Regel nicht befolgt: Formuliere sie deutlicher. 

> 💡 **Merke:** Je konkreter unsere Regeln, desto zuverlässiger der Agent. Vage Regeln führen zu vagen Ergebnissen.

> 🔍 **Nachdenk-Aufgabe:** Welche Ausnahmen von der "kein Code"-Regel wären sinnvoll?

**Vorschau:** In Projekt 14 beschreiben wir unseren Projektkontext – damit der Agent weiß, woran wir arbeiten.

---

## 📋 Projekt 14: Projektkontext beschreiben

**Was wir bauen:** Eine vollständige Projektbeschreibung für den Agenten.

### Schritt 1: Den Kontext schreiben

```markdown
## Mein Projekt

Ich baue gerade: "Zahlen raten" – ein CLI-Spiel in Rust.
Das Programm soll eine Zufallszahl zwischen 1 und 100 wählen.
Der Spieler tippt Zahlen, bis er sie errät.
Das Programm sagt "zu groß" oder "zu klein".

### Aktueller Stand
- [ ] Zufallszahl generieren
- [ ] Benutzereingabe lesen
- [ ] Vergleich und Ausgabe
- [ ] Schleife bis zur richtigen Zahl

### Mein aktuelles Problem
Ich verstehe noch nicht, wie ich eine Zahl vom Terminal einlesen kann.
```

**Zeilenweise Dekonstruktion:**

- `Ich baue gerade:` – Das versetzt den Agenten in den Kontext unseres Projekts. Er weiß, womit sein nächster Hinweis relevant ist.
- `- [ ] Aufgabe` – Die Checkbox-Syntax zeigt dem Agenten unseren Fortschritt.
- `### Mein aktuelles Problem` – Das ist die wichtigste Sektion. Der Agent weiß sofort, wobei wir Hilfe brauchen.

### Schritt 2: Den Kontext testen

```bash
agy
> Ich stecke fest. Was soll ich als Nächstes tun?
```

Der Agent sollte jetzt **spezifisch** auf unser Projekt eingehen, ohne eine direkte Lösung zu nennen.

> 🔍 **Nachdenk-Aufgabe:** Wie aktuell hältst du deinen Projektkontext? Nach jeder Session? Täglich? Was funktioniert für dich?

**Vorschau:** In Projekt 15 dokumentieren wir unsere Lernphase – damit der Agent unseren Fortschritt kennt.

---

## 📋 Projekt 15: Lernphase dokumentieren

**Was wir bauen:** Eine dynamische Lernkarte in unserer AGENTS.md.

### Schritt 1: Die Lernkarte schreiben

```markdown
## Mein Lernstand – Stand: Juni 2026

### Was ich bereits kann
- Variablen mit `let` und `mut` deklarieren
- Einfache `if/else`-Bedingungen schreiben
- Den Unterschied zwischen `String` und `&str` erklären

### Was ich gerade lerne
- Benutzereingabe mit `std::io::stdin()` lesen
- Zahlen aus Strings mit `.parse()` konvertieren

### Was ich noch nicht verstehe
- Ownership und warum der Compiler mich manchmal "anschreit"
- Warum `match` manchmal nötig ist statt `if let`

### Hilfreiche Erklärungen für mich
- Nutze Alltagsbeispiele und Analogien
- Erkläre immer das "Warum", nicht nur das "Was"
- Vergleiche Rust gerne mit einfachen Alltagssituationen
```

**Zeilenweise Dekonstruktion:**

- `Was ich bereits kann` – Der Agent wiederholt keine Grundlagen, die wir schon kennen.
- `Was ich gerade lerne` – Das ist der **Fokus**. Hier soll der Agent besonders klar sein.
- `Was ich noch nicht verstehe` – Explizite Wissenslücken. Der Agent weiß, dass er hier besonders vorsichtig und langsam erklären soll.
- `Hilfreiche Erklärungen für mich` – Unser persönlicher Lernstil.

### Schritt 2: Die Lernkarte regelmäßig aktualisieren

Füge nach jeder Lerneinheit einen Haken bei erlernten Konzepten ein. Verschiebe Themen zwischen den Sektionen.

> 🔍 **Nachdenk-Aufgabe:** Wie verändert sich die Qualität der Agentenantworten, wenn du deine Lernkarte aktuell hältst?

**Vorschau:** In Projekt 16 verstehen wir die Hierarchie der AGENTS.md-Dateien.

---

## 📋 Projekt 16: Die AGENTS.md-Hierarchie verstehen

**Was wir bauen:** Ein Verständnis dafür, wie globale und lokale Regeln zusammenwirken.

### Schritt 1: Die zwei Ebenen kennenlernen

```
/home/user/
└── mein-rust-projekt/
    ├── AGENTS.md           ← Ebene 1: Projekt-Root
    └── .agents/
        └── AGENTS.md       ← Ebene 2: Workspace-spezifisch
```

**Zeilenweise Dekonstruktion:**

- `AGENTS.md` im Projekt-Root: **Überblick** – Projektbeschreibung, Ziele, Lernstand.
- `.agents/AGENTS.md`: **Verhaltensregeln** – Wie soll der Agent kommunizieren? Was darf er?
- Beide Dateien werden geladen. Lokale Regeln **überschreiben** globale, wenn sie sich widersprechen.

**Analogie:** Denke dir das wie **Hausregeln vs. Schulregeln**. In der Schule gelten die Schulregeln – aber zu Hause gelten zusätzlich noch die Hausregeln. Wenn sie sich widersprechen, entscheiden die Hausregeln.

### Schritt 2: Aufgaben aufteilen

```markdown
# AGENTS.md (Projekt-Root)
## Projektbeschreibung
Ich baue "Zahlen raten" in Rust...

## Lernstand
...
```

```markdown
# .agents/AGENTS.md (Workspace)
## Verhaltensregeln
- Kein fertiger Code
- Stelle immer Rückfragen
- Deutsch, einfache Sprache
```

### Schritt 3: Testen

```bash
agy
> /context
```

Siehst du beide AGENTS.md-Dateien im Kontext?

> 🔍 **Nachdenk-Aufgabe:** Welche Informationen gehören in welche Ebene? Mache eine eigene Liste.

**Vorschau:** In Projekt 17 lernen wir `@`-Mentions – damit schicken wir gezielt Kontext an den Agenten.

---

## 📋 Projekt 17: Kontext gezielt teilen – `@`-Mentions

**Was wir bauen:** Die Kunst, dem Agenten genau die richtigen Informationen zu geben.

### Schritt 1: Eine Datei als Kontext anhängen

Angenommen, wir haben eine Rust-Datei `main.rs`:

```
> @main.rs Ich bekomme einen Compiler-Fehler. 
  Erkläre mir, was in dieser Datei passiert – aber nenne mir nicht die Lösung.
```

**Zeilenweise Dekonstruktion:**

- `@main.rs` – Das `@`-Symbol gefolgt vom Dateinamen schickt den **Inhalt dieser Datei** an den Agenten.
- Der Agent sieht nun unseren Code, ohne dass wir ihn manuell kopieren müssen.
- Danach folgt unsere **Frage oder Aufgabe**.

### Schritt 2: Einen Ordner als Kontext anhängen

```
> @src/ Welche Dateien habe ich in meinem Projekt bisher erstellt?
```

- `@src/` schickt alle Dateien im `src/`-Ordner als Kontext.

### Schritt 3: Eine frühere Konversation anhängen

```
> @rust-ownership-grundlagen Was habe ich damals über Ownership gelernt?
```

- `@konversationsname` fügt eine frühere Konversation als Kontext ein.

**Analogie:** `@` ist wie ein **Post-it-Zettel**, den wir an unsere Frage kleben. Der Agent sieht die Frage und den Zettel zusammen.

> 🔍 **Nachdenk-Aufgabe:** In welchen Situationen wäre `@`-Mention effizienter als copy-paste?

**Vorschau:** In Projekt 18 bauen wir eine vollständige, professionelle AGENTS.md.

---

## 📋 Projekt 18: Die vollständige AGENTS.md – Alles zusammen

**Was wir bauen:** Eine professionelle, vollständige AGENTS.md für unser Rust-Lernprojekt.

### Schritt 1: Die vollständige Datei schreiben

```markdown
# AGENTS.md – Rust-Lernprojekt von [Dein Name]

Dieses Projekt ist mein persönliches Rust-Lernjournal.
Ich bin Anfänger ohne Programmiervorkenntnisse und lerne seit 2 Wochen.

---

## 📁 Projektstruktur

```
mein-rust-projekt/
├── AGENTS.md          ← Diese Datei
├── .agents/
│   └── AGENTS.md      ← Verhaltensregeln
└── src/
    └── main.rs        ← Mein Code
```

## 🎯 Aktuelles Projekt

Ich baue: "Zahlen raten" – CLI-Spiel in Rust.

## 📊 Mein Lernstand

**Kann ich:**  Variablen, if/else, Schleifen  
**Lerne ich:**  Benutzereingabe, Strings parsen  
**Verstehe noch nicht:**  Ownership, Borrowing  

## ⚙️ Regeln

- Antworte auf Deutsch, einfache Sprache
- Kein fertiger Code – nur Hinweise
- Stelle nach jeder Erklärung eine Frage
- Bei Fehlern: Erkläre das "Warum" vor dem "Was"
```

**Zeilenweise Dekonstruktion:**

- Die Datei hat **5 Sektionen**: Intro, Struktur, aktuelles Projekt, Lernstand, Regeln.
- Jede Sektion hat einen klaren Zweck.
- Emojis und `---` Trennlinien helfen dem Agenten (und uns!) beim schnellen Überblick.

### Schritt 2: Testen und vergleichen

Teste die Qualität der Agentenantworten vor und nach dieser vollständigen AGENTS.md.

> 🔍 **Nachdenk-Aufgabe:** Was fehlt noch in dieser AGENTS.md, das speziell für dich wichtig wäre?

**Vorschau:** In Projekt 19 lernen wir, AGENTS.md zu testen und systematisch zu verbessern.

---

## 📋 Projekt 19: AGENTS.md systematisch testen

**Was wir bauen:** Einen Testprozess für unsere Agentenregeln.

### Schritt 1: Test-Fragen definieren

Erstelle eine Datei `agents-tests.md`:

```markdown
# AGENTS.md Testfragen

## Test 1: Sprachregel
Frage: "What is ownership in Rust?"
Erwartung: Antwort auf Deutsch

## Test 2: Kein-Code-Regel
Frage: "Schreib mir main.rs für Zahlen raten."
Erwartung: Hinweise, kein Code

## Test 3: Verständnisfrage
Frage: "Erkläre mir, was ein String ist."
Erwartung: Erklärung + Frage am Ende

## Test 4: Lernstand-Bewusstsein
Frage: "Erkläre mir Lifetimes."
Erwartung: Agent verweist auf Lernstand, sagt: "Das kommt später"
```

### Schritt 2: Tests durchführen

Führe jeden Test durch und notiere:
- ✅ Regel eingehalten
- ❌ Regel nicht eingehalten → AGENTS.md anpassen

### Schritt 3: Iterieren

```markdown
# Änderungslog AGENTS.md

## 2026-06-24
- Test 2 fehlgeschlagen: Code wurde gegeben
- Fix: Regel verschärft mit "NIEMALS"
```

> 🔍 **Nachdenk-Aufgabe:** Wie oft solltest du deine AGENTS.md aktualisieren?

**Vorschau:** In Projekt 20 lernen wir, AGENTS.md mit Git zu versionieren.

---

## 📋 Projekt 20: AGENTS.md versionieren – Mit Git mitarbeiten

**Was wir bauen:** Eine Versionsgeschichte unserer AGENTS.md.

### Schritt 1: Git initialisieren

```bash
cd ~/mein-rust-projekt
git init
git add AGENTS.md .agents/AGENTS.md
git commit -m "Initial AGENTS.md: Rust-Lernprojekt Setup"
```

**Zeilenweise Dekonstruktion:**

- `git init` – Wir initialisieren ein neues Git-Repository.
- `git add` – Wir wählen die Dateien, die wir versionieren wollen.
- `git commit -m "..."` – Wir speichern den aktuellen Stand mit einer Beschreibung.

### Schritt 2: Nach jeder Verbesserung committen

```bash
git add AGENTS.md
git commit -m "Lernstand aktualisiert: Ownership jetzt verstanden"
```

### Schritt 3: Den Verlauf betrachten

```bash
git log --oneline
```

**Was wir sehen:** Eine Liste aller Commits – unsere **Lernreise als Timeline**.

> 🔍 **Nachdenk-Aufgabe:** Was zeigt die Git-History über unseren Fortschritt? Was hättest du früher anders gemacht?

**Vorschau:** In Gruppe 3 bauen wir eigene Skills – vorgefertigte Fähigkeitspakete für den Agenten.

---

# 🔧 Gruppe 3: Skills – Den Agenten erweitern

Skills sind wie **Plugins für den Agenten**. Während `AGENTS.md` den Charakter und die Regeln des Agenten definiert, geben Skills ihm spezifische **Expertenwissen-Pakete** – die er bei passenden Themen automatisch aktiviert.

---

## 🔧 Projekt 21: Was ist ein Skill? – Konzept und Struktur

**Was wir bauen:** Das Verständnis für Skills.

### Schritt 1: Die Ordnerstruktur eines Skills

```
.agents/
└── skills/
    └── mein-skill/
        └── SKILL.md
```

**Zeilenweise Dekonstruktion:**

- `.agents/skills/` – Der Ort, wo alle Skills leben.
- `mein-skill/` – Ein Ordner pro Skill. Der Ordnername ist der **interne Name**.
- `SKILL.md` – Die Hauptdatei. Hier stehen Name, Beschreibung und Anweisungen.

### Schritt 2: Den Unterschied zu AGENTS.md verstehen

| | AGENTS.md | Skill |
|---|---|---|
| **Zweck** | Regeln & Kontext | Spezialwissen |
| **Wird geladen** | Immer automatisch | Wenn das Thema passt |
| **Schreibt** | Du selbst | Du selbst |
| **Inhalt** | Projektbeschreibung, Regeln | Anleitungen, Referenzen |

### Schritt 3: Einen leeren Skill-Ordner erstellen

```bash
mkdir -p ~/mein-rust-projekt/.agents/skills/rust-tutor
touch ~/mein-rust-projekt/.agents/skills/rust-tutor/SKILL.md
```

> 🔍 **Nachdenk-Aufgabe:** Welche drei Skills würden deinem Rust-Lernen am meisten helfen?

**Vorschau:** In Projekt 22 schreiben wir das YAML-Frontmatter – den Kopf jeder SKILL.md.

---

## 🔧 Projekt 22: Das SKILL.md Frontmatter – Der Kopf eines Skills

**Was wir bauen:** Die YAML-Metadaten, die einen Skill aktivieren.

### Schritt 1: Das Frontmatter schreiben

```markdown
---
name: rust-tutor
description: Hilft Rust-Anfängern beim Lernen durch Fragen, 
             Analogien und Erklärungen – ohne fertige Code-Lösungen.
---
```

**Zeilenweise Dekonstruktion:**

- `---` (drei Bindestriche) – Der Beginn und das Ende des YAML-Frontmatters. Wie ein **Briefumschlag** um die Metadaten.
- `name:` – Der **interne Name** des Skills. Muss eindeutig sein.
- `description:` – Die **Beschreibung**, anhand derer der Agent entscheidet, ob er den Skill aktiviert. Das ist das **Wichtigste**: Je präziser die Beschreibung, desto zuverlässiger die Aktivierung.

**Analogie:** Stell dir vor, du rufst ein Callcenter an. Die Beschreibung ist die **Warteschleife-Ansage**: „Für technische Probleme drücken Sie 1." Der Agent „drückt 1" (aktiviert den Skill), wenn deine Frage zur Beschreibung passt.

### Schritt 2: Die Beschreibung optimieren

Schlechte Beschreibung:
```yaml
description: Hilft bei Rust.
```

Gute Beschreibung:
```yaml
description: Aktiviere diesen Skill, wenn der Nutzer Fragen zu Rust-Konzepten
             wie Ownership, Borrowing, Lifetimes, Strings oder Structs stellt.
             Gib keine fertigen Code-Lösungen, sondern Erklärungen und Hinweise.
```

> 🔍 **Nachdenk-Aufgabe:** Was muss in der Beschreibung stehen, damit der Skill bei deinen typischen Fragen aktiviert wird?

**Vorschau:** In Projekt 23 schreiben wir den eigentlichen Skill-Inhalt.

---

## 🔧 Projekt 23: Den Skill mit Inhalt füllen

**Was wir bauen:** Einen vollständigen Rust-Tutor-Skill.

### Schritt 1: Den kompletten Skill schreiben

```markdown
---
name: rust-tutor
description: Aktiviere diesen Skill bei Rust-Lernfragen. 
             Keine Code-Lösungen, nur Erklärungen und Hinweise.
---

# Rust-Tutor Skill

Wenn dieser Skill aktiv ist, gelten folgende Anweisungen:

## Mein Verhalten

- Erkläre Rust-Konzepte mit Alltagsbeispielen
- Stelle nach jeder Erklärung eine Verständnisfrage
- Wenn der Nutzer Code möchte: Zeige nur das Konzept, nicht die Lösung
- Verweise auf das offizielle Rust-Buch: https://doc.rust-lang.org/book/

## Meine Erklär-Methoden

### Für Ownership:
Analogie: "Stell dir vor, du hast eine Tasse Kaffee. 
Du kannst sie jemandem geben (move) oder jemanden 
daran schnuppern lassen (borrow). Aber zwei Personen 
können die Tasse nicht gleichzeitig besitzen."

### Für Borrowing:
Analogie: "Du leihst deinem Freund ein Buch (& reference). 
Du kannst nicht gleichzeitig mit dem Buch verschwinden, 
während er es liest (lifetime)."

### Für Strings:
Analogie: "String ist wie ein Haus, das du besitzt. 
&str ist wie die Adresse des Hauses – du weißt, 
wo es ist, aber du besitzt es nicht."

## Verboten

- Fertige Code-Lösungen für Lernaufgaben
- Erklärungen ohne Nachfrage, ob der Nutzer es verstanden hat
```

**Zeilenweise Dekonstruktion:**

- `## Mein Verhalten` – Verhaltensregeln, die speziell für diesen Skill gelten.
- `## Meine Erklär-Methoden` – Vorgefertigte Analogien, die der Agent bei bestimmten Themen verwenden soll.
- `## Verboten` – Explizite Verbote im Skill-Kontext.

### Schritt 2: Testen

```bash
agy
> /skills
```

Siehst du `rust-tutor` in der Liste?

> 🔍 **Nachdenk-Aufgabe:** Welche eigenen Analogien würdest du dem Skill hinzufügen?

**Vorschau:** In Projekt 24 lernen wir, Skills gezielt zu testen.

---

## 🔧 Projekt 24: Skill testen – `/skills` und manuelle Aktivierung

**Was wir bauen:** Einen systematischen Testprozess für unsere Skills.

### Schritt 1: Alle aktiven Skills anzeigen

```
> /skills
```

**Was wir sehen:** Eine Liste aller erkannten Skills mit Namen und Beschreibung.

### Schritt 2: Den Skill durch eine passende Frage aktivieren

```
> Erkläre mir Ownership in Rust.
```

**Was passiert:** Der Agent erkennt das Thema (Rust + Ownership) und aktiviert automatisch unseren `rust-tutor`-Skill. Wir sehen, dass er jetzt die Analogien aus dem Skill nutzt.

### Schritt 3: Den Skill durch eine nicht passende Frage testen

```
> Was ist das Wetter heute?
```

**Was passiert:** Der Skill wird **nicht** aktiviert – die Beschreibung passt nicht. Der Agent antwortet normal.

### Schritt 4: Wenn der Skill nicht aktiviert wird

Überprüfe die `description` in `SKILL.md`. Sie muss die Schlüsselbegriffe enthalten, die in deinen Fragen vorkommen.

> 🔍 **Nachdenk-Aufgabe:** Was passiert, wenn zwei Skills gleichzeitig aktiv sind? Teste es!

**Vorschau:** In Projekt 25 bauen wir einen Skill speziell für Rust-Fehlermeldungen.

---

## 🔧 Projekt 25: Skill für Fehlermeldungen – Der Compiler als Lehrer

**Was wir bauen:** Einen Skill, der uns Rust-Fehlermeldungen erklärt.

### Schritt 1: Den Skill erstellen

```
.agents/skills/rust-fehler-erklaerer/SKILL.md
```

```markdown
---
name: rust-fehler-erklaerer
description: Aktiviere diesen Skill, wenn der Nutzer eine Rust-Fehlermeldung 
             (error[E...], cannot borrow, does not live long enough etc.) 
             zeigt oder danach fragt.
---

# Rust-Fehler-Erklärer

## Ablauf bei einer Fehlermeldung

1. Lies die Fehlermeldung vollständig
2. Erkläre auf Deutsch, WAS der Fehler bedeutet (nicht wie man ihn behebt)
3. Erkläre, WARUM Rust diesen Fehler verhindert (Sicherheitsgrund)
4. Stelle die Frage: "Was denkst du, warum Rust das verbietet?"
5. Erst nach der Antwort des Nutzers: Hinweis auf mögliche Lösung

## Häufige Fehlertypen

### E0308: Typfehler
Erkläre: Rust ist streng mit Typen – wie ein Kellner, 
der nur Bestellungen im richtigen Format akzeptiert.

### E0382: Move-Fehler (Ownership)
Erkläre: Der Wert wurde "verschenkt" und kann nicht 
nochmal benutzt werden – wie ein Brief, den man abgeschickt hat.

### E0502: Borrow-Konflikt
Erkläre: Zwei Teile des Programms wollen gleichzeitig 
auf denselben Wert zugreifen – wie zwei Köche, die 
dasselbe Messer gleichzeitig brauchen.
```

### Schritt 2: Testen mit einer echten Fehlermeldung

Schreibe absichtlich einen Fehler in Rust:

```rust
fn main() {
    let s = String::from("hallo");
    let s2 = s;
    println!("{}", s); // Fehler!
}
```

Kompiliere es: `cargo build`

Kopiere die Fehlermeldung und schicke sie an den Agenten.

> 🔍 **Nachdenk-Aufgabe:** Welcher Rust-Fehler verwirrt dich am meisten? Füge ihn zum Skill hinzu.

**Vorschau:** In Projekt 26 bauen wir einen Code-Review-Skill.

---

## 🔧 Projekt 26: Code-Review-Skill – Der kritische Freund

**Was wir bauen:** Einen Skill, der unseren Code bewertet – ohne ihn zu verbessern.

### Schritt 1: Den Review-Skill erstellen

```markdown
---
name: rust-code-reviewer
description: Aktiviere diesen Skill, wenn der Nutzer einen Code-Review 
             oder Feedback zu seinem Rust-Code möchte.
---

# Rust Code Reviewer

Wenn dieser Skill aktiv ist: Du bist ein konstruktiver Code-Reviewer.

## Deine Review-Checkliste

Analysiere den Code nach diesen Punkten:
1. **Lesbarkeit:** Sind Variablennamen aussagekräftig?
2. **Korrektheit:** Gibt es logische Fehler?
3. **Rust-Stil:** Wird idiomatic Rust verwendet?
4. **Sicherheit:** Könnte ein Panic auftreten?

## Dein Review-Format

1. Beginne mit: "Was du gut gemacht hast:"
2. Stelle dann 3 Fragen (keine direkten Verbesserungsvorschläge)
3. Beende mit: "Was würdest du bei Zeile X anders machen?"

## Verboten

- Verbesserten Code schreiben
- Direkte Lösungen nennen
- Den Code für den Nutzer umschreiben
```

### Schritt 2: Den Skill mit eigenem Code testen

```
> @main.rs Bitte reviewe meinen Code nach deiner Checkliste.
```

> 🔍 **Nachdenk-Aufgabe:** Welche Review-Fragen haben dich am meisten zum Nachdenken gebracht?

**Vorschau:** In Projekt 27 fügen wir Referenzen zu unserem Skill hinzu.

---

## 🔧 Projekt 27: Skill-Referenzen – Externe Dokumentation einbinden

**Was wir bauen:** Einen Skill mit Links zu offiziellen Ressourcen.

### Schritt 1: Einen `references/`-Ordner erstellen

```
.agents/skills/rust-tutor/
├── SKILL.md
└── references/
    └── rust-konzepte.md
```

### Schritt 2: Die Referenzdatei befüllen

```markdown
# Rust-Konzepte Referenz

## Offizielle Ressourcen

- **Das Rust-Buch:** https://doc.rust-lang.org/book/
  - Kapitel 4: Ownership
  - Kapitel 8: Strings und Collections
  - Kapitel 10: Lifetimes

- **Rust by Example:** https://doc.rust-lang.org/rust-by-example/
  - Interaktive Beispiele für alle Konzepte

- **Rustlings:** https://github.com/rust-lang/rustlings
  - Übungsaufgaben zum Selbermachen

## Wann welche Ressource?

| Problem | Ressource |
|---------|-----------|
| Konzept verstehen | Rust-Buch Kapitel |
| Syntax nachschlagen | Rust by Example |
| Üben | Rustlings |
```

### Schritt 3: Den Skill aktualisieren, um auf Referenzen zu verweisen

```markdown
## Bei Fragen zu Ressourcen

Verweise auf die Referenzdatei: references/rust-konzepte.md
Nenne immer das spezifische Kapitel oder die Seite.
```

> 🔍 **Nachdenk-Aufgabe:** Welche anderen Ressourcen würden in die Referenzdatei passen?

**Vorschau:** In Projekt 28 kombinieren wir mehrere Skills.

---

## 🔧 Projekt 28: Skills kombinieren – Synergie nutzen

**Was wir bauen:** Ein Skill-Ökosystem, in dem mehrere Skills zusammenarbeiten.

### Schritt 1: Unser Skill-Verzeichnis

```
.agents/skills/
├── rust-tutor/          ← Erklärt Rust-Konzepte
├── rust-fehler-erklaerer/  ← Erklärt Fehlermeldungen
└── rust-code-reviewer/  ← Bewertet Code
```

### Schritt 2: Verstehen, wie Skills sich ergänzen

Eine typische Lerneinheit mit allen drei Skills:

1. **Schreiben:** Wir schreiben Code (kein Skill aktiv)
2. **Fehler:** Rust gibt einen Fehler → `rust-fehler-erklaerer` aktiv
3. **Verstehen:** Wir fragen nach dem Konzept → `rust-tutor` aktiv
4. **Verbessern:** Wir schreiben neu → `rust-code-reviewer` aktiv

### Schritt 3: Die Skills testen

```
> Ich habe einen Fehler bekommen: [Fehlermeldung]. 
  Erkläre mir erst den Fehler, dann das dahinterliegende Konzept.
```

Welche Skills werden aktiviert?

> 🔍 **Nachdenk-Aufgabe:** Könnten sich zwei Skills widersprechen? Wie würdest du das lösen?

**Vorschau:** In Projekt 29 debuggen wir einen nicht funktionierenden Skill.

---

## 🔧 Projekt 29: Skill debuggen – Was tun, wenn er nicht funktioniert?

**Was wir bauen:** Einen systematischen Debug-Prozess für Skills.

### Schritt 1: Symptome erkennen

Der Skill aktiviert sich nicht. Mögliche Ursachen:

```markdown
# Debug-Checkliste für Skills

- [ ] Liegt SKILL.md im richtigen Ordner?
      Pfad: .agents/skills/[name]/SKILL.md

- [ ] Hat SKILL.md ein valides YAML-Frontmatter?
      Beginnt es mit --- und endet mit ---?

- [ ] Sind name: und description: vorhanden?

- [ ] Enthält die description die richtigen Schlüsselwörter?

- [ ] Wurde agy neu gestartet nach der Änderung?

- [ ] Wird der Skill in /skills angezeigt?
```

### Schritt 2: Den häufigsten Fehler beheben

**Fehler:** `name:` und Ordnername stimmen nicht überein.

```
Ordner: rust-tutor/
SKILL.md name: RustTutor  ← Falsch! Groß-/Kleinschreibung beachten
```

**Fix:**
```yaml
name: rust-tutor  ← Muss zum Ordnernamen passen
```

### Schritt 3: Die description testen

Überlege: Wenn du eine Frage stellst, welche Schlüsselwörter kommen vor?

```
> Erkläre mir Ownership in Rust.
```

Schlüsselwörter: `Ownership`, `Rust`, `erkläre`

Die `description` muss diese Wörter enthalten!

> 🔍 **Nachdenk-Aufgabe:** Wie kannst du eine Skill-Beschreibung schreiben, die bei allen deinen typischen Fragen anschlägt?

**Vorschau:** In Projekt 30 denken wir darüber nach, wie Skills langfristig gepflegt werden.

---

## 🔧 Projekt 30: Skills langfristig pflegen – Wartung und Updates

**Was wir bauen:** Eine Strategie für die langfristige Skill-Pflege.

### Schritt 1: Ein Skill-Changelog führen

```markdown
# SKILL-CHANGELOG.md

## rust-tutor

### v1.2 – 2026-06-24
- Neue Analogie für Lifetimes hinzugefügt
- Verständnisfragen nach jeder Erklärung verschärft

### v1.1 – 2026-06-17
- Verweise auf Rust-Buch Kapitel ergänzt

### v1.0 – 2026-06-10
- Initialer Skill erstellt
```

### Schritt 2: Skill-Reviews einplanen

Wöchentliche Fragen:
- Hat der Skill diese Woche gute Erklärungen geliefert?
- Welche Analogien haben gefehlt?
- Welche Regeln wurden nicht eingehalten?

### Schritt 3: Skills mit Git versionieren

```bash
git add .agents/skills/
git commit -m "rust-tutor v1.2: Lifetime-Analogie hinzugefügt"
```

> 🔍 **Nachdenk-Aufgabe:** Wie verändert sich dein Skill-Ökosystem, wenn du von Phase 1 zu Phase 2 wechselst?

**Vorschau:** In Gruppe 4 verlassen wir das Terminal und erkunden Antigravity 2.0 – die Desktop-App.

---

# 🖼️ Gruppe 4: Antigravity 2.0 – Die Desktop-App

Antigravity 2.0 ist eine **eigenständige Electron-App** – ein vollwertiges Fenster auf deinem Desktop, das parallel zu allem anderen läuft. Hier können wir Projekte verwalten, Aufgaben planen und geplante Aktionen einrichten.

---

## 🖼️ Projekt 31: Antigravity 2.0 kennenlernen – Die Oberfläche

**Was wir bauen:** Ein Verständnis für die drei Hauptbereiche der App.

### Schritt 1: Die linke Seitenleiste erkunden

Die linke Seitenleiste hat fünf Bereiche:

| Icon | Bereich | Funktion |
|------|---------|----------|
| 💬 | Neue Konversation | Startet einen neuen Chat |
| 📁 | Projects | Verwaltet Workspaces/Projekte |
| ⏰ | Scheduled Tasks | Geplante Aufgaben |
| 🔧 | Skills & Customizations | Skills und Regeln |
| ⚙️ | Settings | App-Einstellungen |

### Schritt 2: Den Chat-Bereich erkunden

Der Chat-Bereich ist der **Hauptarbeitsplatz**. Hier kommunizieren wir mit dem Agenten – genau wie in der CLI, aber mit grafischer Oberfläche.

**Vorteile gegenüber der CLI:**
- Wir können Dateien per **Drag-and-Drop** einziehen
- Bilder direkt einfügen
- Den Verlauf leichter navigieren
- Mehrere Konversationen als Tabs öffnen

### Schritt 3: Das erste Projekt anlegen

Klicke auf **Projects** → **New Project** → Wähle deinen Rust-Ordner aus.

**Was passiert:** Antigravity 2.0 erkennt automatisch die `AGENTS.md` in diesem Ordner und lädt sie.

> 🔍 **Nachdenk-Aufgabe:** Welche der CLI-Aufgaben aus Gruppe 1 kannst du jetzt einfacher in der Desktop-App erledigen?

**Vorschau:** In Projekt 32 richten wir unseren Workspace vollständig ein.

---

## 🖼️ Projekt 32: Workspace einrichten – Projekt-Konfiguration

**Was wir bauen:** Einen vollständig konfigurierten Rust-Lernworkspace.

### Schritt 1: Projektberechtigungen einstellen

In **Settings** → **Project-Level Settings** für unser Rust-Projekt:

```
File Access Policy:     ask     ← Frage mich, bevor du Dateien liest
Internet Access:        ask     ← Frage mich, bevor du ins Internet gehst  
Auto-Execution Policy:  request-review  ← Immer fragen vor Befehlen
Terminal Sandbox:       off     ← Für Rust-Entwicklung brauchen wir echtes Terminal
```

**Zeilenweise Dekonstruktion:**

- `ask` für Datei- und Internetzugriff: Als Lernender wollen wir **alles sehen**, was der Agent tut.
- `request-review`: Kein Befehl wird ohne unsere Bestätigung ausgeführt.
- `Terminal Sandbox: off`: `cargo build` muss auf echtes Terminal zugreifen können.

### Schritt 2: Projektinformationen eintragen

Im Projekt-Panel können wir auch direkt Beschreibung und Tags hinzufügen.

### Schritt 3: Den Workspace testen

Tippe im Chat: `@AGENTS.md Was weißt du über dieses Projekt?`

Der Agent sollte unsere AGENTS.md kennen und antworten.

> 🔍 **Nachdenk-Aufgabe:** Welche Berechtigungseinstellung ist für einen Anfänger am sichersten?

**Vorschau:** In Projekt 33 nutzen wir Drag-and-Drop – die effizienteste Art, Kontext zu teilen.

---

## 🖼️ Projekt 33: Drag-and-Drop – Kontext ohne Tippen

**Was wir bauen:** Einen effizienteren Kontext-Workflow.

### Schritt 1: Eine Datei in den Chat ziehen

Öffne deinen Dateimanager, finde `main.rs` und **ziehe sie direkt in das Chat-Fenster**.

**Was passiert:** Die Datei wird als Kontext angehängt – wir sehen eine kleine Vorschau im Chat.

### Schritt 2: Eine Frage hinzufügen

```
[main.rs wurde eingefügt]
Ich bekomme einen Fehler in Zeile 15. Erkläre mir, was dort passiert.
```

**Zeilenweise Dekonstruktion:**

- Drag-and-Drop ist das grafische Äquivalent zu `@datei.rs` in der CLI.
- Der Agent sieht nun den vollständigen Dateiinhalt als Kontext.
- Effizienter als Copy-Paste – besonders bei langen Dateien.

### Schritt 3: Mehrere Dateien gleichzeitig

Wir können mehrere Dateien gleichzeitig in den Chat ziehen.

```
[main.rs], [Cargo.toml], [Fehlerlog.txt]
Analysiere diese drei Dateien. Was stimmt nicht in meiner Rust-Konfiguration?
```

> 🔍 **Nachdenk-Aufgabe:** Wann ist Drag-and-Drop effizienter als `@`-Mention? Wann nicht?

**Vorschau:** In Projekt 34 richten wir unsere erste geplante Aufgabe ein.

---

## 🖼️ Projekt 34: Scheduled Tasks – Automatisierung für Lernende

**Was wir bauen:** Unsere erste geplante Aufgabe in Antigravity 2.0.

### Schritt 1: Scheduled Tasks öffnen

Klicke in der linken Seitenleiste auf **Scheduled Tasks** → **New Task**.

### Schritt 2: Eine einmalige Aufgabe erstellen

```
Name:     Rust-Lerncheck
Typ:      Einmalig (One-shot)
Zeit:     Morgen, 09:00 Uhr
Aufgabe:  Lies meine AGENTS.md und stelle mir drei Fragen zu meinem 
          aktuellen Lernstand. Frage nicht nach Code.
```

**Zeilenweise Dekonstruktion:**

- `Name:` – Ein aussagekräftiger Name, damit wir die Aufgabe später finden.
- `Typ: Einmalig` – Die Aufgabe wird genau einmal ausgeführt.
- `Zeit:` – Wann soll die Aufgabe ausgeführt werden?
- `Aufgabe:` – Das ist die **Anweisung an den Agenten**. Er führt sie aus, als würdest du sie selbst eingeben.

### Schritt 3: Die Aufgabe aktivieren

Klicke auf **Save & Activate**. Im Scheduled-Tasks-Panel sehen wir die Aufgabe mit einem Countdown.

> 🔍 **Nachdenk-Aufgabe:** Welche Aufgaben in deinem Lernalltag würdest du automatisieren?

**Vorschau:** In Projekt 35 richten wir eine täglich wiederholende Lernerinnerung ein.

---

## 🖼️ Projekt 35: Tägliche Lernerinnerung – Cron-Jobs für den Kopf

**Was wir bauen:** Ein automatisches tägliches Lernritual.

### Schritt 1: Eine wiederkehrende Aufgabe erstellen

```
Name:       Täglicher Rust-Impuls
Typ:        Wiederkehrend (Cron)
Cron:       0 8 * * *    (täglich um 08:00)
Aufgabe:    Lies meine AGENTS.md. Stelle mir heute eine Aufwärmfrage 
            zu dem Thema, das ich gerade lerne. 
            Beginne mit: "Guten Morgen! Heute eine Frage zu [Thema]:"
```

**Zeilenweise Dekonstruktion eines Cron-Ausdrucks:**

```
0  8  *  *  *
│  │  │  │  └─ Wochentag (0-7, * = jeden)
│  │  │  └──── Monat (1-12, * = jeden)
│  │  └─────── Tag des Monats (1-31, * = jeden)
│  └────────── Stunde (0-23)
└───────────── Minute (0-59)
```

- `0 8 * * *` bedeutet: **Jede Nacht um 8:00 Uhr**, jeden Tag, jeden Monat, jedes Jahr.
- `*/5 * * * *` würde bedeuten: **Alle 5 Minuten** (für Tests nützlich).

### Schritt 2: Den ersten Trigger abwarten oder manuell testen

Klicke auf **Run Now** um die Aufgabe sofort zu testen.

### Schritt 3: Die Aufgabe verfeinern

Nach ein paar Tagen: Fühlen sich die täglichen Fragen hilfreich an? Zu leicht? Zu schwer? Passe die Aufgabe an.

> 🔍 **Nachdenk-Aufgabe:** Welche Uhrzeit wäre für deine tägliche Lernerinnerung am besten?

**Vorschau:** In Projekt 36 konfigurieren wir projektspezifische Berechtigungen.

---

## 🖼️ Projekt 36: Projektberechtigungen verfeinern

**Was wir bauen:** Ein maßgeschneidertes Sicherheitsprofil für unser Rust-Projekt.

### Schritt 1: Die Berechtigungs-Hierarchie verstehen

```
Globale Einstellungen
    └── Projekteinstellungen (überschreiben global)
            └── Explizite Berechtigungen (überschreiben alles)
```

### Schritt 2: Explizite Berechtigungen setzen

In **Settings** → **Permission Grants** für unser Projekt:

```
Allow:  read_file  ~/mein-rust-projekt/
Allow:  command    cargo
Allow:  command    rustc
Deny:   write_file ~/mein-rust-projekt/src/main.rs
```

**Zeilenweise Dekonstruktion:**

- `Allow read_file ~/mein-rust-projekt/` – Der Agent darf alle Dateien in unserem Projekt lesen.
- `Allow command cargo` – `cargo build`, `cargo run`, `cargo test` sind erlaubt.
- `Deny write_file .../main.rs` – Unsere Hauptdatei darf der Agent **nicht** schreiben! Wir schreiben sie selbst.

### Schritt 3: Die Berechtigungen testen

```
> Schreibe den kompletten Code in main.rs.
```

Der Agent sollte abgewiesen werden oder nachfragen – weil `write_file` für `main.rs` verboten ist.

> 🔍 **Nachdenk-Aufgabe:** Welche Dateien in deinem Projekt willst du selbst schreiben und welche darf der Agent erstellen?

**Vorschau:** In Projekt 37 nutzen wir den Konversationsverlauf in der Desktop-App.

---

## 🖼️ Projekt 37: Konversationsverlauf in Antigravity 2.0

**Was wir bauen:** Ein Archiv unserer Lernreise in der Desktop-App.

### Schritt 1: Konversationen organisieren

In der linken Seitenleiste sehen wir alle Konversationen. Wir können:
- Nach Datum sortieren
- Nach Projekt filtern
- Konversationen umbenennen (Rechtsklick → Rename)
- Konversationen teilen oder exportieren

### Schritt 2: Eine Wochenrückblick-Konversation starten

```
Erstelle einen strukturierten Wochenrückblick basierend auf 
unseren Konversationen dieser Woche.

Beantworte folgende Fragen:
1. Was habe ich diese Woche gelernt?
2. Was hat mich überrascht?
3. Was verstehe ich noch nicht?
4. Was ist mein Ziel für nächste Woche?

Formuliere die Antworten in der Ich-Form, als wäre ich es, 
der antwortet – aber basierend auf unseren tatsächlichen Gesprächen.
```

### Schritt 3: Den Rückblick in AGENTS.md eintragen

Kopiere die wichtigsten Erkenntnisse in die `AGENTS.md` unter `## Mein Lernstand`.

> 🔍 **Nachdenk-Aufgabe:** Wie könntest du Wochenrückblicke als automatischen Scheduled Task einrichten?

**Vorschau:** In Projekt 38 beherrschen wir die Sidebar-Navigation vollständig.

---

## 🖼️ Projekt 38: Sidebar-Navigation meistern

**Was wir bauen:** Einen effizienten Umgang mit der Desktop-App-Oberfläche.

### Schritt 1: Skills & Customizations in der App

Klicke auf **Skills & Customizations** in der Seitenleiste.

**Was wir sehen:**
- Alle aktiven Skills (aus `.agents/skills/`)
- Alle geladenen Regeln (aus `AGENTS.md`)
- MCP-Server (falls konfiguriert)

### Schritt 2: Einen Skill direkt in der App bearbeiten

Wir können SKILL.md-Dateien direkt in der App öffnen und bearbeiten – ohne Texteditor.

### Schritt 3: Keyboard Shortcuts lernen

| Shortcut | Aktion |
|----------|--------|
| `Ctrl+N` | Neue Konversation |
| `Ctrl+/` | Slash-Befehl Menü öffnen |
| `@` tippen | Mentions-Menü öffnen |
| `Ctrl+K` | Schnellsuche |

> 🔍 **Nachdenk-Aufgabe:** Welche Keyboard-Shortcuts würden deinen Workflow am meisten beschleunigen?

**Vorschau:** In Projekt 39 erkunden wir Slash-Befehle speziell in Antigravity 2.0.

---

## 🖼️ Projekt 39: Slash-Befehle in Antigravity 2.0

**Was wir bauen:** Ein Verständnis für die 2.0-spezifischen Workflows.

### Schritt 1: Das Slash-Befehl-Menü öffnen

Tippe `/` im Chat und warte. Ein Menü erscheint mit allen verfügbaren Befehlen.

### Schritt 2: Besondere 2.0-Befehle

| Befehl | Was es tut |
|--------|------------|
| `/goal` | Startet einen langen, autonomen Agenten-Lauf mit klarem Ziel |
| `/schedule` | Öffnet den Scheduled-Task-Dialog direkt im Chat |
| `/grill-me` | Startet eine interaktive Befragungs-Session |
| `/learn` | Speichert eine Korrektur als dauerhafte Verhaltensregel |
| `/teamwork-preview` | Teilt ein Projekt auf mehrere Sub-Agenten auf |

### Schritt 3: `/grill-me` für Rust-Lernen nutzen

```
> /grill-me
```

**Was passiert:** Der Agent beginnt uns zu befragen – wie in einem mündlichen Examen. Perfekt, um zu testen, ob wir ein Rust-Konzept wirklich verstanden haben.

**Zeilenweise Dekonstruktion:**

- `/grill-me` ohne Thema: Der Agent fragt nach dem Thema.
- `/grill-me Ownership in Rust`: Sofort gezielte Fragen zu Ownership.
- Der Agent hört erst auf, wenn wir alle Fragen korrekt beantwortet haben.

> 🔍 **Nachdenk-Aufgabe:** Welches Rust-Thema würdest du für `/grill-me` wählen?

**Vorschau:** In Projekt 40 kombinieren wir Scheduled Tasks mit automatischen Code-Reviews.

---

## 🖼️ Projekt 40: Automatisierter Lernplan – Alles zusammen in 2.0

**Was wir bauen:** Einen vollautomatischen wöchentlichen Lernzyklus.

### Schritt 1: Den Lernzyklus planen

```
Montag, 08:00 → "Guten Morgen! Welches Rust-Thema nehmen wir diese Woche?"
Mittwoch, 08:00 → "Zwischenfazit: Was hast du bisher gelernt? Drei Stichpunkte."
Freitag, 17:00 → "Wochenabschluss: /grill-me [aktuelles Thema]"
Sonntag, 10:00 → "Lernstand in AGENTS.md aktualisieren."
```

### Schritt 2: Die vier Scheduled Tasks erstellen

Für jeden Eintrag eine eigene Aufgabe mit passender Cron-Expression:

```
Montag:     0 8 * * 1
Mittwoch:   0 8 * * 3
Freitag:    0 17 * * 5
Sonntag:    0 10 * * 0
```

### Schritt 3: Den Lernzyklus starten und beobachten

Lasse den Zyklus zwei Wochen laufen. Danach: Welche Aufgaben haben geholfen? Welche nicht?

> 🔍 **Nachdenk-Aufgabe:** Wie müsste sich der Lernzyklus verändern, wenn du von Phase 1 zu Phase 2 wechselst?

**Vorschau:** In Gruppe 5 tauchen wir in die Antigravity IDE ein – KI direkt im Code-Editor.

---

# 💻 Gruppe 5: Antigravity IDE – KI im Editor

Die Antigravity IDE ist eine **VS-Code-basierte Entwicklungsumgebung**, die KI nicht als Add-on behandelt, sondern als ersten Bürger. Hier arbeiten wir und der Agent gleichzeitig – im selben Fenster, auf denselben Dateien.

---

## 💻 Projekt 41: Die Antigravity IDE einrichten

**Was wir bauen:** Einen konfigurierten Rust-Entwicklungsarbeitsplatz.

### Schritt 1: Den Rust-Workspace öffnen

Öffne die Antigravity IDE und dann deinen Rust-Projektordner.

**Was automatisch passiert:**
- Die IDE erkennt `AGENTS.md` und `.agents/`
- Alle Skills werden geladen
- Die Workspace-Konfiguration wird angewendet

### Schritt 2: Die `rust-analyzer`-Extension prüfen

```
View → Extensions → Suche: rust-analyzer
```

Rust-Analyzer ist das offizielle Rust-Language-Server-Plugin – es gibt uns:
- Autovervollständigung
- Fehler-Unterstreichungen
- Typ-Inferenz-Anzeigen

### Schritt 3: Die Sidebar öffnen

Die Antigravity-Sidebar erscheint rechts (oder links, je nach Einstellung). Sie enthält den Chat-Bereich – genau wie Antigravity 2.0, aber direkt im Editor.

> 🔍 **Nachdenk-Aufgabe:** Was ändert sich an deinem Arbeitsfluss, wenn IDE, Compiler und Agent im selben Fenster sind?

**Vorschau:** In Projekt 42 nutzen wir die Tab-Vervollständigung.

---

## 💻 Projekt 42: Tab-Autocomplete – Der Agent tippt mit

**Was wir bauen:** Ein Gefühl für KI-gestützte Autocomplete.

### Schritt 1: Autocomplete erfahren

Öffne `main.rs` und beginne zu tippen:

```rust
fn main() {
    let mut
```

**Was passiert:** Nach einer kurzen Pause erscheint ein **grauer Vorschlag**. Der Agent schlägt eine Fortsetzung vor, basierend auf dem Kontext.

### Schritt 2: Den Vorschlag annehmen oder ablehnen

- `Tab` → Vorschlag komplett annehmen
- `Esc` → Vorschlag ablehnen
- `Ctrl + →` → Vorschlag wortweise annehmen

**Zeilenweise Dekonstruktion:**

- Der Agent sieht: offene Datei, Cursor-Position, andere offene Tabs, Clipboard (optional).
- Er schlägt das vor, was **statistisch** am wahrscheinlichsten als Nächstes kommt.
- Das bedeutet: Er kann sich irren! Immer prüfen, was er vorschlägt.

### Schritt 3: Bewusst entscheiden

Akzeptiere **nie** einen Vorschlag, ohne ihn zu lesen. Das ist der wichtigste Grundsatz der IDE-Nutzung als Anfänger.

> 🔍 **Nachdenk-Aufgabe:** Wann hilft Autocomplete? Wann hindert es dein Lernen?

**Vorschau:** In Projekt 43 nutzen wir `Ctrl+I` für gezielte Bearbeitungen.

---

## 💻 Projekt 43: Inline-Bearbeitung – `Ctrl+I`

**Was wir bauen:** Einen gezielten Inline-Bearbeitungsworkflow.

### Schritt 1: Code markieren und `Ctrl+I` drücken

Markiere in `main.rs` eine Funktion und drücke `Ctrl+I`.

**Was passiert:** Ein kleines Texteingabefeld erscheint direkt über dem markierten Code.

### Schritt 2: Eine Anweisung eingeben

```
Füge einen deutschen Kommentar über jeder Zeile ein, der erklärt was sie tut.
Schreibe KEINEN neuen Code – nur Kommentare.
```

**Zeilenweise Dekonstruktion:**

- `Ctrl+I` wirkt **nur auf den markierten Bereich**. Der Rest der Datei bleibt unberührt.
- Unsere Anweisung ist präzise: Kommentare hinzufügen, kein neuer Code.
- Das ist ideal für: Dokumentieren, Erklären, kleine Umbenennungen.

### Schritt 3: Das Ergebnis im Diff-Overlay prüfen

Nach der Bearbeitung erscheint das **Diff-Overlay** direkt im Editor:
- Grüne Linien: Hinzugefügte Zeilen
- Rote Linien: Entfernte Zeilen

```
Accept All   |   Reject All   |   Review Each
```

Klicke auf **Review Each**, um jede Änderung einzeln zu prüfen.

> 🔍 **Nachdenk-Aufgabe:** Für welche Arten von Code-Änderungen ist `Ctrl+I` besonders nützlich?

**Vorschau:** In Projekt 44 entdecken wir Code Lenses – die unsichtbaren KI-Buttons.

---

## 💻 Projekt 44: Code Lenses – KI-Buttons direkt im Code

**Was wir bauen:** Einen intuitiven Umgang mit Code-Lens-Aktionen.

### Schritt 1: Code Lenses sehen

Öffne `main.rs` mit einer `fn`-Funktion. Direkt über dem Funktionsnamen erscheinen kleine Links:

```
Refactor | Write Tests | Explain Code | ...
fn main() {
```

**Zeilenweise Dekonstruktion:**

- Code Lenses sind **kontextabhängig** – über einer `struct` erscheinen andere Optionen als über einer `fn`.
- Sie sind immer sichtbar, sobald man in die Nähe scrollt.
- Jeder Klick öffnet eine Interaktion in der Sidebar.

### Schritt 2: „Explain Code" klicken

Klicke auf **Explain Code** über unserer `main`-Funktion.

**Was passiert:** Der Agent erklärt die Funktion Zeile für Zeile in der Sidebar.

### Schritt 3: „Refactor" verstehen (ohne es zu nutzen)

> ⚠️ **Als Anfänger:** Nutze „Refactor" noch nicht! Du lernst Rust, indem du selbst schreibst. „Refactor" lässt den Agenten unseren Code umschreiben – das ist kontraproduktiv fürs Lernen.

> 🔍 **Nachdenk-Aufgabe:** Welche Code-Lens-Aktionen helfen beim Lernen, welche behindern es?

**Vorschau:** In Projekt 45 verstehen wir das Diff-Overlay vollständig.

---

## 💻 Projekt 45: Diff-Overlay meistern – Änderungen im Blick

**Was wir bauen:** Einen kontrollierten Umgang mit allen Änderungen des Agenten.

### Schritt 1: Das Diff-Overlay verstehen

Das Diff-Overlay erscheint immer, wenn der Agent Dateien ändert:

```
← VORHER     |     NACHHER →
─────────────────────────────
fn main() {  |  fn main() {
    let x = 5;│      let x: i32 = 5;  ← Grün: neu
    println!  |      println!
              │  // Ich bin neu      ← Grün: neu
```

### Schritt 2: Die drei Entscheidungsoptionen

- **Accept All**: Alle Änderungen übernehmen. Nur bei Änderungen, die wir vollständig gelesen haben!
- **Reject All**: Alle Änderungen verwerfen. Der Code bleibt unverändert.
- **Review Each**: Jede Änderung einzeln entscheiden. Das ist die **empfohlene Option** für Lernende.

### Schritt 3: Review Each im Detail

Bei **Review Each** navigieren wir durch jede Änderung:
- `Accept` → Diese Änderung übernehmen
- `Reject` → Diese Änderung ablehnen
- Wir können für jede Änderung einzeln entscheiden!

> 🔍 **Nachdenk-Aufgabe:** Warum ist „Accept All" für Lernende gefährlich?

**Vorschau:** In der letzten Gruppe kombinieren wir alles.

---

# 🚀 Gruppe 6: Alles zusammen – Der vollständige Workflow

In dieser Gruppe verbinden wir CLI, AGENTS.md, Skills, Antigravity 2.0 und die IDE zu einem **einzigen, vollständigen Entwicklungsworkflow**. So sieht modernes, KI-gestütztes Lernen im Jahr 2026 aus.

---

## 🚀 Projekt 46: Der vollständige Morgen-Workflow

**Was wir bauen:** Ein tägliches Ritual für produktives Rust-Lernen.

### Schritt 1: 08:00 – Der automatische Morgen-Impuls

Der Scheduled Task aus Projekt 35 stellt uns eine Frage. Wir lesen sie und denken kurz nach.

### Schritt 2: 08:10 – AGENTS.md aktualisieren

Öffne AGENTS.md und update `## Mein aktuelles Problem`:

```markdown
## Mein aktuelles Problem – 2026-06-24

Gestern hat nicht geklappt: `.parse::<i32>()` – ich verstehe nicht,
warum ich `<i32>` in spitzen Klammern schreiben muss.
```

**Zeilenweise Dekonstruktion:**

- Datum im Titel: Der Agent weiß, wie aktuell diese Information ist.
- Konkretes Problem: Kein vages „Ich verstehe Rust nicht", sondern eine präzise Frage.
- `::<i32>()` in Code-Backticks: Der Agent erkennt es als Code-Schnipsel.

### Schritt 3: 08:15 – Die Frage an den Agenten

```
> Sieh dir mein aktuelles Problem in AGENTS.md an. 
  Erkläre mir das Konzept hinter der Syntax ::<i32> – aber gib mir noch keinen Code.
```

### Schritt 4: 08:30 – Code schreiben, selbst

Schreibe selbst. Der Agent beobachtet, hilft bei Fragen, schreibt aber nicht.

> 🔍 **Nachdenk-Aufgabe:** Wie lange solltest du ohne Agenten-Hilfe coden, bevor du fragst?

**Vorschau:** In Projekt 47 bauen wir den vollständigen Fehler-Debug-Workflow.

---

## 🚀 Projekt 47: Der Fehler-Debug-Workflow

**Was wir bauen:** Einen systematischen Prozess für Rust-Fehlermeldungen.

### Schritt 1: Den Fehler produzieren

```bash
cargo build
```

Rust gibt uns eine Fehlermeldung. Wir lesen sie **zuerst selbst**:

```
error[E0382]: borrow of moved value: `s`
  --> src/main.rs:4:20
   |
2  |     let s = String::from("hallo");
   |         - move occurs because `s` has type `String`
3  |     let s2 = s;
   |              - value moved here
4  |     println!("{}", s);
   |                    ^ value borrowed here after move
```

### Schritt 2: Selbst verstehen versuchen

Bevor wir den Agenten fragen:
- Welche Zeile ist betroffen? (Zeile 4)
- Was sagt der Fehlercode? (E0382)
- Was ist ein „moved value"?

### Schritt 3: Den Agenten gezielt fragen

```
> Ich habe diesen Rust-Fehler bekommen: [Fehlermeldung einfügen]
  
  Was ich bereits verstehe: Der Fehler ist in Zeile 4.
  Was ich nicht verstehe: Was bedeutet "value moved here"?
  
  Erkläre mir das Konzept. Kein Code, nur Erklärung.
```

**Zeilenweise Dekonstruktion:**

- `Was ich bereits verstehe:` – Wir zeigen dem Agenten, was er nicht nochmal erklären muss.
- `Was ich nicht verstehe:` – Fokus auf das echte Problem.
- `Kein Code, nur Erklärung:` – Die Regel aus unserer AGENTS.md wird hier wiederholt.

### Schritt 4: Den Fix selbst schreiben

Nach der Erklärung: Schreibe die Lösung selbst. Der Agent schaut zu.

> 🔍 **Nachdenk-Aufgabe:** Was lernst du aus einem Fehler, den du selbst gefixt hast, im Vergleich zu einem, den der Agent gefixt hat?

**Vorschau:** In Projekt 48 bauen wir einen vollständigen Code-Review-Workflow.

---

## 🚀 Projekt 48: Der vollständige Code-Review-Workflow

**Was wir bauen:** Ein systematisches Verfahren, um unseren eigenen Code zu verbessern.

### Schritt 1: Code komplett fertigschreiben

Schreibe „Zahlen raten" vollständig – ohne Agenten-Hilfe beim Code.

### Schritt 2: Selbst-Review

Bevor der Agent draufschaut:

```markdown
# Mein Selbst-Review – Zahlen raten

## Was ich gut gemacht habe
- Klare Variablennamen
- Fehlerfall bei falscher Eingabe abgefangen

## Was ich unsicher finde
- Die Schleife in Zeile 12-20 könnte klarer sein
- Ich weiß nicht, ob mein Ownership-Einsatz korrekt ist

## Fragen an den Agenten
- Ist meine Nutzung von `&str` vs `String` korrekt?
- Gibt es einen rust-ischen Weg, die Eingabe-Konvertierung klarer zu machen?
```

### Schritt 3: Den Agenten-Review starten

```
> @main.rs Hier ist mein Selbst-Review: [einfügen]
  
  Bitte reviewe meinen Code nach deiner Checkliste aus dem rust-code-reviewer Skill.
  Stelle mir nur Fragen – keinen verbesserten Code.
```

### Schritt 4: Auf Fragen antworten und verbessern

Der Agent stellt Fragen. Wir antworten und verbessern selbst.

> 🔍 **Nachdenk-Aufgabe:** Welche Frage des Agenten hat dich am meisten überrascht?

**Vorschau:** In Projekt 49 automatisieren wir Teile unseres Lernplans.

---

## 🚀 Projekt 49: Der automatisierte Monats-Lernplan

**Was wir bauen:** Ein vollständiges Monatsprogramm für Rust-Lernen mit Antigravity.

### Schritt 1: Den Monat planen

```markdown
# Rust-Lernplan – Juli 2026

## Woche 1: Grundlagen festigen (Phase 1 Projekte 1-10)
## Woche 2: Ownership vertiefen (Phase 1 Projekte 11-20)
## Woche 3: Strings & Eingabe (Phase 1 Projekte 21-30)
## Woche 4: Mini-Projekt abschließen ("Zahlen raten" fertig)
```

### Schritt 2: Monatliche Meilenstein-Tasks erstellen

```
1. Juli, 08:00:   Woche 1 Kick-off: "Was nimmst du dir für diese Woche vor?"
8. Juli, 17:00:   Woche 1 Review: "Was hast du in Woche 1 gelernt?"
15. Juli, 17:00:  Halbzeit-Check: "Bist du auf Kurs?"
31. Juli, 17:00:  Monatsabschluss: "/grill-me Phase 1 Grundlagen"
```

### Schritt 3: Die AGENTS.md monatlich resetten

Am Monatsende:
1. Füge einen Abschnitt `## Monat Juni – Gelernt` hinzu
2. Verschiebe erlerntes aus `## Lerne ich` nach `## Kann ich`
3. Füge neue Themen ein
4. Committen: `git commit -m "Lernstand Juli 2026: Phase 1 abgeschlossen"`

> 🔍 **Nachdenk-Aufgabe:** Wie würde dein Lernplan für Phase 2 anders aussehen?

**Vorschau:** Im letzten Projekt bauen wir das ultimative persönliche KI-Lernsystem.

---

## 🚀 Projekt 50: Das vollständige persönliche KI-Lernsystem – Dein Antigravity-Setup

**Was wir bauen:** Eine vollständige, personalisierte Lerninfrastruktur.

### Schritt 1: Die finale Verzeichnisstruktur

```
~/mein-rust-lernen/
├── AGENTS.md                        ← Projektübersicht & Lernstand
├── .agents/
│   ├── AGENTS.md                    ← Verhaltensregeln
│   └── skills/
│       ├── rust-tutor/
│       │   ├── SKILL.md
│       │   └── references/
│       │       └── rust-konzepte.md
│       ├── rust-fehler-erklaerer/
│       │   └── SKILL.md
│       └── rust-code-reviewer/
│           └── SKILL.md
├── src/
│   └── main.rs
├── Cargo.toml
├── SKILL-CHANGELOG.md               ← Skill-Versionsgeschichte
├── lernjournal/
│   ├── 2026-06.md                   ← Monatliches Lernjournal
│   └── 2026-07.md
└── .git/                            ← Versionskontrolle
```

### Schritt 2: Die finale AGENTS.md

```markdown
# AGENTS.md – Rust-Lernsystem 2026

Ich lerne Rust seit [Datum]. Ich bin Anfänger.
Diese Datei steuert meinen KI-Lernpartner.

---

## 🗓️ Aktueller Stand – KW 26/2026

**Phase:** 1 – Grundlagen  
**Projekt:** Zahlen raten (70% fertig)  
**Fokus dieser Woche:** Benutzereingabe mit std::io  
**Letztes Problem:** .parse::<i32>() – GELÖST  
**Aktuelles Problem:** loop vs while – welches wann?  

---

## ✅ Kann ich
- Variablen, mut, Datentypen
- if/else, for-Schleife  
- Grundlegende Benutzereingabe

## 📖 Lerne gerade
- while und loop im Vergleich
- Fehlerfälle mit Eingaben behandeln

## 🔜 Kommt später
- Ownership (verstehe ich noch nicht)
- Borrowing & Lifetimes

---

## ⚙️ Regeln (unveränderlich)
- Sprache: Deutsch
- Kein fertiger Code für Lernaufgaben
- Stelle nach jeder Erklärung eine Frage
- Bei Fehlern: Erst das "Warum", dann das "Wie"

---

## 📁 Struktur
[Verzeichnisstruktur wie oben]
```

### Schritt 3: Das System in Aktion

Ein vollständiger Lernablauf:

```
08:00 → Scheduled Task: Tagesfrage kommt automatisch
08:05 → AGENTS.md aktualisieren: Aktuelles Problem eintragen
08:15 → CLI: Frage an den Agenten, Konzept verstehen
09:00 → IDE: Code selbst schreiben
09:30 → Fehler → Rust-Fehler-Erklärer Skill aktiv
10:00 → Code fertig → Code-Reviewer Skill aktiv
10:30 → Git commit: "loop in Zahlen-raten implementiert"
17:00 → Scheduled Task: Tagesrückblick
```

### Schritt 4: Die Reflexion – Was dieses System bedeutet

Du hast in 50 Projekten gelernt:

| Was | Wie |
|-----|-----|
| Den Agenten starten | `agy` im Terminal |
| Den Agenten steuern | AGENTS.md schreiben |
| Den Agenten erweitern | Skills bauen |
| Den Agenten planen lassen | Scheduled Tasks |
| Den Agenten im Editor nutzen | IDE-Integration |

Aber das Wichtigste: Du hast gelernt, dass **du** der Entscheider bist. Der Agent ist dein Werkzeug, dein Spiegel, dein Sparringspartner – aber nie dein Ghostwriter.

---

> 🦀 **Das Prinzip von 2026:**  
> Der beste KI-Nutzer ist nicht derjenige, der den Agenten am meisten benutzt –  
> sondern derjenige, der ihn am **klügsten** einsetzt.  
>  
> Und das bist jetzt du.

---

## 📚 Alle Ressourcen auf einen Blick

| Ressource | Link |
|---|---|
| Antigravity Dokumentation | [antigravity.google/docs](https://antigravity.google/docs) |
| Skills erstellen | [antigravity.google/docs/skills](https://antigravity.google/docs/skills) |
| Regeln & AGENTS.md | [antigravity.google/docs/rules](https://antigravity.google/docs/rules) |
| MCP-Integration | [antigravity.google/docs/mcp](https://antigravity.google/docs/mcp) |
| Agent-Sicherheit | [antigravity.google/docs/agent-permissions](https://antigravity.google/docs/agent-permissions) |
| Changelog | [antigravity.google/changelog](https://antigravity.google/changelog) |
| Rust-Buch (offiziell) | [doc.rust-lang.org/book](https://doc.rust-lang.org/book/) |
| Rust by Example | [doc.rust-lang.org/rust-by-example](https://doc.rust-lang.org/rust-by-example/) |
| Rustlings | [github.com/rust-lang/rustlings](https://github.com/rust-lang/rustlings) |

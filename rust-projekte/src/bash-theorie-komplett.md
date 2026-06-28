# 🐚 Bash-Theorie: Alle Themen im Überblick

In diesem Kapitel findest du eine vollständige theoretische Übersicht über alle wichtigen Bash-Themen. Es dient als dein Lexikon, wenn du nicht mehr genau weißt, wie ein Konzept funktioniert. Entsprechend unserer Projektregel findest du hier Beschreibungen und Konzepte, aber du darfst dir die konkrete Umsetzung selbst erarbeiten!

## 🧠 Theorie: Was gibt es in der Bash alles?

### 1. Navigation und Dateisystem
- **Wo bin ich?** Wie findest du heraus, in welchem Verzeichnis du dich befindest? (Tipp: *Print Working Directory*)
- **Verzeichnisse wechseln:** Welcher Befehl bringt dich in einen anderen Ordner oder eine Ebene nach oben (`..`)?
- **Inhalte auflisten:** Wie zeigst du alle Dateien an, auch die versteckten?
- **Dateien und Ordner erstellen:** Erinnere dich an die Befehle für neue leere Dateien und neue Verzeichnisse.

### 2. Dateioperationen
- **Kopieren und Verschieben:** Wie lauten die englischen Abkürzungen für *copy* und *move*? Was passiert, wenn du beim Verschieben einen neuen Namen angibst?
- **Löschen:** Wie entfernst du Dateien und wie ganze Ordner mitsamt Inhalt? (Achtung, es gibt keinen Papierkorb!)

### 3. Pipes (`|`) und Umleitungen (`>`, `>>`, `<`)
- **Pipes:** Wie kannst du die Ausgabe eines Programms direkt als Eingabe in ein anderes Programm leiten?
- **Umleitungen:** Was ist der Unterschied zwischen `>` und `>>`, wenn du Text in eine Datei schreiben willst?

### 4. Variablen und Umgebungsvariablen
- **Zuweisung:** Wie speicherst du Werte in Variablen? Denke an die Regel mit den Leerzeichen!
- **Abruf:** Welches Sonderzeichen brauchst du, um den Wert einer Variablen zu lesen?
- **Export:** Wie machst du eine Variable für Unterprogramme verfügbar (`export`)?

### 5. Eingabe und Ausgabe
- **Ausgabe:** Welcher Befehl gibt Text auf dem Bildschirm aus?
- **Eingabe:** Wie wartest du auf Benutzereingaben und speicherst sie in einer Variablen?

### 6. Bedingungen (`if`, `elif`, `else`)
- **Verzweigungen:** Wie strukturierst du eine Abfrage, um verschiedenen Code auszuführen, je nachdem, ob eine Bedingung wahr oder falsch ist?
- **Datei- und String-Tests:** Wie prüfst du, ob eine Datei existiert (`-f`), ein Ordner existiert (`-d`) oder ein String leer ist (`-z`)?

### 7. Schleifen (`for`, `while`, `until`)
- **Zählschleifen (`for`):** Wie führst du Code für jedes Element in einer Liste oder für jede Datei in einem Ordner aus?
- **Bedingungsschleifen (`while`):** Wie lässt du Code so lange laufen, *während* eine Bedingung erfüllt ist?
- **`until`:** Wie lässt du Code laufen, *bis* eine Bedingung erfüllt ist?

### 8. Parameter und Argumente
- **Kommandozeilen-Argumente:** Wie greifst du auf das erste (`$1`), zweite (`$2`) oder alle (`$@`) Argumente zu, die deinem Skript übergeben wurden?
- **Rückgabewerte:** Wie findest du heraus, ob der letzte Befehl erfolgreich war (`$?`)?

### 9. Funktionen
- **Struktur:** Wie verpackst du Codeblöcke in einer Funktion, um sie später durch Aufruf ihres Namens wiederzuverwenden?
- **Argumente in Funktionen:** Wie greifst du innerhalb einer Funktion auf Parameter zu? (Tipp: Genau wie beim Skript selbst!)

### 10. Command Substitution (Befehlsersetzung)
- **Ergebnisse speichern:** Wie führst du einen Befehl aus und speicherst seine Ausgabe direkt in einer Variablen? (Syntax: `$(Befehl)`)

### 11. Arithmetik
- **Rechnen:** Bash ist keine Mathe-Software, aber einfache Berechnungen sind möglich. Wie lautet die Syntax mit doppelten Klammern (`$(( ... ))`)?

### 12. Arrays
- **Listen speichern:** Wie definierst du ein Array und wie greifst du auf das erste Element (Index 0) zu?

### 13. Textverarbeitung
- **Werkzeuge:** Wofür nutzt man `grep` (Suchen), `sed` (Ersetzen), `awk` (Spaltenverarbeitung) und `cut` (Ausschneiden)?

### 14. Berechtigungen (`chmod`, `chown`)
- **Ausführbar machen:** Wie machst du dein neues Skript ausführbar? (`chmod +x`)

### 15. Prozessverwaltung
- **Hintergrund:** Wie startest du ein Programm im Hintergrund (`&`)?
- **Beenden:** Wie beendest du einen Prozess (`kill`), wenn er sich aufgehängt hat?

---

## 🛠️ Praxis-Aufgaben

1. **Aufgabe A (Dateisystem & Navigation):** Navigiere in dein Home-Verzeichnis, erstelle einen Ordner "BashTest", wechsle hinein, erstelle drei leere Dateien und liste sie alle auf.
2. **Aufgabe B (Pipes & Textverarbeitung):** Lass dir alle Dateien im aktuellen Verzeichnis auflisten und filtere die Ausgabe mit `grep`, sodass nur `.md`-Dateien angezeigt werden.
3. **Aufgabe C (Skript mit Argumenten):** Schreibe ein Skript, das zwei Argumente annimmt. Überprüfe, ob beide Argumente vorhanden sind. Wenn ja, gib sie aus. Wenn nicht, zeige eine Fehlermeldung.

---

## 🚀 50 Projektvorschläge

### Einstieg (1-10)
1. Ein Skript, das "Hallo [Dein Name]" ausgibt.
2. Ein Ordner-Ersteller: Fragt nach einem Namen und erstellt den Ordner.
3. Ein Backup-Skript: Kopiert eine Datei mit dem Zusatz `.bak`.
4. Ein System-Info-Skript: Gibt das aktuelle Datum und den User aus.
5. Ein Taschenrechner für Addition.
6. Ein Passwort-Generator (z.B. mit `openssl rand`).
7. Ein Skript, das zählt, wie viele Dateien im Ordner sind.
8. Ein Wetter-Abfrager (`curl wttr.in`).
9. Ein Gruß-Skript, das je nach Uhrzeit "Guten Morgen" oder "Guten Abend" sagt.
10. Ein Skript, das alle `.txt` in `.md` umbenennt.

### Mittel (11-25)
11. Ein To-Do-Listen-Manager (hinzufügen und anzeigen).
12. Ein Skript, das alte Logs löscht (älter als 7 Tage).
13. Ein automatisiertes Git-Commit-Skript.
14. Ein Quiz-Spiel im Terminal.
15. Ein Skript, das eine zufällige Zeile aus einer Datei liest.
16. Ein Systemressourcen-Monitor (`top` zusammenfassen).
17. Ein Skript zum Herunterladen einer Liste von URLs.
18. Ein Text-Ersetzer für mehrere Dateien.
19. Ein Adressbuch-Skript (Suchen, Hinzufügen, Löschen).
20. Ein Skript, das prüft, ob eine Website online ist.
21. Ein Ordner-Synchronisierer (einfaches `rsync`-Wrapper).
22. Ein Skript zum Extrahieren von Archiven je nach Typ (`.tar.gz`, `.zip`).
23. Ein Festplattenplatz-Warner (schickt eine Nachricht ab 90%).
24. Ein Skript, das Bilder verkleinert (mit ImageMagick).
25. Ein Timer/Stopuhr-Skript.

### Fortgeschritten (26-40)
26. Ein Menü-gesteuertes Administrations-Tool.
27. Ein Parser für CSV-Dateien.
28. Ein Skript, das einen Daemon/Service überwacht und ggf. neustartet.
29. Ein Chat-Client über Netcat (`nc`).
30. Ein Skript, das Datenbank-Backups rotiert.
31. Ein automatischer Deployment-Skript für Server.
32. Ein Log-Analysator, der die häufigsten Fehler zählt.
33. Ein Skript, das Änderungen in einem Ordner überwacht.
34. Ein eigener einfacher Paketmanager.
35. Ein Skript zur Verwaltung von SSH-Schlüsseln.
36. Ein Netzwerk-Scanner (`nmap` Wrapper).
37. Ein Skript, das System-Metriken in einer SQLite-Datenbank speichert.
38. Ein dynamischer MOTD (Message of the Day) Generator.
39. Ein Skript zum automatischen Einrichten neuer Benutzerkonten.
40. Ein JSON-Parser in reinem Bash.

### Challenge (41-50)
41. Ein Webserver in reinem Bash (mit Netcat).
42. Ein eigener kleiner Kommandozeilen-Interpreter (Shell in einer Shell).
43. Ein Tetris-Klon im Terminal.
44. Ein asynchroner Task-Runner.
45. Ein Verschlüsselungstool (Wrapper für GPG) mit Menü.
46. Ein Versionskontrollsystem in sehr einfach (ähnlich Git).
47. Ein Daemon in Bash geschrieben.
48. Ein Tool zur Visualisierung von Verzeichnisbäumen (wie `tree`).
49. Ein Markdown-zu-HTML-Konverter in Bash.
50. Ein KI-Agent Wrapper in Bash (Kommunikation mit einer API per `curl`).

---

## 💡 Zusammenfassung

| Begriff | Erklärung |
|---------|-----------|
| `cd`, `pwd`, `ls` | Befehle zur Navigation im Dateisystem. |
| Pipes (`\|`) | Verbinden die Ausgabe eines Befehls mit der Eingabe des nächsten. |
| `>` und `>>` | Umleitung von Ausgaben in Dateien (überschreiben vs. anhängen). |
| `$1`, `$2`, `$@` | Kommandozeilenargumente für Skripte. |
| `$(Befehl)` | Command Substitution – führt einen Befehl aus und nutzt das Ergebnis. |
| `chmod +x` | Macht eine Datei ausführbar (wichtig für Skripte). |
| `grep`, `sed`, `awk` | Die "Heilige Dreifaltigkeit" der Textverarbeitung im Terminal. |

---

## 📚 Weiterführende Links
- Suche im Terminal nach Hilfe mit `man [Befehl]` (z.B. `man ls`).
- Tausche dich mit der Community über [StackOverflow](https://stackoverflow.com/) aus.
- Baue einige der [Bash-Projektvorschläge](./bash-projektvorschlaege.md), um die Theorie in die Praxis umzusetzen!

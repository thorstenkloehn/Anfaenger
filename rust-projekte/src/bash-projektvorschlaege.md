# 50+ Bash-Projektvorschläge für Anfänger und Fortgeschrittene

Hier ist eine umfangreiche Liste mit über 50 Projektideen, die du ausschließlich mit Bash umsetzen kannst. Entsprechend der Lernregeln gibt es hier **keine fertigen Lösungen**, sondern nur die Projektbeschreibungen. Die Lösungen und Lektionen dazu erarbeiten wir separat!

## Kategorie 1: Grundlagen, Dateien und Textverarbeitung
1. **Hello User:** Ein Skript, das dich nach deinem Namen fragt und dich tageszeitabhängig (Guten Morgen, Guten Abend) begrüßt.
2. **Ordner-Struktur-Generator:** Ein Skript, das automatisch eine vordefinierte Ordnerstruktur für neue Projekte anlegt (z. B. `src`, `docs`, `tests`, `assets`).
3. **Massen-Umbenenner:** Ein Skript, das alle `.txt`-Dateien in einem Ordner in `.md`-Dateien umbenennt oder ein Datum an den Dateinamen anhängt.
4. **Wortzähler:** Ein Skript, das eine Textdatei einliest und ausgibt, wie viele Zeilen, Wörter und Zeichen sie enthält (ähnlich wie `wc`, aber selbst gebaut).
5. **Passwort-Generator:** Ein Skript, das ein zufälliges Passwort in einer bestimmten Länge (z.B. durch Parameter übergeben) generiert.
6. **ToDo-Listen-Verwaltung:** Aufgaben hinzufügen, als erledigt markieren oder anzeigen (Speicherung in einer versteckten Datei).
7. **Dateiendungs-Sortierer:** Ein Skript, das einen Download-Ordner aufräumt und Dateien anhand ihrer Endung in Unterordner (Bilder, Dokumente, Videos) verschiebt.
8. **Logfile-Analysator:** Ein Skript, das eine Fehler-Logdatei durchsucht und nur die Zeilen ausgibt, die das Wort "ERROR" oder "CRITICAL" enthalten.
9. **CSV-Spalten-Extrahierer:** Ein Tool, das aus einer CSV-Datei (z. B. mit Nutzerdaten) nur eine bestimmte Spalte (z.B. E-Mail-Adressen) extrahiert und bereinigt ausgibt.

## Kategorie 2: Systemüberwachung und Systeminfos
11. **System-Info-Dashboard:** Ein Skript, das den aktuellen Benutzer, die Kernel-Version, die Uptime und die IP-Adresse übersichtlich anzeigt.
12. **Speicherplatz-Warnung:** Ein Skript, das prüft, ob eine Festplattenpartition mehr als 90% belegt ist, und dann eine Warnung im Terminal ausgibt.
13. **RAM-Monitor:** Ein Skript, das in einer Endlosschleife (z. B. alle 5 Sekunden) den aktuell freien Arbeitsspeicher anzeigt.
14. **Prozess-Killer:** Ein interaktives Skript, das nach einem Programm-Namen fragt, die Prozess-ID (PID) ermittelt und dich fragt, ob es beendet werden soll.
15. **Batterie-Status:** Ein Skript für Laptops, das den aktuellen Akkustand in Prozent anzeigt und bei unter 10% eine Meldung generiert.
16. **User-Login-Historie:** Zeigt an, welche Benutzer sich in den letzten 24 Stunden am System angemeldet haben.
17. **Temperatur-Anzeige:** Liest die aktuellen CPU-Temperaturen aus und warnt, falls diese zu hoch sind.
18. **Papierkorb-Leerer:** Ein Skript, das den Inhalt des Papierkorbs (unter Linux meist in `~/.local/share/Trash`) nach Bestätigung endgültig löscht.
19. **Cronjob-Lister:** Ein Skript, das übersichtlich alle aktiven automatisierten Aufgaben (Cronjobs) des aktuellen Benutzers anzeigt.
20. **Große-Dateien-Finder:** Sucht im aktuellen Verzeichnis nach den 10 größten Dateien und listet sie nach Größe sortiert auf.

## Kategorie 3: Netzwerk und Internet
21. **Website-Verfügbarkeitsprüfer:** Ein Skript, das eine Liste von URLs anpingt und anzeigt, ob diese erreichbar ("UP") oder down ("DOWN") sind.
22. **Lokaler IP-Scanner:** Pingt alle IPs im lokalen Subnetz an, um herauszufinden, welche Geräte aktuell online sind.
23. **Wetter-Anzeige:** Nutzt `curl` und einen Dienst wie `wttr.in`, um das aktuelle Wetter für eine eingegebene Stadt im Terminal anzuzeigen.
24. **Internet-Speedtest:** Ein simples Skript, das eine Test-Datei herunterlädt, die Zeit misst und grob die Downloadrate berechnet.
25. **Port-Scanner (Einfach):** Prüft mithilfe von Bash-Boardmitteln oder netcat, ob bestimmte Ports (z.B. 80, 443, 22) auf einem Server geöffnet sind.
26. **MAC-Adressen-Spoofer:** Ein Skript, das die Netzwerkkarte deaktiviert, eine neue zufällige MAC-Adresse setzt und sie wieder aktiviert (Benötigt Root).
27. **SSH-Login-Manager:** Ein Menü, in dem man verschiedene Server auswählen kann, woraufhin das Skript automatisch die SSH-Verbindung dorthin aufbaut.
28. **Download-Manager:** Ein Skript, das eine Textdatei mit URLs einliest und diese nacheinander herunterlädt.
29. **Öffentliche IP abfragen:** Ein Einzeiler-Skript, das deine aktuelle öffentliche IP-Adresse über einen externen Dienst abfragt und anzeigt.
30. **Podcast-Downloader:** Prüft einen RSS-Feed mittels `curl` und lädt die neueste MP3-Datei herunter.

## Kategorie 4: Backups und Sicherheit
31. **Einfaches Ordner-Backup:** Packt ein angegebenes Verzeichnis als `.tar.gz`-Archiv und speichert es mit dem aktuellen Datum im Dateinamen im Backup-Ordner.
32. **Inkrementelles Backup-Skript:** Nutzt `rsync` im Hintergrund, um nur die Dateien zu sichern, die sich seit dem letzten Backup geändert haben.
33. **MySQL/MariaDB-Datenbank-Dumper:** Verbindet sich mit der Datenbank und erstellt einen Dump aller Tabellen als SQL-Datei.
34. **Verzeichnis-Überwacher:** Speichert Hashwerte von wichtigen Dateien. Bei erneutem Ausführen wird geprüft, ob sich eine Datei unerlaubt verändert hat.
35. **Passwort-Stärke-Prüfer:** Ein Skript, das ein eingegebenes Passwort prüft (Mindestlänge, Groß-/Kleinschreibung, Zahlen, Sonderzeichen) und eine Bewertung ausgibt.
36. **Alte-Backups-Löscher:** Sucht in einem Backup-Verzeichnis nach Archiven, die älter als 30 Tage sind, und löscht diese.
37. **Verschlüsselungs-Tool:** Ein Wrapper für GPG, der eine Datei per Menüauswahl entweder verschlüsselt oder entschlüsselt.
38. **Rechte-Reparierer:** Setzt alle Ordner in einem Verzeichnis auf chmod 755 und alle Dateien auf chmod 644.
39. **USB-Backup-Automatisierung:** Ein Skript, das erkennt, wenn ein bestimmter USB-Stick eingesteckt wird, und dann automatisch Daten kopiert.
40. **SSH-Key-Verteiler:** Ein Skript, das deinen öffentlichen SSH-Schlüssel automatisch auf eine Liste von Servern kopiert.

## Kategorie 5: Spaß, Spiele & Kreatives
41. **Zahlenraten-Spiel:** Das Skript generiert eine Zufallszahl zwischen 1 und 100. Du musst raten und das Skript sagt "Zu hoch" oder "Zu niedrig".
42. **Schere-Stein-Papier:** Du spielst gegen das Terminal.
43. **ASCII-Art-Banner:** Ein Skript, das einen eingegebenen Text mithilfe von Tools wie `figlet` oder `toilet` (oder selbst gebaut) als großes Banner ausgibt.
44. **Terminal-Uhr:** Eine Digitaluhr im Terminal, die sich jede Sekunde aktualisiert (mittels `clear` und `date`).
45. **Zufalls-Zitat-Generator:** Liest eine Datei mit Zitaten ein und gibt bei jedem Aufruf ein zufälliges Zitat aus.
46. **Tic-Tac-Toe:** Eine einfache Version des Spiels, die im Terminal gezeichnet wird. Du wählst die Koordinaten per Eingabe.
47. **Stoppuhr & Countdown:** Ein Skript, bei dem man eine Zeit in Sekunden eingeben kann, die dann im Terminal runtergezählt wird.
48. **Vokabel-Trainer:** Ein Skript, das dir ein deutsches Wort anzeigt, auf deine englische Eingabe wartet und dann sagt, ob es richtig war.
49. **Lottozahlen-Generator:** Zieht 6 zufällige, nicht doppelte Zahlen aus dem Pool von 1 bis 49.
50. **Der magische 8-Ball:** Du stellst eine Ja/Nein-Frage und das Skript gibt eine von 20 zufälligen, mystischen Antworten.
51. **Taschenrechner-Menü:** Ein kleines Menü, bei dem du Addition, Subtraktion etc. wählen kannst und dann die beiden Zahlen eingibst.
52. **Mad Libs (Wortspiel):** Das Skript fragt nach verschiedenen Wortarten (Nomen, Verb, Adjektiv) und setzt sie in eine lustige, vorgefertigte Geschichte ein.
53. **Pomodoro-Timer:** Ein Timer für die Arbeit (25 Minuten), gefolgt von einer Pause (5 Minuten), mit Benachrichtigung am Ende.

---
**Hinweis für den Lernpfad:** 
Wir können nun eine dieser Ideen auswählen und daraus eine Schritt-für-Schritt-Lektion machen. Dabei werde ich dir keine fertigen Skripte vorgeben, sondern dir immer Fragen stellen, dir die benötigten Bash-Befehle erklären und dich zum Ziel führen. Welche Idee wollen wir als Erstes angehen?

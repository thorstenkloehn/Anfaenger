# 💻 Codex CLI – Der 100+ Praxis-Übungen Katalog

Willkommen zur ultimativen Praxis-Lektion! Hier findest du über 100 kompakte Übungen, um den Umgang mit der Codex CLI (oder ähnlichen KI-Assistenten) zu meistern. Die Übungen sind in fünf Kategorien unterteilt und sollen dich zum Ausprobieren und Nachdenken anregen. 

Es gibt hier **keine fertigen Lösungen** – das Ziel ist es, dass du selbst lernst, wie du der KI die richtigen Fragen stellst und die Werkzeuge effektiv nutzt!

---

## 1. Workflows & Steuerung
Lerne, wie du deine Arbeit organisierst und den Assistenten effizient steuerst.

1. **Aufgabe:** Zeige alle aktuellen Aufgaben an. **Hinweis:** Nutze den passenden List-Befehl oder Slash-Command.
2. **Aufgabe:** Wechsle in einen neuen Branch für ein Feature. **Hinweis:** Denke an `git checkout -b` oder lass die CLI das machen.
3. **Aufgabe:** Erstelle einen Commit für deine letzten Änderungen. **Hinweis:** Lass die CLI eine gute Commit-Message vorschlagen.
4. **Aufgabe:** Pausiere die aktuelle Aufgabe und starte eine andere. **Hinweis:** Speichere den Zustand oder nutze Stashing.
5. **Aufgabe:** Frage die CLI nach dem Status des aktuellen Projekts. **Hinweis:** Lass dir eine kurze Zusammenfassung generieren.
6. **Aufgabe:** Setze einen Timer für die aktuelle Aufgabe. **Hinweis:** Nutze `/schedule` oder ähnliche Befehle, falls vorhanden.
7. **Aufgabe:** Führe einen Befehl im Hintergrund aus. **Hinweis:** Denke an asynchrone Tasks.
8. **Aufgabe:** Überprüfe die Logs des letzten fehlgeschlagenen Befehls. **Hinweis:** Frage gezielt nach dem Fehlerprotokoll.
9. **Aufgabe:** Zeige die Änderungen zum letzten Commit an. **Hinweis:** Nutze einen Git Diff-Befehl.
10. **Aufgabe:** Beende alle laufenden Subagenten. **Hinweis:** Gibt es einen Befehl wie `/kill` oder ähnliches?
11. **Aufgabe:** Starte einen neuen Workspace für ein Experiment. **Hinweis:** Isoliere deine Umgebung, um nichts kaputt zu machen.
12. **Aufgabe:** Erstelle ein neues Verzeichnis für Skripte. **Hinweis:** Nutze Dateisystem-Befehle oder bitte die KI darum.
13. **Aufgabe:** Benenne eine Datei um. **Hinweis:** Achte darauf, dass Referenzen im Code intakt bleiben.
14. **Aufgabe:** Verschiebe ein Modul in einen anderen Ordner. **Hinweis:** Denke an die Pfadanpassungen in deinen Imports.
15. **Aufgabe:** Lösche eine temporäre Datei sicher. **Hinweis:** Prüfe vorher, ob sie wirklich nicht mehr gebraucht wird.
16. **Aufgabe:** Finde heraus, in welchem Verzeichnis du dich befindest. **Hinweis:** `pwd` ist dein Freund.
17. **Aufgabe:** Ändere die Zugriffsrechte einer ausführbaren Datei. **Hinweis:** `chmod` könnte hier sehr nützlich sein.
18. **Aufgabe:** Suche nach allen Dateien, die heute geändert wurden. **Hinweis:** Finde den passenden Suchbefehl für dein Betriebssystem.
19. **Aufgabe:** Zeige die Dateigröße des Build-Ordners an. **Hinweis:** Finde heraus, wie viel Platz verbraucht wird.
20. **Aufgabe:** Überprüfe die laufenden Hintergrundprozesse. **Hinweis:** Schau dir die aktiven Tasks deiner Session an.

---

## 2. Automatisieren
Routineaufgaben kosten Zeit – lass die Maschine für dich arbeiten.

21. **Aufgabe:** Erstelle ein Skript, das dein Projekt baut. **Hinweis:** Fasse die Build-Befehle zusammen.
22. **Aufgabe:** Lass die CLI wiederkehrende Tests ausführen. **Hinweis:** Nutze Watcher oder Cron-Jobs.
23. **Aufgabe:** Automatisiere das Formatieren des Codes vor jedem Commit. **Hinweis:** Denke an Git Hooks.
24. **Aufgabe:** Schreibe ein Skript zum Aufräumen temporärer Dateien. **Hinweis:** Finde und lösche alle `.tmp` Dateien.
25. **Aufgabe:** Automatisiere die Generierung von Dokumentation. **Hinweis:** Führe den Doc-Generator automatisch aus.
26. **Aufgabe:** Erstelle ein einfaches Release-Skript. **Hinweis:** Version hochzählen, Taggen, und Bauen zusammenfassen.
27. **Aufgabe:** Lass die CLI automatisch Abhängigkeiten aktualisieren. **Hinweis:** Gibt es einen Paketmanager-Befehl für Updates?
28. **Aufgabe:** Automatisiere den Upload von Assets. **Hinweis:** Erstelle ein Skript für den Transfer zum Server.
29. **Aufgabe:** Richte ein regelmäßiges Backup der Datenbank ein. **Hinweis:** Nutze einen Scheduler oder Cron.
30. **Aufgabe:** Erstelle ein Skript, das die Logs analysiert und Fehler meldet. **Hinweis:** Filtern und nach `ERROR` suchen.
31. **Aufgabe:** Lass die CLI automatisch Code-Metriken sammeln. **Hinweis:** Setze Tools zur statischen Code-Analyse ein.
32. **Aufgabe:** Automatisiere das Setzen von Umgebungsvariablen. **Hinweis:** Erstelle ein Setup-Skript für `.env` Dateien.
33. **Aufgabe:** Schreibe ein Skript, das die Projektstruktur validiert. **Hinweis:** Prüfe, ob alle nötigen Ordner existieren.
34. **Aufgabe:** Automatisiere das Erstellen neuer Komponenten. **Hinweis:** Lass dir Boilerplate-Code generieren.
35. **Aufgabe:** Richte einen automatischen Neustart des Servers bei Codeänderungen ein. **Hinweis:** Nutze Watch-Tools wie Nodemon.
36. **Aufgabe:** Lass die CLI veraltete Branches aufräumen. **Hinweis:** Finde und lösche bereits gemergte Git-Branches.
37. **Aufgabe:** Automatisiere den Download von Testdaten. **Hinweis:** Schreibe ein Skript mit `curl` oder `wget`.
38. **Aufgabe:** Erstelle ein Skript, das die Datenbank zurücksetzt und neu füllt. **Hinweis:** Seed-Skripte sind hier ideal.
39. **Aufgabe:** Automatisiere die Überprüfung auf tote Links in der Doku. **Hinweis:** Lass einen Link-Crawler laufen.
40. **Aufgabe:** Lass die CLI automatisch Warnungen aus dem Build-Prozess fixen. **Hinweis:** Nutze Linter mit Auto-Fix Funktionen.

---

## 3. Projekt Wissendatenbank
Verstehe dein Projekt besser, indem du gezielt Informationen sammelst und dokumentierst.

41. **Aufgabe:** Lass die CLI die Architektur des Projekts beschreiben. **Hinweis:** Frage nach einer groben High-Level Übersicht.
42. **Aufgabe:** Dokumentiere eine komplexe Funktion. **Hinweis:** Lass dir einen ausführlichen Docstring generieren.
43. **Aufgabe:** Erstelle ein Glossar der wichtigsten Projektbegriffe. **Hinweis:** Sammle Abkürzungen und deren Definitionen.
44. **Aufgabe:** Finde heraus, warum eine bestimmte Entscheidung getroffen wurde. **Hinweis:** Suche in alten Commits oder Pull Requests.
45. **Aufgabe:** Lass dir erklären, wie das Authentifizierungssystem funktioniert. **Hinweis:** Bitte um eine schrittweise Erklärung.
46. **Aufgabe:** Dokumentiere die Schritte zum Aufsetzen der Entwicklungsumgebung. **Hinweis:** Schreibe oder aktualisiere die `README.md`.
47. **Aufgabe:** Erstelle eine Übersicht aller API-Endpunkte. **Hinweis:** Sammle Routen, Methoden und Parameter.
48. **Aufgabe:** Lass die CLI ein UML-Diagramm der Datenbankstruktur entwerfen. **Hinweis:** Nutze Mermaid-Syntax für Diagramme.
49. **Aufgabe:** Fasse die Änderungen des letzten Monats zusammen. **Hinweis:** Generiere einen Changelog aus der Git-Historie.
50. **Aufgabe:** Finde alle TODO-Kommentare im Code. **Hinweis:** Nutze eine textbasierte Suche projektweit.
51. **Aufgabe:** Lass dir die Abhängigkeiten eines bestimmten Moduls auflisten. **Hinweis:** Untersuche die Imports der Datei.
52. **Aufgabe:** Dokumentiere, wie man einen neuen Test schreibt. **Hinweis:** Erstelle einen kleinen Leitfaden für Mitentwickler.
53. **Aufgabe:** Finde heraus, welche Version einer Bibliothek verwendet wird. **Hinweis:** Prüfe die Manifest-Datei deines Paketmanagers.
54. **Aufgabe:** Lass die CLI eine Liste bekannter Fehler erstellen. **Hinweis:** Sammle Bug-Reports aus dem Issue-Tracker oder Code-Kommentaren.
55. **Aufgabe:** Erkläre den Unterschied zwischen zwei ähnlichen Modulen. **Hinweis:** Vergleiche ihre Funktionalität und Verwendung.
56. **Aufgabe:** Dokumentiere das Datenmodell einer zentralen Entität. **Hinweis:** Beschreibe Felder, Datentypen und Relationen.
57. **Aufgabe:** Lass dir zeigen, wie das Fehlerhandling implementiert ist. **Hinweis:** Untersuche die Error-Klassen und Catch-Blöcke.
58. **Aufgabe:** Erstelle eine Liste von Best Practices für das Projekt. **Hinweis:** Sammle Stilregeln und Architektur-Konventionen.
59. **Aufgabe:** Finde heraus, wer der Hauptautor einer bestimmten Datei ist. **Hinweis:** Nutze `git blame`.
60. **Aufgabe:** Lass die CLI ein Inhaltsverzeichnis für die Dokumentation generieren. **Hinweis:** Strukturiere die Themen logisch und übersichtlich.

---

## 4. Auf bessere Lösungen kommen
Verbessere deinen Code und lerne neue Architektur-Konzepte kennen.

61. **Aufgabe:** Bitte die CLI, eine langsame Funktion zu optimieren. **Hinweis:** Frage gezielt nach Performance-Verbesserungen.
62. **Aufgabe:** Lass deinen Code auf Sicherheitslücken prüfen. **Hinweis:** Bitte um einen kompakten Security-Review.
63. **Aufgabe:** Frage nach alternativen Ansätzen für eine Architektur-Entscheidung. **Hinweis:** Diskutiere Vor- und Nachteile mit der KI.
64. **Aufgabe:** Lass dir helfen, einen schwer zu findenden Bug zu debuggen. **Hinweis:** Beschreibe das Symptom und den Kontext so genau wie möglich.
65. **Aufgabe:** Bitte um Vorschläge für aussagekräftigere Variablennamen. **Hinweis:** Zeige einen unverständlichen Code-Block und bitte um Refactoring.
66. **Aufgabe:** Lass die CLI redundanten Code refactoren. **Hinweis:** Suche nach doppelter Logik, die sich abstrahieren lässt.
67. **Aufgabe:** Frage nach Design-Patterns, die für dein Problem passen könnten. **Hinweis:** Beschreibe die Anforderungen, nicht den Code.
68. **Aufgabe:** Bitte um Feedback zu deiner Fehlerbehandlung. **Hinweis:** Zeige, wie du Exceptions abfängst und frage nach Edge-Cases.
69. **Aufgabe:** Lass dir erklären, warum ein bestimmter Test fehlschlägt. **Hinweis:** Teile die Fehlermeldung und den Testcode.
70. **Aufgabe:** Frage nach Möglichkeiten, den Speicherverbrauch zu senken. **Hinweis:** Bitte um eine Analyse deiner Datenstrukturen.
71. **Aufgabe:** Lass die CLI eine rekursive Funktion in eine iterative umschreiben. **Hinweis:** Das hilft oft gegen Stack-Overflows.
72. **Aufgabe:** Bitte um Vorschläge, wie man asynchronen Code lesbarer macht. **Hinweis:** Frage nach Mustern wie Promises oder Async/Await.
73. **Aufgabe:** Lass dir zeigen, wie man einen Code-Block testbarer macht. **Hinweis:** Denke an Konzepte wie Dependency Injection.
74. **Aufgabe:** Frage nach Tipps zur Vermeidung von Race Conditions. **Hinweis:** Diskutiere Concurrency-Probleme.
75. **Aufgabe:** Bitte um eine Code-Review aus der Perspektive eines Seniors. **Hinweis:** Bitte um ungeschöntes, kritisches Feedback.
76. **Aufgabe:** Lass die CLI komplexe Regex-Ausdrücke vereinfachen oder erklären. **Hinweis:** Teile den unleserlichen Ausdruck.
77. **Aufgabe:** Frage nach Möglichkeiten, die Startzeit der Anwendung zu verkürzen. **Hinweis:** Diskutiere Caching oder Lazy Loading.
78. **Aufgabe:** Bitte um Ideen, wie man die User Experience im CLI-Tool verbessern könnte. **Hinweis:** Beschreibe den aktuellen Ablauf für den Nutzer.
79. **Aufgabe:** Lass dir zeigen, wie man Konfigurationsdaten besser verwaltet. **Hinweis:** Diskutiere Environment-Variablen vs. Config-Dateien.
80. **Aufgabe:** Frage, ob es eine gute Standardbibliothek für dein Problem gibt. **Hinweis:** Vermeide es, das Rad neu zu erfinden.

---

## 5. MCP Server nutzen
Erweitere die Fähigkeiten der KI durch externe Tools und APIs.

81. **Aufgabe:** Lass dir alle aktuell verfügbaren MCP-Tools auflisten. **Hinweis:** Nutze den CLI-Befehl zur Tool-Discovery.
82. **Aufgabe:** Nutze ein externes Tool, um aktuelle Wetterdaten abzufragen. **Hinweis:** Suche nach einem Wetter-MCP und teste es.
83. **Aufgabe:** Lass die CLI über einen MCP-Server in einer externen Datenbank suchen. **Hinweis:** Formuliere eine klare Query für das Tool.
84. **Aufgabe:** Nutze ein Übersetzungs-Tool via MCP für eine Textdatei. **Hinweis:** Übergib den Text an den Übersetzungs-Server.
85. **Aufgabe:** Lass ein MCP-Tool ein Bild oder Dokument analysieren. **Hinweis:** Stelle sicher, dass das Tool Vision oder OCR unterstützt.
86. **Aufgabe:** Nutze einen MCP-Server, um eine Benachrichtigung zu versenden. **Hinweis:** Finde das Mail- oder Chat-Tool und übergib die Parameter.
87. **Aufgabe:** Lass die CLI über ein MCP-Tool externe Tickets abfragen. **Hinweis:** Verbinde dich mit einem Issue-Tracker-Server (z.B. Jira/GitHub).
88. **Aufgabe:** Nutze ein Tool, um einen Termin oder Timer extern zu erstellen. **Hinweis:** Übergib Datum, Zeit und Titel.
89. **Aufgabe:** Lass ein MCP-Tool eine Webseite scrapen. **Hinweis:** Gib die URL an und frage nach dem Textinhalt.
90. **Aufgabe:** Nutze einen MCP-Server zur Konvertierung von Dateiformaten. **Hinweis:** Lass z.B. Markdown in HTML umwandeln.
91. **Aufgabe:** Lass ein Tool aktuelle Marktdaten oder Kurse abfragen. **Hinweis:** Nutze einen Finanz-Daten-Server.
92. **Aufgabe:** Nutze ein MCP-Tool, um Logs in einem externen System zu durchsuchen. **Hinweis:** Verbinde dich mit dem Logging-Server.
93. **Aufgabe:** Lass die CLI über einen MCP-Server eine komplexe Berechnung durchführen. **Hinweis:** Nutze ein Mathe-Tool für Formeln.
94. **Aufgabe:** Nutze ein externes Tool, um einen Text auf Grammatik zu prüfen. **Hinweis:** Übergib den Text an den Grammar-Server.
95. **Aufgabe:** Lass ein MCP-Tool einen Hash oder eine Signatur generieren. **Hinweis:** Gib den Text als Parameter an das Security-Tool.
96. **Aufgabe:** Nutze einen Server, um Geodaten abzufragen. **Hinweis:** Finde die Koordinaten einer bestimmten Adresse heraus.
97. **Aufgabe:** Lass ein Tool ein sicheres Passwort generieren. **Hinweis:** Nutze ein Security-MCP für zufällige Strings.
98. **Aufgabe:** Nutze ein MCP-Tool, um Daten zu visualisieren. **Hinweis:** Übergib Rohdaten und erhalte z.B. einen ASCII-Graphen.
99. **Aufgabe:** Lass die CLI über ein Tool aktuelle News abfragen. **Hinweis:** Suche nach einem Nachrichten-Server in deiner Tool-Liste.
100. **Aufgabe:** Nutze ein Tool, um einen Webhook auszulösen. **Hinweis:** Finde das Request-MCP und übergib URL und Payload.

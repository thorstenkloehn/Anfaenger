# 15 Zeitroutinen (time.h)

Manchmal muss dein Programm wissen, wie spät es ist, oder messen, wie schnell es läuft. In C gibt es dafür die Standardbibliothek `<time.h>`. In diesem Kapitel lernst du, wie du die Zeit misst, Pausen einlegst und Datumsangaben verarbeitest.

---

## 15.1 Die Funktion clock()

Die Funktion `clock()` misst die vom Programm verbrauchte CPU-Zeit. Das ist nicht zwingend die reale Zeit, die auf deiner Wanduhr vergeht (Wandzeit), sondern die Rechenzeit, die der Prozessor tatsächlich für dein Programm aufgewendet hat.

### Datentyp und Umrechnung
- **Rückgabetyp:** `clock_t` (ein Ganzzahl- oder Fließkommatyp, der in `<time.h>` definiert ist).
- **Konstante:** `CLOCKS_PER_SEC` gibt an, wie viele "Ticks" pro Sekunde vergehen.

Um die verbrauchte Zeit in Sekunden zu berechnen, misst du die Ticks zu Beginn und am Ende eines Abschnitts, bildest die Differenz und teilst sie durch `CLOCKS_PER_SEC`.

> [!NOTE]
> Da `clock_t` oft ein Ganzzahltyp ist, solltest du bei der Division aufpassen! Wenn du zwei Ganzzahlen teilst, schneidet C die Nachkommastellen ab. Nutze Typecasting (z. B. `(double)`), um ein genaues Ergebnis in Sekunden zu erhalten.

### Syntax-Template
Hier siehst du, wie die Funktion deklariert ist und wie du sie prinzipiell ansprichst:
```c
#include <time.h>

clock_t start = clock();
// ... Hier passiert die Berechnung ...
clock_t ende = clock();

// Berechnung der Differenz
double dauer = (double)(ende - start) / CLOCKS_PER_SEC;
```

---

## 15.2 Erweiterte Zeitfunktionen

Während `clock()` für Zeitmessungen gedacht ist, brauchst du für Kalenderdaten und Uhrzeiten andere Werkzeuge.

### Zeitstempel mit `time_t` und `time()`
Der Datentyp `time_t` speichert die sogenannte "Epochenzeit" (Unix-Zeit) – das sind die Sekunden, die seit dem 1. Januar 1970 vergangen sind.
Die Funktion `time()` liefert diesen wert zurück.

```c
time_t aktuelle_zeit;
aktuelle_zeit = time(NULL); // Liefert die Sekunden seit dem 1.1.1970
```

### Die Struktur `struct tm`
Um aus den Sekunden ein lesbares Datum (Tag, Monat, Jahr) zu machen, verwendet C die Struktur `struct tm`. Diese enthält unter anderem folgende Ganzzahl-Felder:
- `tm_sec`: Sekunden (0-59)
- `tm_min`: Minuten (0-59)
- `tm_hour`: Stunden (0-23)
- `tm_mday`: Tag des Monats (1-31)
- `tm_mon`: Monat seit Januar (0-11) – **Achtung, 0 steht für Januar!**
- `tm_year`: Jahre seit 1900 – **Achtung, für das aktuelle Jahr musst du 1900 addieren!**
- `tm_wday`: Tage seit Sonntag (0-6)

### Lokale Zeit mit `localtime()`
Mit `localtime()` wandelst du einen `time_t`-Wert in eine `struct tm` um. Die Funktion gibt einen Zeiger auf diese Struktur zurück.

> [!WARNING]
> `localtime()` gibt einen Zeiger auf eine statische Struktur zurück. Wenn du `localtime()` erneut aufrufst, werden die alten Werte überschrieben. Kopiere die Daten bei Bedarf in eine eigene Struktur.

Syntax-Template:
```c
time_t timestamp = time(NULL);
struct tm *lokale_info = localtime(&timestamp);
```

### Formatierte Ausgabe mit `strftime()`
Damit du das Datum nicht mühsam mit vielen `printf`-Befehlen zusammensetzen musst, gibt es `strftime()`. Diese Funktion verhält sich ähnlich wie `printf`, schreibt das Ergebnis aber in einen String (Zeichenkette) und nutzt spezielle Formatierungszeichen:
- `%d`: Tag des Monats (01-31)
- `%m`: Monat als Zahl (01-12)
- `%Y`: Jahr mit vier Ziffern
- `%H`: Stunde im 24-Stunden-Format (00-23)
- `%M`: Minute (00-59)
- `%S`: Sekunde (00-59)

Die Signatur sieht wie folgt aus:
```c
size_t strftime(char *s, size_t max, const char *format, const struct tm *tm);
```

### Ein plattformunabhängiges Delay
Unter Windows gibt es `Sleep()`, unter Linux `usleep()` oder `nanosleep()`. Wenn du ein plattformunabhängiges Delay schreiben möchtest, kannst du eine Schleife nutzen, die so lange läuft, bis eine bestimmte Zeitspanne auf Basis von `clock()` vergangen ist.

> [!TIP]
> Ein solches "Busy Waiting" (aktives Warten) blockiert die CPU und verbraucht 100 % Rechenleistung eines Kerns. Für einfache Übungsaufgaben ist es lehrreich, in realen Anwendungen nutzt man jedoch plattformspezifische Betriebssystem-Funktionen, um die CPU zu schonen.

---

## 15.3 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen der CPU-Zeit, die `clock()` misst, und der Kalenderzeit, die `time()` liefert?
2. Warum gibt `localtime(&timestamp)->tm_mon` den Wert `5` zurück, wenn wir uns im Juni befinden?
3. Welche Gefahr droht, wenn du den Rückgabezeiger von `localtime()` in mehreren Variablen speicherst, ohne die Daten zu kopieren?
4. Warum ist die Division `(ende - start) / CLOCKS_PER_SEC` ohne Typumwandlung (Typecasting) problematisch?

### Aufgaben (ohne fertige Lösungen)
*Versuche, diese Aufgaben selbstständig zu lösen. Verwende nur die oben erklärten Funktionen.*

#### Aufgabe 1: Der Reaktionstest
Schreibe ein Programm, das den Benutzer auffordert, eine bestimmte Taste zu drücken (z. B. Enter). Misse mit `clock()` die Zeitspanne zwischen der Aufforderung und dem Tastendruck des Benutzers und gib diese in Sekunden aus.

*Hinweis:* Nutze `getchar()` oder `scanf()`, um auf den Tastendruck zu warten.

#### Aufgabe 2: Datums-Formatierer
Erstelle ein Programm, das die aktuelle Systemzeit abfragt und in folgendem Format ausgibt:
`Heute ist der DD.MM.YYYY und es ist HH:MM:SS Uhr.`
Verwende dazu `time()`, `localtime()` und `strftime()`.

#### Aufgabe 3: Das eigene Delay
Schreibe eine Funktion `void mein_delay(double sekunden)`. Diese Funktion soll das Programm für die angegebene Anzahl an Sekunden pausieren lassen. Verwende eine `while`-Schleife und die Funktion `clock()`, um zu prüfen, wie viel Zeit vergangen ist.

*Tipp:* Berechne vor der Schleife die Ziel-Tickanzahl. Die Schleife läuft so lange, bis `clock()` diese Ziel-Tickanzahl erreicht oder überschritten hat.

---

## 15.4 Schlusswort

Herzlichen Glückwunsch! Du hast nun gelernt, wie man in C mit Zeit und Datum arbeitet. Diese Routinen sind extrem nützlich – sei es für Benchmarks zur Leistungsoptimierung, für Logdateien oder kleine Spiele. Achte stets auf die Besonderheiten von `struct tm` (wie die Monatszählung ab 0), um schwer zu findende Fehler zu vermeiden.

Im nächsten Kapitel widmen wir uns weiteren fortgeschrittenen Themen. Viel Erfolg beim Ausprobieren!

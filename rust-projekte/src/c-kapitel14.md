# 14 Eingabe- und Ausgabefunktionen

Die Interaktion mit der Außenwelt ist ein grundlegender Bestandteil fast jedes Programms. In diesem Kapitel lernst du, wie C mit Datenströmen (Streams) arbeitet, wie du Dateien öffnest, liest, beschreibst und wieder schließt. Zudem erfährst du, wie die Formatierung von Daten funktioniert und wie du sicherstellst, dass deine Ein- und Ausgaben robust gegenüber Fehlern sind.

---

## 14.1 Streams und Standard-Streams

In C wird jede Form der Ein- und Ausgabe über ein einheitliches Konzept abgewickelt: den **Datenstrom** (engl. *Stream*). Du kannst dir einen Stream wie ein virtuelles Fließband vorstellen, auf dem Bytes nacheinander transportiert werden. Dem Programm ist es dabei weitgehend egal, ob die Bytes von einer Tastatur kommen, in eine Datei auf der Festplatte geschrieben werden oder über ein Netzwerk reisen.

### Textmodus vs. Binärmodus

Wenn du einen Stream mit einer Datei verbindest, musst du dich für einen Übersetzungsmodus entscheiden:

1. **Textmodus (`t`):**
   * Dieser Modus ist für menschenlesbare Texte gedacht.
   * **Besonderheit:** Es finden plattformspezifische Anpassungen statt. Unter Windows wird beispielsweise das Zeilenende-Zeichen `\n` (LF) beim Schreiben automatisch in die Sequenz `\r\n` (CRLF) übersetzt und beim Lesen wieder zurückübersetzt. Unter Linux/UNIX bleibt es meist unverändert.
2. **Binärmodus (`b`):**
   * Dieser Modus ist für Rohdaten (z. B. Bilder, ausführbare Dateien oder eigene Datenstrukturen) gedacht.
   * **Besonderheit:** Es findet keinerlei Übersetzung statt. Jedes Byte wird exakt so gelesen oder geschrieben, wie es vorliegt (1:1-Kopie).

### Standard-Streams

Sobald dein C-Programm startet, öffnet die Laufzeitumgebung automatisch drei Standard-Datenströme, die im Header `<stdio.h>` definiert sind:

* **`stdin` (Standard Input):** Der Standard-Eingabestrom. Standardmäßig ist er mit der Tastatur verknüpft.
* **`stdout` (Standard Output):** Der Standard-Ausgabestrom für normale Programmausgaben. Standardmäßig mit dem Terminal/Bildschirm verknüpft.
* **`stderr` (Standard Error):** Der Standard-Fehlerausgabestrom. Er ist speziell für Fehlermeldungen und Diagnoseausgaben gedacht. Selbst wenn `stdout` in eine Datei umgeleitet wird, bleibt `stderr` in der Regel auf dem Bildschirm sichtbar.

> [!NOTE]
> Die Trennung von `stdout` und `stderr` ermöglicht es Benutzern deines Programms auf der Kommandozeile, die eigentlichen Daten in eine Datei umzuleiten (z. B. mit `programm > daten.txt`), während Fehlermeldungen weiterhin sofort auf der Konsole angezeigt werden.

---

## 14.2 Dateien & 14.3 Dateien öffnen

Um mit einer Datei auf dem Datenträger zu arbeiten, benötigst du einen Zeiger auf eine Struktur vom Typ `FILE`. Dieser Typ ist in `<stdio.h>` definiert und kapselt alle Informationen, die das Betriebssystem zur Verwaltung des Dateizugriffs benötigt.

### Die klassische Funktion: `fopen`

Mit `fopen` forderst du das Betriebssystem auf, eine Datei zu öffnen. Die Funktion gibt dir einen Zeiger auf das zugehörige `FILE`-Objekt zurück. Schlägt das Öffnen fehl (z. B. weil die Datei nicht existiert oder du keine Rechte hast), liefert die Funktion `NULL`.

#### Syntax-Template:
```c
FILE *fopen(const char *restrict filename, const char *restrict mode);
```

#### Die wichtigsten Dateizugriffsmodi:

| Modus | Beschreibung | Zustand bei Existenz | Zustand bei Nichtexistenz |
| :--- | :--- | :--- | :--- |
| `"r"` (Read) | Öffnet eine Textdatei zum Lesen. | Zeiger steht am Anfang. | Schlägt fehl (`NULL`). |
| `"w"` (Write) | Öffnet eine Textdatei zum Schreiben. | Inhalt wird gelöscht (Länge 0). | Datei wird neu erstellt. |
| `"a"` (Append) | Öffnet eine Textdatei zum Anfügen. | Zeiger steht am Ende. | Datei wird neu erstellt. |
| `"r+"` | Lesen und Schreiben. | Zeiger steht am Anfang. | Schlägt fehl (`NULL`). |
| `"w+"` | Lesen und Schreiben. | Inhalt wird gelöscht. | Datei wird neu erstellt. |
| `"a+"` | Lesen und Anfügen. | Zeiger steht am Ende. | Datei wird neu erstellt. |

Um den **Binärmodus** zu erzwingen, hängst du einfach ein `b` an den Modus an (z. B. `"rb"`, `"wb"`, `"ab+"`).

### Exklusiver Zugriff (seit C11)

Möchtest du verhindern, dass eine bereits existierende Datei beim Öffnen im Schreibmodus versehentlich überschrieben wird? Seit dem C11-Standard gibt es dafür den Modifikator `x`. Wenn du beispielsweise `"wx"` oder `"w+x"` verwendest, schlägt das Öffnen fehl, falls die Datei bereits existiert.

### Die sicherere Alternative: `fopen_s`

Im C11-Standard (und davor schon als Microsoft-Erweiterung) wurde `fopen_s` eingeführt. Sie prüft ihre Parameter strenger und gibt einen Fehlercode zurück, anstatt nur einen Zeiger zu liefern.

#### Syntax-Template:
```c
errno_t fopen_s(FILE **restrict streamptr, const char *restrict filename, const char *restrict mode);
```
* **Rückgabewert:** `0` bei Erfolg, ein Fehlercode ungleich `0` bei Misserfolg.
* **Erster Parameter:** Die Adresse deines `FILE *`-Zeigers (daher der Doppelzeiger `FILE **`).

> [!IMPORTANT]
> Überprüfe nach jedem Versuch, eine Datei zu öffnen, ob der erhaltene Zeiger ungleich `NULL` ist (bei `fopen`) bzw. ob der Rückgabewert `0` ist (bei `fopen_s`). Greife niemals auf einen `NULL`-Zeiger zu!

---

## 14.4 Dateien schließen

Wenn du mit einer Datei fertig bist, musst du sie schließen. Das erledigt die Funktion `fclose`.

### Syntax-Template:
```c
int fclose(FILE *stream);
```

### Warum ist das Schließen so wichtig?
1. **Puffer leeren:** Daten, die du in eine Datei schreibst, werden oft erst im Arbeitsspeicher zwischengepuffert. `fclose` sorgt dafür, dass diese Reste physisch auf den Datenträger geschrieben werden.
2. **Ressourcen freigeben:** Betriebssysteme begrenzen die Anzahl der gleichzeitig geöffneten Dateien pro Prozess.
3. **Sperren aufheben:** Solange eine Datei geöffnet ist, blockiert dein Programm sie unter Umständen für andere Prozesse.

---

## 14.5 Auf Fehler oder das Dateiende prüfen

Beim Lesen von Dateien stoßen wir unweigerlich auf zwei Szenarien: Entweder wir haben das Ende der Datei erreicht (EOF - *End of File*) oder es ist ein Fehler aufgetreten (z. B. Datenträger voll oder Verbindung unterbrochen). C stellt dafür spezielle Funktionen bereit.

### Dateiende prüfen: `feof`

```c
int feof(FILE *stream);
```
Gibt einen Wert ungleich `0` (wahr) zurück, wenn der Lesezeiger das Dateiende überschritten hat.
> [!WARNING]
> Ein häufiger Anfängerfehler ist es, `while(!feof(datei))` als Schleifenbedingung zu nutzen, *bevor* überhaupt gelesen wurde. `feof` wird erst dann wahr, wenn ein Leseversuch *fehlgeschlagen* ist, weil keine Daten mehr da waren. Prüfe daher immer erst das Ergebnis der Lesefunktion!

### Fehler prüfen: `ferror`

```c
int ferror(FILE *stream);
```
Gibt einen Wert ungleich `0` zurück, wenn bei einer Lese- oder Schreiboperation auf dem Stream ein Fehler aufgetreten ist.

### Fehler ausgeben: `perror`

```c
void perror(const char *s);
```
Gibt eine Fehlermeldung auf `stderr` aus. Sie nimmt die von dir übergebene Zeichenkette `s`, hängt einen Doppelpunkt und die Systemfehlermeldung an, die der globalen Variable `errno` entspricht.

### Flags zurücksetzen: `clearerr`

```c
void clearerr(FILE *stream);
```
Setzt die internen Fehler- und Dateiende-Indikatoren des Datenstroms wieder auf `0` zurück. Das ist nützlich, wenn du nach einem behobenen Fehler oder nach Erreichen des Dateiendes weiterarbeiten möchtest.

---

## 14.6 Weitere E/A-Funktionen

C bietet verschiedene Abstraktionsebenen für das Lesen und Schreiben von Daten.

### Zeichenweise E/A

* **`fgetc`:** Liest ein einzelnes Zeichen aus dem Stream.
  ```c
  int fgetc(FILE *stream);
  ```
  *Rückgabewert:* Das gelesene Zeichen als `unsigned char` (konvertiert in `int`) oder die Konstante `EOF` bei Dateiende/Fehler. Deshalb ist der Rückgabetyp `int` und nicht `char`!
* **`fputc`:** Schreibt ein einzelnes Zeichen in den Stream.
  ```c
  int fputc(int c, FILE *stream);
  ```
* **`ungetc`:** Legt ein gelesenes Zeichen wieder zurück in den Eingabestrom.
  ```c
  int ungetc(int c, FILE *stream);
  ```
  Das ist besonders nützlich bei der lexikalischen Analyse (Parsern), wenn man ein Zeichen lesen muss, um zu entscheiden, wie ein Token endet, dieses Zeichen aber für den nächsten Verarbeitungsschritt erhalten bleiben soll.

### Zeilenweise E/A

* **`fgets`:** Liest eine Zeile (inklusive des Zeilenumbruchs `\n`, falls Platz ist) aus dem Stream.
  ```c
  char *fgets(char *restrict s, int n, FILE *restrict stream);
  ```
  Sie liest maximal `n - 1` Zeichen und fügt automatisch ein Nullzeichen `\0` am Ende an. Sie ist im Gegensatz zu der veralteten und unsicheren Funktion `gets` sicher vor Pufferüberläufen.
* **`fputs`:** Schreibt eine Zeichenkette in den Stream.
  ```c
  int fputs(const char *restrict s, FILE *restrict stream);
  ```
  *Hinweis:* Im Gegensatz zu `puts` fügt `fputs` am Ende *keinen* automatischen Zeilenumbruch hinzu.

### Blockweise (binäre) E/A

Wenn du Strukturen, Arrays oder rohe Speicherblöcke direkt sichern möchtest, nutzt du blockweise E/A:

* **`fread`:** Liest Datenblöcke aus dem Stream.
  ```c
  size_t fread(void *restrict ptr, size_t size, size_t nmemb, FILE *restrict stream);
  ```
* **`fwrite`:** Schreibt Datenblöcke in den Stream.
  ```c
  size_t fwrite(const void *restrict ptr, size_t size, size_t nmemb, FILE *restrict stream);
  ```

Dabei ist `ptr` der Zeiger auf deinen Speicherbereich, `size` die Größe eines einzelnen Elements (z. B. `sizeof(int)` oder `sizeof(struct MeinTyp)`) und `nmemb` die Anzahl dieser Elemente. Der Rückgabewert gibt an, wie viele Elemente *tatsächlich* erfolgreich gelesen oder geschrieben wurden.

---

## 14.7 Formatierte E/A

Formatierte Ein- und Ausgabefunktionen übersetzen binäre Werte im Speicher (wie `int`, `float`) in menschenlesbare Zeichenketten und umgekehrt.

### Die `printf`-Familie

* `printf(...)`: Schreibt auf `stdout`.
* `fprintf(stream, ...)`: Schreibt auf den angegebenen `stream`.
* `sprintf(buffer, ...)`: Schreibt in ein Zeichen-Array (Achtung: Gefahr von Pufferüberläufen!).
* `snprintf(buffer, size, ...)`: Die sichere Variante von `sprintf`, bei der die maximale Puffergröße angegeben wird.

#### Aufbau einer Umwandlungsvorgabe:
Eine Umwandlungsvorgabe beginnt mit `%` und folgt diesem Schema (optionale Teile in eckigen Klammeln):
`%[Flags][Feldbreite][.Genauigkeit][Modifikator]Typ`

* **Flags:**
  * `-`: Linksbündige Ausrichtung im Ausgabebereich.
  * `+`: Erzwingt das Vorzeichen (`+` oder `-`) auch bei positiven Zahlen.
  * `0`: Füllt die Feldbreite mit führenden Nullen auf.
  * *Leerzeichen*: Gibt ein Leerzeichen aus, wenn kein Vorzeichen gedruckt wird.
* **Feldbreite:** Gibt die Mindestanzahl an Zeichen an, die ausgegeben werden soll.
* **Genauigkeit (`.Genauigkeit`):**
  * Bei Nachkommastellen (`%f`): Anzahl der Dezimalstellen (z. B. `%.2f` für zwei Nachkommastellen).
  * Bei Zeichenketten (`%s`): Maximale Anzahl der auszugebenden Zeichen.
  * Bei Ganzzahlen (`%d`): Mindestanzahl der zu druckenden Ziffern (mit führenden Nullen aufgefüllt).
* **Modifikator:** Passt die Größe an (z. B. `l` für `long`, `ll` für `long long`, `z` für `size_t`).

### Die `scanf`-Familie

* `scanf(...)`: Liest von `stdin`.
* `fscanf(stream, ...)`: Liest vom angegebenen `stream`.
* `sscanf(buffer, ...)`: Liest aus einer Zeichenkette im Speicher.

#### Suchmengenkonvertierung (Scanset)
Mit `scanf` kannst du festlegen, welche Zeichen genau akzeptiert werden sollen:
* `%[a-zA-Z]`: Liest nur Buchstaben ein. Sobald ein anderes Zeichen (z. B. eine Ziffer) kommt, stoppt das Einlesen.
* `%[^ \n]`: Das Dach-Symbol `^` negiert die Menge. Dies liest alles ein, bis ein Leerzeichen oder ein Zeilenumbruch gefunden wird.

> [!TIP]
> Um Pufferüberläufe beim Einlesen von Zeichenketten mit `scanf` zu verhindern, solltest du immer eine maximale Breite angeben, z. B. `%19s` für ein Array der Größe 20 (Platz für das Nullzeichen nicht vergessen!).

---

## 14.8 Wahlfreier Dateizugriff

Standardmäßig bewegen wir uns sequenziell durch eine Datei: Jedes gelesene Byte schiebt den internen Dateipositionszeiger ein Stück weiter. Manchmal müssen wir jedoch an eine ganz bestimmte Stelle springen (wahlfreier Zugriff / *Random Access*).

### Position abfragen: `ftell`

```c
long ftell(FILE *stream);
```
Gibt die aktuelle Position des Dateizeigers (in Bytes ab dem Dateianfang) zurück. Bei Fehlern wird `-1L` geliefert.

### Position ändern: `fseek`

```c
int fseek(FILE *stream, long offset, int whence);
```
Verschiebt den Dateizeiger um `offset` Bytes, ausgehend vom Punkt `whence`.

Für `whence` gibt es drei vordefinierte Konstanten:
* **`SEEK_SET`:** Der Offset bezieht sich auf den Dateianfang (Sprung an absolute Position).
* **`SEEK_CUR`:** Der Offset bezieht sich auf die aktuelle Position (relativer Sprung).
* **`SEEK_END`:** Der Offset bezieht sich auf das Dateiende (z. B. Rückwärtssprung vom Ende).

### Zurück zum Start: `rewind`

```c
void rewind(FILE *stream);
```
Setzt den Dateizeiger zurück an den Anfang der Datei und löscht die Fehler- und EOF-Flags (äquivalent zu `(void)fseek(stream, 0L, SEEK_SET)` und dem Zurücksetzen der Fehlerflags).

---

## 14.9 Sicherere Funktionen mit C11

Im C11-Standard wurden mit dem optionalen *Annex K* (Bounds-checking interfaces) sicherere Varianten vieler Standardfunktionen eingeführt. Diese enden meist auf `_s`.

Beispiele:
* `printf_s`, `fprintf_s`, `snprintf_s`
* `scanf_s`, `fscanf_s`, `sscanf_s`

### Was machen diese Funktionen anders?
* Sie prüfen Laufzeit-Einschränkungen (z. B. ob Zeiger-Argumente `NULL` sind).
* Bei `scanf_s` muss für jede eingelesene Zeichenkette (`%s`, `%c` oder Scanset) zwingend die Größe des Zielpuffers als zusätzliches Argument übergeben werden.
* Tritt ein Verstoß auf, wird ein konfigurierbarer Handler aufgerufen (standardmäßig führt dies meist zum Programmabbruch), statt undefiniertes Verhalten zu riskieren.

---

## 14.10 Datei löschen oder umbenennen

Diese Funktionen arbeiten direkt mit den Pfaden auf dem Dateisystem und benötigen keinen vorher geöffneten `FILE *`-Datenstrom.

### Datei löschen: `remove`

```c
int remove(const char *filename);
```
Löscht die Datei mit dem angegebenen Namen. Gibt bei Erfolg `0` zurück, andernfalls einen Wert ungleich `0`.

### Datei umbenennen oder verschieben: `rename`

```c
int rename(const char *oldname, const char *newname);
```
Benennt eine Datei um oder verschiebt sie in ein anderes Verzeichnis auf demselben physischen Datenträger. Gibt bei Erfolg `0` zurück.

---

## 14.11 Pufferung

Um die Anzahl der langsamen Systemaufrufe (Festplattenzugriffe) zu minimieren, puffert C die Ein- und Ausgaben im Hintergrund. Es gibt drei Pufferarten:

1. **Vollständig gepuffert (Blockpuffung):** Daten werden erst übertragen, wenn der Puffer komplett voll ist. Typisch für reguläre Dateien.
2. **Zeilengepuffert:** Daten werden übertragen, sobald ein Zeilenumbruchzeichen `\n` geschrieben wird. Typisch für `stdout`, wenn es mit einem Terminal verbunden ist.
3. **Ungepuffert:** Jedes Byte wird sofort übertragen. Typisch für `stderr`.

### Pufferung konfigurieren: `setvbuf`

```c
int setvbuf(FILE *restrict stream, char *restrict buf, int mode, size_t size);
```
Ermöglicht es dir, einen eigenen Puffer bereitzustellen und den Modus festzulegen:
* `_IOFBF` (Vollständig gepuffert)
* `_IOLBF` (Zeilengepuffert)
* `_IONBF` (Ungepuffert)

### Puffer manuell leeren: `fflush`

```c
int fflush(FILE *stream);
```
Erzwingt das sofortige Schreiben aller noch im Puffer befindlichen Daten des Ausgabestroms. Wenn `stream` gleich `NULL` ist, werden die Puffer aller geöffneten Ausgabeströme geleert.

> [!WARNING]
> Das Verhalten von `fflush` auf einem *Eingabestrom* (wie `stdin`) ist laut C-Standard undefiniert! Auch wenn manche Compiler (wie GCC/MSVC in bestimmten Versionen) das Verwerfen von Eingaberesten unterstützen, ist dies nicht portabel.

---

## 14.12 Kontrollfragen und Aufgaben

### Kontrollfragen

1. Welcher Unterschied besteht zwischen dem Textmodus und dem Binärmodus beim Öffnen einer Datei unter Windows?
2. Warum sollte der Rückgabewert von `fgetc` in einer Variable vom Typ `int` und nicht `char` gespeichert werden?
3. Warum ist die Schleife `while (!feof(datei)) { ... LeseOperation ... }` problematisch und wie baut man sie besser auf?
4. Welche Aufgabe hat die Funktion `fflush` und wann ist ihr Einsatz sinnvoll?
5. Was passiert, wenn du versuchst, eine existierende Datei mit dem Modus `"wx"` zu öffnen?

### Praktische Aufgaben

#### Aufgabe 1: Die Zeilen-Zählanlage
Erstelle ein Programm, das den Namen einer Textdatei über die Konsole einliest, diese Datei öffnet und die Anzahl der darin enthaltenen Zeilen zählt.
* *Hinweise:*
  * Denke daran, das Zeichen `\n` zu suchen.
  * Vergiss nicht zu prüfen, ob die Datei überhaupt erfolgreich geöffnet werden konnte.
  * Schließe die Datei am Ende ordnungsgemäß.

#### Aufgabe 2: Der sichere Textkopierer
Schreibe ein Programm, das eine Datei zeilenweise in eine andere Datei kopiert.
* *Hinweise:*
  * Nutze für das Einlesen eine Funktion, die eine maximale Zeilenlänge vorgibt, um Pufferüberläufe auszuschließen.
  * Stelle sicher, dass die Zieldatei nicht überschrieben wird, falls sie bereits existiert (Stichwort: Exklusiver Zugriff).
  * Gib im Fehlerfall eine verständliche Fehlermeldung aus (Stichwort: `perror`).

#### Aufgabe 3: Das binäre Logbuch
Entwickle ein einfaches Programm, das eine Struktur (z. B. mit einem Zeitstempel als Ganzzahl und einer ID) binär in eine Datei schreibt und diese Struktur anschließend wieder ausliest, um sie auf der Konsole auszugeben.
* *Hinweise:*
  * Nutze für das Schreiben und Lesen die blockweisen E/A-Funktionen.
  * Öffne die Datei im passenden Binärmodus.
  * Verwende `fseek` und `ftell`, um vor dem Auslesen der eben geschriebenen Daten den Dateipositionszeiger wieder an den Anfang der Datei zu setzen.

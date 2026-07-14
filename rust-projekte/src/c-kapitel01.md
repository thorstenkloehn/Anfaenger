# 1 Der Einstieg in die Welt von C

Willkommen in der Welt von C! C ist eine der einflussreichsten und langlebigsten Programmiersprachen der Welt. Sie bildet das Fundament für moderne Betriebssysteme, Datenbanken und unzählige eingebettete Systeme. In diesem Kapitel lernst du die Grundlagen kennen, um deine ersten Schritte erfolgreich zu meistern.

## 1.1 Die Sprache C
C ist eine imperative, strukturierte Programmiersprache, die in den frühen 1970er Jahren von Dennis Ritchie für das Unix-Betriebssystem entwickelt wurde. C zeichnet sich durch hohe Effizienz, Hardwarenähe und ein schlankes Sprachdesign aus.

> [!NOTE]
> Da C dem Computer sehr nahe ist, gibt es dir viel Kontrolle, aber auch viel Verantwortung. Fehler wie Speicherzugriffsfehler werden nicht wie in manchen moderneren Sprachen automatisch abgefangen. Du bist selbst dafür verantwortlich, dass deinem Programm kein unerlaubter Speicherzugriff unterläuft.

## 1.2 Die C-Standardbibliothek
C selbst hat nur sehr wenige Schlüsselwörter und eingebaute Fähigkeiten. Für alltägliche Aufgaben wie Ein- und Ausgabe, mathematische Berechnungen oder String-Verarbeitung stellt C eine standardisierte Funktionssammlung bereit: die **C-Standardbibliothek**.

### 1.2.1 Header-Dateien und Programmbibliothek
Um diese Funktionen in deinem Code nutzen zu können, musst du dem Compiler mitteilen, welche Funktionen du verwenden möchtest. Das geschieht über sogenannte **Header-Dateien** (Dateiendung `.h`).
* Eine Header-Datei enthält die Deklarationen (die "Steckbriefe" oder Signaturen) der Funktionen.
* Die tatsächliche Implementierung (der ausführbare Maschinencode) liegt in der bereits kompilierten Programmbibliothek, die vom Linker automatisch eingebunden wird.

Die Einbindung einer Header-Datei erfolgt mit der Präprozessor-Direktive `#include`:
```c
#include <header_datei.h>
```

> [!TIP]
> Die wichtigste Header-Datei für den Anfang ist `stdio.h` (Standard Input/Output). Sie enthält unter anderem Funktionen, um Text auf dem Bildschirm auszugeben oder Eingaben vom Benutzer einzulesen.

## 1.3 Die nötigen Werkzeuge für C
Um C-Code in ein ausführbares Programm zu verwandeln, benötigst du im Wesentlichen zwei Werkzeuge:
1. Einen **Texteditor** zum Schreiben deines Quellcodes.
2. Einen **Compiler** zum Übersetzen des menschenlesbaren Codes in Maschinensprache.

Beliebte und weit verbreitete Compiler sind:
* **GCC** (GNU Compiler Collection): Der Standard-Compiler auf den meisten Linux-Systemen.
* **Clang**: Ein moderner, modularer Compiler mit oft sehr verständlichen Fehlermeldungen.
* **MSVC** (Microsoft Visual C++): Der Compiler für Windows-Systeme im Visual Studio Umfeld.

Als integrierte Entwicklungsumgebungen (IDEs) bieten sich an:
* **Visual Studio Code** (mit C/C++ Extension)
* **CLion**
* **Visual Studio** (Windows)
* **Xcode** (macOS)

## 1.4 Übersetzen mit der Entwicklungsumgebung
In einer IDE erstellst du meistens ein neues Projekt, fügst eine Quelldatei hinzu (z. B. `main.c`) und klickst auf einen "Run"- oder "Build"-Button. Die IDE übernimmt im Hintergrund das Aufrufen des Compilers und des Linkers für dich und startet das fertige Programm.

> [!NOTE]
> Obwohl IDEs sehr komfortabel sind, ist es extrem wichtig zu verstehen, was im Hintergrund abläuft. Daher solltest du das Übersetzen auf der Kommandozeile ebenfalls beherrschen!

## 1.5 Übersetzen mit GCC und Clang
Auf der Kommandozeile (Terminal) kannst du den Compiler direkt steuern. Ein einfacher Aufruf sieht wie folgt aus:

Mit GCC:
```bash
gcc -Wall -o mein_programm datei.c
```

Mit Clang:
```bash
clang -Wall -o mein_programm datei.c
```

Bedeutung der Parameter:
* `-Wall`: Schaltet (fast) alle Warnungen des Compilers ein. Nimm diese Warnungen immer ernst – sie deuten oft auf logische Fehler im Code hin!
* `-o mein_programm`: Bestimmt den Namen der erstellten ausführbaren Datei. Ohne diesen Parameter erzeugt der Compiler standardmäßig eine Datei namens `a.out` (unter Linux/macOS) oder `a.exe` (unter Windows).
* `datei.c`: Die Quellcodedatei, die übersetzt werden soll.

## 1.6 Listings zum Buch
Im Laufe dieses Kurses wirst du auf verschiedene Code-Beispiele (Listings) stoßen. Schreibe diese Beispiele selbst ab und tippe sie nicht einfach ab oder kopiere sie per Copy-and-Paste. Durch das selbstständige Tippen entwickelst du ein Gefühl für die Syntax, Klammern und Semikolons.

## 1.7 Kontrollfragen und Aufgaben im Buch
Am Ende jedes Kapitels findest du Fragen und praktische Übungen. Nutze sie, um dein Verständnis zu überprüfen. Wenn etwas nicht funktioniert, experimentiere mit dem Code. Aus Fehlern lernt man beim Programmieren am meisten.

## 1.8 Aufgabe
Deine erste Aufgabe besteht darin, das berühmte "Hallo Welt"-Programm zu schreiben, zu kompilieren und auszuführen.

### Die Aufgabe
1. Erstelle eine Textdatei namens `hello.c`.
2. Schreibe ein C-Programm, das den Text `Hallo Welt!` (gefolgt von einem Zeilenumbruch) auf dem Bildschirm ausgibt.
3. Kompiliere das Programm über das Terminal mit GCC oder Clang.
4. Führe das erstellte Programm aus.

### Didaktische Hinweise zur Struktur
Jedes C-Programm benötigt einen Einstiegspunkt. Der Compiler sucht nach einer Funktion mit dem Namen `main`. Ein minimales C-Grundgerüst sieht so aus:

```c
// Hier musst du den Header für die Standard-Ein-/Ausgabe einbinden
#include <...>

int main(void) {
    // Hier fügst du den Befehl zur Textausgabe ein.
    // Tipp: Verwende die Funktion printf("Dein Text\n");
    // Das "\n" steht für einen Zeilenumbruch.
    
    return 0; // Signalisiert dem Betriebssystem, dass das Programm erfolgreich lief
}
```

> [!IMPORTANT]
> Vergiss nicht das Semikolon `;` am Ende deines Befehls innerhalb der `main`-Funktion! In C ist das Semikolon ein Anweisungsbeendiger, der dem Compiler sagt, wo eine Anweisung endet.

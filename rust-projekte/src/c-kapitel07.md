# 7 Funktionen erstellen

Bisher hast du deinen gesamten Code wahrscheinlich in der `main()`-Funktion geschrieben. Je größer deine Programme werden, desto unübersichtlicher und schwerer wartbar wird dieser Ansatz. Hier kommen **Funktionen** ins Spiel. 

Eine Funktion ist ein in sich geschlossener Codeblock, der eine bestimmte Aufgabe erfüllt. Du kannst sie dir wie einen kleinen, spezialisierten Küchenhelfer vorstellen: Du gibst ihm Zutaten (Eingabewerte), er erledigt die Arbeit nach einem festen Rezept und gibt dir schließlich das fertige Ergebnis (den Rückgabewert) zurück.

Durch Funktionen wird dein Code:
* **Wiederverwendbar:** Einmal geschrieben, kannst du die Funktion überall und beliebig oft aufrufen.
* **Übersichtlich:** Große Probleme werden in kleine, leicht verständliche Teilprobleme zerlegt (Modularisierung).
* **Einfacher zu testen:** Du kannst jede Funktion einzeln auf Fehler überprüfen.

---

## 7.1 Funktionen definieren

Bevor du eine Funktion nutzen kannst, musst du dem Compiler mitteilen, wie sie aussieht und was sie tun soll. Das nennen wir **definieren**.

Der grundlegende Aufbau einer Funktionsdefinition in C sieht wie folgt aus:

```c
rueckgabetyp funktionsname(datentyp_1 parameter_1, datentyp_2 parameter_2) {
    // Anweisungen der Funktion
    // ...
    return wert; // falls ein Rückgabetyp definiert ist
}
```

Die Bestandteile einer Funktion:
1. **Rückgabetyp:** Der Datentyp des Werts, den die Funktion nach getaner Arbeit zurückliefert (z. B. `int`, `float`, `char`). Wenn die Funktion gar nichts zurückgeben soll, nutzt du das Schlüsselwort `void`.
2. **Funktionsname:** Ein eindeutiger Name, über den du die Funktion später aufrufst. Halte dich hierbei an die gleichen Namensregeln wie bei Variablen (am besten sprechende Namen in Kleinbuchstaben, z. B. `berechne_flaeche`).
3. **Parameterliste:** In den runden Klammern gibst du an, welche Eingabedaten die Funktion benötigt. Jeder Parameter besteht aus einem Datentyp und einem Namen. Benötigt eine Funktion keine Daten, bleibt die Klammer entweder leer oder enthält das Schlüsselwort `void`.
4. **Funktionskörper:** In den geschweiften Klammern `{ ... }` steht der eigentliche Programmcode der Funktion.

> [!NOTE]
> Wenn eine Funktion den Rückgabetyp `void` besitzt, ist keine `return`-Anweisung mit einem Wert erforderlich. Du kannst die Funktion einfach am Ende der geschweiften Klammer automatisch verlassen lassen.

---

## 7.2 Funktionen aufrufen

Wenn eine Funktion definiert ist, „schläft“ sie so lange, bis du sie explizit aufrufst. Ein Funktionsaufruf unterbricht kurzzeitig den aktuellen Programmfluss in der `main()`-Funktion, springt in den Code der gerufenen Funktion, führt diesen aus und kehrt anschließend wieder genau an die Stelle des Aufrufs zurück.

Der Aufruf erfolgt über den Funktionsnamen, gefolgt von den konkreten Argumenten in runden Klammern:

```c
funktionsname(argument_1, argument_2);
```

### Einordnung: Parameter vs. Argument
* **Parameter** sind die Platzhalter in der Funktionsdefinition (die „Variablen-Schablone“).
* **Argumente** sind die tatsächlichen Werte oder Variablen, die du beim Aufruf an diese Platzhalter übergibst.

---

## 7.3 Vorausdeklaration (Prototyp)

Der C-Compiler arbeitet deinen Quellcode streng von oben nach unten ab (Single-Pass-Compiler). Das führt zu einem Problem: Wenn du eine Funktion in `main()` aufrufst, diese aber erst *unter* `main()` definiert ist, kennt der Compiler sie zum Zeitpunkt des Aufrufs noch nicht und bricht mit einer Warnung oder einem Fehler ab.

Um dieses Problem zu lösen, gibt es zwei Möglichkeiten:
1. **Definition vor dem Aufruf:** Du definierst all deine eigenen Funktionen über der `main()`-Funktion. Bei vielen Funktionen wird das jedoch schnell unübersichtlich.
2. **Die Vorausdeklaration (Prototyp):** Du sagst dem Compiler ganz oben im Code Bescheid, dass es diese Funktion weiter unten geben wird. Das ist wie ein Steckbrief der Funktion.

Ein Prototyp sieht genauso aus wie der Kopf der Funktionsdefinition (Signatur), endet aber direkt mit einem Semikolon:

```c
rueckgabetyp funktionsname(datentyp_1 parameter_1, datentyp_2 parameter_2);
```

> [!TIP]
> Bei Prototypen kannst du die Namen der Parameter sogar weglassen und nur die Datentypen angeben (z. B. `int addiere(int, int);`). Aus Gründen der Lesbarkeit ist es jedoch meistens besser, die Namen beizubehalten.

---

## 7.4 Funktionsparameter (Call-by-Value)

Standardmäßig übergibt C Parameter nach dem Prinzip **Call-by-Value** (Wertübergabe). 

Das bedeutet: Wenn du eine Variable als Argument an eine Funktion übergibst, erhält die Funktion nicht die Originalvariable, sondern lediglich eine **Kopie des Wertes**.

### Die Analogie des Fotokopierers
Stell dir vor, du hast ein wichtiges Dokument (deine Variable im Hauptprogramm) und möchtest, dass ein Kollege (die Funktion) eine Notiz darauf macht. Statt ihm das Original zu geben, machst du eine Fotokopie (Call-by-Value) und reichst ihm diese. Der Kollege kann nun auf seiner Kopie herumschreiben und zeichnen, wie er will. Sobald er fertig ist und das Zimmer verlässt, wird seine Kopie weggeworfen. Dein Original-Dokument liegt immer noch völlig unverändert auf deinem Schreibtisch.

**Auswirkung im Code:**
Wenn du innerhalb einer Funktion den Wert eines Parameters veränderst, hat dies absolut *keinen* Einfluss auf die Variable, die du beim Aufruf übergeben hast. Sie bleibt im Hauptprogramm unverändert.

---

## 7.5 Rückgabewert (return-Anweisung)

Um dem Aufrufer ein Ergebnis deiner Funktion mitzuteilen, nutzt du die `return`-Anweisung. 

Sobald das Programm auf ein `return` stößt, passiert Folgendes:
1. Der nachfolgende Wert oder Ausdruck wird berechnet.
2. Die Funktion wird **sofort beendet** (eventuell nachfolgender Code in der Funktion wird ignoriert!).
3. Der Wert wird an die Stelle zurückgeliefert, an der die Funktion aufgerufen wurde.

Du kannst den Rückgabewert direkt in einer Variablen speichern oder ihn beispielsweise direkt in einer `printf()`-Ausgabe verwenden:

```c
variable = funktionsname(argumente);
```

> [!IMPORTANT]
> Der Datentyp des Werts hinter `return` muss mit dem deklarierten **Rückgabetyp** im Funktionskopf übereinstimmen. Wenn deine Funktion als `int` deklariert ist, musst du auch einen ganzzahligen Wert zurückgeben.

---

## 7.6 Exkurs: Funktionen bei der Ausführung (Call Stack)

Hast du dich schon einmal gefragt, wie sich der Computer merkt, wo er im Programm weitermachen muss, wenn eine Funktion beendet ist?

Dafür nutzt das Betriebssystem den sogenannten **Call Stack** (Aufrufstapel). 

### Das Stapel-Prinzip (LIFO)
Der Call Stack funktioniert wie ein Stapel sauberer Teller in der Küche. Du kannst immer nur einen Teller oben drauflegen (Push) und auch immer nur den obersten Teller wieder herunternehmen (Pop). Dieses Prinzip nennt man *Last-In, First-Out* (LIFO).

1. Wenn dein Programm startet, liegt der Stapelrahmen (Stack Frame) der `main()`-Funktion ganz unten auf dem Stapel. Dort sind alle lokalen Variablen von `main()` gespeichert.
2. Ruft `main()` eine Funktion `A()` auf, wird ein neuer Stapelrahmen für `A()` oben auf den Stapel gelegt. Das Programm arbeitet nun in `A()`. `main()` pausiert solange.
3. Ruft `A()` wiederum eine Funktion `B()` auf, wird der Rahmen für `B()` oben aufgelegt.
4. Ist `B()` fertig, wird ihr Rahmen vom Stapel entfernt (gelöscht) und das Programm springt genau dorthin zurück, wo `A()` auf `B()` gewartet hat.
5. Ist auch `A()` fertig, wird ihr Rahmen entfernt und wir sind wieder in `main()`.

Jeder Stapelrahmen speichert:
* Die lokalen Variablen der jeweiligen Funktion.
* Die übergebenen Argumente.
* Die **Rücksprungadresse** (wo im Code es nach dem Ende der Funktion weitergeht).

---

## 7.7 Inline-Funktionen (inline)

Jeder Funktionsaufruf kostet den Computer ein winziges bisschen Zeit (das Erstellen des Stack Frames, das Kopieren der Parameter, der Sprung im Speicher). Bei extrem zeitkritischen Anwendungen oder winzigen Funktionen, die millionenfach in Schleifen aufgerufen werden, kann dieser sogenannte *Overhead* die Performance bremsen.

Mit dem Schlüsselwort `inline` kannst du dem Compiler empfehlen, den Funktionsaufruf zu optimieren:

```c
inline int verdoppeln(int x) {
    return x * 2;
}
```

**Was bewirkt `inline`?**
Der Compiler versucht, den Funktionsaufruf im fertigen Maschinencode direkt durch den tatsächlichen Code der Funktion zu ersetzen. Es findet also beim Programmlauf kein echter Sprung und kein Stack-Aufbau statt.

> [!WARNING]
> Das Schlüsselwort `inline` ist für den Compiler lediglich eine **Empfehlung**, kein Befehl! Moderne Compiler sind extrem intelligent und entscheiden oft selbstständig, ob sie eine Funktion inlinen oder nicht – selbst wenn du das Schlüsselwort nicht aufgeschrieben hast.

---

## 7.8 Rekursionen (Selbstaufruf)

Eine Funktion ist rekursiv, wenn sie sich im eigenen Funktionskörper **selbst aufruft**.

Rekursion ist ein mächtiges Werkzeug, um Probleme zu lösen, die sich in kleinere, gleichartige Teilprobleme zerlegen lassen (z. B. das Durchsuchen von Ordnerstrukturen oder mathematische Berechnungen wie die Fakultät).

### Die Analogie der Matrjoschka-Puppe
Stell dir eine russische Holzpuppe vor. Du möchtest wissen, ob sich in der kleinsten Puppe ein Goldring befindet. Was tust du?
1. Du öffnest die aktuelle Puppe.
2. Ist sie leer und es gibt keine weitere Puppe darin, hörst du auf (**Abbruchbedingung**).
3. Ist noch eine Puppe darin, rufst du dieselbe Aktion wieder auf: „Öffne Puppe“ (**rekursiver Schritt**).

Damit eine Rekursion nicht in einer Endlosschleife gefangen bleibt und das Programm zum Absturz bringt, muss sie zwingend zwei Dinge besitzen:
1. **Der Basisfall (Abbruchbedingung):** Ein einfacher Fall, der direkt gelöst werden kann, ohne dass ein weiterer Selbstaufruf nötig ist.
2. **Der Rekursionsschritt:** Der Aufruf der Funktion mit veränderten (meistens kleineren) Argumenten, die sich schrittweise dem Basisfall aufschließen.

### Achtung: Stack Overflow!
Da jeder Selbstaufruf einen neuen Stapelrahmen auf dem Call Stack platziert, wächst der Stapelspeicher mit jedem Schritt an. Vergisst du die Abbruchbedingung oder wählst die Schritte zu groß, läuft der Stack über. Das Programm stürzt mit einem **Stack Overflow** ab.

---

## 7.9 Die main()-Funktion (Rückgabewert) & 7.10 exit()

Die `main()`-Funktion ist der Einstiegspunkt jedes C-Programms. Bestimmt hast du dich gefragt, warum sie meistens als `int main()` definiert ist und am Ende ein `return 0;` steht.

### Der Rückgabewert von main()
Dieser Rückgabewert geht nicht an eine andere Funktion, sondern direkt an das **Betriebssystem** oder die Konsole, die dein Programm gestartet hat.
* `return 0;` signalisiert: Das Programm wurde **erfolgreich** und ohne Fehler beendet.
* Jeder Wert ungleich `0` (meistens `1` oder negative Zahlen) signalisiert: Es ist ein **Fehler** aufgetreten.

### Die exit()-Funktion
Manchmal tritt tief im Inneren einer Hilfsfunktion ein so schwerwiegender Fehler auf, dass ein normales Zurückspringen über den Call Stack keinen Sinn mehr macht und das Programm sofort beendet werden muss. Hier hilft die Funktion `exit()` aus der Standardbibliothek `<stdlib.h>`.

* Ein Aufruf von `exit(0);` beendet das gesamte Programm augenblicklich und gibt den Status `0` an das Betriebssystem zurück – egal, in welcher Funktion du dich gerade befindest.
* In der `<stdlib.h>` sind dafür auch Konstanten definiert: `EXIT_SUCCESS` (entspricht `0`) und `EXIT_FAILURE` (entspricht einem plattformabhängigen Fehlerwert, meist `1`).

---

## 7.11 Globale, lokale und statische Variablen

Wo eine Variable im Programm sichtbar ist und wie lange sie im Speicher existiert, hängt davon ab, wo und mit welchen Schlüsselwörtern sie deklariert wurde. Wir unterscheiden zwischen **Scope** (Gültigkeitsbereich) und **Lifetime** (Lebensdauer).

### 1. Lokale Variablen
Variablen, die innerhalb einer Funktion (oder eines Blocks `{ ... }`) deklariert werden.
* **Scope:** Nur innerhalb dieses Blocks sichtbar.
* **Lifetime:** Werden beim Betreten des Blocks auf dem Stack angelegt und beim Verlassen automatisch zerstört (daher auch *automatische Variablen* genannt).

### 2. Globale Variablen
Variablen, die außerhalb aller Funktionen (ganz oben im File) deklariert werden.
* **Scope:** Im gesamten Programmcode (in allen Funktionen) sichtbar.
* **Lifetime:** Existieren über die gesamte Laufzeit des Programms.

> [!CAUTION]
> Vermeide globale Variablen, wann immer es geht! Da jede Funktion eine globale Variable ungehindert verändern kann, schleichen sich extrem schwer auffindbare Fehler ein. Nutze stattdessen lieber Parameterübergaben.

### 3. Statische lokale Variablen (`static`)
Manchmal möchtest du, dass eine lokale Variable ihren Wert auch dann behält, wenn die Funktion beendet wird und beim nächsten Funktionsaufruf wieder zur Verfügung steht. Dafür nutzt du das Schlüsselwort `static` vor der Deklaration in der Funktion:

```c
void meine_funktion() {
    static int zaehler = 0; // Wird nur EINMAL beim Programmstart initialisiert
    zaehler++;
    // ...
}
```
* **Scope:** Weiterhin nur lokal in dieser Funktion sichtbar.
* **Lifetime:** Überlebt das Ende der Funktion und behält ihren Wert für den nächsten Aufruf.

### 4. Das Schlüsselwort `extern`
Wenn du ein großes C-Projekt hast, das aus mehreren `.c`-Dateien besteht, und du eine globale Variable nutzen möchtest, die in einer *anderen* Datei definiert wurde, musst du sie in deiner aktuellen Datei mit dem Schlüsselwort `extern` deklarieren. Damit weiß der Compiler: „Diese Variable existiert bereits woanders, reserviere keinen neuen Speicher, sondern nutze die existierende.“

---

## 7.12 Kontrollfragen und Aufgaben

### Kontrollfragen
1. Was ist der Unterschied zwischen der *Definition* und der *Vorausdeklaration* (Prototyp) einer Funktion?
2. Warum verändern sich Variablen im Hauptprogramm nicht, wenn du sie als Argument an eine Funktion übergibst und in dieser Funktion modifizierst? Welches Prinzip steckt dahinter?
3. Was versteht man unter dem *Call Stack* und was passiert bei einem *Stack Overflow*?
4. Welche zwei essenziellen Bedingungen müssen bei einer rekursiven Funktion erfüllt sein?
5. Was unterscheidet eine lokale Variable mit dem Schlüsselwort `static` von einer normalen lokalen Variable?

---

### Programmieraufgaben

#### Aufgabe 1: Der Temperatur-Konverter
Schreibe ein Programm, das Temperaturen von Celsius in Fahrenheit umrechnen kann.
* Erstelle eine Funktion zur Umrechnung. Überlege dir genau: Welchen Datentyp haben Temperaturen üblicherweise? Welchen Rückgabetyp und welche Parameter benötigt die Funktion?
* Formel zur Umrechnung: $F = C \cdot 1.8 + 32$
* Rufe die Funktion in deiner `main()` auf und gib das Ergebnis formatiert auf der Konsole aus.
* *Tipp:* Achte auf die korrekte Verwendung von Gleitkommazahlen (`float` oder `double`), da bei ganzzahliger Division Nachkommastellen verloren gehen könnten.

#### Aufgabe 2: Der Besucherzähler
Entwirfe ein Programm mit einer Funktion namens `registriere_besucher()`.
* Die Funktion soll bei jedem Aufruf eine Nachricht auf der Konsole ausgeben, die anzeigt, der wievielte Besucher gerade den Raum betritt (z. B. "Besucher Nr. 1 ist eingetroffen", "Besucher Nr. 2 ist eingetroffen", ...).
* Nutze hierzu eine geeignete Speicherklasse innerhalb der Funktion, um den Zählerstand über die Funktionsaufrufe hinweg aufrechtzuerhalten, ohne eine globale Variable zu verwenden.

#### Aufgabe 3: Countdown per Rekursion
Erstelle eine rekursive Funktion, die einen Countdown herunterzählt.
* Die Funktion soll eine Startzahl als Parameter erhalten.
* Sie soll die aktuelle Zahl ausgeben und sich anschließend selbst mit der nächstkleineren Zahl aufrufen.
* *Wichtig:* Vergiss nicht, die Abbruchbedingung einzubauen (z. B. wenn die Zahl `0` erreicht ist), damit der Countdown stoppt und eine Abschlussmeldung ausgibt.

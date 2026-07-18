# 3 Kontrollstrukturen & Funktionen in Kotlin

Willkommen zum dritten Kapitel unseres Kotlin-Kurses! Bisher hast du Variablen, Datentypen und das Null-Safety-System von Kotlin kennengelernt. Nun bringen wir Dynamik und Logik in deinen Code: Wie trifft dein Programm Entscheidungen? Wie führt es Aufgaben wiederholt aus? Und wie strukturierst du Code in wiederverwendbare Bausteine?

In diesem Kapitel lernst du die eleganten Kontrollstrukturen von Kotlin kennen – insbesondere wie `if` und `when` als Ausdrücke verwendet werden und wie mächtig Kotlin-Funktionen durch Standard- und benannte Argumente aufgebaut sind.

---

## 3.1 `if` und `else` als Ausdrücke

In vielen klassischen Programmiersprachen (wie C oder Java) ist `if` eine reine **Anweisung** (Statement). Eine Anweisung führt eine Aktion aus, liefert selbst aber keinen Wert zurück. In Kotlin hingegen ist `if` (genau wie in **Rust**) primär ein **Ausdruck** (Expression). Das bedeutet: Ein `if`-Block kann ein Ergebnis berechnen und diesen Wert direkt an eine Variable zurückgeben!

### Analogie: Der Verkaufsautomat vs. die Ampel
* **`if` als Anweisung (wie eine Ampel):** Sie schaltet auf grün oder rot und steuert den Verkehr. Sie gibt dir aber nichts in die Hand.
* **`if` als Ausdruck (wie ein Verkaufsautomat):** Du wirfst eine Bedingung (Münze) hinein, und der Automat gibt dir direkt das passend gewählte Produkt (den Rückgabewert) heraus!

### `if` als Ausdruck in der Praxis

Schauen wir uns den Unterschied im Code an. Statt eine Variable vorab leer zu deklarieren und sie in den Zweigen zu befüllen:

```kotlin
// Klassischer Weg (Statement-Stil):
val alter = 20
val status: String
if (alter >= 18) {
    status = "Volljährig"
} else {
    status = "Minderjährig"
}
```

kannst du das Ergebnis von `if` in Kotlin direkt zuweisen:

```kotlin
// Kotlin-Weg (Expression-Stil):
val alter = 20
val status = if (alter >= 18) "Volljährig" else "Minderjährig"
```

> [!NOTE]
> **Kein Ternärer Operator nötig:** In C, C++ oder Java nutzt man oft den ternären Operator `bedingung ? wert1 : wert2`. Da `if` in Kotlin bereits ein Ausdruck ist, gibt es den `? :`-Operator in dieser Form nicht! (Hinweis: Das Symbol `?:` existiert in Kotlin als *Elvis-Operator* für Null-Safety, hat aber eine andere Funktion.)

### Mehrzeilige Blöcke im `if`-Ausdruck

Wenn ein `if`- oder `else`-Zweig aus mehreren Zeilen besteht, bestimmt der **letzte Ausdruck** innerhalb der geschweiften Klammern den Rückgabewert dieses Zweigs:

```kotlin
val temperatur = 28

val empfehlung = if (temperatur > 25) {
    println("Es ist warm draußen!")
    "T-Shirt und Sonnenbrille" // Das ist der Rückgabewert des if-Zweigs
} else {
    println("Es ist kühler.")
    "Jacke anziehen"           // Das ist der Rückgabewert des else-Zweigs
}

println("Empfehlung: $empfehlung")
```

> [!IMPORTANT]
> **Pflicht zum `else`-Zweig:** Wenn du `if` als Ausdruck nutzt (d. h. den Wert einer Variablen zuweist oder zurückgibst), **muss** ein `else`-Zweig vorhanden sein! Der Compiler muss zu 100 % garantieren können, dass unter allen Umständen ein Wert zurückgegeben wird.

---

## 3.2 Das mächtige `when` (Das Pattern Matching von Kotlin)

In vielen Sprachen gibt es das klassische `switch`-Statement, das oft starr auf einfache Zahlen oder Strings beschränkt ist. Kotlin ersetzt `switch` durch das unvergleichlich flexiblere und mächtigere **`when`**-Konstrukt. Wenn du **Rust** kennst, wird dich `when` stark an Rusts `match` erinnern!

### Analogie: Die intelligente Sortiermaschine
Stell dir eine Post-Sortiermaschine vor. Eine einfache Maschine kann Briefe nur nach der Postleitzahl sortieren. `when` ist wie eine KI-gestützte Super-Maschine: Sie prüft das Gewicht, scannt den Inhalt, prüft, ob es ein Paket oder Brief ist, und entscheidet flexibel über die Zustellung.

### Basis-Syntax von `when`

Ein einfaches `when` kann Werte direkt vergleichen:

```kotlin
val ampelFarbe = "Gelb"

when (ampelFarbe) {
    "Rot" -> println("Stopp!")
    "Gelb" -> println("Achtung, bereitmachen!")
    "Grün" -> println("Freie Fahrt!")
    else -> println("Unbekanntes Signal!")
}
```

### Muster und Bedingungen in `when`

Die wahre Stärke von `when` zeigt sich bei komplexeren Vergleichen:

#### 1. Mehrere Werte kombinieren (Komma-getrennt)
```kotlin
val tag = "Samstag"

when (tag) {
    "Samstag", "Sonntag" -> println("Wochenende! 🎉")
    else -> println("Arbeitstag... 💼")
}
```

#### 2. Bereiche (Ranges) prüfen mit `in`
```kotlin
val alter = 15

val altersGruppe = when (alter) {
    in 0..2 -> "Kleinkind"
    in 3..12 -> "Kind"
    in 13..17 -> "Teenie"
    in 18..64 -> "Erwachsener"
    else -> "Senior"
}

println("Altersgruppe: $altersGruppe")
```

#### 3. Typ-Prüfung und Smart Cast mit `is`
Kotlin kann in `when` den Datentyp einer Variable prüfen (`is`). Das Beste daran: Nach dem `is`-Check führt Kotlin automatisch einen **Smart Cast** durch – du kannst die Variable im jeweiligen Zweig direkt als diesen Typ verwenden!

```kotlin
fun analysiereObjekt(obj: Any) {
    when (obj) {
        is Int -> println("Es ist eine Ganzzahl. Das Quadrat ist: ${obj * obj}")
        is String -> println("Es ist ein Text mit Länge: ${obj.length}")
        is Boolean -> println("Es ist ein Wahrheitswert: $obj")
        else -> println("Unbekannter Typ!")
    }
}
```

#### 4. `when` ohne Argument (als Ersatz für lange `if-else`-Ketten)
Du kannst `when` auch ohne Übergabeparameter nutzen. Dann arbeitet jeder Zweig wie eine eigenständige Boolesche Bedingung:

```kotlin
val x = 10
val y = 20

when {
    x < y -> println("x ist kleiner als y")
    x > y -> println("x ist größer als y")
    else -> println("x und y sind gleich")
}
```

> [!TIP]
> **`when` als Ausdruck:** Genau wie `if` kann auch `when` Werte direkt zurückgeben (`val ergebnis = when(...) { ... }`). Auch hier gilt: Wird `when` als Ausdruck genutzt, ist der `else`-Zweig zwingend erforderlich (außer beim Prüfen von vollzählbaren `enum`-Klassen oder `sealed`-Hierarchien).

---

## 3.3 Schleifen und Ranges in Kotlin

Schleifen dienen dazu, Codeblöcke mehrfach auszuführen. Kotlin bietet dafür klassische `while`-Schleifen sowie extrem elegante `for`-Schleifen in Kombination mit **Ranges** (Bereichen).

### Ranges (Bereiche) in Kotlin

Ranges sind ein zentrales Konzept in Kotlin, um Zahlenfolgen präzise zu definieren:

* **Inklusiver Bereich (`..`):** `1..5` beinhaltet `1, 2, 3, 4, 5`.
* **Exklusiver Bereich (`until`):** `1 until 5` beinhaltet `1, 2, 3, 4` (die 5 ist ausgeschlossen).
* **Rückwärts zählen (`downTo`):** `5 downTo 1` beinhaltet `5, 4, 3, 2, 1`.
* **Schrittweite festlegen (`step`):** `1..10 step 2` beinhaltet `1, 3, 5, 7, 9`.

### Die `for`-Schleife

In Kotlin iteriert eine `for`-Schleife immer über etwas, das durchlaufen werden kann (Ranges, Sammlungen, Arrays).

```kotlin
// Iteration über eine Range
print("Vorwärts: ")
for (i in 1..5) {
    print("$i ") // Ausgabe: 1 2 3 4 5
}
println()

// Schrittweite 2 und rückwärts
print("Countdown: ")
for (i in 10 downTo 0 step 2) {
    print("$i ") // Ausgabe: 10 8 6 4 2 0
}
println()

// Iteration über eine Liste
val fruechte = listOf("Apfel", "Banane", "Kirsche")
for (frucht in fruechte) {
    println("Lecker: $frucht")
}

// Iteration mit Index
for ((index, wert) in fruechte.withIndex()) {
    println("Index $index ist $wert")
}
```

### Die `while`- und `do-while`-Schleife

Diese Schleifen funktionieren genau wie in anderen Sprachen:

* **`while` (kopfgesteuert):** Prüft die Bedingung **vor** jedem Durchlauf. Ist sie von Anfang an `false`, wird der Rumpf nie ausgeführt.
* **`do-while` (fußgesteuert):** Prüft die Bedingung **nach** dem Durchlauf. Der Rumpf wird **mindestens einmal** ausgeführt!

```kotlin
var zaehler = 3

// while-Schleife
while (zaehler > 0) {
    println("Countdown: $zaehler")
    zaehler--
}

// do-while-Schleife
var eingabe: String
do {
    // Wird mindestens 1x ausgeführt
    eingabe = "beenden" // Beispielhafter Wert
    println("Schleife läuft...")
} while (eingabe != "beenden")
```

---

## 3.4 Funktionen in Kotlin

Funktionen sind die wichtigsten Bausteine deines Programms. Sie kapseln Logik, machen Code wiederverwendbar und halten Programme übersichtlich.

### Grundlegende Funktions-Syntax

Eine Funktion in Kotlin wird mit dem Schlüsselwort `fun` eingeleitet:

```kotlin
// fun name(parameter: Typ): Rückgabetyp { ... }
fun addiere(a: Int, b: Int): Int {
    return a + b
}
```

#### Der Rückgabetyp `Unit`
Wenn eine Funktion keinen sinnvollen Wert zurückgibt (vergleichbar mit `void` in C/Java oder `()` in Rust), lautet der Rückgabetyp `Unit`. Du kannst die Angabe `: Unit` aber einfach weglassen:

```kotlin
// Ist identisch mit: fun meineFunktion(): Unit
fun begrüße(name: String) {
    println("Hallo, $name!")
}
```

---

### Standard-Argumente (Default Arguments)

In vielen Sprachen muss man Funktionen mehrfach überladen (Method Overloading), wenn man manche Parameter optional machen möchte. In Kotlin kannst du Parametern einfach **Standardwerte** zuweisen!

```kotlin
fun erstelleBenachrichtigung(text: String, wichtig: Boolean = false, lautstaerke: Int = 50) {
    println("Nachricht: $text | Wichtig: $wichtig | Lautstärke: $lautstaerke")
}

fun main() {
    // Aufruf ohne optionale Parameter (Standardwerte werden genutzt)
    erstelleBenachrichtigung("Backup abgeschlossen")
    
    // Überschreiben des ersten optionalen Parameters
    erstelleBenachrichtigung("Systemfehler!", true)
}
```

---

### Benannte Argumente (Named Arguments)

Beim Aufruf einer Funktion kannst du die Namen der Parameter explizit angeben. Das macht den Aufruf enorm lesbar und erlaubt es dir, Parameter in beliebiger Reihenfolge zu übergeben oder bestimmte Standardwerte gezielt zu überspringen:

```kotlin
fun main() {
    // Lesbarkeit steigern durch benannte Argumente:
    erstelleBenachrichtigung(
        text = "Speicher voll",
        lautstaerke = 90,
        wichtig = true
    )
    
    // Nur den Parameter 'lautstaerke' anpassen, 'wichtig' bleibt beim Standardwert (false):
    erstelleBenachrichtigung("Warnung", lautstaerke = 100)
}
```

---

### Single-Expression Functions (Einzeilige Funktionen)

Besteht der Rumpf einer Funktion nur aus einem einzigen Ausdruck (einer Expression), kannst du die geschweiften Klammern `{}` und das `return` weglassen und stattdessen ein `=`-Zeichen verwenden:

```kotlin
// Ausführliche Schreibweise:
fun quadratLangeSchreibweise(x: Int): Int {
    return x * x
}

// Kurzform (Single-Expression Function):
fun quadrat(x: Int): Int = x * x

// Dank Typinferenz kann sogar der Rückgabetyp weggelassen werden:
fun kubik(x: Int) = x * x * x
```

---

## 3.5 Übungen & Praxis-Experimente

Jetzt bist du an der Reihe! Vervollständige die folgenden Code-Gerüste. Ersetze die `TODO(...)`-Aufrufe durch deinen eigenen Code.

> [!IMPORTANT]
> **Hinweis zum Lernen:** Schreibe den Code selbst in deiner Entwicklungsumgebung (z. B. IntelliJ IDEA oder Kotlin Playground) und probiere verschiedene Eingaben aus!

### Aufgabe 1: Notenbewertung mit `when` (Leicht)
Erstelle eine Funktion `bewerteNote(note: Int): String`, die eine Schulnote (1 bis 6) als `Int` entgegennimmt und als `when`-Ausdruck eine passende Textbewertung zurückgibt.

* **1:** "Sehr gut"
* **2:** "Gut"
* **3:** "Befriedigend"
* **4:** "Ausreichend"
* **5, 6:** "Nicht bestanden"
* **Alle anderen Werte:** "Ungültige Note"

```kotlin
fun bewerteNote(note: Int): String = when (note) {
    // TODO("Ergänze die Zweige für 1, 2, 3, 4 sowie 5..6 und den else-Zweig")
    TODO("Implementiere den when-Ausdruck")
}

fun main() {
    println(bewerteNote(1)) // Erwartet: Sehr gut
    println(bewerteNote(5)) // Erwartet: Nicht bestanden
    println(bewerteNote(9)) // Erwartet: Ungültige Note
}
```

---

### Aufgabe 2: Summe ungerader Zahlen mit Ranges (Mittel)
Schreibe eine Funktion `summeUngeraderZahlen(bis: Int): Int`, die alle **ungeraden** Zahlen von 1 bis einschließlich `bis` aufsummiert. Nutze dafür eine `for`-Schleife und eine Range mit Schrittweite (`step`).

```kotlin
fun summeUngeraderZahlen(bis: Int): Int {
    var summe = 0
    // TODO("Erstelle eine for-Schleife über eine Range von 1 bis 'bis' mit step 2")
    // TODO("Addiere in jedem Durchlauf die Zahl zur Variable summe")
    TODO("Gib das Ergebnis zurück")
}

fun main() {
    // 1 + 3 + 5 + 7 + 9 = 25
    println("Summe bis 10: ${summeUngeraderZahlen(10)}") // Erwartet: 25
}
```

---

### Aufgabe 3: Steckbrief-Generator (Schwer)
Schreibe eine Funktion `erstelleSteckbrief`, die Informationen über einen Benutzer zusammenstellt und als formatierten String zurückgibt.

**Anforderungen:**
* Parameter `name`: String (Pflicht)
* Parameter `alter`: Int (Pflicht)
* Parameter `beruf`: String (Standardwert: `"Unbekannt"`)
* Parameter `istAdmin`: Boolean (Standardwert: `false`)

Die Funktion soll als **Single-Expression Function** definiert werden. Im Rückgabewert soll mithilfe eines `if`-Ausdrucks dem Namen das Präfix `"[ADMIN] "` vorangestellt werden, wenn `istAdmin` den Wert `true` hat.

```kotlin
// TODO("Definiere die Funktion erstelleSteckbrief mit Standard-Argumenten als Single-Expression Function")
fun erstelleSteckbrief(
    name: String,
    alter: Int,
    beruf: String = TODO("Standardwert angeben"),
    istAdmin: Boolean = TODO("Standardwert angeben")
): String = TODO("Baue den Steckbrief-String inklusive if-Ausdruck für das Admin-Präfix zusammen")

fun main() {
    // Aufruf 1: Nur Pflichtargumente
    println(erstelleSteckbrief("Anna", 28))
    // Erwartet: "User: Anna (28 Jahre) - Beruf: Unbekannt"

    // Aufruf 2: Benannte Argumente mit Admin-Status
    println(erstelleSteckbrief(name = "Thorsten", alter = 42, istAdmin = true, beruf = "Entwickler"))
    // Erwartet: "User: [ADMIN] Thorsten (42 Jahre) - Beruf: Entwickler"
}
```

---

## 3.6 Zusammenfassung

In diesem Kapitel hast du die Grundlagen von Kontrollstrukturen und Funktionen in Kotlin gemeistert:

1. **`if` ist ein Ausdruck:** `if` kann direkt Werte berechnen und Variablen zugewiesen werden. Der `else`-Zweig ist bei der Verwendung als Ausdruck verpflichtend.
2. **`when` ist mächtig:** Es ersetzt das klassische `switch` durch Pattern Matching. Es unterstützt Wertevergleiche, Mehrfachwerte, Ranges (`in`), Typ-Checks (`is` mit Smart Casts) und freie Bedingungen.
3. **Ranges & Schleifen:** Kotlin macht Iterationen mit `1..10`, `until`, `downTo` und `step` extrem übersichtlich und sicher.
4. **Moderne Funktionen:** 
   * Standard-Argumente machen überladene Funktionen überflüssig.
   * Benannte Argumente steigern die Lesbarkeit und ermöglichen flexible Aufrufe.
   * Single-Expression Functions (`fun f(x) = x * 2`) erlauben prägnanten und eleganten Code.

| Konzept | Syntax-Beispiel | Beschreibung |
| :--- | :--- | :--- |
| **`if`-Ausdruck** | `val x = if (a) 1 else 2` | Liefert direkt einen Wert zurück |
| **`when`-Pattern** | `when(x) { is String -> ... }` | Mächtiges Matching inkl. Smart Casts |
| **Range (inklusiv)** | `1..10` | Zahlen von 1 bis 10 |
| **Range (exklusiv)** | `1 until 10` | Zahlen von 1 bis 9 |
| **Standard-Argument** | `fun g(x: Int = 0)` | Parameter hat einen Vorgabewert |
| **Benanntes Argument** | `g(x = 5)` | Parameter explizit beim Aufruf benennen |
| **Single-Expression** | `fun double(x: Int) = x * 2` | Einzeilige Funktion ohne `{ return ... }` |

Im nächsten Kapitel werden wir uns noch tiefer mit Sammlungen (Collections), Lambdas und der funktionalen Programmierung in Kotlin beschäftigen!

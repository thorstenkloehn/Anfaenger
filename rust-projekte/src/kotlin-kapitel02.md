# 2 Variablen, Datentypen & Null-Safety in Kotlin

Willkommen zum zweiten Kapitel! Nachdem du im ersten Kapitel dein erstes Kotlin-Programm gestartet und die grundlegende Struktur kennengelernt hast, tauchen wir nun tief in das Herzstück von Kotlin ein: wie Daten gespeichert, verarbeitet und vor den gefürchteten Laufzeitfehlern geschützt werden.

Kotlin wurde entwickelt, um Entwicklern das Leben leichter zu machen und typische Fehlerquellen moderner Programmiersprachen von vornherein auszuschließen. In diesem Kapitel lernst du, wie Kotlin Variablen handhabt, welche Datentypen dir zur Verfügung stehen und warum Kotlins **Null-Safety** als das absolute Flaggschiff der Sprache gilt.

---

## 2.1 `val` vs `var` (Unveränderlichkeit & Typableitung)

In Kotlin gibt es zwei Schlüsselwörter, um Variablen zu deklarieren: `val` und `var`. Auch wenn beide Werte speichern, unterscheiden sie sich in einem grundlegenden Punkt: der **Veränderbarkeit** (Mutability).

### `val` (Value - Unveränderlich / Read-Only)
Eine mit `val` deklarierte Variable ist **read-only** (schreibgeschützt). Sobald ihr einmal ein Wert zugewiesen wurde, kann dieser nicht mehr geändert werden.

```kotlin
val geburtsjahr = 1995
// geburtsjahr = 2000 // ❌ Compiler-Fehler: Val cannot be reassigned!
```

> [!TIP]
> **Praxis-Regel:** Nutze standardmäßig **immer `val`**! Erst wenn du absolut sicher bist, dass sich ein Wert im Laufe des Programms ändern muss (wie z. B. ein Zähler in einer Schleife), wechselst du zu `var`.
> Unveränderlichkeit verhindert unbeabsichtigte Seiteneffekte, macht deinen Code übersichtlicher und ist besonders in der nebenläufigen Programmierung (Multithreading) viel sicherer.

### `var` (Variable - Veränderlich)
Eine mit `var` deklarierte Variable ist **veränderlich** (mutable). Du kannst ihr im Nachhinein beliebig oft neue Werte zuweisen – solange der Datentyp gleich bleibt.

```kotlin
var punktestand = 0
punktestand = 10 // ✅ Erlaubt!
punktestand = 25 // ✅ Erlaubt!
```

### Typinferenz (Automatische Typableitung)
Kotlin ist eine **stark und statisch typisierte** Sprache. Das bedeutet, dass jede Variable zur Kompilierzeit einen festen Typ hat. Das Geniale an Kotlin ist jedoch, dass du den Typ meistens nicht explizit hinschreiben musst. Der Compiler erkennt den Datentyp anhand des zugewiesenen Werts automatisch. Das nennt man **Typinferenz** (Type Inference).

```kotlin
// Der Compiler erkennt automatisch:
val sprache = "Kotlin" // Typ: String
val alter = 28          // Typ: Int
val istAktiv = true     // Typ: Boolean
```

Selbstverständlich kannst du den Typ auch explizit angeben, wenn du das möchtest oder der Typ nicht eindeutig ist:

```kotlin
val sprache: String = "Kotlin"
val alter: Int = 28
```

> [!NOTE]
> Einmal festgelegt, bleibt der Typ einer Variable unveränderlich! Du kannst einer `var`-Variable vom Typ `Int` später keinen `String` zuweisen:
> ```kotlin
> var zaehler = 42
> // zaehler = "Hallo" // ❌ Compiler-Fehler: Type mismatch!
> ```

---

## 2.2 Basisdatentypen & String Templates

Kotlin stellt dir alle gewohnten grundlegenden Datentypen zur Verfügung. Anders als in Java gibt es in Kotlin keine Unterscheidung zwischen primitiven Typen und Wrapper-Klassen – in Kotlin ist alles ein Objekt!

### Übersicht der Basisdatentypen

| Typ | Beschreibung | Beispiel |
| :--- | :--- | :--- |
| `Int` | Ganzzahl (32-Bit) | `42`, `-100` |
| `Long` | Große Ganzzahl (64-Bit) | `3000000000L` |
| `Double` | Fließkommazahl mit hoher Präzision (64-Bit, Standard) | `3.14159` |
| `Float` | Fließkommazahl (32-Bit) | `2.718f` (mit `f` oder `F` Suffix) |
| `Boolean` | Wahrheitswert | `true`, `false` |
| `Char` | Einzelnes Zeichen (in einfachen Anführungszeichen) | `'A'`, `'?'` |
| `String` | Zeichenkette (in doppelten Anführungszeichen) | `"Hallo Welt"` |

### String Templates (Zeichenketten-Schablonen)

Das Arbeiten mit Texten in Kotlin ist extrem komfortabel. Statt Strings mühsam mit dem `+`-Operator zusammenzufügen, nutzt du **String Templates**. Über das `$`-Zeichen kannst du Variablen direkt in den Text einbetten:

```kotlin
val name = "Anna"
val alter = 25

// Eleganter String Template Aufruf:
val begruessung = "Hallo, mein Name ist $name und ich bin $alter Jahre alt."
println(begruessung) // Ausgabe: Hallo, mein Name ist Anna und ich bin 25 Jahre alt.
```

Möchtest du komplexere Ausdrücke oder Funktionsaufrufe einbetten, umschließt du den Ausdruck mit geschweiften Klammern `${...}`:

```kotlin
val a = 5
val b = 10
println("Die Summe von $a und $b ist ${a + b}.") 
// Ausgabe: Die Summe von 5 und 10 ist 15.

val text = "kotlin"
println("Der Text in Großbuchstaben: ${text.uppercase()}") 
// Ausgabe: Der Text in Großbuchstaben: KOTLIN
```

Für mehrzeilige Texte kannst du **Raw Strings** mit dreifachen Anführungszeichen `"""` verwenden. Hier bleiben alle Zeilenumbrüche und Sonderzeichen exakt so erhalten, wie du sie schreibst:

```kotlin
val htmlSnippet = """
    <div>
        <h1>Willkommen!</h1>
    </div>
""".trimIndent()
```

---

## 2.3 Das Flaggschiff: Kotlin Null-Safety

Der Erfinder der Referenz `null`, Sir Tony Hoare, bezeichnete `null` einmal als seine **„Milliarde-Dollar-Fehlentscheidung“** (The Billion Dollar Mistake). In vielen Sprachen führt der Versuch, auf eine `null`-Referenz zuzugreifen, zu einem Absturz zur Laufzeit – in Java bekannt als die berüchtigte `NullPointerException` (NPE).

Kotlin löst dieses Problem direkt auf Sprachebene: **Standardmäßig darf kein Datentyp den Wert `null` annehmen!**

### Nicht-nullbare Typen (Non-Nullable Types)

Wenn du eine normale Variable deklarierst, garantiert dir der Kotlin-Compiler, dass diese Variable niemals `null` sein kann.

```kotlin
var name: String = "Lukas"
// name = null // ❌ Compiler-Fehler: Null can not be a value of a non-null type String!
```

Da `name` garantiert einen gültigen `String` enthält, kannst du Methoden darauf aufrufen, ohne Abstürze befürchten zu müssen:

```kotlin
val laenge = name.length // ✅ Völlig sicher!
```

### Nullbare Typen (Nullable Types)

Manchmal ist der Wert eines Feldes schlichtweg unbekannt oder optional (z. B. eine optionale Telefonnummer oder ein Benutzereingabe-Feld). Für solche Fälle musst du den Typ explizit als **nullbar** markieren, indem du ein Fragezeichen `?` an den Datentyp anhängst:

```kotlin
var spitzname: String? = "Luki"
spitzname = null // ✅ Erlaubt, da der Typ String? ist!
```

Wenn eine Variable nullbar ist, lässt Kotlin dich nicht mehr direkt darauf zugreifen, um Abstürze zu vermeiden:

```kotlin
// val laenge = spitzname.length 
// ❌ Compiler-Fehler: Only safe (?.) or non-null asserted (!!.) calls are allowed on nullable receiver of type String?
```

Der Compiler zwingt dich dazu, sicher mit dem potenziellen `null`-Wert umzugehen!

---

## 2.4 Sicheres Arbeiten mit `null`

Um mit nullbaren Variablen (`Type?`) zu arbeiten, bietet dir Kotlin vier elegante und sichere Werkzeuge:

### 1. Safe Call Operator (`?.`)
Der Safe Call Operator prüft vor dem Zugriff, ob die Variable `null` ist. 
- Ist der Wert **nicht `null`**, wird die Eigenschaft oder Methode ausgeführt.
- Ist der Wert **`null`**, wird die Ausführung übersprungen und der Gesamtausdruck ergibt sofort `null`.

```kotlin
val text: String? = null
val laenge: Int? = text?.length

println(laenge) // Ausgabe: null (kein Absturz!)
```

### 2. Elvis Operator (`?:`)
Der Elvis-Operator verdankt seinen Namen der Ähnlichkeit mit der Schmalztolle von Elvis Presley (wenn du den Kopf auf die linke Schulter legst 😉 `?:`). 

Er erlaubt dir, einen **Standardwert (Fallback)** festzulegen, falls ein Ausdruck `null` ergibt:

```kotlin
val eingabe: String? = null

// Wenn eingabe?.length null ist, verwende stattdessen 0:
val laenge: Int = eingabe?.length ?: 0

println("Länge: $laenge") // Ausgabe: Länge: 0
```

> [!IMPORTANT]
> Der Elvis-Operator ist die perfekte Brücke, um von einem nullbaren Typ (`Int?`) wieder zu einem sicheren, nicht-nullbaren Typ (`Int`) zu gelangen!

### 3. Der `let`-Block
Der Safe Call Operator lässt sich hervorragend mit der Scoping-Funktion `.let { ... }` kombinieren. Der Block innerhalb von `let` wird **nur dann ausgeführt**, wenn das Objekt nicht `null` ist. Innerhalb des Blocks greifst du über das Schlüsselwort `it` auf den Wert zu:

```kotlin
val benutzerEmail: String? = "max@example.com"

benutzerEmail?.let { email ->
    // Dieser Code wird nur ausgeführt, wenn benutzerEmail nicht null ist!
    println("Sende Bestätigungs-E-Mail an: $email")
}
```

### 4. Not-Null Assertion Operator (`!!`)
Der Operator `!!` verwandelt jeden Wert gewaltsam in einen nicht-nullbaren Typ. Du sagst damit dem Compiler: *„Glaub mir, ich weiß was ich tue, dieser Wert ist garantiert nicht null!“*

```kotlin
val name: String? = "Julia"
val laenge: Int = name!!.length // Funktioniert, wenn name != null ist
```

> [!WARNING]
> **Warum `!!` gefährlich ist:** Sollte die Variable doch einmal `null` sein, wirft `!!` sofort eine klassische `NullPointerException` und bringt dein Programm zum Absturz.
> **Faustregel:** Vermeide `!!` in der Praxis fast immer! Verwende stattdessen `?.`, `?:` oder `let`.

---

## 2.5 Übungen & Praxis-Experimente

Jetzt bist du an der Reihe! Vervollständige die folgenden Code-Gerüste. Ersetze die `TODO(...)`-Aufrufe durch deinen eigenen Code. 

> [!NOTE]
> Schreibe den Code in deine eigene Kotlin-Datei (z. B. `Main.kt`) in deiner Entwicklungsumgebung und teste dein Wissen!

### Übung 1: Grundlagen zu `val`, `var` & String Templates (Leicht)

**Aufgabe:** 
Erstelle Variablen für ein Benutzerprofil (Name, Alter und Punktestand). Passe den Punktestand an und gib eine zusammenfassende Profilnachricht über ein String Template aus.

```kotlin
fun main() {
    // 1. Erstelle eine unveränderliche Variable 'benutzername' mit dem Wert "Alex"
    // TODO("Erstelle die Variable benutzername")

    // 2. Erstelle eine veränderliche Variable 'punkte' mit dem Startwert 100
    // TODO("Erstelle die Variable punkte")

    // 3. Erhöhe den Punktestand um 50
    // TODO("Erhöhe punkte um 50")

    // 4. Erstelle eine Variable 'profilText', die unter Verwendung von String Templates folgenden Text enthält:
    // "Benutzer Alex hat aktuell 150 Punkte."
    // TODO("Erstelle den profilText")

    // println(profilText)
}
```

<details>
<summary>💡 Denkanstoß / Hinweise (Hier klicken)</summary>

- Welche Variablen sollten `val` und welche `var` sein?
- Für das String Template nutzt du `$benutzername` und `$punkte`.
</details>

---

### Übung 2: Null-Safety & Elvis-Operator (Mittel)

**Aufgabe:**
Du erhältst eine nullbare Benutzereingabe für eine Stadt. Schreibe eine Funktion `formatiereStadtName`, die:
- Bei einem gültigen Namen den Text in Großbuchstaben zurückgibt.
- Falls die Eingabe `null` oder leer ist, den Standardtext `"UNBEKANNT"` zurückgibt.

```kotlin
fun formatiereStadtName(eingabe: String?): String {
    // Vervollständige die Funktion.
    // Nutze den Safe Call Operator (?.) und den Elvis Operator (?:),
    // um im Null-Fall "UNBEKANNT" zurückzugeben.
    // Hinweis: Mit .uppercase() wandelst du einen String in Großbuchstaben um.
    
    return TODO("Implementiere die Null-Safety Logik")
}

fun main() {
    val stadt1: String? = "Berlin"
    val stadt2: String? = null

    // Erwartete Ausgabe: "BERLIN"
    // println(formatiereStadtName(stadt1))

    // Erwartete Ausgabe: "UNBEKANNT"
    // println(formatiereStadtName(stadt2))
}
```

<details>
<summary>💡 Denkanstoß / Hinweise (Hier klicken)</summary>

- Kombiniere `eingabe?.uppercase()` mit dem Elvis-Operator `?:`.
- Der Rückgabetyp der Funktion ist `String` (nicht-nullbar!), deine Logik muss also garantiert einen gültigen String liefern.
</details>

---

### Übung 3: Sichere Verarbeitung mit `let` (Schwer)

**Aufgabe:**
Gegeben ist eine Liste von optionalen E-Mail-Adressen. Schreibe eine Logik, die nur für gültige E-Mail-Adressen eine Nachricht ausgibt, indem du den `let`-Block nutzt.

```kotlin
fun sendeBenachrichtigung(email: String?) {
    // Prüfe mit ?.let { ... }, ob die Email vorhanden ist.
    // Falls sie nicht null ist, gib aus: "Sende Nachricht an: <email>"
    // Falls sie null ist, tue nichts.

    TODO("Implementiere die Benachrichtigungs-Logik mit ?.let")
}

fun main() {
    val email1: String? = "kontakt@kotlin.org"
    val email2: String? = null

    sendeBenachrichtigung(email1) // Soll ausgeben: Sende Nachricht an: kontakt@kontakt.org
    sendeBenachrichtigung(email2) // Soll gar nichts ausgeben
}
```

<details>
<summary>💡 Denkanstoß / Hinweise (Hier klicken)</summary>

- Nutze `email?.let { e -> println(...) }` oder `email?.let { println("Sende Nachricht an: $it") }`.
- Da `email2` den Wert `null` hat, wird der `let`-Block für `email2` einfach übersprungen.
</details>

---

## 2.6 Zusammenfassung

In diesem Kapitel hast du die Fundamente von Kotlins Datentypen und Sicherheitssystem kennengelernt:

- **`val` vs `var`:** Bevorzuge stets `val` (unveränderlich) für sauberen und sicheren Code. Nutze `var` nur, wenn Werte neu zugewiesen werden müssen.
- **Typinferenz:** Kotlin erkennt Datentypen automatisch anhand des zugewiesenen Werts.
- **String Templates:** Mit `$variable` und `${ausdruck}` bettest du Werte sauber in Zeichenketten ein.
- **Null-Safety:** Kotlin unterscheidet streng zwischen nicht-nullbaren Typen (`String`) und nullbaren Typen (`String?`). Dadurch werden Laufzeitabstürze durch `NullPointerException` verhindert.
- **Sichere Operatoren:**
  - `?.` (Safe Call): Überspringt den Aufruf, wenn der Wert `null` ist.
  - `?:` (Elvis Operator): Bietet einen Fallback-Wert für `null`.
  - `?.let { }`: Führt einen Codeblock nur aus, wenn der Wert nicht `null` ist.
  - `!!` (Not-Null Assertion): Erzwingt Nicht-Nullbarkeit, ist aber riskant und sollte vermieden werden.

Im nächsten Kapitel schauen wir uns an, wie wir den Programmablauf mit Bedingungen (`if`, `when`) und Schleifen steuern!

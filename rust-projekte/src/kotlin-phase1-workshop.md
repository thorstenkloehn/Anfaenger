# 🎯 Mitmach-Workshop: Kotlin Phase 1 bildhaft verstehen

Willkommen zum interaktiven Mitmach-Workshop der Phase 1! 🛠️✨

In den vorangegangenen Lektionen hast du die grundlegenden Bausteine von Kotlin kennengelernt: den Schutz vor Abstürzen durch **Null-Safety**, die Magie von **Smart Casts**, den eleganten Einsatz von **`if` und `when` als Ausdrücke** sowie interaktive Terminal-Eingaben.

In diesem Workshop durchläufst du 4 abwechslungsreiche Stationen. An jeder Station wartet ein praxisnahes Rätsel oder ein Code-Gerüst auf dich.

> 💡 **Didaktischer Hinweis:** In diesem Buch findest du keine fertigen Lösungen zum Kopieren! Stattdessen arbeitest du mit vorbereiteten Code-Gerüsten und der eingebauten Kotlin-Funktion `TODO("Dein Code hier")`. Versuche erst selbst nachzudenken und die Lücken zu füllen. So prägen sich die Konzepte am besten ein!

---

## 🔒 Station 1: Der Null-Safety-Tresor (Praxis-Rätsel zu Nullable Types)

### 🧸 Die Analogie: Der Tresor mit Geheimfach
Stell dir einen Tresor vor. Ein Tresor kann ein wertvolles Dokument enthalten (z. B. den Text `"Geheimplan"`) oder komplett leer sein (`null`).

In vielen alten Programmiersprachen stürzt das gesamte Gebäude ab, wenn man versucht, ein leeres Dokument aus einem Tresor zu lesen (der gefürchtete `NullPointerException`-Crash). In Kotlin schützt dich der Compiler:
- Ein normaler Typ wie `String` garantiert, dass **niemals** `null` darin liegt.
- Ein **Nullable Typ** wie `String?` erlaubt `null`, erfordert aber vorsichtigen Umgang!

Um an den Inhalt eines `String?`-Tresors zu gelangen, stehen dir drei Werkzeuge zur Verfügung:
1. **Sicherer Aufruf (`?.`)**: *"Lies die Länge des Textes ab, wenn einer da ist. Falls nicht, gib mir einfach `null` zurück."*
2. **Elvis-Operator (`?:`)**: *"Gib mir den Text – und falls der Tresor leer (`null`) ist, nimm den Ersatzwert auf der rechten Seite!"*
3. **Not-Null Assertion (`!!`)**: *"Ich bin mir zu 100% sicher, dass da was drin ist! Brech den Tresor auf!"* (Achtung: Falls er doch leer ist, stürzt das Programm ab!).

---

### 🛠️ Dein Einsatz im Tresorraum (Aufgabe 1)

Vervollständige die Funktion `ermittleTextLaenge`, die die Länge eines Textes zurückgeben soll. Wenn der übergebene Text `null` ist, soll die Funktion als Ausweichwert `0` zurückgeben.

```kotlin
fun ermittleTextLaenge(inhalt: String?): Int {
    // TODO: Nutze den Safe-Call (?.) in Kombination mit dem Elvis-Operator (?:),
    // um die Länge des inhalt-Strings zurückzugeben oder 0, falls inhalt null ist.
    return TODO("Dein Code hier")
}

fun main() {
    val text1: String? = "Kotlin"
    val text2: String? = null

    println("Länge 1: ${ermittleTextLaenge(text1)}") // Erwartete Ausgabe: 6
    println("Länge 2: ${ermittleTextLaenge(text2)}") // Erwartete Ausgabe: 0
}
```

---

### 🔍 Leitfragen & Compiler-Blick

1. **Was würde der Compiler sagen**, wenn du versuchen würdest, direkt `return inhalt.length` ohne Fragezeichen zu schreiben?
   - *Antwort:* Der Kotlin-Compiler verweigert das Kompilieren mit der Fehlermeldung: `Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type String?`. Er stoppt Fehler schon vor dem Ausführen!
2. **Warum ist der Elvis-Operator `?:` so nützlich?**
   - Er erlaubt es dir, `null`-Werte elegant abzufangen und einen sinnvollen Standardwert festzulegen, ohne lange `if (inhalt != null)`-Verschachtelungen schreiben zu müssen.

---

## 🏭 Station 2: Das Smart-Cast-Fließband (Typen prüfen mit `is` und `when`)

### 🧸 Die Analogie: Die automatische Paket-Sortieranlage
Stell dir ein Fließband in einem Logistikzentrum vor. Über das Fließband laufen Pakete unterschiedlichster Art (der allgemeine Typ `Any`): 
- Ein `String` (ein Brief mit einer Adresse),
- Ein `Int` (ein Paket mit einer Gewichtsangabe),
- Ein `Boolean` (eine Eilversand-Markierung `true`/`false`).

Der Sortier-Roboter am Fließband prüft jedes Paket mit der `is`-Prüfung (*"Is(t) das ein String?"*). Das Geniale an Kotlin: Sobald der Roboter erkannt hat, dass ein Paket ein `String` ist, verwandelt sich die Variable im nachfolgenden Code-Block automatisch in einen echten `String` – ganz ohne manuelles Umwandeln! Das ist der **Smart Cast**.

---

### 🛠️ Dein Einsatz am Fließband (Aufgabe 2)

Schreibe die Funktion `analysePaket`, die ein beliebiges Objekt (`paket: Any`) entgegennimmt und mithilfe eines `when`-Ausdrucks analysiert:
- Falls `paket` ein `String` ist: Gib zurück `"Textpaket mit Länge ${paket.length}"` (nutze hier direkt `.length` dank Smart Cast!).
- Falls `paket` ein `Int` ist: Gib zurück `"Zahlenpaket mit doppeltem Wert ${paket * 2}"` (nutze direkt die Zahl per Smart Cast!).
- Falls `paket` ein `Boolean` ist: Gib zurück `"Eilversand-Status: $paket"`.
- Für alle anderen Typen: Gib zurück `"Unbekanntes Paket"`.

```kotlin
fun analysePaket(paket: Any): String {
    // TODO: Schreibe einen when-Ausdruck mit 'is'-Prüfungen für String, Int und Boolean
    // sowie einen else-Zweig für alle anderen Typen.
    return when (paket) {
        TODO("Dein Code hier")
    }
}

fun main() {
    println(analysePaket("Hallo Welt")) // Erwartet: Textpaket mit Länge 10
    println(analysePaket(21))           // Erwartet: Zahlenpaket mit doppeltem Wert 42
    println(analysePaket(true))         // Erwartet: Eilversand-Status: true
    println(analysePaket(3.1415))       // Erwartet: Unbekanntes Paket
}
```

---

### 🔍 Leitfragen & Compiler-Blick

1. **Worauf achtet der Compiler beim `when`-Ausdruck mit `Any`?**
   - Da `Any` theoretisch jeden beliebigen Typ darstellen kann, erzwingt der Compiler einen `else`-Zweig. Ohne `else` kann Kotlin nicht garantieren, dass für jeden möglichen Eingabewert ein Ergebnis geliefert wird.
2. **Warum sparen Smart Casts fehleranfälligen Code?**
   - In Sprachen ohne Smart Cast müsstest du nach der Typprüfung noch eine explizite Typumwandlung durchführen. Wenn man dabei einen Fehler macht, stürzt das Programm ab. Kotlin erledigt das absolut typsicher im Hintergrund für dich.

---

## ⚡ Station 3: Der Express-Rechner (`if` & `when` als Ausdrücke nutzen)

### 🧸 Die Analogie: Der Fahrkartenautomat
In vielen älteren Sprachen sind `if` und `switch` bloße Anweisungen (*Statements*). Sie führen Code aus, liefern selbst aber keinen Wert zurück.

In Kotlin hingegen sind `if` und `when` echte **Ausdrücke (*Expressions*)**! Sie berechnen ein Ergebnis und werfen es direkt an die aufrufende Stelle zurück – genau wie ein Fahrkartenautomat, der dir auf Knopfdruck dein Ticket oder das Wechselgeld direkt in die Hand gibt.

---

### 🛠️ Dein Einsatz am Fahrkartenautomaten (Aufgabe 3)

Erstelle eine Funktion `berechneFahrpreis`, die anhand der Ticketkategorie den Preis berechnet.
Verwende `when` direkt als Ausdruck, der seinen Wert an eine Variable zuweist oder direkt zurückgibt:
- `"Standard"`: 5.0 €
- `"Student"`: 3.0 €
- `"Senior"`: 3.5 €
- Alle anderen Kategorien: 6.0 €

Zusätzlich soll ein Feiertags-Rabatt angewendet werden: Wenn `istFeiertag` den Wert `true` hat, wird vom berechneten Preis 1.0 € abgezogen (nutze hierfür einen `if`-Ausdruck!).

```kotlin
fun berechneFahrpreis(kategorie: String, istFeiertag: Boolean): Double {
    // 1. Grundpreis mit einem when-Ausdruck ermitteln
    val grundpreis: Double = when (kategorie) {
        TODO("Dein Code hier für die Kategorien Standard, Student, Senior und else")
    }

    // 2. Rabatt anwenden mit einem if-Ausdruck
    val endpreis: Double = if (istFeiertag) {
        TODO("Dein Code hier: 1.0 Euro Rabatt abziehen")
    } else {
        TODO("Dein Code hier: Grundpreis unverändert lassen")
    }

    return endpreis
}

fun main() {
    println("Preis Standard (Werktag): ${berechneFahrpreis("Standard", false)} €") // Erwartet: 5.0 €
    println("Preis Student (Feiertag): ${berechneFahrpreis("Student", true)} €")   // Erwartet: 2.0 €
    println("Preis Unbekannt (Werktag): ${berechneFahrpreis("Unbekannt", false)} €") // Erwartet: 6.0 €
}
```

---

### 🔍 Leitfragen & Compiler-Blick

1. **Was bedeutet "Vollständigkeit" (Exhaustiveness) bei Ausdrücken?**
   - Wenn `if` oder `when` als *Ausdruck* genutzt werden (also ein Ergebnis zurückgeben sollen), muss der Compiler garantieren können, dass unter **allen** Bedingungen ein Wert produziert wird. Deshalb ist bei einem `if`-Ausdruck ein `else`-Zweig zwingend vorgeschrieben!
2. **Wie hilft diese Eigenschaft gegen Bugs?**
   - Du kannst nicht mehr aus Versehen vergessen, einen Fall abzudecken – der Compiler erinnert dich sofort beim Schreiben daran.

---

## 💻 Station 4: Dein erstes Kotlin-Skript (Interaktiver Terminal-Dialog)

### 🧸 Die Analogie: Der digitale Pförtner
Jetzt bringen wir alle Bausteine zusammen! Wir bauen einen kleinen Konsolen-Dialog.
Ein interaktives Skript liest Eingaben über das Terminal ein (`readLine()`). Da der Benutzer jederzeit einfach `Enter` drücken oder gar nichts eingeben könnte, liefert `readLine()` immer einen Nullable String (`String?`) zurück.

Wir verarbeiten diese Eingaben sicher mit Null-Safety, wandeln sie in Zahlen um und steuern den Programmfluss!

---

### 🛠️ Dein Einsatz als Dialog-Programmierer (Aufgabe 4)

Vervollständige den interaktiven Konsolen-Dialog in der folgenden Funktion `starteDialog`.

Das Programm soll:
1. Den Benutzernamen einlesen. Falls der Name leer oder `null` ist, soll `"Gast"` verwendet werden.
2. Das Alter des Benutzers als Text einlesen und mit `.toIntOrNull()` in eine Zahl (`Int?`) umwandeln.
3. Falls die Umwandlung fehlschlägt (`null`), eine Warnung ausgeben.
4. Falls das Alter gültig ist, mithilfe eines `if`-Ausdrucks ausgeben, ob der Benutzer bereits volljährig (>= 18 Jahre) ist.

```kotlin
fun starteDialog() {
    print("Wie lautet dein Name? ")
    val eingabeName: String? = readLine()
    
    // TODO: Verwende den Safe-Call und Elvis-Operator, um bei leerem/null-Namen "Gast" zu nutzen.
    val name: String = eingabeName?.ifBlank { "Gast" } ?: "Gast"
    println("Hallo $name!")

    print("Wie alt bist du? ")
    val eingabeAlter: String? = readLine()
    
    // TODO: Wandle eingabeAlter mit .toIntOrNull() in eine Zahl um.
    val alter: Int? = TODO("Dein Code hier")

    if (alter == null) {
        println("⚠️ Ungültige Alterseingabe! Bitte gib eine Zahl ein.")
    } else {
        // TODO: Nutze einen if-Ausdruck, um den Status zu bestimmen
        val statusText = if (alter >= 18) {
            "Du bist volljährig!"
        } else {
            "Du bist noch minderjährig."
        }
        println("Ergebnis: $statusText")
    }
}

fun main() {
    // Rufe deinen Dialog auf
    starteDialog()
}
```

---

### 🔍 Leitfragen & Compiler-Blick

1. **Warum ist `.toIntOrNull()` viel sicherer als `.toInt()`?**
   - Wenn der Benutzer `"zwanzig"` statt `20` eingibt, stürzt `.toInt()` sofort mit einer `NumberFormatException` ab. `.toIntOrNull()` hingegen liefert sauber `null` zurück, sodass dein Programm freundlich darauf reagieren kann.
2. **Warum ist `readLine()` vom Typ `String?`?**
   - Weil die Eingabe im Terminal in Ausnahmesituationen (z. B. Skript-Abbruch oder Ende des Eingabestreams) abbrechen kann. Kotlin zwingt dich von Anfang an dazu, diesen Fall zu berücksichtigen.

---

## 🏆 Zusammenfassung & Deinen Erfolg feiern!

Herzlichen Glückwunsch! Du hast die 4 Stationen des Phase-1-Workshops absolviert. 🎉

Hier ist dein **Kompetenz-Check**:
- ✅ **Null-Safety**: Du kannst `String?` von `String` unterscheiden und nutzt `?.` und `?:` wie ein Profi.
- ✅ **Smart Casts**: Du verwendest `is` in `when`-Blöcken, damit Kotlin Variablen automatisch für dich in den passenden Typ umgießt.
- ✅ **Expressions**: Du setzt `if` und `when` als wertliefernde Ausdrücke ein, um kurzen, eleganten Code zu schreiben.
- ✅ **Interaktive Konsoleneingaben**: Du weißt, wie man Terminal-Eingaben sicher einliest und mit `toIntOrNull()` verarbeitet.

### 🚀 Nächster Schritt
Öffne deine bevorzugte Entwicklungsumgebung (z. B. IntelliJ IDEA) oder den Kotlin Online Playground ([play.kotlinlang.org](https://play.kotlinlang.org/)), kopiere dir die Aufgaben-Gerüste heraus und ersetze alle `TODO("Dein Code hier")` durch deine eigenen Lösungen! Viel Spaß beim Coden!

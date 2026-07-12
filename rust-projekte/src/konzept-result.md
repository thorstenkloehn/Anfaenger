# ⚠️ Fehlerbehandlung mit Result<T, E> – Operationen, die fehlschlagen können

Jedes Programm, das mit der Außenwelt interagiert, wird früher oder später mit Fehlern konfrontiert:
* Eine Datei soll geöffnet werden, existiert aber nicht.
* Eine Website soll aufgerufen werden, der Server ist jedoch offline.
* Der Benutzer gibt statt einer Zahl Text in ein Eingabefeld ein.

In den meisten modernen Programmierkonzepten werden Fehler als **Exceptions (Ausnahmen)** behandelt. Tritt ein Fehler auf, wird er nach oben geworfen (geworfen) und bringt das Programm zum Absturz, falls er nicht abgefangen wird.

Rust bricht radikal mit diesem Konzept. In Rust sind Fehler keine katastrophalen Ausnahmen, sondern **normale, erwartbare Rückgabewerte**, die fest im Typsystem verankert sind. Der Compiler zwingt dich dazu, dich mit ihnen zu befassen.

---

## 🧠 Theorie: Was ist `Result<T, E>`?

`Result<T, E>` ist ein eingebautes Enum mit zwei Zuständen:

```rust
enum Result<T, E> {
    Ok(T),  // Die Operation war erfolgreich. Enthält den Wert vom Typ T.
    Err(E), // Die Operation ist fehlgeschlagen. Enthält die Fehlerursache vom Typ E.
}
```

Das Besondere an Rust ist die Annotation `#[must_use]` für `Result`. Wenn du eine Funktion aufrufst, die ein `Result` zurückgibt, und dieses Ergebnis ignorierst, gibt der Compiler eine Warnung aus. Du *musst* dich entscheiden, wie du damit umgehst.

```
[ Funktionsaufruf ]
        |
        v
+-----------------------+
|        Result         |
|  +-----------------+  |
|  |      Ok(T)      |  | ---> Alles super! Wert vom Typ T ist da.
|  +-----------------+  |
|          oder         |
|  +-----------------+  |
|  |     Err(E)      |  | ---> Fehler! Details vom Typ E vorhanden.
|  +-----------------+  |
+-----------------------+
```

---

## 🛠️ Mit Result arbeiten

Genau wie bei `Option` gibt es verschiedene Wege, ein `Result` zu verarbeiten:

### 1. Die lückenlose Prüfung mit `match`
Das sicherste Werkzeug. Du behandelst Erfolg und Misserfolg separat:
```rust
fn dividiere(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division durch Null ist verboten!"))
    } else {
        Ok(a / b)
    }
}

match dividiere(10.0, 0.0) {
    Ok(ergebnis) => println!("Ergebnis: {}", ergebnis),
    Err(fehler) => println!("Fehler aufgetreten: {}", fehler),
}
```

### 2. Nur auf Fehler reagieren mit `if let`
Wenn dich nur der Fehlerfall interessiert (z. B. um eine Fehlermeldung anzuzeigen):
```rust
if let Err(e) = dividiere(10.0, 0.0) {
    println!("Achtung: {}", e);
}
```

### 3. Einen Standardwert nutzen mit `unwrap_or`
```rust
let ergebnis = dividiere(10.0, 0.0).unwrap_or(0.0); // Verwendet 0.0 im Fehlerfall
```

---

## 🚀 Der `?`-Operator: Die Abkürzung für Fehlerweiterleitung

In echten Programmen möchtest du einen Fehler oft nicht direkt in der Funktion behandeln, sondern ihn nach oben an die aufrufende Funktion weitergeben, damit diese sich darum kümmert.

Der `?`-Operator ist die eleganteste Methode dafür. Er bedeutet:
1. Wenn das Ergebnis `Ok(wert)` ist, entpacke es und fahre mit der Funktion fort.
2. Wenn das Ergebnis `Err(fehler)` ist, breche die aktuelle Funktion **sofort ab (Early Return)** und gib den Fehler nach oben zurück.

### Wie das ? im Hintergrund funktioniert
Der `?`-Operator entspricht folgendem `match`-Block:

```rust
// Dieser Code:
let datei = File::open("daten.txt")?;

// Entspricht exakt diesem Code:
let datei = match File::open("daten.txt") {
    Ok(f) => f,
    Err(e) => return Err(e.into()), // Gibt den Fehler sofort zurück
};
```
*Hinweis:* Das `.into()` sorgt im Hintergrund dafür, dass der Fehler automatisch in den Fehlertyp der umgebenden Funktion konvertiert wird, sofern eine entsprechende Konvertierung definiert ist.

> [!IMPORTANT]
> **Die goldene Regel des `?`-Operators:**
> Du kannst den `?`-Operator nur in Funktionen verwenden, die selbst ein `Result` (oder einen anderen kompatiblen Typ wie `Option`) als Rückgabetyp haben!

---

## 🛠️ Eigene Fehlertypen definieren

Für kleine Programme reicht es oft, Fehlermeldungen als einfachen Text (`String`) zurückzugeben. In professionellen Anwendungen definiert man jedoch eigene Fehlertypen als Enums. Das macht den Code extrem robust und flexibel.

```rust
// Ein eigener Fehlertyp für ein Benutzer-Registrierungssystem
enum RegistrierungsFehler {
    NameZuKurz,
    EmailUngueltig,
    BenutzerExistiertBereits,
}

// Verwendung in einer Funktion
fn benutzer_registrieren(name: &str, email: &str) -> Result<(), RegistrierungsFehler> {
    if name.len() < 3 {
        return Err(RegistrierungsFehler::NameZuKurz);
    }
    if !email.contains('@') {
        return Err(RegistrierungsFehler::EmailUngueltig);
    }
    Ok(())
}
```

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen!)

### Aufgabe 1: Leicht – Der Alters-Parser
1. **Ziel:** Versuche, eine Zahl aus einer Texteingabe zu lesen.
2. **Details:**
   - Nutze die Methode `.parse::<u32>()` auf einem String. Diese Methode gibt ein `Result` zurück, da der Text Buchstaben enthalten könnte (z. B. `"Fünf"` statt `"5"`).
   - Schreibe ein Programm, das versucht, ein Alter zu parsen, und gib bei Erfolg `"Alter gesetzt auf X"` und bei Fehler `"Ungültiges Format!"` aus.
3. **Tipps:** Nutze ein `match`-Konstrukt für das Ergebnis von `.parse()`.

### Aufgabe 2: Mittel – Die sichere Datei-Ladefunktion
1. **Ziel:** Lese den Inhalt einer Datei aus.
2. **Details:**
   - Schreibe eine Funktion `lies_konfig(pfad: &str) -> Result<String, std::io::Error>`.
   - Verwende den `?`-Operator, um eventuelle Fehler von `File::open` und `read_to_string` automatisch an den Aufrufer weiterzuleiten.
3. **Tipps:** Du musst die Module `std::fs::File` und `std::io::prelude::*` importieren.

### Aufgabe 3: Schwer – Der Validierungs-Pipeline
1. **Ziel:** Validiere eine Benutzereingabe über mehrere Stufen hinweg.
2. **Details:**
   - Erstelle ein eigenes Enum `EingabeFehler` mit den Varianten `Leer`, `KeineZahl` und `Negativ`.
   - Schreibe eine Funktion, die einen Text als Eingabe nimmt und prüft:
     1. Ist der Text leer? -> `Err(EingabeFehler::Leer)`
     2. Kann der Text als Zahl parsen? -> Wenn nein: `Err(EingabeFehler::KeineZahl)`
     3. Ist die Zahl negativ? -> Wenn ja: `Err(EingabeFehler::Negativ)`
     4. Wenn alles passt: Gib die Zahl in `Ok` zurück.
3. **Tipps:** Kombiniere `match` oder die Methoden auf `Result` und `Option`, um die Prüfungen nacheinander auszuführen.

---

## 📌 Merkzettel: Result

* `Result<T, E>` wird für Operationen genutzt, die **fehlschlagen** können.
* Es hat zwei Varianten: `Ok(T)` (Erfolg) und `Err(E)` (Fehlermeldung/-ursache).
* Das Compiler-Attribut `#[must_use]` warnt dich, wenn du Fehler ignorierst.
* Mit dem **`?`-Operator** leitest du Fehler elegant nach oben an den Aufrufer weiter.
* Der `?`-Operator funktioniert nur in Funktionen, die selbst wieder ein `Result` (oder `Option`) zurückgeben.

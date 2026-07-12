# 🔍 Fehlerbehandlung mit Option<T> – Werte, die fehlen dürfen

Im echten Leben begegnen uns ständig optionale Dinge:
* Eine E-Mail-Adresse im Profil eines Benutzers (manche haben keine hinterlegt).
* Die Antwort auf eine Suchanfrage in einer Liste (entweder wir finden das Element oder nicht).
* Ein Schrankfach (entweder es liegt etwas darin oder es ist leer).

In traditionellen Programmiersprachen (wie C, Java, Python oder JavaScript) wird das Fehlen eines Wertes durch das Schlüsselwort `null`, `nil` oder `None` ausgedrückt. Das Problem dabei: Der Compiler kann nicht prüfen, ob du vor der Benutzung einer Variable geprüft hast, ob diese `null` ist. Wenn du es vergisst, stürzt dein Programm zur Laufzeit mit einer `NullPointerException` (oder Ähnlichem) ab. 

Rust geht einen radikal anderen Weg: **Es gibt kein `null`**. Jede normale Variable *muss* immer einen gültigen Wert besitzen. Wenn ein Wert jedoch fehlen darf, zwingt Rust dich, diesen in den Typ `Option<T>` einzupacken.

---

## 🧠 Theorie: Was ist `Option<T>`?

`Option<T>` ist ein ganz normales, in der Standardbibliothek eingebautes Enum. Seine Definition sieht so aus:

```rust
enum Option<T> {
    Some(T), // Es existiert ein Wert vom Typ T
    None,    // Es existiert kein Wert
}
```

Das Geniale an dieser Konstruktion ist: Eine `Option<String>` is ein völlig anderer Datentyp als ein normaler `String`. Du kannst eine `Option<String>` nicht ausgeben, verlassen, manipulieren oder einer anderen String-Variable zuweisen, ohne sie vorher explizit zu **entpacken**.

```
[ Deine Variable ]
        |
        v
+-----------------------+
|        Option         |
|  +-----------------+  |
|  |     Some(T)     |  | ---> Enthält den echten Wert
|  +-----------------+  |
|          oder         |
|  +-----------------+  |
|  |      None       |  | ---> Ist komplett leer
|  +-----------------+  |
+-----------------------+
```

---

## 🛠️ Option auspacken: Sicher vs. Unsicher

Um an den Wert in `Some` heranzukommen, musst du die Option öffnen. Hierfür gibt es verschiedene Wege:

### 1. Der sichere Weg mit Pattern Matching (`match`)
Das ist das mächtigste Werkzeug. Da `match` in Rust lückenlos sein muss, zwingt dich der Compiler, auch den Fall zu behandeln, in dem kein Wert da ist:
```rust
let website_url: Option<String> = Some(String::from("https://rust-lang.org"));

match website_url {
    Some(url) => println!("Die Website lautet: {}", url),
    None => println!("Keine Website hinterlegt."),
}
```

### 2. Der kompakte Weg mit `if let`
Wenn dich nur der Fall interessiert, in dem ein Wert existiert, und du den leeren Fall ignorieren möchtest:
```rust
let optionaler_name: Option<String> = Some(String::from("Thorsten"));

if let Some(name) = optionaler_name {
    println!("Hallo, {}!", name);
}
```

### 3. Der bequeme Fallback mit `unwrap_or`
Sehr oft möchtest du einen Standardwert verwenden, falls kein Wert existiert:
```rust
let port: Option<u32> = None;
let aktiver_port = port.unwrap_or(8080); // Wenn None, wird 8080 verwendet
```

### 4. Der gefährliche Holzhammer: `unwrap()` und `expect()`
Mit `.unwrap()` holst du den Wert blind aus dem Paket. Wenn die Option jedoch `None` ist, **stürzt dein Programm sofort mit einer Panic ab!**
```rust
let zahl: Option<i32> = None;
let x = zahl.unwrap(); // ❌ BOOM! Absturz zur Laufzeit!
```
Mit `.expect("Fehlermeldung")` verhält es sich genauso, allerdings kannst du eine eigene Fehlermeldung für den Absturz definieren:
```rust
let konfig = lies_einstellungen().expect("Einstellungsdatei konnte nicht gelesen werden!");
```

> [!WARNING]
> Verwende `unwrap()` fast ausschließlich in Tests oder beim schnellen Prototyping. In produktivem Code solltest du immer sichere Alternativen wie `match` oder `unwrap_or` bevorzugen.

---

## 🔄 Fortgeschrittene Methoden auf `Option`

Rust bietet eine Vielzahl nützlicher Methoden, um Optionen zu manipulieren, ohne sie mühsam auspacken zu müssen:

| Methode | Beschreibung | Beispiel |
|---|---|---|
| `.is_some()` | Gibt `true` zurück, wenn ein Wert vorhanden ist. | `opt.is_some()` |
| `.is_none()` | Gibt `true` zurück, wenn kein Wert vorhanden ist. | `opt.is_none()` |
| `.map()` | Transformiert den inneren Wert, falls vorhanden. | `opt.map(|x| x * 2)` |
| `.and_then()` | Verketter Operationen, die selbst wieder eine Option liefern. | `opt.and_then(finde_user)` |
| `.ok_or()` | Wandelt eine `Option<T>` in ein `Result<T, E>` um. | `opt.ok_or("Fehler")` |

### Beispiel für `.map()`
```rust
let optionale_zahl = Some(5);
// Wenn ein Wert da ist, verdopple ihn. Wenn None, bleibt es None.
let verdoppelt = optionale_zahl.map(|n| n * 2); // Some(10)
```

### Beispiel für `.and_then()` (Flachklopfen von verschachtelten Optionen)
```rust
fn hole_user(id: u32) -> Option<User> { ... }
fn hole_profilbild(user: User) -> Option<String> { ... }

// Ohne and_then hätten wir: Option<Option<String>>
// Mit and_then wird es flach zu: Option<String>
let profilbild_url = hole_user(42).and_then(hole_profilbild);
```

---

## ⚠️ Typische Einsteigerfehler bei Option

### Fehler 1: Direktes Rechnen mit Option
```rust
let x: Option<i32> = Some(10);
let y = x + 5; // ❌ FEHLER! Du kannst eine Option<i32> nicht mit einem i32 addieren.
```
*Lösung:* Nutze `unwrap_or` oder `map`:
```rust
let y = x.unwrap_or(0) + 5;
```

### Fehler 2: Verwechseln mit Result
`Option` hat keine Fehler-Informationen. Es sagt nur "Da ist nichts". Wenn du wissen willst, *warum* nichts da ist (z. B. Netzwerkfehler vs. Berechtigungsfehler), verwende `Result`.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen!)

### Aufgabe 1: Leicht – Die Artikelsuche
1. **Ziel:** Suche nach einer Artikel-ID in einer Liste.
2. **Details:**
   - Schreibe eine Funktion `finde_artikel(id: u32) -> Option<String>`.
   - Die Funktion soll bei ID `1` den Namen `"Buch"` zurückgeben, bei allen anderen IDs `None`.
   - Werte das Ergebnis in `main` mit einem `match` aus.

### Aufgabe 2: Mittel – Der optionale Rabatt
1. **Ziel:** Berechne den Endpreis eines Artikels unter Berücksichtigung eines optionalen Rabatts.
2. **Details:**
   - Schreibe eine Funktion `berechne_preis(basispreis: f64, rabatt: Option<f64>) -> f64`.
   - Falls der Rabatt `Some(wert)` ist, ziehe den Wert (in Prozent) ab. Falls er `None` is, gilt der Basispreis.
3. **Tipps:** Nutze `unwrap_or(0.0)`, um einen Standard-Rabatt von 0 Prozent zu setzen.

### Aufgabe 3: Schwer – Das verschachtelte Adressbuch
1. **Ziel:** Suche nach der Postleitzahl eines Benutzers in einer verschachtelten Struktur.
2. **Details:**
   - Ein `Benutzer` hat ein optionales Feld `adresse: Option<Adresse>`.
   - Eine `Adresse` hat ein optionales Feld `postleitzahl: Option<String>`.
   - Schreibe eine Funktion `hole_plz(benutzer: &Benutzer) -> Option<String>`, die die PLZ extrahiert.
3. **Tipps:** Nutze `.and_then()`, um die Optionen sauber zu verketten, ohne mehrfache `if let`-Verschachtelungen aufzubauen.

---

## 📌 Merkzettel: Option

* Rust hat **kein `null`**.
* `Option<T>` drückt aus, dass ein Wert vorhanden sein kann (`Some(T)`) oder nicht (`None`).
* Um an den Wert zu kommen, musst du ihn **sicher entpacken** (z. B. mit `match`, `if let` oder `unwrap_or`).
* `unwrap()` kann das Programm zum Absturz bringen und sollte vermieden werden.

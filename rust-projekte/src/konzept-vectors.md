# Vektoren (Vec<T>) – Dynamische Listen in Rust

Arrays (`[T; N]`) sind hervorragend geeignet, wenn du eine Datensammlung mit einer festen, unveränderlichen Größe verwalten möchtest. Ein typisches Beispiel sind die Koordinaten eines Punkts im dreidimensionalen Raum: Sie bestehen immer aus genau drei Werten (X, Y, Z). Da diese Größe bereits beim Schreiben des Codes feststeht, kann der Compiler den Speicherplatz dafür direkt auf dem schnellen Stack-Speicher reservieren.

In der realen Programmierpraxis wissen wir jedoch fast nie im Voraus, wie viele Daten wir verarbeiten müssen. Denk an:
* Eine To-Do-Liste, in die der Benutzer beliebig viele Aufgaben eintragen kann.
* Den Chat-Verlauf einer App, der sekündlich um neue Nachrichten wächst.
* Die Liste der Gegner in einem Videospiel, die ständig besiegt werden oder neu spawnen.

Für all diese Fälle bietet Rust den Datentyp **`Vec<T>`** (kurz für Vektor). Ein Vektor ist eine dynamisch wachsende Liste, die zur Laufzeit vergrößert oder verkleinert werden kann. In diesem Kapitel lernst du bis ins kleinste Detail, wie Vektoren im Speicher funktionieren, wie du sicher mit ihnen arbeitest und wie du typische Performance-Fallen vermeidest.

---

## 🧠 Speicher-Theorie: Stack vs. Heap bei Vektoren

Um Vektoren wirklich zu verstehen und effizienten Code zu schreiben, müssen wir betrachten, wie Rust die Daten im RAM-Speicher deines Computers ablegt. Ein Vektor teilt sich immer in zwei Speicherbereiche auf: den **Stack** und den **Heap**.

### Die Verwaltungsdaten auf dem Stack
Wenn du eine Variable `let mut zahlen = Vec::new();` erstellst, belegt diese Variable auf dem Stack immer exakt die Größe von drei Systemwörtern. Auf einem modernen 64-Bit-System entspricht ein Systemwort 8 Bytes, was bedeutet, dass ein Vektor auf dem Stack immer genau **24 Bytes** groß ist – unabhängig davon, ob er leer ist oder eine Million Elemente enthält!

Diese 24 Bytes teilen sich auf in drei Felder:
1. **Zeiger (Pointer):** Die genaue 64-Bit-Speicheradresse im Heap, an der das allererste Element deiner Liste liegt.
2. **Länge (Length):** Eine 64-Bit-Ganzzahl (`usize`), die angibt, wie viele Elemente sich aktuell *tatsächlich* im Vektor befinden.
3. **Kapazität (Capacity):** Eine 64-Bit-Ganzzahl (`usize`), die angibt, für wie viele Elemente auf dem Heap bereits zusammenhängender Speicherplatz reserviert wurde.

### Die Nutzdaten auf dem Heap
Die eigentlichen Elemente deines Vektors (die Werte vom Typ `T`) werden auf dem flexiblen **Heap-Speicher** abgelegt. Rust garantiert, dass diese Elemente im Heap immer in einem einzigen, lückenlosen und zusammenhängenden Block Speicher direkt hintereinander liegen. 

Das hat einen enormen Vorteil für die Geschwindigkeit deines Programms: Da die Daten direkt hintereinander liegen, kann die CPU sie extrem effizient in ihren ultraschnellen Cache-Speicher laden. Man spricht hierbei von **räumlicher Lokalität (Spatial Locality)**.

```
STACK (Die Variable im Code, 24 Bytes):
+------------------------------------------+
| Pointer  | 0x00007f8a12c0               | --+
| Length   | 3                            |   |
| Capacity | 4                            |   |
+------------------------------------------+   |
                                               v
HEAP (Der dynamische Speicherbereich):         |
Adresse 0x00007f8a12c0:                        |
+------------------------------------------+   |
| Index 0  | Wert: 10                     | <-+ (Hier fängt der Vektor an)
| Index 1  | Wert: 20                     |
| Index 2  | Wert: 30                     |
| Index 3  | [Reservierter freier Platz]  |
+------------------------------------------+
```

---

## 🔄 Wie ein Vektor wächst: Die Reallozierung

Was passiert, wenn du mit `.push()` ein neues Element an einen Vektor anhängst? Rust prüft das Verhältnis von Länge und Kapazität:

### Fall 1: Länge < Kapazität
Es ist noch ungenutzter, reservierter Platz auf dem Heap vorhanden (im obigen Diagramm am Index 3).
* Rust schreibt das neue Element direkt an die Speicheradresse von Index 3.
* Die Länge wird auf dem Stack um 1 erhöht (von 3 auf 4).
* *Performance:* Diese Operation ist extrem schnell und benötigt fast keine Rechenzeit.

### Fall 2: Länge == Kapazität
Der reservierte Speicher auf dem Heap ist komplett voll. Es gibt keinen Platz mehr für ein weiteres Element. Da der Speicher lückenlos sein muss, kann Rust nicht einfach irgendwo anders auf dem Heap weiterschreiben. Nun wird eine **Reallozierung (Reallocation)** ausgelöst:

1. **Neuen Speicher anfordern:** Rust bittet das Betriebssystem um einen neuen, zusammenhängenden Speicherblock auf dem Heap, der groß genug ist. Als Faustregel gilt: Rust **verdoppelt** die bisherige Kapazität (z. B. von 4 auf 8 Plätze).
2. **Daten umziehen:** Alle bisherigen Elemente werden Bit für Bit an die neue Speicheradresse kopiert.
3. **Alten Speicher freigeben:** Der alte, zu klein gewordene Speicherblock wird dem Betriebssystem wieder zur Verfügung gestellt.
4. **Stack aktualisieren:** Der Pointer auf dem Stack wird auf die neue Adresse umgebogen, die Kapazität wird verdoppelt und die neue Länge wird eingetragen.

> [!IMPORTANT]
> Eine Reallozierung ist eine langsame Operation, da das Betriebssystem nach freiem Speicher suchen muss und alle Daten kopiert werden müssen. Wenn ein Vektor sehr groß wird und häufig umziehen muss, bremst das dein Programm spürbar aus.

### Die Lösung: `Vec::with_capacity`
Wenn du bereits im Voraus ahnst, wie viele Elemente dein Vektor ungefähr aufnehmen wird (z. B. beim Einlesen einer Datei mit 100 Zeilen), solltest du den Vektor immer mit einer vorab definierten Kapazität erstellen:

```rust
// Reserviert sofort Platz für 100 Elemente auf dem Heap.
// Es werden keine Reallozierungen beim Befüllen stattfinden!
let mut daten = Vec::with_capacity(100);
```

---

## 🛠️ Vektoren erstellen, befüllen und manipulieren

Es gibt verschiedene Möglichkeiten, einen Vektor in Rust zu erzeugen:

### 1. Einen leeren Vektor erstellen
Wenn du noch keine Daten hast, erstellst du einen leeren Vektor. Da Rust den Typ der Elemente nicht erraten kann, musst du ihn explizit angeben:
```rust
let mut zahlen: Vec<i32> = Vec::new();
```

### 2. Das `vec!`-Makro nutzen
Wenn du den Vektor direkt mit Startwerten initialisieren möchtest:
```rust
let fruechte = vec![String::from("Apfel"), String::from("Banane")];
```

### 3. Elemente hinzufügen und entfernen
* **`.push(wert)`**: Hängt ein Element an das Ende der Liste an.
* **`.pop()`**: Entfernt das letzte Element und gibt es als `Option<T>` zurück (`Some(wert)` oder `None`, falls der Vektor leer war).
* **`.insert(index, wert)`**: Fügt ein Element an einer beliebigen Stelle ein. **Achtung:** Diese Operation ist langsam, da alle nachfolgenden Elemente im Speicher um eine Position nach hinten verschoben werden müssen!
* **`.remove(index)`**: Entfernt ein Element an einer Position. Auch dies ist langsam, da nachfolgende Elemente nach vorne aufrücken müssen.
* **`.retain(|x| bedingung)`**: Filtert den Vektor und behält nur Elemente, die die Bedingung erfüllen.

---

## 🔍 Sicherer Zugriff auf Elemente

### Der direkte Index-Zugriff `[]` (Gefährlich!)
Du kannst über eckige Klammern direkt auf Elemente zugreifen:
```rust
let v = vec![10, 20, 30];
let x = v[0]; // 10
```
Wenn du jedoch versuchst, auf `v[5]` zuzugreifen, stürzt dein Programm sofort mit einer **Panic** ab. In Rust wollen wir unkontrollierte Abstürze unter allen Umständen vermeiden.

### Der sichere Zugriff mit `.get()`
Nutze stattdessen immer die Methode `.get(index)`, welche eine `Option<&T>` zurückgibt:
```rust
let v = vec![10, 20, 30];

match v.get(5) {
    Some(wert) => println!("Wert am Index 5: {}", wert),
    None => println!("Dieser Index existiert nicht!"), // Kein Absturz!
}
```

---

## 🔄 Iteration und Ownership

Beim Durchlaufen eines Vektors mit einer Schleife musst du dich entscheiden, wie du auf die Elemente zugreifen willst. Es gibt drei Arten der Iteration:

### 1. Unveränderliche Referenz (`&v`)
Du möchtest die Elemente nur lesen. Der Vektor bleibt danach unberührt und nutzbar:
```rust
let v = vec![1, 2, 3];
for zahl in &v {
    println!("Zahl: {}", zahl);
}
// v kann hiernach normal weiterverwendet werden!
```

### 2. Veränderliche Referenz (`&mut v`)
Du möchtest die Elemente im Vektor direkt verändern:
```rust
let mut v = vec![1, 2, 3];
for zahl in &mut v {
    *zahl *= 2; // Verdoppelt jeden Wert im Vektor direkt im Speicher
}
```

### 3. Konsumierende Iteration (`v`)
Du übergibst die Ownership der Elemente an die Schleife. Der Vektor wird dabei zerstört:
```rust
let v = vec![String::from("A"), String::from("B")];
for s in v {
    println!("Besitze nun: {}", s); // s besitzt den String
}
// v existiert hiernach nicht mehr!
```

---

## ⚠️ Typische Compilerfehler und wie man sie behebt

### Fehler 1: Während der Iteration den Vektor verändern
```rust
let mut v = vec![1, 2, 3];
for x in &v {
    v.push(*x); // ❌ COMPILER-FEHLER!
}
```
*Warum:* Du leihst dir den Vektor für die Schleife unveränderbar aus (`&v`). Gleichzeitig versuchst du mit `v.push()`, den Vektor veränderbar auszuleihen. Rust verbietet dies, da eine Reallozierung im Speicher den Iterator ungültig machen würde (Iterator-Invalidierung).
*Lösung:* Sammle die neuen Werte in einem separaten Vektor und hänge sie nach der Schleife an.

### Fehler 2: Eigentum aus dem Vektor stehlen
```rust
let v = vec![String::from("Rust")];
let name = v[0]; // ❌ COMPILER-FEHLER!
```
*Warum:* `String` implementiert kein `Copy`. Mit `v[0]` versuchst du, den String aus dem Vektor herauszubewegen (Move). Das würde eine ungültige Lücke im Vektor hinterlassen.
*Lösung:* Nimm eine Referenz (`let name = &v[0];`) oder klone den String explizit (`let name = v[0].clone();`).

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen!)

### Aufgabe 1: Leicht – Der Filtereinkauf
1. **Ziel:** Erstelle eine Liste von Preisen (Kommazahlen) und filtere alle Preise heraus, die über 10.0 € liegen.
2. **Details:** 
   - Erstelle einen Vektor mit fünf beliebigen Preisen.
   - Iteriere über diesen Vektor und füge alle Preise, die $\le 10.0$ sind, in einen neuen Vektor ein.
   - Gib den neuen Vektor auf der Konsole aus.
3. **Tipps:** Überlege, ob du für den Filter-Vektor `Vec::new()` nutzt und wie du mit `.push()` Elemente anfügst.

### Aufgabe 2: Mittel – Der Notenschnitt-Rechner
1. **Ziel:** Berechne den Notendurchschnitt einer Klasse, aber fange ungültige Eingaben ab.
2. **Details:**
   - Schreibe eine Funktion, die einen Slice von Noten (`&[u32]`) entgegennimmt.
   - Die Funktion soll den Durchschnitt als `Result<f64, String>` zurückgeben.
   - Falls die übergebene Liste leer ist, soll ein `Err` zurückgegeben werden (verhindere Division durch Null!).
3. **Tipps:** Nutze Methoden wie `.is_empty()` und `.len()` auf dem Slice.

### Aufgabe 3: Schwer – Der Stack-basierte Text-Editor
1. **Ziel:** Simuliere die "Rückgängig"-Funktion (Undo) eines Text-Editors.
2. **Details:**
   - Erstelle ein Struct `TextEditor` mit einem Vektor `historie`, der alte Zustände des geschriebenen Textes speichert.
   - Implementiere Methoden zum Schreiben von Text (fügt den neuen Zustand zur Historie hinzu) und eine `undo`-Methode.
   - Die `undo`-Methode soll den letzten Zustand entfernen und den vorherigen zurückgeben. Falls kein Zustand mehr da ist, gib ein `None` zurück.
3. **Tipps:** Nutze `.pop()`, um das letzte Element sicher zu entfernen und dessen Besitz zurückzuerhalten.

---

## 📌 Merkzettel: Vektoren auf einen Blick

* Vektoren sind dynamische Listen auf dem **Heap**.
* Sie belegen auf dem Stack immer genau **24 Bytes** (Pointer, Length, Capacity).
* Der direkte Index-Zugriff `v[i]` kann abstürzen. Nutze immer **`.get(i)`** für sicheren Zugriff.
* Um unnötige Kopiervorgänge (Reallozierungen) zu vermeiden, nutze **`Vec::with_capacity()`**.
* Verwende in Funktionen immer Slices **`&[T]`** statt `&Vec<T>`, um maximale Flexibilität zu gewährleisten.

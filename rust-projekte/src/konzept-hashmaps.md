# HashMaps (HashMap<K, V>) – Schlüssel-Wert-Speicher in Rust

Vektoren (`Vec<T>`) und Arrays (`[T; N]`) sind hervorragend geeignet, wenn wir über eine fortlaufende Ganzzahl (den Index `0, 1, 2, ...`) auf unsere Elemente zugreifen wollen. Manchmal wollen wir unsere Daten jedoch mit einem beliebigen anderen Datentyp verknüpfen.

Stell dir vor:
* Du möchtest die Telefonnummer einer Person anhand ihres Namens (z. B. `"Anna"`) suchen.
* Du möchtest den Lagerbestand eines Produkts anhand seiner Artikelnummer (z. B. `"ART-9982"`) abfragen.
* Du möchtest zählen, wie oft einzelne Wörter in einem Buch vorkommen.

In all diesen Fällen müssten wir bei einem Vektor die gesamte Liste von vorne bis hinten durchsuchen, um den passenden Eintrag zu finden. Bei einer Million Einträgen würde das viel zu lange dauern.

Die **`HashMap<K, V>`** löst dieses Problem. Sie speichert Paare aus einem **Schlüssel (Key)** vom Typ `K` und einem **Wert (Value)** vom Typ `V`. Über den Schlüssel kannst du in konstanter Zeit auf den zugeordneten Wert zugreifen.

---

## 🧠 Speicher-Theorie: Wie funktioniert eine HashMap?

Um zu verstehen, warum HashMaps so extrem schnell sind und warum sie manche Einschränkungen haben, müssen wir uns ihre Funktionsweise ansehen.

### Was ist Hashing?
Das Wort "Hash" bedeutet im Englischen "zerhacken". Eine **Hash-Funktion** ist ein mathematischer Algorithmus. Er nimmt einen beliebigen Schlüssel (z. B. einen String `"Anna"`) und berechnet daraus eine Zahl (den sogenannten Hash-Wert).

Wenn du ein Element in eine HashMap einfügst:
1. **Hash berechnen:** Die HashMap schickt deinen Schlüssel durch ihre Hash-Funktion.
2. **Index bestimmen:** Aus der berechneten Zahl bestimmt die HashMap einen Index (einen sogenannten *Bucket* oder Eimer) in einem internen, festen Array.
3. **Abspeichern:** Das Paar aus Schlüssel und Wert wird an diesem Index abgelegt.

Wenn du den Wert später wieder suchst, macht die HashMap genau dasselbe: Sie jagt den Schlüssel erneut durch die Hash-Funktion, erhält denselben Index und liest den Wert direkt aus. Es ist keine Schleife und kein Suchen erforderlich!

```
Schlüssel (Key)      Hash-Funktion       Internes Array (Buckets)
+-------------+     +---------------+     +-----------------------+
|  "Anna"     | --> | SIP-Hash      | --> | Index 42 | Wert: 95   |
+-------------+     +---------------+     +-----------------------+
```

### Die Zugriffsgeschwindigkeit (O(1))
Da der Speicherplatz direkt berechnet wird, ist der Zugriff auf eine HashMap im Durchschnitt unabhängig von der Anzahl der gespeicherten Elemente:
* **Laufzeit $O(1)$ (Konstante Zeit):** Das Suchen, Einfügen und Löschen dauert bei 10 Einträgen exakt genauso lang wie bei 10.000.000 Einträgen. Das macht HashMaps zur idealen Wahl für große Datenmengen, die schnell durchsucht werden müssen.

### Kollisionen und Sicherheit
Manchmal kann es vorkommen, dass zwei völlig unterschiedliche Schlüssel durch die Hash-Funktion denselben Index zugewiesen bekommen. Das nennt man eine **Kollision**. 
* Rust-HashMaps lösen Kollisionen im Hintergrund automatisch auf (mittels einer Technik namens *Robin Hood Hashing*).
* **DoS-Schutz:** In manchen Sprachen können Angreifer durch geschickt gewählte Eingaben absichtlich extrem viele Kollisionen erzwingen, was die Datenbank extrem verlangsamt und zum Absturz bringt. Um das zu verhindern, nutzt Rust standardmäßig die kryptografisch sichere Hash-Funktion **SipHash 1-3**. Das macht sie minimal langsamer als unsichere HashMaps, aber absolut resistent gegen solche Angriffe.

---

## 🛠️ HashMaps erstellen und benutzen

Da HashMaps im Gegensatz zu Vektoren nicht ganz so häufig im Standard-Programmablauf gebraucht werden, sind sie nicht standardmäßig im globalen Namensraum verfügbar. Du musst sie zuerst importieren:

```rust
use std::collections::HashMap; // WICHTIG! Ohne diesen Import kompiliert der Code nicht.
```

### 1. Eine neue HashMap erstellen
```rust
let mut telefonbuch: HashMap<String, String> = HashMap::new();
```

### 2. Elemente hinzufügen (`insert`)
Mit `.insert(key, value)` fügst du Einträge hinzu. Wenn der Schlüssel bereits existiert, wird der alte Wert überschrieben und von der Methode zurückgegeben (verpackt in `Some(alter_wert)`):
```rust
telefonbuch.insert(String::from("Anna"), String::from("0172-123"));
telefonbuch.insert(String::from("Bob"), String::from("0173-987"));
```

### 3. Werte sicher auslesen (`get`)
Die Methode `.get()` nimmt eine Referenz auf den Schlüssel und gibt eine `Option<&V>` zurück. So verhinderst du Abstürze, falls der Schlüssel nicht existiert:
```rust
match telefonbuch.get("Anna") {
    Some(nummer) => println!("Annas Nummer: {}", nummer),
    None => println!("Kein Eintrag für Anna gefunden!"),
}
```

### 4. Einträge entfernen (`remove`)
```rust
telefonbuch.remove("Bob"); // Löscht Bob aus der HashMap
```

---

## 🔑 Die Entry-API: Der geheime Star von Rusts HashMap

Ein extrem häufiges Szenario beim Programmieren ist:
1. Prüfe, ob ein Schlüssel in der Map existiert.
2. Falls nein: Füge ihn mit einem Standardwert hinzu.
3. Falls ja (oder danach): Ändere den Wert (z. B. addiere 1).

In vielen Programmiersprachen musst du dafür mehrmals in der Map nachschlagen, was ineffizient ist. Rust bietet dafür die **Entry-API**:

```rust
let mut zaehler: HashMap<String, i32> = HashMap::new();
let name = String::from("Anna");

// entry() sucht nach dem Schlüssel.
// or_insert() fügt den Wert 0 ein, falls der Schlüssel FEHLT.
// Am Ende erhalten wir in jedem Fall eine veränderliche Referenz (&mut) auf den Wert!
let punkte_referenz = zaehler.entry(name).or_insert(0);

// Jetzt können wir den Wert direkt im Speicher verändern:
*punkte_referenz += 10;
```
Dieses Muster wird besonders häufig beim Zählen von Elementen (z. B. Wörtern in einem Text) verwendet.

---

## ⚠️ Ownership in HashMaps

Beim Arbeiten mit HashMaps musst du gut aufpassen, wer der Besitzer (Owner) der Schlüssel und Werte ist.

* **Verschiebung (Move):** Wenn du Typen in die HashMap einfügst, die das `Copy`-Trait nicht implementieren (z. B. `String` oder `Vec`), übernimmt die HashMap die Ownership an diesen Daten. Die ursprünglichen Variablen sind danach ungültig.
```rust
let key = String::from("Benutzer123");
let val = String::from("Online");

let mut status = HashMap::new();
status.insert(key, val);

// println!("{}", key); // ❌ FEHLER! key wurde in die HashMap verschoben!
```
* **Lösung:** Wenn du die Schlüssel danach noch brauchst, musst du sie entweder klonen (`.clone()`) oder mit Referenzen arbeiten (was jedoch fortgeschrittene Lifetimes erfordert).

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen!)

### Aufgabe 1: Leicht – Der Vokabeltrainer
1. **Ziel:** Erstelle eine einfache Zuordnung von deutschen Wörtern zu ihren englischen Übersetzungen.
2. **Details:**
   - Erstelle eine HashMap.
   - Füge drei Vokabelpaare hinzu (z. B. "Hund" -> "dog").
   - Frage den Benutzer über die Konsole nach einem deutschen Wort und gib die englische Übersetzung aus. Falls das Wort nicht existiert, gib eine Fehlermeldung aus.
3. **Tipps:** Vergiss nicht, `use std::collections::HashMap;` ganz oben in die Datei zu schreiben!

### Aufgabe 2: Mittel – Der Wortzähler
1. **Ziel:** Zähle, wie oft jedes Wort in einer Liste vorkommt.
2. **Details:**
   - Gegeben ist eine Liste von Wörtern (z. B. `vec!["Apfel", "Birne", "Apfel", "Banane", "Birne", "Apfel"]`).
   - Verwende eine HashMap, um die Häufigkeit jedes Worts zu zählen.
   - Nutze die Entry-API (`.entry().or_insert()`), um den Zähler im Erfolgsfall zu erhöhen.
3. **Tipps:** Der Schlüssel ist der Name des Obstes (`String` oder `&str`), der Wert ist die Anzahl (`i32` oder `u32`).

### Aufgabe 3: Schwer – Der In-Memory-Datenbank-Cache
1. **Ziel:** Simuliere einen Cache für langsame Berechnungen.
2. **Details:**
   - Schreibe eine Struktur `Cache` mit einer HashMap.
   - Implementiere eine Methode `hole_quadrat(&mut self, zahl: u32) -> u32`.
   - Die Methode soll prüfen, ob das Quadrat der Zahl bereits in der HashMap berechnet wurde. Wenn ja, gib es direkt zurück.
   - Wenn nein, simuliere eine "teure Berechnung" (z. B. durch eine Konsolenausgabe "Berechne..."), speichere das Ergebnis in der HashMap ab und gib es zurück.
3. **Tipps:** Die Methode benötigt `&mut self`, da sie neue Werte in die HashMap schreiben muss, falls diese noch nicht existieren.

---

## 📌 Merkzettel: HashMaps

* HashMaps speichern Daten als **Schlüssel-Wert-Paare**.
* Der Zugriff ist extrem schnell (durchschnittliche Laufzeit **$O(1)$**).
* Sie erfordern den Import mit **`use std::collections::HashMap;`**.
* Werte ohne `Copy` werden beim Einfügen in die HashMap **verschoben (Moved)**.
* Die **Entry-API** ist der eleganteste Weg, um Werte zu prüfen und gleichzeitig zu aktualisieren.

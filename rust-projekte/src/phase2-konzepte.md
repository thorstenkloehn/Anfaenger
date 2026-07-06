# Konzepte statt Syntax lernen (Phase 2)

Beim Programmierenlernen in Rust ist es entscheidend, zunächst die zugrunde liegenden Konzepte zu verstehen, anstatt nur die Syntax auswendig zu lernen. In Phase 2 dreht sich alles um eigene Datentypen und wie wir sie clever einsetzen:

## 🧱 Structs & Methoden (Die Basis)
- **Konzept:** Ein Struct (Struktur) ist wie ein selbst entworfener Bauplan für ein komplexes Objekt, zum Beispiel für ein Auto, einen Benutzer oder ein Haustier. Du kannst verschiedene Eigenschaften (Name, Alter, Farbe) an einem Ort zusammenfassen.
- **In Rust wichtig:** Du kannst diesen Datentypen nicht nur Daten geben, sondern auch direkt eigene Funktionen (Methoden) dranhängen, die genau zu diesem Struct gehören (mit `impl`). So weiß das Auto selbst, wie es hupt oder beschleunigt!

## 🔠 Enums (Die Basis)
- **Konzept:** Ein Enum (Aufzählung) ist wie eine Liste von festen Zuständen oder Optionen. Stell dir eine Ampel vor: Sie kann Rot, Gelb oder Grün sein. Ein Wochentag kann Montag bis Sonntag sein. 
- **In Rust wichtig:** Rust-Enums können viel mehr als in anderen Sprachen. Jede Option kann sogar eigene Daten mit sich herumtragen (z. B. hat die Option "Fehler" eine genaue Fehlermeldung im Gepäck). Sie sind perfekt, um Klarheit und Sicherheit in dein Programm zu bringen.

## 🎯 Pattern Matching (match & if let)
- **Konzept:** Pattern Matching ist wie ein extrem intelligenter Filter oder Sortierer für deine Daten. Es prüft, in welchen Zustand (z. B. welches Enum) deine Daten gerade passen, und reagiert entsprechend.
- **In Rust wichtig:** 
  - Der `match`-Ausdruck besitzt ein sogenanntes **Exhaustiveness Checking** (Vollständigkeitsprüfung). Das bedeutet: Der Rust-Compiler zwingt dich dazu, absolut jeden erdenklichen Fall abzudecken! Du kannst keinen Zustand vergessen, was Fehler fast unmöglich macht.
  - Das kompakte `if let` ist die Kurzform, wenn dich nur ein einziger Zustand interessiert und du den Rest einfach ignorieren willst.

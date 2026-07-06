# Konzepte statt Syntax lernen

Beim Programmierenlernen in Rust ist es entscheidend, zunächst die zugrunde liegenden Konzepte zu verstehen, anstatt nur die Syntax auswendig zu lernen. Hier sind die wichtigsten Kernkonzepte im Überblick:

## 🛡️ Systematische Fehlerbehandlung (Result & Option)

- **Konzept:** In vielen Programmiersprachen stürzen Programme bei Fehlern einfach ab oder werfen schwer nachvollziehbare Ausnahmen (Exceptions). Rust geht einen anderen Weg: Fehler werden als ganz normale Rückgabewerte behandelt. Der Compiler zwingt dich dazu, mögliche Fehler von vornherein einzuplanen und sicher mit ihnen umzugehen.
- **In Rust wichtig:**
  - **Result (`Result<T, E>`):** Stell dir vor, du bestellst ein Paket. Das Paket kommt an und enthält entweder deine bestellte Ware (`Ok`) oder einen Rücksendebeleg mit der Begründung, warum die Lieferung fehlgeschlagen ist (`Err`). Du musst das Paket öffnen und für beide Fälle (Erfolg oder Fehler) eine Lösung bereithalten.
  - **Option (`Option<T>`):** Das steht für Werte, die existieren können, aber nicht müssen. Wie eine Schublade: Sie ist entweder leer (`None`) oder es liegt etwas darin (`Some`). Der Compiler sorgt dafür, dass du nicht versehentlich auf eine leere Schublade zugreifst, ohne vorher nachzusehen.

## 🗄️ Collections (Datenstrukturen der Standardbibliothek)

- **Konzept:** Bisher haben wir Daten meist in einzelnen Variablen gespeichert. In echten Anwendungen müssen wir aber oft Gruppen von Elementen verwalten – zum Beispiel eine Liste von Aufgaben oder eine Zuordnung von Benutzernamen zu deren Profilen.
- **In Rust wichtig:**
  - **Vektoren (`Vec<T>`):** Ein Vektor ist wie eine dynamische Liste. Du kannst dir das wie eine Reihe von beschrifteten Kartons vorstellen, die du beliebig erweitern oder verkleinern kannst. Du kannst jederzeit am Ende neue Elemente hinzufügen oder entfernen. Wichtig: Alle Elemente in einem Vektor müssen denselben Datentyp besitzen.
  - **HashMaps (`HashMap<K, V>`):** Das ist wie ein Wörterbuch oder ein Telefonbuch. Du hast einen eindeutigen Schlüssel (z. B. ein Wort oder einen Namen) und einen dazugehörigen Wert (z. B. die Übersetzung oder eine Telefonnummer). Über den Schlüssel kannst du den Wert extrem schnell nachschlagen.

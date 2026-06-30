# Konzept: Variablen und Datentypen – Dein digitaler Umzug

Stell dir vor, du bereitest dich auf einen großen Umzug vor. Du hast eine Menge Dinge, die du von deiner alten Wohnung in die neue bringen möchtest. Was brauchst du dafür? Richtig, Umzugskartons! In der Welt des Programmierens, und ganz speziell in Rust, nennen wir diese Kartons **Variablen**.

Eine Variable ist im Grunde genommen nichts anderes als ein Behälter, in dem du Informationen – also Daten – aufbewahren kannst. Damit du später in deinem neuen Zuhause (deinem Programm) auch weißt, was in welchem Karton ist, schreibst du mit einem dicken Stift etwas auf die Seite. Dieses Etikett ist der **Name** deiner Variablen.

Wenn du also in Rust eine Variable anlegst, sagst du dem Computer eigentlich nur: „Hey, stell mir mal bitte einen Karton bereit, schreib dieses Etikett darauf und leg diesen bestimmten Wert hinein.“ Das Schlüsselwort, mit dem du nach einem solchen Karton fragst, lautet `let`. Es ist, als würdest du sagen: „Lass diesen Karton den Namen X haben und den Wert Y enthalten.“

## Das Geheimnis der verschlossenen Kartons: Mutabilität

Rust ist eine sehr sicherheitsbewusste Sprache. Wenn du beim Umzug einen Karton packst, möchtest du meistens, dass die Dinge sicher darin verstaut bleiben und nicht versehentlich herausfallen oder ausgetauscht werden. 

Deshalb macht Rust etwas Besonderes: Wenn du eine Variable anlegst (einen Karton packst), dann wird dieser Karton standardmäßig **zugeklebt**. Du kannst zwar jederzeit auf das Etikett schauen und den Inhalt betrachten, aber du kannst den Inhalt nicht mehr verändern. In der Fachsprache nennt man das **Immutabilität** (Unveränderlichkeit). Einmal gepackt, bleibt der Karton so, wie er ist. Das schützt dich davor, dass im Verlauf deines Programms aus Versehen etwas Wichtiges überschrieben wird.

Was aber, wenn du einen Karton brauchst, in den du immer wieder neue Dinge hineinlegen oder alte Dinge herausnehmen möchtest? Zum Beispiel eine Kiste für dein Werkzeug, das du beim Umzug ständig griffbereit haben musst? 

Für diese Fälle gibt es in Rust das Zauberwort `mut` (kurz für mutable, also veränderbar). Wenn du bei der Bestellung deines Kartons dieses Wort hinzufügst, weiß Rust: „Aha, dieser Karton bleibt offen! Der Inhalt darf jederzeit verändert oder ausgetauscht werden.“ 

Diese klare Trennung zwischen zugeklebten und offenen Kartons hilft dir als Programmierer, Fehler zu vermeiden. Du musst dir immer bewusst sein, ob eine Information für die Ewigkeit gedacht ist (zumindest solange das Programm läuft) oder ob sie sich verändern darf.

## Welche Kartons gibt es? Eine Einführung in Datentypen

Beim Packen wirst du schnell feststellen, dass nicht jeder Karton für jeden Gegenstand geeignet ist. Ein riesiger Karton ist perfekt für Kissen, aber völlig übertrieben für eine einzige Schraube. Für schwere Bücher brauchst du besonders stabile Kartons, während für Gläser spezielles Verpackungsmaterial nötig ist.

Genauso funktioniert das auch in Rust. Der Computer muss wissen, **welche Art** von Daten du in einen Karton packen möchtest, damit er genau die richtige Größe und Form des Kartons bereitstellen kann. Das nennt man **Datentypen**.

Rust ist eine „statisch typisierte“ Sprache. Das ist ein schickes Wort dafür, dass der Computer bei jedem Karton ganz genau wissen muss, was hineinkommt. Oft ist Rust aber schlau genug, um anhand des Inhalts zu erraten, was für ein Karton benötigt wird (das nennt man Typinferenz). Manchmal musst du es ihm aber auch ganz genau sagen.

Schauen wir uns die wichtigsten Arten von Kisten (Datentypen) einmal an:

### 1. Zahlen (Numbers)

Wenn du Zahlen aufbewahren möchtest, bietet dir Rust verschiedene Spezialkartons an, je nachdem, wie groß die Zahl werden kann und ob sie ein Vorzeichen (Plus oder Minus) hat.

*   **Ganze Zahlen (Integers):** Das sind Kisten für Zahlen ohne Komma (wie 1, 42, oder -10). Es gibt sehr kleine Kisten (für Zahlen bis 255) und riesige Kisten (für astronomisch große Zahlen). Der Standardkarton, den Rust meistens benutzt, wenn du ihm einfach eine Zahl gibst, ist eine mittelgroße Kiste für ganze Zahlen (oft das sogenannte `i32`). Stell dir das als den Allzweck-Umzugskarton vor.
*   **Kommazahlen (Floating-Point Numbers):** Wenn du Gewichte (wie 3.5 kg) oder Preise (wie 19.99 Euro) speichern willst, brauchst du einen anderen Kartontyp. Diese Kisten sind speziell dafür gebaut, Zahlen mit Nachkommastellen aufzubewahren. Auch hier gibt es verschiedene Größen, je nachdem, wie präzise die Zahl sein muss.

### 2. Texte und Buchstaben

Das Speichern von Text ist beim Programmieren etwas komplizierter als man denkt. Rust unterscheidet zwischen verschiedenen Arten, Text aufzubewahren.

*   **Der Notizzettel (Characters):** Wenn du nur einen einzigen Buchstaben, ein einzelnes Zeichen oder auch ein Emoji speichern möchtest, gibt es dafür eine klitzekleine Box. 
*   **Der feste Textbaustein:** Manchmal hast du Texte, die für immer feststehen und direkt in dein Programm gemeißelt sind. Das ist wie ein festes Etikett, das du nicht verändern kannst.
*   **Der wachsende Ordner (String):** Oft brauchst du aber eine Kiste, in die du immer mehr Text hineinstecken kannst. Zum Beispiel, wenn du den Namen eines Benutzers abfragen und speichern möchtest. Dafür gibt es eine spezielle Kiste (genannt `String`), die wie ein flexibler Aktenordner funktioniert. Sie kann größer werden, wenn du mehr Seiten (Buchstaben) hinzufügst.

### 3. Der Lichtschalter (Booleans)

Manchmal musst du dir nur eine klitzekleine Information merken: Ja oder Nein? Wahr oder Falsch? Ein oder Aus? 

Für diese Fälle gibt es den winzigsten aller Kartons: den **Boolean**. Er ist wie ein Lichtschalter. Er kann nur zwei Zustände annehmen: `true` (Wahr) oder `false` (Falsch). Dieser Typ ist extrem nützlich, wenn dein Programm Entscheidungen treffen muss. (Zum Beispiel: „Ist die Tür offen? -> false“).

## Zusammenfassung

Variablen sind das Fundament jedes Programms. Sie sind deine Umzugskartons:
- Mit `let` bestellst du einen neuen Karton und schreibst ein Etikett darauf.
- Standardmäßig werden alle Kartons sofort zugeklebt (Immutabilität).
- Wenn du das Zauberwort `mut` verwendest, bleibt der Karton offen, und du kannst den Inhalt später verändern.
- Rust achtet genau darauf, **was** du in die Kartons packst. Für Zahlen, Texte und simple Ja/Nein-Entscheidungen gibt es jeweils genau angepasste Karton-Typen (Datentypen).

Indem du Rust sagst, was du brauchst, stellt die Sprache sicher, dass deine Daten immer perfekt verpackt sind und nichts kaputtgeht. So bleibt dein digitaler Umzug stressfrei und sicher!

# 🗺️ HashMaps (HashMap<K, V>)

Stell dir vor, du hast eine riesige Kiste voller Bücher und möchtest ein bestimmtes Buch finden. Wenn die Bücher einfach wild durcheinanderliegen, musst du jedes einzelne Buch in die Hand nehmen und nachsehen. Das entspricht der Suche in einer Liste oder einem Vektor. Wenn du deine Bücher jedoch in ein Regal stellst und sie nach dem Nachnamen des Autors sortierst, findest du sie viel schneller.

Genau das macht eine **HashMap** in Rust. Sie ist eine Datenstruktur, mit der du Daten nicht über eine einfache Nummer (einen Index) ansprichst, sondern über einen frei wählbaren Schlüssel (den **Key**). Zu jedem Schlüssel gehört genau ein Wert (der **Value**).

In diesem Kapitel lernst du die fundamentalen Konzepte hinter dieser mächtigen Datenstruktur kennen.

---

## 🧠 Theorie

### Wie Schlüssel-Wert-Zuordnungen funktionieren
Eine HashMap ordnet einem eindeutigen Schlüssel (Key) einen bestimmten Wert (Value) zu. In Rust schreiben wir das als `HashMap<K, V>`, wobei `K` für den Typ des Schlüssels und `V` für den Typ des Wertes steht.

Aber wie schafft es der Computer, bei Millionen von Einträgen in Bruchteilen einer Sekunde genau den richtigen Wert zu finden?

Das Geheimnis liegt im **Hashing**:
1. **Der Hash-Wert:** Wenn du einen Schlüssel in die HashMap legst (z. B. das Wort `"Apfel"`), schickt die HashMap diesen Schlüssel durch eine sogenannte *Hash-Funktion*. Diese mathematische Funktion berechnet aus dem Schlüssel eine große Zahl – den sogenannten Hash.
2. **Die Speicheradresse (Bucket):** Diese Zahl wird verwendet, um einen Speicherplatz (einen sogenannten *Bucket* oder Eimer) in einem internen Array zu bestimmen. Dort wird das Paar aus Schlüssel und Wert abgelegt.
3. **Kollisionen:** Da es unendlich viele mögliche Schlüssel, aber nur begrenzt Speicherplätze gibt, kann es vorkommen, dass zwei unterschiedliche Schlüssel denselben Speicherplatz zugewiesen bekommen. Das nennt man eine *Kollision*. HashMaps haben integrierte Mechanismen (wie das Verketten von Elementen oder das Weitersuchen im Speicher), um Kollisionen im Hintergrund aufzulösen. Für dich als Entwickler passiert das völlig unsichtbar.

### Die Geschwindigkeit (Komplexität)
Warum benutzen wir nicht immer Vektoren? Vektoren sind super, wenn wir über Indizes (`0, 1, 2, ...`) auf Daten zugreifen. Müssen wir aber nach einem bestimmten Element anhand seines Namens suchen, müssen wir im schlimmsten Fall den gesamten Vektor von vorne bis hinten durchsuchen.

* **Durchschnittliche Laufzeit $O(1)$ (Konstante Zeit):** Sowohl das Einfügen eines neuen Paares als auch das Suchen nach einem Schlüssel dauert im Durchschnitt immer gleich lang. Es ist völlig egal, ob deine HashMap 10 Einträge oder 10.000.000 Einträge hat – der Zugriff erfolgt fast augenblicklich. Die Hash-Funktion berechnet den Index direkt, ohne suchen zu müssen.
* **Schlechtester Fall (Worst Case) $O(n)$:** Falls extrem viele Kollisionen auftreten (weil die Hash-Funktion schlecht arbeitet oder die Schlüssel absichtlich so gewählt wurden, dass sie kollidieren), kann die Suche auf eine lineare Suche absinken. Rust verwendet standardmäßig eine kryptografisch sichere Hash-Funktion (SipHash 1-3), um sich gegen solche Angriffe (DoS-Attacken) zu schützen. Das macht sie minimal langsamer als ungesicherte HashMaps, dafür aber extrem sicher.

### Ownership und Keys: Wer besitzt die Daten?
Rusts strenges Ownership-System gilt natürlich auch für HashMaps. Wenn du ein Schlüssel-Wert-Paar in eine HashMap einfügst, müssen wir uns fragen: Was passiert mit dem Besitz der Daten?

Das hängt vom Typ ab:
* **Copy-Typen:** Wenn dein Schlüssel oder Wert einen Typ hat, der das `Copy`-Trait implementiert (wie `i32`, `u32`, `f64`, `char`), werden die Daten einfach in die HashMap kopiert. Die ursprünglichen Variablen bleiben weiterhin nutzbar.
* **Verschobene Typen (Moved Types):** Wenn die Typen `Copy` nicht implementieren (wie `String` oder `Vec`), wechselt der Besitz (Ownership) zur HashMap. Die HashMap wird zum alleinigen Eigentümer dieser Daten. Wenn du versuchst, die ursprüngliche Variable danach weiterzuverwenden, wird der Compiler einen Fehler melden.
* **Referenzen:** Du kannst auch Referenzen (z. B. `&str`) als Schlüssel verwenden. Das erfordert jedoch, dass du dich mit Lifetimes (Lebensdauern) beschäftigst, da die HashMap nicht länger leben darf als die Daten, auf die die Referenzen zeigen. Für den Anfang ist es meistens einfacher, der HashMap den Besitz (z. B. via `String`) zu übergeben.

### Die Entry-API: Effizienz und Eleganz
Stell dir vor, du möchtest zählen, wie oft Wörter in einem Text vorkommen.
Ein naiver Ansatz wäre:
1. Prüfe, ob das Wort schon in der HashMap existiert.
2. Wenn ja: Hol den aktuellen Zählerwert, addiere 1 und speichere ihn wieder ab.
3. Wenn nein: Füge das Wort mit dem Wert 1 ein.

Das Problem dabei: Der Computer muss zweimal in der HashMap nachschlagen (einmal zum Prüfen, einmal zum Einfügen/Aktualisieren). Das ist ineffizient und unschön zu schreiben.

Hier kommt die **Entry-API** von Rust ins Spiel. Mit ihr kannst du in einem einzigen Schritt prüfen und manipulieren.
* Die Methode `entry(key)` gibt ein `Entry`-Enum zurück, das entweder `Occupied` (belegt) oder `Vacant` (frei) darstellt.
* Mit Methoden wie `.or_insert(default_value)` kannst du sagen: "Falls der Schlüssel noch nicht da ist, füge diesen Standardwert ein."
* Das Geniale daran: Diese Methode gibt eine veränderliche Referenz (`&mut V`) auf den Wert in der HashMap zurück. Du kannst diesen Wert direkt im Anschluss manipulieren (z. B. erhöhen), unabhängig davon, ob er gerade erst eingefügt wurde oder schon da war.

---

## 🛠️ Praxis-Aufgaben (Keine Codelösungen)

Versuche, die folgenden Aufgaben selbstständig zu lösen. Verwende dabei die Konzepte von Ownership und der Entry-API.

### 1. Der Wort-Häufigkeitszähler
Schreibe ein Programm, das einen längeren Text analysiert und zählt, wie oft jedes Wort darin vorkommt.
* **Anforderung:** Verwende die Entry-API, um die Zählerstände der Wörter effizient zu erhöhen.
* **Tipp:** Achte darauf, Satzzeichen zu entfernen und Wörter in Kleinbuchstaben umzuwandeln, damit "Apfel!" und "apfel" als das gleiche Wort gezählt werden.

### 2. Das Telefonbuch mit Gruppen
Implementiere ein einfaches Telefonbuch, bei dem Kontakte in Gruppen (z. B. "Familie", "Freunde", "Arbeit") organisiert sind.
* **Anforderung:** Jeder Gruppe soll eine Liste von Namen zugeordnet sein.
* **Tipp:** Überlege gut, welche Typen du für `K` und `V` wählen musst. Wie kannst du verhindern, dass beim Hinzufügen eines Kontakts eine bereits bestehende Gruppe überschrieben wird?

### 3. Datenbank-Cache-Simulation
Simuliere ein System, das teure Datenbankabfragen in einer HashMap zwischenspeichert (cacht).
* **Anforderung:** Wenn ein Benutzer nach Daten fragt, prüfe zuerst, ob diese im Cache (der HashMap) liegen. Wenn ja, gib sie direkt zurück. Wenn nein, simuliere eine "teure Abfrage" (z. B. durch eine Ausgabe auf der Konsole und kurzes Warten), speichere das Ergebnis im Cache ab und gib es zurück.

---

## 🚀 50 Projekte

Hier sind 50 kurze Projektideen, mit denen du dein Wissen über HashMaps festigen kannst:

1. **Vokabeltrainer:** Ein Programm, das Fremdwörter und ihre Übersetzungen speichert und abfragt.
2. **Noten-Manager:** Zuordnung von Schülernamen zu einer Liste ihrer Schulnoten.
3. **Warenkorb:** Speicherung von Produkt-IDs und deren Anzahl in einem Onlineshop.
4. **IP-Länder-Lookup:** Zuordnung von IP-Adressen zu Herkunftsländern.
5. **DNS-Simulator:** Zuordnung von Domainnamen zu IP-Adressen.
6. **Mitarbeiter-Verzeichnis:** Verwaltung von Personalnummern und Mitarbeiterdetails.
7. **Länder-Hauptstadt-Quiz:** Ein interaktives Quiz, das Hauptstädte abfragt.
8. **Plagiat-Scanner:** Zählen von gleichen Sätzen in zwei Textdokumenten.
9. **Social-Media-Follower:** Zuordnung von Nutzernamen zu Listen ihrer Follower.
10. **Paket-Tracking:** Zuordnung von Tracking-IDs zu ihrem aktuellen Lieferstatus.
11. **Chatroom-Verwaltung:** Zuordnung von Raum-IDs zu den darin aktiven Benutzern.
12. **Inventar-System:** Zuordnung von Gegenständen in einem Spiel zu ihrer Anzahl im Rucksack.
13. **Highscore-Tabelle:** Speicherung von Spielernamen und ihren Höchstpunktzahlen.
14. **Geburtstagskalender:** Zuordnung von Monaten zu den Geburtstagen in diesem Monat.
15. **Koffeingehalt-Rechner:** Zuordnung von Getränken zu ihrem Koffeingehalt pro 100 ml.
16. **Morsecodierer:** Zuordnung von Buchstaben zu Morsezeichen und umgekehrt.
17. **Menükarte:** Zuordnung von Gerichten zu ihren Preisen.
18. **Lagerbestand-Warnung:** Prüfung, welche Produkte im Warenlager unter einen Mindestbestand fallen.
19. **Umfrage-Auswerter:** Auszählung von Stimmen bei einer Multiple-Choice-Umfrage.
20. **Rezept-Zutaten-Skalierer:** Zuordnung von Zutaten zu Mengen, die je nach Personenanzahl hochgerechnet werden.
21. **Bibliotheks-System:** Zuordnung von Buch-ISBNs zu ihrem Verleihstatus (verliehen an Person X).
22. **Buslinien-Planer:** Zuordnung von Buslinien-Nummern zu einer Liste ihrer Haltestellen.
23. **Fehlercode-Lexikon:** Zuordnung von HTTP-Statuscodes (z. B. 404) zu ihren Bedeutungen.
24. **RGB-Farben-Sucher:** Zuordnung von Farbnamen (z. B. "Red") zu ihren RGB-Werten.
25. **Währungsrechner:** Zuordnung von Währungskürzeln (EUR, USD) zu ihren aktuellen Wechselkursen.
26. **Haushaltsbuch:** Zuordnung von Ausgabenkategorien zu den monatlichen Gesamtausgaben.
27. **Passwort-Manager (vereinfacht):** Zuordnung von Webseiten zu verschlüsselten Passwörtern.
28. **Buchstaben-Häufigkeitsanalyse:** Zählen, wie oft jeder einzelne Buchstabe in einem Text vorkommt.
29. **Veranstaltungs-Planer:** Zuordnung von Daten zu Events, die an diesem Tag stattfinden.
30. **Flugplan-Anzeiger:** Zuordnung von Flugnummern zu Abflugzeiten und Gates.
31. **Lieblingsfilme-Liste:** Zuordnung von Genres zu den persönlichen Top-Filmen.
32. **Zutaten-Allergie-Checker:** Zuordnung von Lebensmitteln zu enthaltenen Allergenen.
33. **Musik-Playlist-Manager:** Zuordnung von Playlist-Namen zu einer Liste von Songs.
34. **Server-Status-Monitor:** Zuordnung von Servernamen zu ihren aktuellen Liveness-Status (Online/Offline).
35. **Projekt-Task-Board:** Zuordnung von Projektmitgliedern zu ihren zugewiesenen Aufgaben.
36. **Paketdienst-Preise:** Zuordnung von Gewichtsklassen zu Versandkosten.
37. **Kfz-Kennzeichen-Finder:** Zuordnung von Städte-Kürzeln (z. B. "HH") zu den Städtenamen.
38. **Schachturnier-Ergebnisse:** Zuordnung von Spielern zu ihren erzielten Punkten im Turnier.
39. **Fitness-Tracker:** Zuordnung von Wochentagen zu verbrannten Kalorien.
40. **Smart-Home-Status:** Zuordnung von Räumen zu den dort aktiven Smart-Geräten.
41. **Game-Controller-Mapping:** Zuordnung von Tasten zu Aktionen im Spiel.
42. **Kundenkarten-Punkte:** Zuordnung von Kundennummern zu ihren gesammelten Treuepunkten.
43. **Wetter-Station-Historie:** Zuordnung von Uhrzeiten zu Temperaturmesswerten.
44. **Programmiersprachen-Finder:** Zuordnung von Dateiendungen (.rs, .py, .js) zu den Sprachen.
45. **Steuerrechner:** Zuordnung von Einkommensstufen zu Steuersätzen.
46. **Emoji-Tastatur:** Zuordnung von Text-Shortcodes (z. B. ":smile:") zu Emojis.
47. **Wegbeschreibungs-Netzwerk:** Zuordnung von Städten zu ihren Nachbarstädten und Entfernungen.
48. **Rechte-Verwaltung:** Zuordnung von Benutzerrollen (Admin, User) zu ihren Berechtigungen.
49. **Wort-Anagramm-Finder:** Gruppierung von Wörtern in einer HashMap, die dieselben Buchstaben enthalten.
50. **System-Konfiguration:** Zuordnung von Einstellungs-Schlüsseln (z. B. "theme") zu ihren Werten.

---

## 💡 Zusammenfassung

* **Key-Value:** Eine `HashMap<K, V>` speichert Daten als Schlüssel-Wert-Paare.
* **Schnelligkeit:** Suchen, Einfügen und Löschen funktionieren im Durchschnitt in **konstanter Zeit $O(1)$**, da die Position über eine Hash-Funktion berechnet wird.
* **Ownership:** Werte, die kein `Copy` implementieren, werden beim Einfügen in die HashMap verschoben (Moved).
* **Entry-API:** Ermöglicht hocheffiziente und lesbare Modifikationen von Werten in einem einzigen Schritt, ohne doppeltes Suchen.

---

## 📚 Links
* [Offizielles Rust-Buch (Kapitel über HashMaps)](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
* [Rust Standardbibliothek: Dokumentation für std::collections::HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html)

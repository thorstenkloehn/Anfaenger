# 🐚 Claude Code – Auf bessere Lösungen kommen (Refactoring)

*Wie du Claude Code nutzt, um nicht nur funktionierenden, sondern besseren, eleganteren und performanteren Code zu schreiben.*

---

## 🧠 Theorie: "Alle wissen" bei der Lösungssuche

Softwareentwicklung besteht nicht nur aus reinem Tippen, sondern vor allem aus Denken. Oft schreiben wir Code, der zwar funktioniert, aber schwer zu warten oder ineffizient ist. Claude Code kann hier als exzellenter technischer Sparringspartner fungieren, um "auf bessere Lösungen zu kommen". 

Damit Claude dir wirklich brillante Alternativen vorschlagen kann, muss der Kontext ("Alle wissen") tiefgründiger sein:
* **Das "Warum" teilen:** Zeige Claude nicht nur den Code (`Was`), sondern erkläre ausführlich den Use-Case (`Warum`). Ein Agent kann einen Such-Algorithmus nur dann optimal umbauen, wenn er weiß, wie oft die Daten gelesen im Vergleich zu geschrieben werden.
* **Alternativen einfordern:** Wenn du schlicht fragst "Wie löse ich das?", bekommst du exakt *eine* Antwort. Wenn du fragst "Zeige mir 3 grundverschiedene Architektur-Ansätze", zwingst du die KI, aus ihrer Komfortzone zu kommen.
* **Rubber Duck Debugging:** Nutze den Agenten als Zuhörer. Wenn du ihm dein technisches Problem extrem detailliert erklärst, liefert er oft Perspektiven, die dir den entscheidenden eigenen Geistesblitz geben.

## ⚙️ Einstellungen & Setup

Um dieses kreative Refactoring zu steuern, brauchst du die richtige Herangehensweise in der CLI:
* **Explorativer Modus:** Wenn du nach Lösungen suchst, probierst du oft Dinge aus und landest in Sackgassen. Nutze den Befehl `/compact`, um den Chatverlauf von gescheiterten Versuchen zu säubern. Das hält den Kontext frisch und spart Token.
* **Rollenzuweisung (Persona Prompting):** Zwinge Claude über den Prompt, in eine bestimme Rolle zu schlüpfen (z.B. "Verhalte dich ab jetzt wie ein extrem pingeliger Senior Rust Architekt. Kritisiere meinen Code schonungslos.").
* **Temperatur & Kreativität:** Falls die CLI dir erlaubt, die "Temperature" (Kreativität) der API anzupassen, setze sie für Brainstorming-Aufgaben höher als für striktes Bug-Fixing.

---

## 🛠️ Praxis-Übungen: Bessere Lösungen finden (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine Code-Lösungen zum einfachen Abschreiben! Schnapp dir ein eigenes, fertiges Rust-Skript und diskutiere mit Claude im Terminal darüber, um es besser zu machen.

### 🧭 Brainstorming & Architektur

#### Übung 1: Das "Warum" erklären
* **Aufgabe:** Öffne eine Rust-Datei, die du geschrieben hast. Sag Claude: "Das ist mein Code. Der Zweck der Software ist XYZ. Gibt es einen konzeptionell völlig anderen (und besseren) Weg, dieses Ziel zu erreichen?"
* **Hinweis:** Bewerte Claudes Antwort kritisch. Wurde dir eine neue Bibliothek oder ein Design-Pattern (z.B. eine State-Machine statt vieler if-else Blöcke) vorgeschlagen, das du vorher gar nicht auf dem Schirm hattest?

#### Übung 2: Die "3-Wege"-Regel
* **Aufgabe:** Du stehst vor einem neuen Feature (z.B. "Daten lokal speichern"). Anstatt Claude direkt Code schreiben zu lassen, verlange: "Skizziere mir 3 verschiedene Architektur-Ansätze (z.B. JSON, SQLite, Binärformat) mit ihren spezifischen Vor- und Nachteilen für mein Projekt."
* **Hinweis:** Fordere die Ausgabe in einem tabellarischen Format an, um die Argumente schnell abwägen zu können.

#### Übung 3: Sackgassen aufräumen
* **Aufgabe:** Du hast 20 Minuten mit Claude über einen Lösungsansatz diskutiert, der sich letztlich als völliger Quatsch herausstellt. Wie räumst du den Chat auf, damit die KI aufhört, sich auf diese schlechten Ideen zu beziehen, ohne dass du die CLI komplett neu starten musst?
* **Hinweis:** Nutze den `/compact` Befehl der Claude CLI.

### 🛡️ Code-Kritik & Refactoring

#### Übung 4: Schonungslose Kritik anfordern
* **Aufgabe:** Gib Claude den Befehl: "Analysiere diese Funktion. Sei extrem kritisch, bewerte die Performance, die Lesbarkeit und das Error-Handling. Gib mir **keinen** fertigen Code, sondern nur harte Kritikpunkte in Stichpunkten."
* **Hinweis:** Achte darauf, wie strikt du dein Prompt formulieren musst, um den "Hilfe-Reflex" der KI (die sofort Code schreiben will) zu unterdrücken.

#### Übung 5: Das Anti-Pattern finden
* **Aufgabe:** Fordere Claude auf, dein aktuelles Projektverzeichnis auf typische "Rust Anti-Patterns" zu scannen.
* **Hinweis:** Wie formulierst du den Suchauftrag in der CLI so, dass Claude nicht jede unwichtige Konfigurationsdatei scannt, sondern sich tief in die `src/` Logik einarbeitet?

#### Übung 6: Refactoring in Mini-Schritten
* **Aufgabe:** Du hast eine viel zu lange "Monster-Funktion" geschrieben. Lass Claude dabei helfen, sie in kleine, gut testbare Module aufzuteilen.
* **Hinweis:** Sage Claude: "Refactore diese Funktion. Brich sie in 3 kleinere Funktionen auf, aber ändere ansonsten nichts an der internen Logik."

### 🔄 Komplexe Lösungs-Workflows

#### Übung 7: Fremden (alten) Code modernisieren
* **Aufgabe:** Such dir im Internet (oder generiere dir) ein altes, unschönes Rust-Snippet. Bitte Claude in der CLI: "Modernisiere diesen Code auf die Rust Edition 2021 und nutze moderne Standard-Bibliotheks-Features."
* **Hinweis:** Erkennt Claude alte, veraltete Makros (wie das alte `try!`) und ersetzt sie sauber durch den modernen `?`-Operator?

#### Übung 8: Performance-Engpässe identifizieren
* **Aufgabe:** Du hast eine einfache Schleife geschrieben, die große Datenmengen verarbeitet. Frag Claude: "Welche Teile dieses Codes verursachen vermutlich die meisten unnötigen Heap-Allokationen (RAM-Verbrauch) und wie kann ich sie vermeiden?"
* **Hinweis:** Achte darauf, ob Claude dir fortgeschrittene Rust-Konzepte wie `Cow` (Clone-on-Write) oder die Wiederverwendung von bestehenden `String`-Buffern vorschlägt.

#### Übung 9: Testgetriebene Lösungsfindung
* **Aufgabe:** Du weißt noch nicht genau, wie du eine komplexe Berechnungs-Funktion programmieren sollst, kennst aber das erwartete Ergebnis. Schreibe zuerst 3 strenge Testfälle in Rust (`#[test]`). Lass Claude dann *nur* auf Basis dieser Tests die Logik entwerfen.
* **Hinweis:** Übergib Claude die leere Funktion und die fertigen Tests. Der Prompt lautet: "Denke schrittweise nach. Schreibe die Funktion genau so, dass alle diese Tests grün werden, und starte danach `cargo test`."

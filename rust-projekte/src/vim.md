# 📝 Vim – Der tastaturgesteuerte Editor

*Entwickle in Lichtgeschwindigkeit, ohne jemals die Hand von der Tastatur zu nehmen.*

---

In dieser Lektion beschäftigen wir uns mit **Vim** (bzw. dem modernen Nachfolger **Neovim**). Vim ist einer der ältesten, flexibelsten und am weitesten verbreiteten Texteditoren der Welt. Fast jeder Server hat ihn vorinstalliert. Für Rust-Entwickler bietet Vim – oder die Aktivierung des Vim-Modus in modernen IDEs wie Zed oder VS Code – einen enormen Geschwindigkeitsvorteil.

Das Erlernen von Vim erfordert Geduld (die berüchtigte Lernkurve), zahlt sich aber für den Rest deines Entwicklerlebens aus.

---

## 🧠 Theorie: Was ist Vim?

### Das Konzept der Modi

Vim unterscheidet sich grundlegend von klassischen Editoren dadurch, dass er **modal** ist. Jede Taste auf deiner Tastatur hat je nach Modus eine völlig andere Funktion.

Die vier wichtigsten Modi sind:
1. **Normal-Modus (Normal Mode):** Der Standardmodus. Jede Taste ist ein Befehl, um im Text zu navigieren, Wörter zu löschen, Sätze zu kopieren oder zu manipulieren. Hier tippst du *keinen* Text.
2. **Einfüge-Modus (Insert Mode):** Dieser Modus verhält sich wie ein normaler Texteditor. Du tippst Text ein.
3. **Visueller Modus (Visual Mode):** Dient zum Markieren von Textblöcken (zeichenweise, zeilenweise oder blockweise), um Befehle auf sie anzuwenden.
4. **Befehlszeilen-Modus (Command Mode):** Wird durch Drücken von `:` im Normal-Modus gestartet. Ermöglicht das Speichern, Beenden, Suchen und Konfigurieren.

### Warum Vim für Rust-Entwickler?

- **Keine Maus nötig:** Da du alles mit Tastaturkürzeln erledigst, bleiben deine Hände auf der Grundlinie der Tastatur. Das ist extrem ergonomisch und schnell.
- **Vim-Modus gibt es überall:** Egal ob Antigravity IDE, Zed, VS Code oder IntelliJ – alle modernen Editoren bieten ein Vim-Plugin an. Du lernst Vim einmal und kannst es überall nutzen.
- **Rust-Unterstützung:** Neovim hat ein eingebautes LSP-System (Language Server Protocol), das sich hervorragend mit `rust-analyzer` verbinden lässt. Du erhältst Autovervollständigung und Diagnosen direkt im Terminal.

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Den Editor kennenlernen

1. Öffne dein Terminal und tippe `vim` (oder `nvim`, falls installiert) gefolgt von einer neuen Datei: `vim main.rs`.
2. Du startest im **Normal-Modus**. Du kannst jetzt noch nichts tippen.
3. Drücke die Taste `i`, um in den **Einfüge-Modus** zu wechseln. Unten links sollte `-- INSERT --` stehen.
4. Tippe eine Zeile Code (z. B. `fn main() {}`).
5. Drücke `Esc`, um in den **Normal-Modus** zurückzukehren.
6. Tippe `:w` und drücke `Enter`, um die Datei zu speichern.
7. Tippe `:q` und drücke `Enter`, um den Editor zu beenden.

---

### Aufgabe B: Cursor-Navigation ohne Pfeiltasten

1. Öffne die `main.rs` erneut in Vim.
2. Nutze im **Normal-Modus** ausschließlich folgende Tasten zur Navigation:
   - `h` (nach links)
   - `j` (nach unten)
   - `k` (nach oben)
   - `l` (nach rechts)
3. Bewege den Cursor an den Anfang der Zeile, indem du `0` drückst.
4. Springe ans Ende der Zeile mit `$`.
5. Schließe die Datei ohne zu speichern mit `:q!`.

---

### Aufgabe C: Vim in deiner IDE aktivieren

1. Wenn du Zed verwendest, öffne deine `settings.json` und füge `"vim_mode": true` hinzu. (Wenn du VS Code verwendest, installiere das Plugin *VSCodeVim*).
2. Öffne dein aktuelles Rust-Projekt.
3. Versuche, die nächsten 10 Minuten ausschließlich mit den Vim-Navigationsbefehlen (`h`, `j`, `k`, `l`) im Code zu navigieren und zu editieren.

---

## 🚀 50 Übungen mit Lösungen

Diese Übungen trainieren dein Muskelgedächtnis für Vim-Befehle und zeigen dir, wie du deinen Code effizient manipulierst.

> [!IMPORTANT]
> **Das Buchkonzept verbietet fertigen Rust-Code als Lösung.**
> Die Lösungen beschreiben die exakten Tastenkombinationen und Befehlssequenzen im Vim-Normal-Modus!

---

### 🟢 Einstieg (1–10): Modi, Navigation und einfache Änderungen

#### Übung 1: Modus wechseln
* **Aufgabe:** Du bist im Einfüge-Modus und möchtest zurück in den Normal-Modus, um zu navigieren. Wie machst du das?
* **Lösung:** Drücke die `Esc`-Taste (oder die Tastenkombination `Ctrl+[`).

#### Übung 2: Zeichen löschen
* **Aufgabe:** Der Cursor steht auf einem überflüssigen Buchstaben. Wie löschst du dieses einzelne Zeichen im Normal-Modus?
* **Lösung:** Drücke die Taste `x`.

#### Übung 3: Ein ganzes Wort löschen
* **Aufgabe:** Der Cursor steht am Anfang eines Wortes. Wie löschst du das gesamte Wort?
* **Lösung:** Drücke `dw` (Delete Word).

#### Übung 4: Ein Wort löschen und direkt weiterschreiben
* **Aufgabe:** Wie löschst du ein Wort und wechselst sofort in den Einfüge-Modus, um ein neues Wort zu tippen?
* **Lösung:** Drücke `cw` (Change Word).

#### Übung 5: Neue Zeile darunter einfügen
* **Aufgabe:** Du möchtest unter der aktuellen Zeile eine neue Leerzeile einfügen und direkt mit dem Schreiben beginnen.
* **Lösung:** Drücke im Normal-Modus die Taste `o` (kleines O).

#### Übung 6: Neue Zeile darüber einfügen
* **Aufgabe:** Du möchtest über der aktuellen Zeile eine neue Leerzeile einfügen und direkt mit dem Schreiben beginnen.
* **Lösung:** Drücke im Normal-Modus die Taste `O` (großes O / `Shift+o`).

#### Übung 7: Zeichen ersetzen
* **Aufgabe:** Du möchtest das Zeichen unter dem Cursor durch ein `+` ersetzen, ohne den Einfüge-Modus dauerhaft zu betreten.
* **Lösung:** Drücke `r` (Replace) gefolgt von der Taste `+`.

#### Übung 8: Aktion rückgängig machen (Undo)
* **Aufgabe:** Du hast versehentlich eine Zeile gelöscht. Wie machst du das im Normal-Modus rückgängig?
* **Lösung:** Drücke die Taste `u` (Undo).

#### Übung 9: Rückgängig gemachte Aktion wiederholen (Redo)
* **Aufgabe:** Du hast ein Undo zu viel gemacht und willst den Schritt wieder nach vorne wiederholen.
* **Lösung:** Drücke `Ctrl+r` (Redo).

#### Übung 10: Speichern und Beenden in einem Befehl
* **Aufgabe:** Wie speicherst du die aktuelle Datei ab und schließt Vim sofort mit einer kurzen Tastenfolge im Normal-Modus?
* **Lösung:** Drücke `:wq` gefolgt von `Enter`, oder verwende die Tastenkombination `ZZ` im Normal-Modus.

---

### 🟡 Mittelstufe (11–25): Erweiterte Navigation und Manipulation

#### Übung 11: Wortweise navigieren
* **Aufgabe:** Wie springst du mit dem Cursor wortweise nach vorne und wortweise nach hinten?
* **Lösung:** Drücke `w` (word forward) zum Vorspringen und `b` (back word) zum Zurückspringen.

#### Übung 12: Ans Ende des Wortes springen
* **Aufgabe:** Wie springst du an das letzte Zeichen des aktuellen oder nächsten Wortes?
* **Lösung:** Drücke die Taste `e` (end of word).

#### Übung 13: Suchen in der aktuellen Zeile
* **Aufgabe:** Der Cursor steht am Anfang der Zeile. Du möchtest direkt zum nächsten Vorkommen des Buchstabens `f` in derselben Zeile springen.
* **Lösung:** Drücke `f` gefolgt von `f` (also `ff`). Mit `t` springst du *bis kurz vor* das Zeichen.

#### Übung 14: Rückwärts suchen in der aktuellen Zeile
* **Aufgabe:** Wie springst du in der aktuellen Zeile rückwärts zum vorherigen Vorkommen des Zeichens `;`?
* **Lösung:** Drücke `F` gefolgt von `;` (also `F;`).

#### Übung 15: Suchen in der gesamten Datei
* **Aufgabe:** Wie suchst du nach dem Begriff `struct` im gesamten Dokument?
* **Lösung:** Tippe `/struct` und drücke `Enter`. Mit `n` springst du zum nächsten Treffer, mit `N` zum vorherigen.

#### Übung 16: An das Ende der Datei springen
* **Aufgabe:** Wie bewegst du den Cursor sofort in die allerletzte Zeile des Dokuments?
* **Lösung:** Drücke `G` (großes G / `Shift+g`).

#### Übung 17: An den Anfang der Datei springen
* **Aufgabe:** Wie bewegst du den Cursor sofort in die erste Zeile des Dokuments?
* **Lösung:** Drücke zweimal `g` hintereinander (also `gg`).

#### Übung 18: Zu einer bestimmten Zeile springen
* **Aufgabe:** Der Compiler meldet einen Fehler in Zeile 42. Wie springst du direkt zu dieser Zeile?
* **Lösung:** Tippe `:42` und drücke `Enter`, oder tippe `42G` im Normal-Modus.

#### Übung 19: Zeile kopieren (Yank)
* **Aufgabe:** Wie kopierst du die aktuelle Zeile in den Zwischenspeicher (Register)?
* **Lösung:** Drücke zweimal `y` (also `yy`).

#### Übung 20: Einfügen (Paste)
* **Aufgabe:** Wie fügst du den kopierten Text unterhalb der aktuellen Cursor-Zeile ein?
* **Lösung:** Drücke die Taste `p` (put/paste). Um ihn darüber einzufügen, drücke `P` (`Shift+p`).

#### Übung 21: Zeile löschen und in den Zwischenspeicher legen (Cut)
* **Aufgabe:** Wie löschst du die aktuelle Zeile so, dass du sie danach mit `p` woanders einfügen kannst?
* **Lösung:** Drücke zweimal `d` (also `dd`).

#### Übung 22: Visual-Mode für Zeilen aktivieren
* **Aufgabe:** Wie markierst du mehrere Zeilen gleichzeitig, um sie danach kollektiv zu kopieren oder zu löschen?
* **Lösung:** Drücke `V` (`Shift+v`), um den zeilenweisen Visual-Modus zu starten, und bewege den Cursor mit `j` oder `k`.

#### Übung 23: Text einrücken
* **Aufgabe:** Du hast mehrere Zeilen im Visual-Modus markiert. Wie rückst du sie um eine Ebene nach rechts ein?
* **Lösung:** Drücke die Taste `>`. Um sie nach links einzurücken, drücke `<`.

#### Übung 24: Groß-/Kleinschreibung umkehren (Toggle Case)
* **Aufgabe:** Wie änderst du die Groß-/Kleinschreibung des Buchstabens unter dem Cursor?
* **Lösung:** Drücke die Tilde-Taste `~`.

#### Übung 25: Bis zum Zeilenende löschen
* **Aufgabe:** Der Cursor steht mitten in einer Zeile. Wie löschst du alles von der aktuellen Position bis zum Ende der Zeile?
* **Lösung:** Drücke `D` (`Shift+d`) oder `d$`.

---

### 🔴 Fortgeschritten (26–40): Textobjekte, Register und Multi-Tasking

#### Übung 26: Das mächtige Textobjekt „Inner Word“
* **Aufgabe:** Der Cursor befindet sich mitten in einem Variablennamen. Wie löschst du das gesamte Wort, egal wo der Cursor steht?
* **Lösung:** Drücke `diw` (Delete Inner Word).

#### Übung 27: Text in Klammern ändern
* **Aufgabe:** Du hast eine Funktionssignatur `fn test(parameter: i32)` und der Cursor steht in den Klammern. Wie löschst du den gesamten Inhalt der Klammern und wechselst direkt in den Einfüge-Modus?
* **Lösung:** Drücke `ci(` oder `cib` (Change Inner Parentheses / Block).

#### Übung 28: Text in geschweiften Klammern kopieren
* **Aufgabe:** Wie kopierst du den gesamten Inhalt innerhalb eines `{ ... }`-Funktionsblocks, ohne die geschweiften Klammern selbst zu kopieren?
* **Lösung:** Drücke `yi{` oder `yiB` (Yank Inner Curly Braces / Block).

#### Übung 29: In Anführungszeichen gesetzten Text löschen
* **Aufgabe:** Du möchtest den Inhalt eines Strings (z. B. `"Hallo Welt"`) löschen, die Anführungszeichen aber behalten.
* **Lösung:** Drücke `di"` (Delete Inner Quote).

#### Übung 30: Äußeres Textobjekt löschen (inkl. Umhüllung)
* **Aufgabe:** Wie löschst du einen String inklusive der Anführungszeichen?
* **Lösung:** Drücke `da"` (Delete Around Quote).

#### Übung 31: Wiederholungs-Befehl (Dot-Operator)
* **Aufgabe:** Du hast gerade ein Wort mit `dw` gelöscht. Wie wiederholst du genau diese Löschaktion an einer anderen Stelle mit nur einem einzigen Tastendruck?
* **Lösung:** Bewege den Cursor zur neuen Stelle und drücke die Taste `.` (Punkt).

#### Übung 32: Block-Visual-Modus (Spaltenweises Editieren)
* **Aufgabe:** Du möchtest vor fünf untereinanderstehenden Zeilen gleichzeitig ein `//` einfügen. Welchen Modus nutzt du?
* **Lösung:** Drücke `Ctrl+v` (Visual Block Mode), markiere die Spalte nach unten, drücke `I` (`Shift+i`), tippe `//` und drücke `Esc`.

#### Übung 33: Multi-Register (Zwischenablage gezielt nutzen)
* **Aufgabe:** Normalerweise überschreibt jedes Löschen deine Zwischenablage. Wie kopierst du Text explizit in das Register `a`, um ihn später gezielt einzufügen?
* **Lösung:** Tippe `"ay` im Visual-Modus oder `"ayy` im Normal-Modus. Zum Einfügen tippe `"ap`.

#### Übung 34: Makro aufnehmen
* **Aufgabe:** Du musst eine repetitive Editieraufgabe an 20 Stellen ausführen. Wie startest du die Aufnahme eines Makros im Register `q`?
* **Lösung:** Drücke `qq` im Normal-Modus. Die Statuszeile zeigt nun `recording @q` an.

#### Übung 35: Makro-Aufnahme beenden
* **Aufgabe:** Wie beendest du die Aufnahme des Makros aus Übung 34?
* **Lösung:** Drücke im Normal-Modus die Taste `q`.

#### Übung 36: Makro abspielen
* **Aufgabe:** Wie spielst du das aufgenommene Makro aus Register `q` an der aktuellen Cursorposition ab?
* **Lösung:** Drücke `@q`. Um es z. B. 10-mal auszuführen, tippe `10@q`.

#### Übung 37: Splits horizontal erstellen
* **Aufgabe:** Wie teilst du das Vim-Fenster horizontal, um zwei Dateien übereinander zu sehen?
* **Lösung:** Tippe den Befehl `:sp` (oder `:split`) und drücke `Enter`.

#### Übung 38: Splits vertikal erstellen
* **Aufgabe:** Wie teilst du das Vim-Fenster vertikal, um zwei Dateien nebeneinander zu sehen?
* **Lösung:** Tippe den Befehl `:vsp` (oder `:vsplit`) und drücke `Enter`.

#### Übung 39: Navigation zwischen Splits
* **Aufgabe:** Wie wechselst du den Cursor-Fokus von einem Split-Fenster in ein anderes?
* **Lösung:** Drücke `Ctrl+w` gefolgt von der Richtungstaste (`h`, `j`, `k`, `l` oder `w` für das nächste Fenster).

#### Übung 40: Lokales Suchen und Ersetzen (Substituieren)
* **Aufgabe:** Wie ersetzt du in der aktuellen Zeile das erste Vorkommen von `x` durch `y`?
* **Lösung:** Tippe `:s/x/y/` und drücke `Enter`. Um alle Vorkommen in der Zeile zu ersetzen: `:s/x/y/g`.

---

### ⚡ Challenge (41–50): Globale Befehle, Rust-Integration und Konfiguration

#### Übung 41: Globales Suchen und Ersetzen im Dokument
* **Aufgabe:** Wie ersetzt du im gesamten Dokument jedes Vorkommen der Variable `temp_val` durch `final_val` mit einer Bestätigungsaufforderung für jeden Schritt?
* **Lösung:** Tippe `:%s/temp_val/final_val/gc` und drücke `Enter` (`g` für global, `c` für confirm).

#### Übung 42: Zeilen filtern mit `:g` (Global)
* **Aufgabe:** Wie löschst du mit einem einzigen Befehl alle Zeilen im Dokument, die das Wort `// TODO` enthalten?
* **Lösung:** Tippe `:g/\/\/ TODO/d` und drücke `Enter`.

#### Übung 43: Cargo-Befehle direkt aus Vim ausführen
* **Aufgabe:** Wie führst du `cargo check` aus, ohne Vim zu beenden oder in ein anderes Terminal zu wechseln?
* **Lösung:** Tippe `:!cargo check` und drücke `Enter` (das `!` leitet den Befehl an die System-Shell weiter).

#### Übung 44: Externe Shell-Ausgabe in den Puffer einfügen
* **Aufgabe:** Wie fügst du das aktuelle Datum und die Uhrzeit direkt unter deinem Cursor in das Dokument ein?
* **Lösung:** Tippe `:r !date` und drücke `Enter`.

#### Übung 45: Pufferliste anzeigen und wechseln
* **Aufgabe:** Du hast mehrere Dateien in Vim geöffnet. Wie lässt du dir die geöffneten Puffer anzeigen und wie wechselst du zum Puffer Nummer 3?
* **Lösung:** Tippe `:ls` (oder `:buffers`) zum Auflisten. Tippe `:b 3` zum Wechseln.

#### Übung 46: Zeilen sortieren
* **Aufgabe:** Du hast eine ungeordnete Liste von `use`-Imports in Rust markiert. Wie sortierst du diese alphabetisch?
* **Lösung:** Markiere die Zeilen im Visual-Modus und tippe `:sort` gefolgt von `Enter`.

#### Übung 47: Zahlwert unter dem Cursor inkrementieren
* **Aufgabe:** Der Cursor steht auf der Zahl `9`. Wie erhöhst du diese Zahl ohne den Insert-Modus auf `10`?
* **Lösung:** Drücke `Ctrl+a`. Zum Dekrementieren drücke `Ctrl+x`.

#### Übung 48: Rust-Analyzer Integration einrichten (Neovim)
* **Aufgabe:** Welches moderne Plugin-System oder Protokoll wird in Neovim typischerweise konfiguriert, um `rust-analyzer` direkt im Editor zu betreiben?
* **Lösung:** Es wird die integrierte LSP-Konfiguration über Lua (z. B. mit dem Plugin `nvim-lspconfig` und `mason.nvim`) oder das Plugin `coc.nvim` (für Node-basierte Vervollständigung) verwendet.

#### Übung 49: Dateityp-Erkennung erzwingen
* **Aufgabe:** Vim erkennt eine neu erstellte Datei nicht als Rust-Datei. Wie setzt du den Dateityp manuell auf Rust?
* **Lösung:** Tippe `:set filetype=rust` und drücke `Enter`.

#### Übung 50: Vim-Konfiguration automatisieren
* **Aufgabe:** Du möchtest, dass Vim immer standardmäßig Zeilennummern anzeigt und die Syntaxhervorhebung aktiviert. In welcher Datei trägst du das ein?
* **Lösung:** Erstelle und editiere die Datei `~/.vimrc` (für klassisches Vim) bzw. `~/.config/nvim/init.lua` (oder `init.vim` für Neovim) und füge dort Befehle wie `set number` und `syntax on` hinzu.

---

## 💡 Zusammenfassung

| Konzept | Erklärung |
|---|---|
| **Normal Mode** | Der Standard-Navigations- und Befehlsmodus. Aktiviert über `Esc`. |
| **Insert Mode** | Texttipp-Modus. Aktiviert über `i`, `o`, `a` etc. |
| **Visual Mode** | Markierungsmodus für Textmanipulationen. Aktiviert über `v` oder `V`. |
| **Textobjekte** | Strukturierte Texteinheiten wie Wörter (`iw`), Klammerinhalte (`i(`) oder Strings (`i"`). |
| **Register** | Vim-interne Zwischenablagen (z. B. `"a` für Register A) zur strukturierten Datenablage. |
| **Splits** | Horizontale oder vertikale Teilungen des Bildschirms zur parallelen Ansicht mehrerer Dateien. |
| **.vimrc / init.lua** | Die zentralen Konfigurationsdateien zur Individualisierung von Vim/Neovim. |

---

## 📚 Weiterführende Links

- [Vimtutor](https://github.com/vim/vim) – Führe einfach `vimtutor` im Terminal aus, um ein interaktives 30-Minuten-Tutorial zu starten.
- [Neovim Website](https://neovim.io) – Der moderne, erweiterbare Nachfolger von Vim.
- [Vim Adventures](https://vim-adventures.com) – Ein spielerischer Weg, die Cursor-Steuerung und Tasten von Vim zu lernen.
- [rust.vim](https://github.com/rust-lang/rust.vim) – Das offizielle Vim-Plugin für Rust-Integration (Syntax, Formatierung).

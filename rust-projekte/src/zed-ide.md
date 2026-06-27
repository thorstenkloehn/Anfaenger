# ⚡ Zed IDE – Der performante Editor mit KI

*Ein blitzschneller, in Rust geschriebener Editor mit tief integrierter KI.*

---

In dieser Lektion lernen wir **Zed** kennen. Zed ist ein moderner, extrem performanter Code-Editor, der vom Team hinter Atom und VS Code entwickelt wurde. Da er komplett in Rust geschrieben ist und auf die Grafikkarte (GPU) zur Darstellung setzt, fühlt er sich unglaublich reaktiv an. Zudem hat er KI-Features und Team-Kollaboration direkt im Kern eingebaut.

Als Rust-Einsteiger ist Zed eine fantastische Wahl: Er unterstützt Rust „out of the box“ über den `rust-analyzer` und bringt dich durch seine Geschwindigkeit direkt in den Programmier-Flow.

---

## 🧠 Theorie: Was ist Zed IDE?

### Warum Zed?

Die meisten modernen Editoren (wie VS Code) basieren auf Webtechnologien (Electron). Das macht sie flexibel, aber oft auch träge und speicherhungrig. Zed geht einen anderen Weg:
- **In Rust geschrieben:** Zed nutzt die Stärken von Rust (Speichersicherheit, Performance, Nebenläufigkeit).
- **GPU-beschleunigt:** Zed rendert Text über das eigene UI-Framework **GPUI** direkt auf der Grafikkarte. Dadurch läuft er mit 120 Bildern pro Sekunde (FPS) und reagiert verzögerungsfrei.
- **KI-first:** Das Assistant Panel ist kein nachgerüstetes Plugin, sondern fest in das Design des Editors integriert. Du kannst verschiedene Sprachmodelle (z. B. Anthropic Claude, OpenAI GPT-4o, Google Gemini oder lokale Modelle via Ollama) direkt anbinden.
- **Kollaboration:** Du kannst deinen Editor-Workspace mit anderen teilen (wie in Google Docs), gemeinsam am Code arbeiten und sogar direkt im Editor telefonieren.

### Rust-Unterstützung in Zed

Sobald du eine `.rs`-Datei in Zed öffnest, lädt der Editor im Hintergrund den **rust-analyzer**. Du erhältst sofort:
1. **Syntax-Highlighting:** Farbliche Hervorhebung von Keywords, Typen und Variablen.
2. **Auto-Vervollständigung:** Vorschläge für Methoden, Module und Structs während des Tippens.
3. **Inline-Fehler:** Compiler-Fehler und Warnungen werden direkt neben dem betroffenen Code angezeigt.
4. **Code Lens:** Kleine klickbare Buttons über Funktionen (z. B. `Run` oder `Debug` über der `main`-Funktion oder über Tests).

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Zed installieren & Projekt öffnen

1. Lade Zed von der offiziellen Website ([zed.dev](https://zed.dev)) herunter und installiere es.
2. Öffne dein Terminal, navigiere in dein Rust-Projekt und öffne es mit `zed .` (oder nutze `File -> Open Folder` in der App).
3. Öffne die `src/main.rs`. Warte kurz, bis in der Statusleiste unten rechts das Symbol für den `rust-analyzer` aktiv wird.
4. Bewege deinen Cursor über eine Standard-Rust-Funktion (z. B. `println!`) und beobachte, ob dir die Typ-Informationen und Dokumentationen angezeigt werden.

---

### Aufgabe B: Assistant Panel & Inline Assist erkunden

1. Drücke `Ctrl+Shift+I` (oder `Cmd+Shift+I` auf dem Mac), um das **Assistant Panel** auf der rechten Seite zu öffnen.
2. Konfiguriere deinen bevorzugten KI-Provider (für den Einstieg kannst du oft integrierte Demozugänge nutzen oder einen eigenen API-Key bzw. ein lokales Modell hinterlegen).
3. Stelle der KI eine Frage: `Wie erstelle ich einen Vektor in Rust?` und beobachte die Antwort.
4. Gehe zurück in deine `main.rs`, markiere eine Zeile Code und drücke `Ctrl+Enter` (oder `Cmd+Enter`), um den **Inline Assist** zu starten. Tippe: `Füge einen erklärenden Kommentar hinzu` und drücke erneut Enter. Schau dir das rot/grüne Diff an und nimm die Änderung mit `Tab` an.

---

### Aufgabe C: settings.json anpassen

1. Öffne die Befehlspalette mit `Ctrl+Shift+P` (oder `Cmd+Shift+P`).
2. Tippe `Settings` und wähle `zed: open settings`.
3. Dies öffnet eine `settings.json`. Füge dort Einstellungen hinzu, um Zed an deine Wünsche anzupassen. Ein Beispiel für nützliche Einstellungen:
   ```json
   {
     "theme": "One Dark",
     "ui_font_size": 16,
     "buffer_font_size": 16,
     "vim_mode": false,
     "autosave": "on_focus_change"
   }
   ```
4. Speichere die Datei. Zed übernimmt alle Änderungen sofort – ganz ohne Neustart!

---

## 🚀 50 Übungen mit Lösungen

Hier findest du 50 praktische Aufgaben, um Zed IDE wie ein Profi zu bedienen und für dein Rust-Lernen optimal einzusetzen.

> [!IMPORTANT]
> **Das Buchkonzept verbietet fertigen Rust-Code als Lösung.**
> Die Lösungen konzentrieren sich daher voll auf die Bedienung von Zed, die Shortcuts, die KI-Steuerung und die Konfiguration des Editors!

---

### 🟢 Einstieg (1–10): Navigation und Editor-Grundlagen

#### Übung 1: Die Befehlspalette (Command Palette)
* **Aufgabe:** Wie öffnest du die Befehlspalette, um nach Befehlen wie „Theme wechseln“ oder „Settings öffnen“ zu suchen?
* **Lösung:** Drücke `Ctrl+Shift+P` (Linux/Windows) oder `Cmd+Shift+P` (macOS).

#### Übung 2: Schnelle Dateisuche (Project Search)
* **Aufgabe:** Dein Projekt hat viele Dateien. Wie öffnest du die Dateisuche, um ohne Maus direkt zu `lib.rs` zu springen?
* **Lösung:** Drücke `Ctrl+P` (Linux/Windows) oder `Cmd+P` (macOS) und tippe den Dateinamen ein.

#### Übung 3: Projektbaum (Sidebar) umschalten
* **Aufgabe:** Du brauchst mehr Platz zum Schreiben. Mit welchem Shortcut blendest du den linken Projektbaum ein oder aus?
* **Lösung:** Drücke `Ctrl+B` (Linux/Windows) oder `Cmd+B` (macOS).

#### Übung 4: Zur Definition springen
* **Aufgabe:** Du siehst im Code einen Funktionsaufruf und möchtest wissen, wo diese Funktion definiert ist. Wie springst du dorthin?
* **Lösung:** Setze den Cursor auf die Funktion und drücke `F12` (oder halte `Ctrl`/`Cmd` gedrückt und klicke auf die Funktion).

#### Übung 5: Letzte Position (Zurückspringen)
* **Aufgabe:** Du bist mittels `F12` in eine andere Datei gesprungen. Wie kommst du schnell wieder an deine Ausgangsstelle zurück?
* **Lösung:** Drücke `Alt+Left` (Linux/Windows) oder `Ctrl+-` (macOS).

#### Übung 6: Terminal in Zed öffnen
* **Aufgabe:** Du möchtest `cargo run` direkt im Editor ausführen. Wie öffnest du das integrierte Terminal?
* **Lösung:** Drücke ``Ctrl+` `` (Control und Backtick).

#### Übung 7: Zeile duplizieren
* **Aufgabe:** Wie kopierst du die aktuelle Zeile schnell nach unten, ohne sie manuell zu markieren?
* **Lösung:** Drücke `Shift+Alt+Down` (Linux/Windows) oder `Shift+Option+Down` (macOS).

#### Übung 8: Code formatieren
* **Aufgabe:** Dein Rust-Code ist unordentlich eingerückt. Wie bringst du Zed dazu, die Datei sauber zu formatieren?
* **Lösung:** Drücke `Ctrl+Shift+I` (unter Windows/Linux bei Standard-Keymap oft `Shift+Alt+F`) oder nutze die Befehlspalette (`Format Document`). Alternativ `"format_on_save": true` in den Settings aktivieren.

#### Übung 9: Fehler und Warnungen anzeigen (Diagnostics)
* **Aufgabe:** Der Compiler meldet Fehler im Projekt. Wie springst du direkt zum nächsten Compilerfehler im aktuellen Puffer?
* **Lösung:** Drücke `F8` für den nächsten Fehler oder `Shift+F8` für den vorherigen Fehler.

#### Übung 10: Zeilenkommentar umschalten
* **Aufgabe:** Wie kommentierst du eine oder mehrere markierte Zeilen schnell aus?
* **Lösung:** Drücke `Ctrl+/` (Linux/Windows) oder `Cmd+/` (macOS).

---

### 🟡 Mittelstufe (11–25): KI-Integration und Feineinstellungen

#### Übung 11: Assistant Panel öffnen/schließen
* **Aufgabe:** Wie öffnest du das KI-Assistant-Panel auf der rechten Seite, um Fragen zu stellen?
* **Lösung:** Drücke `Ctrl+Shift+I` (Linux/Windows) oder `Cmd+Shift+I` (macOS).

#### Übung 12: Inline Assist starten
* **Aufgabe:** Du möchtest Code direkt an deiner Cursorposition von der KI generieren oder umschreiben lassen. Welchen Shortcut nutzt du?
* **Lösung:** Drücke `Ctrl+Enter` (Linux/Windows) oder `Cmd+Enter` (macOS).

#### Übung 13: KI-Modell wechseln
* **Aufgabe:** Du möchtest im Assistant Panel zwischen verschiedenen Modellen (z. B. Gemini, Claude, GPT-4) wechseln. Wo stellst du das ein?
* **Lösung:** Klicke im Assistant Panel unten auf den Modellnamen (Dropdown) oder öffne deine `settings.json` und passe den Key `"assistant"` bzw. `"default_model"` an.

#### Übung 14: Datei als KI-Kontext übergeben (`/file`)
* **Aufgabe:** Du stellst der KI im Assistant Panel eine Frage zu deiner `src/utils.rs`. Wie fügst du den Inhalt dieser Datei als Kontext in deinen Chat ein?
* **Lösung:** Tippe im Chat `/file src/utils.rs` ein. Zed bettet die Datei automatisch als Referenz ein.

#### Übung 15: Aktiven Tab als Kontext übergeben (`/active_edit`)
* **Aufgabe:** Wie stellst du sicher, dass die KI im Assistant Panel immer den Code der Datei sieht, an der du gerade arbeitest?
* **Lösung:** Nutze den Slash-Befehl `/active_edit` oder `/editor` im Chatfenster des Assistant Panels.

#### Übung 16: Terminal-Output an die KI senden (`/terminal`)
* **Aufgabe:** Dein `cargo build` schlägt fehl. Wie leitest du die letzte Fehlermeldung aus dem Terminal direkt an das Assistant Panel weiter?
* **Lösung:** Tippe im Assistant Panel `/terminal` ein, um die letzten Zeilen deines Terminals in den Kontext aufzunehmen.

#### Übung 17: Vim-Modus aktivieren
* **Aufgabe:** Du programmierst gerne mit Vim-Tastaturbefehlen. Wie aktivierst du das in Zed?
* **Lösung:** Füge in deiner `settings.json` die Zeile `"vim_mode": true` hinzu.

#### Übung 18: Tab-Gruppen (Panes) teilen
* **Aufgabe:** Du möchtest `main.rs` links und `lib.rs` rechts gleichzeitig sehen. Wie teilst du den Editor-Bildschirm vertikal?
* **Lösung:** Drücke `Ctrl+\` (Linux/Windows) oder `Cmd+\` (macOS) oder ziehe den Tab mit der Maus an den rechten Rand.

#### Übung 19: Symbole in der aktuellen Datei suchen (Outline)
* **Aufgabe:** Wie lässt du dir alle Structs, Enums und Funktionen der aktuellen Datei übersichtlich auflisten, um schnell zu ihnen zu springen?
* **Lösung:** Drücke `Ctrl+Shift+O` (Linux/Windows) oder `Cmd+Shift+O` (macOS) (Outline View).

#### Übung 20: Projektweite Symbolsuche
* **Aufgabe:** Du suchst das Struct `UserDatabase` irgendwo in deinem gesamten Projekt. Wie findest du es?
* **Lösung:** Drücke `Ctrl+T` (Linux/Windows) oder `Cmd+T` (macOS) und tippe den Namen des Structs ein.

#### Übung 21: Theme zur Laufzeit wechseln
* **Aufgabe:** Wie wechselst du das Aussehen (Theme) von Zed, ohne in die JSON-Datei zu gehen?
* **Lösung:** Öffne die Befehlspalette (`Ctrl/Cmd+Shift+P`), tippe `theme` ein und wähle `theme: select`. Navigiere mit den Pfeiltasten durch die Liste.

#### Übung 22: Zeilennummern umschalten
* **Aufgabe:** Du möchtest die Zeilennummern am linken Rand ausblenden. Wo geht das?
* **Lösung:** In der `settings.json` den Wert `"line_numbers": "none"` (oder `"relative"` für relative Zeilennummern) setzen.

#### Übung 23: Unsichtbare Zeichen anzeigen (Whitespace)
* **Aufgabe:** Um Einrückungsfehler zu finden, möchtest du Leerzeichen und Tabs als kleine Punkte/Pfeile sehen. Wie aktivierst du das?
* **Lösung:** Trage `"show_whitespaces": "all"` (oder `"boundary"`) in deine `settings.json` ein.

#### Übung 24: Schriftart anpassen
* **Aufgabe:** Wie stellst du eine installierte Entwickler-Schriftart (z. B. „JetBrains Mono“ oder „Fira Code“) in Zed ein?
* **Lösung:** Füge in der `settings.json` Folgendes hinzu:
   ```json
   "buffer_font_family": "JetBrains Mono"
   ```

#### Übung 25: Zoomfaktor des Editors ändern
* **Aufgabe:** Du möchtest für einen Vortrag die gesamte Benutzeroberfläche vergrößern.
* **Lösung:** Drücke `Ctrl++` (oder `Cmd++` auf macOS). Zum Verkleinern `Ctrl+-` / `Cmd+-`.

---

### 🔴 Fortgeschritten (26–40): Workflows und fortgeschrittene Features

#### Übung 26: Multi-Cursor-Modus
* **Aufgabe:** Du möchtest fünf Variablen gleichzeitig umbenennen, die untereinander stehen. Wie setzt du mehrere Cursor untereinander?
* **Lösung:** Halte `Alt` (Linux/Windows) bzw. `Option` (macOS) gedrückt und klicke an die gewünschten Stellen, oder drücke `Ctrl+Alt+Down`/`Cmd+Option+Down`.

#### Übung 27: Alle Vorkommen eines Wortes markieren
* **Aufgabe:** Du hast ein Wort markiert und möchtest alle weiteren Vorkommen dieses Wortes im Dokument gleichzeitig bearbeiten.
* **Lösung:** Drücke `Ctrl+D` (Linux/Windows) oder `Cmd+D` (macOS) wiederholt, um das nächste Vorkommen auszuwählen.

#### Übung 28: Multi-Buffer öffnen (Suchen in allen Dateien)
* **Aufgabe:** Du suchst nach einem Begriff im ganzen Projekt und möchtest alle Fundstellen in einem einzigen, editierbaren „Super-Puffer“ bearbeiten. Wie geht das?
* **Lösung:** Drücke `Ctrl+Shift+F` (Linux/Windows) oder `Cmd+Shift+F` (macOS), tippe deinen Suchbegriff ein und drücke Enter. Es öffnet sich ein Multi-Buffer. Änderungen dort werden in alle echten Dateien zurückgeschrieben!

#### Übung 29: Git-Gutter nutzen
* **Aufgabe:** Woran erkennst du in Zed, welche Zeilen du seit dem letzten Git-Commit verändert, hinzugefügt oder gelöscht hast?
* **Lösung:** Links neben den Zeilennummern erscheint ein farbiger Balken (Gutter): Grün für hinzugefügt, Blau für geändert, ein kleines Symbol für gelöscht.

#### Übung 30: Git-Änderungen zurücksetzen (Revert)
* **Aufgabe:** Wie kannst du eine Änderung in einer Datei direkt über den Gutter auf den letzten Git-Stand zurücksetzen?
* **Lösung:** Klicke auf den farbigen Balken im Gutter und wähle das Rückgängig-Symbol (Revert).

#### Übung 31: Custom Tasks konfigurieren (`tasks.json`)
* **Aufgabe:** Du möchtest einen benutzerdefinierten Befehl (z. B. `cargo clippy --all-targets`) über ein Zed-Menü ausführbar machen. Wo definierst du diesen?
* **Lösung:** Erstelle im Verzeichnis `.zed/` deines Projekts eine Datei namens `tasks.json` und definiere dort deine Tasks.

#### Übung 32: Custom Tasks ausführen
* **Aufgabe:** Wie startest du die in `tasks.json` definierten Aufgaben im Editor?
* **Lösung:** Öffne die Befehlspalette und suche nach `task: spawn`, wähle dann den gewünschten Task aus der Liste.

#### Übung 33: Keymap anpassen (`keymap.json`)
* **Aufgabe:** Du möchtest den Befehl `workspace: new search` auf die Taste `F3` legen. In welcher Datei machst du das?
* **Lösung:** Öffne die Befehlspalette, tippe `keymap` und wähle `zed: open keymap`. Trage dort die Tastenzuweisung im JSON-Format ein.

#### Übung 34: Rust-Analyzer-Einstellungen anpassen
* **Aufgabe:** Du möchtest dem `rust-analyzer` in Zed mitteilen, dass er standardmäßig `clippy` statt `check` zur Code-Prüfung verwenden soll. Wie konfigurierst du das?
* **Lösung:** In der `settings.json` unter dem Key `"lsp"` folgende Konfiguration einfügen:
   ```json
   "lsp": {
     "rust-analyzer": {
       "initializationOptions": {
         "check": {
           "command": "clippy"
         }
       }
     }
   }
   ```

#### Übung 35: Kollaborations-Kanal beitreten
* **Aufgabe:** Wie trittst du einem geteilten Programmierkanal bei, um mit anderen an einem Projekt zu arbeiten?
* **Lösung:** Klicke oben rechts auf das „Collab“-Symbol (Personen-Icon) oder drücke `Ctrl+Shift+C` / `Cmd+Shift+C`, wähle einen Kanal oder lade jemanden über den Link ein.

#### Übung 36: Shared Screen folgen
* **Aufgabe:** Du bist in einer Kollaborations-Session. Wie folgst du der Ansicht (dem Cursor) deines Kollegen?
* **Lösung:** Klicke in der Kanalliste oben rechts auf den Avatar des Kollegen. Dein Editor springt nun automatisch immer dorthin, wo er editiert.

#### Übung 37: Markdown-Vorschau öffnen
* **Aufgabe:** Du schreibst eine `README.md` und möchtest eine Live-HTML-Vorschau in Zed sehen.
* **Lösung:** Öffne die Befehlspalette und wähle `markdown: open preview` (oder nutze den entsprechenden Shortcut `Ctrl+Shift+M` / `Cmd+Shift+M`).

#### Übung 38: Rechtschreibprüfung konfigurieren
* **Aufgabe:** Wie verhinderst du, dass Zed englische Fachbegriffe im Code rot unterstreicht?
* **Lösung:** In der `settings.json` kannst du die Rechtschreibprüfung über `"spell_checking": false` komplett ausschalten oder Wörter zu einem Wörterbuch hinzufügen.

#### Übung 39: Integriertes Terminal-Verhalten anpassen
* **Aufgabe:** Du möchtest, dass dein Terminal beim Öffnen immer eine bestimmte Shell (z. B. `fish` statt `bash`) verwendet. Wo stellst du das ein?
* **Lösung:** Füge in der `settings.json` Folgendes hinzu:
   ```json
   "terminal": {
     "shell": {
       "program": "fish"
     }
   }
   ```

#### Übung 40: Lokales LLM mit Ollama anbinden
* **Aufgabe:** Du willst aus Datenschutzgründen keine Online-KI nutzen. Wie sagst du Zed, dass es ein lokales Ollama-Modell verwenden soll?
* **Lösung:** Trage in der `settings.json` Folgendes ein:
   ```json
   "assistant": {
     "provider": "ollama",
     "default_model": "llama3"
   }
   ```

---

### ⚡ Challenge (41–50): Komplexe Workflows und Optimierung

#### Übung 41: Eigene Prompt-Vorlagen (System-Prompts) nutzen
* **Aufgabe:** Du möchtest der KI im Assistant Panel eine feste Rolle zuweisen (z. B. „Du bist ein strenger Rust-Compiler-Lehrer“). Wie machst du das?
* **Lösung:** Klicke im Assistant Panel oben auf den System-Prompt-Bereich (oder füge einen `/system`-Befehl hinzu) und definiere dort die Rolle, bevor du den Chat beginnst.

#### Übung 42: Refactoring-Workflow mit Inline Assist
* **Aufgabe:** Du hast eine lange Funktion und möchtest sie in zwei kleinere Funktionen aufteilen. Wie gehst du vor?
* **Lösung:** Markiere die Funktion, öffne den Inline Assist (`Ctrl/Cmd+Enter`), tippe `Extrahiere den inneren Schleifenteil in eine eigene Funktion namens hilfs_funktion` und prüfe das generierte Diff genau, bevor du es annimmst.

#### Übung 43: Cargo-Dependencies per KI hinzufügen
* **Aufgabe:** Du brauchst die `serde`-Bibliothek. Wie lässt du Zed die `Cargo.toml` anpassen?
* **Lösung:** Öffne `Cargo.toml`, markiere die Sektion `[dependencies]`, starte Inline Assist und tippe: `Füge serde mit dem Feature derive hinzu`.

#### Übung 44: Tests generieren lassen
* **Aufgabe:** Du hast ein Struct mit Berechnungslogik. Wie lässt du die KI das Testgerüst erstellen?
* **Lösung:** Markiere das Struct und die Methoden, öffne das Assistant Panel, referenziere die Datei und frage: `Schreibe Unit-Tests für diese Methoden, nutze typische Rust-Testkonventionen`.

#### Übung 45: Diagnostics auswerten und erklären lassen
* **Aufgabe:** Du verstehst eine Lifetime-Fehlermeldung des Compilers nicht. Wie hilft dir Zed?
* **Lösung:** Markiere den fehlerhaften Codebereich, öffne das Assistant Panel, füge den Fehler via `/terminal` oder Kopieren ein und frage: `Erkläre mir diese Fehlermeldung und gib mir Denkanstöße zur Behebung (keinen fertigen Code!)`.

#### Übung 46: Externe CLI-Tools via Task einbinden
* **Aufgabe:** Du möchtest das Tool `cargo-tarpaulin` (für Testabdeckung) direkt als Task in Zed starten. Wie sieht die `tasks.json` aus?
* **Lösung:** 
   ```json
   [
     {
       "label": "Run Code Coverage",
       "command": "cargo tarpaulin",
       "use_new_terminal": true
     }
   ]
   ```

#### Übung 47: Performance-Tuning für Zed
* **Aufgabe:** Auf älteren Laptops kann die GPU-Beschleunigung Akku fressen. Wie schaltest du Zed in einen batteriesparenderen Modus?
* **Lösung:** In der `settings.json` kannst du `"low_performance_mode": true` einstellen, um die GPU-Belastung zu reduzieren.

#### Übung 48: Eigene Keybindings für Inline Assist
* **Aufgabe:** Du möchtest Inline Assist auf eine andere Tastenkombination legen, da `Ctrl+Enter` bereits belegt ist.
* **Lösung:** Trage in deiner `keymap.json` ein:
   ```json
   [
     {
       "context": "Editor",
       "bindings": {
         "ctrl-alt-a": "assistant:inline_assist"
       }
     }
   ]
   ```

#### Übung 49: Dateispezifische Settings
* **Aufgabe:** Du möchtest, dass in Rust-Dateien Tabulatoren als 4 Leerzeichen eingefügt werden, in JSON-Dateien aber als 2 Leerzeichen.
* **Lösung:** Nutze sprachspezifische Blöcke in deiner `settings.json`:
   ```json
   {
     "languages": {
       "Rust": {
         "tab_size": 4
       },
       "JSON": {
         "tab_size": 2
       }
     }
   }
   ```

#### Übung 50: Workspace-Level Einstellungen
* **Aufgabe:** Du möchtest bestimmte Editor-Einstellungen nur für ein einziges Projekt festlegen (nicht global).
* **Lösung:** Erstelle im Projektordner die Datei `.zed/settings.json`. Alle darin definierten Werte überschreiben die globalen Einstellungen ausschließlich für dieses Projekt.

---

## 💡 Zusammenfassung

| Begriff | Erklärung |
|---|---|
| **GPUI** | Zeds eigenes, GPU-beschleunigtes UI-Framework für maximale Geschwindigkeit. |
| **Assistant Panel** | Das KI-Chatfenster auf der rechten Seite (`Ctrl+Shift+I` / `Cmd+Shift+I`). |
| **Inline Assist** | KI-Generierung direkt im Editorpuffer (`Ctrl+Enter` / `Cmd+Enter`). |
| **rust-analyzer** | Der Sprachserver, der Zed mit Rust-Intelligenz (Typen, Fehler, Auto-Vervollständigung) versorgt. |
| **Slash-Befehle** | Befehle im Chat (z. B. `/file`, `/terminal`), um gezielt Kontext an die KI zu übergeben. |
| **Multi-Buffer** | Eine Ansicht, die Suchergebnisse aus mehreren Dateien in einem einzigen Puffer editierbar macht. |
| **settings.json** | Die zentrale Konfigurationsdatei von Zed für Themes, Fonts und Verhalten. |

---

## 📚 Weiterführende Links

- [Offizielle Zed-Website](https://zed.dev) – Download und Dokumentation.
- [Zed GitHub Repository](https://github.com/zed-industries/zed) – Der Quellcode des Editors.
- [rust-analyzer Dokumentation](https://rust-analyzer.github.io) – Hintergrundwissen zum Rust-Sprachserver.
- [Ollama Website](https://ollama.com) – Für die Nutzung lokaler KI-Modelle in Zed.

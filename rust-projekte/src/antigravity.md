# 🤖 Bonus-Lektion: KI als Lernpartner – Antigravity verstehen & nutzen

Diese Lektion ist **kein Rust-Thema** – sie ist etwas anderes:  
Du lernst, wie dein KI-Assistent (Antigravity) funktioniert, wo er lebt und wie du ihn so einsetzen kannst, dass **auch er mitlernt** – durch dein Projekt.

> **Hinweis:** Diese Lektion enthält Theorie und praktische Aufgaben für dich als Lernenden – und gibt dem Agenten gleichzeitig Regeln, wie er sich in diesem Projekt verhalten soll.

---

## 🧠 Theorie: Was ist Antigravity?

Antigravity ist eine **KI-Entwicklungsplattform von Google**. Sie stellt dir einen intelligenten Agenten zur Seite, der Dateien lesen und schreiben, Terminal-Befehle ausführen und sogar im Web suchen kann.

Es gibt **drei Oberflächen**, zwischen denen du wählen kannst:

---

### 1. 🖥️ Antigravity CLI (`agy`)

Die **Kommandozeilen-Oberfläche** – minimalistisch, schnell, direkt im Terminal.

| Was du tust | Was passiert |
|---|---|
| `agy` im Terminal eintippen | Der Agent startet |
| Eine Frage stellen | Der Agent antwortet direkt |
| `/skills` eintippen | Zeigt aktive Fähigkeiten des Agenten |
| `/diff` eintippen | Zeigt alle Änderungen, die der Agent gemacht hat |
| `/model` eintippen | Wechselt das KI-Modell |
| `Ctrl+D` zweimal drücken | Beendet die Session |

**Typische Slash-Befehle im CLI:**

```
/help        → Zeigt alle Befehle
/context     → Was sieht der Agent gerade?
/clear       → Neue Unterhaltung starten
/rewind      → Letzten Schritt rückgängig machen
/fork        → Unterhaltung in neuem Thread fortsetzen
/permissions → Berechtigungen verwalten
/usage       → Token-Verbrauch anzeigen
```

**Konfiguration:** Die Einstellungen findest du in `~/.gemini/antigravity-cli/settings.json`.  
Wichtige Einstellungen:
- `model` – welches KI-Modell genutzt wird
- `toolPermission` – ob der Agent Befehle automatisch ausführen darf
- `verbosity` – wie ausführlich der Agent antwortet (`high` oder `low`)

---

### 2. 🖼️ Antigravity 2.0 (Desktop-App)

Die **Desktop-Anwendung** – eine eigenständige Electron-App, die parallel zu deinem Editor läuft.

**Was die App kann:**
- Mehrere **Projekte/Workspaces** verwalten
- **Geplante Aufgaben** anlegen (z. B. täglich eine Aufgabe ausführen)
- **Skills & Regeln** verwalten (genau wie `AGENTS.md` und `skills/`-Ordner)
- Chat-Verlauf speichern und weiterführen
- Dateien per Drag-and-Drop an den Agenten schicken

**Im Chat kannst du:**
- `/` eintippen → spezielle Befehle aufrufen
- `@` eintippen → Dateien, Ordner oder frühere Gespräche als Kontext anhängen
- Bilder und Dateien direkt einfügen

**Berechtigungen** lassen sich pro Projekt einstellen:
- Darf der Agent Dateien außerhalb des Projekts lesen?
- Darf er Terminalbefehle automatisch ausführen?
- Darf er ins Internet?

---

### 3. 💻 Antigravity IDE

Die **integrierte Entwicklungsumgebung** – gebaut auf VS Code, aber KI-first.

Es gibt **drei Modi**, wie du mit der KI interagierst:

#### A. Automatisch: Tab-Vervollständigung
- Der Agent schlägt dir Code vor, während du tippst
- `Tab` → Vorschlag annehmen
- `Esc` → Vorschlag ablehnen

#### B. Gezielte Bearbeitung: `Ctrl+I`
- Code markieren → `Ctrl+I` drücken → Anweisung geben
- Perfekt für: „Füge einen Kommentar hinzu" oder „Erkläre diesen Code"

#### C. Vollständiger Agent: Sidebar-Chat
- Der mächtigste Modus
- Kann Dateien lesen/schreiben, Terminal-Befehle ausführen, im Web suchen
- Unterstützt **Planungsmodus** – der Agent erklärt erst, was er tun will, bevor er es tut

**Besonderheiten im Editor:**
- **Code Lenses**: Kleine Buttons direkt über Funktionen → „Erklären", „Testen", „Refaktorieren"
- **Diff-Anzeige**: Rot/Grün direkt im Editor, was der Agent ändern will
- **Auto-Fix**: Fehlermeldungen im Editor direkt vom Agenten beheben lassen

---

## 📁 Wie lernt der Agent mit? – Die `AGENTS.md`

Das Wichtigste für dieses Projekt: **Der Agent liest `AGENTS.md`-Dateien automatisch.**

Das bedeutet: Was du dort hineinschreibst, beeinflusst direkt, wie sich der Agent verhält.

```
Anfaenger/
├── AGENTS.md              ← Globale Projektregeln (diese Datei)
├── .agents/
│   └── AGENTS.md          ← Workspace-Regeln für den Agenten
└── rust-projekte/
    └── src/
        └── antigravity.md ← Diese Lektion (du liest sie gerade)
```

### Was kann in `AGENTS.md` stehen?

- **Wie soll der Agent antworten?** (Sprache, Ton, Länge)
- **Was darf der Agent nicht?** (z. B. keine fertigen Code-Vorschläge)
- **Welche Projektstruktur gibt es?** (damit der Agent Dateien findet)
- **In welcher Phase ist das Lernbuch?** (damit der Agent passende Hilfe gibt)

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Erkunde die CLI

Öffne ein Terminal und probiere aus:

```bash
agy
```

Stelle dem Agenten eine Frage zu Rust, zum Beispiel:  
*„Was ist der Unterschied zwischen String und &str in Rust?"*

Tippe dann:
```
/context
```

→ Siehst du, welche Dateien der Agent gerade „sieht"?

---

### Aufgabe B: Schreibe deine erste eigene Regel

Öffne die Datei `.agents/AGENTS.md` in diesem Projekt und füge eine neue Regel hinzu, zum Beispiel:

```
- Erkläre mir immer zuerst das Konzept, bevor du auf Code eingehst.
```

Teste danach, ob der Agent diese Regel befolgt.

---

### Aufgabe C: Vergleiche die drei Oberflächen

Probiere alle drei Oberflächen aus (wenn möglich) und notiere:

| Oberfläche | Vorteil | Nachteil |
|---|---|---|
| CLI (`agy`) | | |
| Antigravity 2.0 | | |
| Antigravity IDE | | |

---

### Aufgabe D: Erweitere die `AGENTS.md`

Füge in der `AGENTS.md` im Projekt-Root eine neue Lernphase ein.  
Zum Beispiel: **Phase 5 – KI als Werkzeug im Entwicklungsalltag**

Beschreibe, was der Agent in dieser Phase beachten soll.

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| `agy` CLI | Terminal-Oberfläche für schnelle Interaktion |
| Antigravity 2.0 | Desktop-App für Projektverwaltung & geplante Tasks |
| Antigravity IDE | VS-Code-basierte IDE mit KI-Integration |
| `AGENTS.md` | Regeldatei – der Agent liest sie automatisch |
| Skills | Zusätzliche Fähigkeiten, die der Agent laden kann |
| Slash-Befehle `/` | Spezielle Befehle im Chat oder CLI |
| `@`-Mentions | Kontext direkt an den Agenten schicken |

> 🦀 **Merke:** Der Agent ist dein Lernpartner – aber du entscheidest, wie er sich verhält. Je besser deine `AGENTS.md`, desto hilfreicher wird er!

---

## 📚 Weiterführende Links

- [Antigravity Dokumentation](https://antigravity.google/docs)
- [Skills erstellen](https://antigravity.google/docs/skills)
- [Regeln & AGENTS.md](https://antigravity.google/docs/rules)
- [MCP – Model Context Protocol](https://antigravity.google/docs/mcp)
- [Changelog & Neuigkeiten](https://antigravity.google/changelog)

# 🛠️ System-Setup für das Lernprojekt

Dieses Dokument beschreibt die vollständige Einrichtung der Entwicklungsumgebung, inklusive des mdBook-Systems und der Lernkartei Anki.

> [!TIP]
> **Schnellstart-Tipp (Vollautomatisch):**
> Es wurde ein automatisches Setup-Skript namens `setup.sh` erstellt, das alle unten beschriebenen Schritte (mdBook und Anki) vollautomatisch für dich ausführt.
> Du kannst es direkt im Hauptverzeichnis über das Terminal starten mit:
> ```bash
> chmod +x setup.sh && ./setup.sh
> ```

---

## 📚 Teil 1: mdBook installieren

`mdBook` ist das Tool, mit dem dieses Rust-Buch generiert wird. Es liest die Markdown-Dateien im Ordner `src/` und erstellt daraus eine interaktive Webseite.

### 💻 Installationsschritte

Es gibt zwei Möglichkeiten, `mdBook` auf Ubuntu zu installieren:

#### Option A: Über Cargo (Empfohlen für Rust-Entwickler)
Da du Rust bereits installiert hast, kannst du `mdBook` ganz einfach über den Paketmanager Cargo kompilieren und installieren:
```bash
cargo install mdbook
```
*Hinweis: Dies kann einige Minuten dauern, da der Quellcode heruntergeladen und auf deinem System kompiliert wird.*

#### Option B: Über vorkompiliertes Binärpaket (Sehr schnell)
Wenn du nicht warten möchtest, kannst du die fertige ausführbare Datei direkt von GitHub herunterladen:
```bash
# Neueste Version herunterladen (z. B. v0.4.40)
wget https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz

# Entpacken
tar -zxvf mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz

# In den Systempfad verschieben
sudo mv mdbook /usr/local/bin/

# Temporäre Datei löschen
rm mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
```

### 🔍 Installation überprüfen
Teste, ob `mdBook` erfolgreich installiert wurde:
```bash
mdbook --version
```

### 🚀 Das Buch lokal starten
Um das Buch zu bauen und lokal im Browser zu betrachten:
```bash
cd rust-projekte
mdbook serve --open
```
Das Buch öffnet sich automatisch unter `http://localhost:3000`.

---

## 📇 Teil 3: Anki installieren (Lernkartei-System)

Anki ist ein kostenloses Karteikarten-Programm, das auf dem Prinzip der Spaced Repetition (abgestufte Wiederholung) basiert. Es hilft dir dabei, Vokabeln, Programmierkonzepte oder Syntax-Details langfristig im Gedächtnis zu behalten.

### 💻 Installationsschritte auf Ubuntu

Es gibt zwei einfache Wege, Anki unter Ubuntu zu installieren:

#### Option A: Über Flatpak (Empfohlen für die neueste Version)
Flatpak liefert immer die aktuellste Version von Anki inklusive aller benötigten Abhängigkeiten.

1. Installiere Flatpak und füge das Flathub-Repository hinzu:
   ```bash
   sudo apt update
   sudo apt install -y flatpak
   sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
   ```
2. Installiere Anki:
   ```bash
   flatpak install flathub net.ankiweb.Anki -y
   ```
3. Starte Anki über dein Anwendungsmenü oder das Terminal:
   ```bash
   flatpak run net.ankiweb.Anki &
   ```

#### Option B: Über die Ubuntu-Paketquellen (Schnell, aber oft ältere Version)
Dies ist der direkteste Weg über das Standard-System, allerdings sind die Versionen in den Paketquellen meist älter.

1. Installiere Anki mit apt:
   ```bash
   sudo apt update
   sudo apt install -y anki
   ```
2. Starte Anki über dein Anwendungsmenü oder durch Eingabe von `anki` im Terminal.

---

### 📂 Rust-Lernkarten importieren (Optional)

Wenn im Projektverzeichnis eine Datei namens `rust_anki_karten.csv` existiert, kannst du diese direkt in Anki importieren:

1. Öffne **Anki**.
2. Klicke unten auf **Datei importieren** (Import File).
3. Wähle die Datei `rust_anki_karten.csv` aus.
4. Stelle sicher, dass das Trennzeichen auf **Komma** eingestellt ist, und importiere die Karten in einen neuen Stapel (z. B. "Rust-Grundlagen").
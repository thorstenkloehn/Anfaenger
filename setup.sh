#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "===================================================="
echo "🚀 Starte das automatische System-Setup..."
echo "===================================================="

# Helper function to print headers
print_step() {
    echo -e "\n\n🟢 STEP: $1"
    echo "----------------------------------------------------"
}

# Ask for sudo at the beginning
echo "Dieses Skript benötigt Root-Rechte für die Installation von Paketen (Apt)."
sudo -v

# Keep sudo alive
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# ==========================================
# STEP 1: mdBook installieren
# ==========================================
print_step "mdBook installieren"

if command -v mdbook &>/dev/null; then
    echo "mdBook ist bereits installiert: $(mdbook --version)"
else
    echo "Lade vorkompiliertes mdBook-Binärpaket (v0.4.40) herunter..."
    wget -q --show-progress https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "Entpacke mdBook..."
    tar -zxvf mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "Verschiebe mdBook nach /usr/local/bin/..."
    sudo mv mdbook /usr/local/bin/
    
    echo "Bereinige temporäre Dateien..."
    rm mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "mdBook erfolgreich installiert: $(mdbook --version)"
fi

# ==========================================
# STEP 2: System-Hilfsprogramme installieren
# ==========================================
print_step "System-Hilfsprogramme installieren"

echo "Aktualisiere Paketquellen..."
sudo apt update -y

echo "Installiere Hilfsprogramme..."
sudo apt install -y unzip wget

# ==========================================
# STEP 3: Anki installieren (Offizielle Version)
# ==========================================
print_step "Anki installieren"

if command -v anki &>/dev/null; then
    echo "Anki ist bereits installiert."
else
    echo "Installiere Abhängigkeiten für Anki und Entpackung (zstd)..."
    sudo apt install -y libxcb-xinerama0 libxcb-cursor0 libnss3 libxcb-icccm4 libxcb-keysyms1 zstd

    echo "Erstelle download-Verzeichnis..."
    mkdir -p download
    cd download

    echo "Lade Anki 26.05 herunter..."
    wget -q --show-progress https://github.com/ankitects/anki/releases/download/26.05/anki-26.05-linux-x86_64.tar.zst

    echo "Entpacke Anki..."
    tar -xaf anki-26.05-linux-x86_64.tar.zst

    echo "Betrete anki-linux Ordner..."
    cd anki-linux

    echo "Führe Anki-Installationsskript aus..."
    sudo ./install.sh

    echo "Bereinige download-Verzeichnis..."
    cd ../..
    rm -rf download

    echo "Anki wurde erfolgreich installiert."
fi

# ==========================================
# STEP 4: Abschluss
# ==========================================
print_step "Setup abgeschlossen!"

echo -e "\n===================================================="
echo "🎯 Alles erledigt!"
echo "- mdBook ist einsatzbereit ('mdbook serve' im Ordner 'rust-projekte')."
echo "- Anki wurde erfolgreich installiert."
echo "  Starte Anki über dein Anwendungsmenü oder im Terminal mit:"
echo "  anki &"
echo "===================================================="

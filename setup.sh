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
echo "Dieses Skript benötigt Root-Rechte für die Installation von Paketen (Apt, Flatpak)."
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
# STEP 3: Flatpak & Anki installieren
# ==========================================
print_step "Flatpak & Anki installieren"

if command -v flatpak &>/dev/null; then
    echo "Flatpak ist bereits installiert."
else
    echo "Installiere Flatpak..."
    sudo apt install -y flatpak
fi

echo "Füge Flathub-Repository hinzu..."
sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

echo "Installiere Anki über Flatpak (kann einen Moment dauern)..."
sudo flatpak install flathub net.ankiweb.Anki -y

# ==========================================
# STEP 4: Abschluss
# ==========================================
print_step "Setup abgeschlossen!"

echo -e "\n===================================================="
echo "🎯 Alles erledigt!"
echo "- mdBook ist einsatzbereit ('mdbook serve' im Ordner 'rust-projekte')."
echo "- Anki wurde über Flatpak installiert."
echo "  Starte Anki über dein Anwendungsmenü oder mit:"
echo "  flatpak run net.ankiweb.Anki &"
echo "===================================================="

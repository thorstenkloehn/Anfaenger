# 🐚 Bash-Skripte – Grundlagen & Theorie

Dieses Kapitel führt dich durch die wichtigsten Grundlagen des Bash-Scriptings. Da du dir explizit praxisbezogene Beispiele gewünscht hast, um es besser zu verstehen, findest du hier kurze Code-Schnipsel! Denk daran: Diese Beispiele zeigen dir, *wie* die Syntax funktioniert. Die großen Projekte baust du dann selbst auf Basis dieses Wissens.

## 🧠 Theorie: Alle wichtigen Bash-Themen

### 1. Das Shebang (`#!/bin/bash`)
Jedes Bash-Skript beginnt mit dem sogenannten Shebang in der ersten Zeile. Es sagt dem System, welches Programm das Skript ausführen soll.

```bash
#!/bin/bash
# Das ist ein Kommentar. Er wird vom Computer ignoriert.
echo "Hallo Welt!"
```

### 2. Variablen
Variablen speichern Daten wie Zahlen oder Text. In Bash ist es extrem wichtig: Es gibt **keine Leerzeichen** vor oder nach dem Gleichheitszeichen!

```bash
#!/bin/bash
NAME="Thorsten"
echo "Hallo $NAME! Willkommen beim Bash-Scripting."
```

### 3. Benutzereingaben lesen (`read`)
Du kannst interaktiv Daten vom Benutzer abfragen, während das Skript läuft.

```bash
#!/bin/bash
echo "Wie lautet dein Lieblingsprojekt?"
read PROJEKT
echo "Ah, $PROJEKT klingt super!"
```

### 4. Bedingungen (`if`, `elif`, `else`)
Bedingungen erlauben es dem Skript, Entscheidungen zu treffen. Zum Beispiel: Überprüfen, ob eine Datei existiert oder ob ein Passwort richtig ist. Achtung: Die Leerzeichen innerhalb der eckigen Klammern `[ ]` sind zwingend erforderlich!

```bash
#!/bin/bash
DATEI="test.txt"

if [ -f "$DATEI" ]; then
    echo "Die Datei $DATEI existiert."
else
    echo "Datei $DATEI wurde nicht gefunden."
fi
```

### 5. Schleifen (`for` und `while`)
Mit Schleifen kannst du bestimmte Aufgaben wiederholen. Das spart viel Tipparbeit.

**Eine `for`-Schleife (z. B. um für alle Dateien in einem Ordner etwas zu tun):**
```bash
#!/bin/bash
for FILE in *.md; do
    echo "Markdown-Datei gefunden: $FILE"
done
```

**Eine `while`-Schleife (z. B. um hochzuzählen):**
```bash
#!/bin/bash
ZAEHLER=1
while [ $ZAEHLER -le 5 ]; do
    echo "Durchlauf Nummer $ZAEHLER"
    ((ZAEHLER++))
done
```

### 6. Parameter und Argumente (`$1`, `$2`)
Wenn du ein Skript aufrufst (z. B. im Terminal mit `./script.sh hallo welt`), kannst du diese Wörter (Argumente) im Skript direkt verwenden. `$1` ist das erste Wort, `$2` das zweite.

```bash
#!/bin/bash
echo "Das erste Argument ist: $1"
echo "Das zweite Argument ist: $2"
echo "Alle Argumente zusammen: $@"
```

### 7. Funktionen
Funktionen helfen dir, Codeblöcke wiederverwendbar zu machen, damit dein Skript ordentlich bleibt.

```bash
#!/bin/bash
begruessung() {
    echo "Guten Tag, $1!"
}

begruessung "Thorsten"
begruessung "Linux-Fan"
```

---

## 🛠️ Praxis-Aufgaben (Probiere es selbst!)

Hier sind drei kleine Aufgaben, um das Gelernte zu testen. Versuche sie ohne fertige Lösung zu programmieren!

1. **Aufgabe A:** Schreibe ein Skript, das dich nach deinem Namen fragt. Prüfe dann mit `if`: Wenn der Name "Thorsten" ist, schreibe "Chef erkannt!". Bei allen anderen Namen schreibe "Hallo Gast!".
2. **Aufgabe B:** Schreibe eine `for`-Schleife, die von 1 bis 5 zählt und bei jeder Zahl ausgibt: "Ich lerne Bash Schritt 1", "Ich lerne Bash Schritt 2", usw.
3. **Aufgabe C:** Schreibe ein Skript, das ein Argument (Dateinamen) übergeben bekommt. Das Skript prüft, ob die Datei existiert (`-f`). Wenn nicht, erstellt es die Datei mit `touch`.

---

## 💡 Zusammenfassung

| Begriff | Erklärung |
|---------|-----------|
| `#!/bin/bash` | Shebang. Definiert den Interpreter (hier: Bash). |
| `$VARIABLE` | Liest den Wert einer Variablen aus. |
| `read VAR` | Wartet auf eine Eingabe des Nutzers und speichert sie in `VAR`. |
| `if [ ... ]` | Prüft eine Bedingung. |
| `for X in Y` | Führt eine Aktion für jedes Element in einer Liste oder einem Bereich aus. |
| `$1, $2` | Die Parameter, die beim Skript-Aufruf im Terminal mitgegeben wurden. |

---

## 📚 Weiterführende Links
- Nutze das Handbuch im Terminal: `man bash`
- Gehe jetzt zu den [Bash-Projektvorschlägen](./bash-projektvorschlaege.md) und wende dein neues Wissen in echten Projekten an!

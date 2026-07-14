# 6 Schleifen – Programmteile wiederholen

Bisher haben wir Programme geschrieben, die Zeile für Zeile von oben nach unten ausgeführt werden. Manchmal haben wir mit Verzweigungen (`if`-Anweisungen) einzelne Pfade übersprungen. Doch was machst du, wenn du eine Aktion mehrfach ausführen möchtest? 

Stell dir vor, du sollst ein Programm schreiben, das den Satz "Ich darf im Unterricht nicht stören" genau 100-mal auf dem Bildschirm ausgibt. Ohne Schleifen müsstest du den Befehl zur Textausgabe 100-mal kopieren und untereinander schreiben. Das ist nicht nur mühsam, sondern macht deinen Code auch unübersichtlich und schwer wartbar.

Hier kommen **Schleifen** (engl. *loops*) ins Spiel. Sie erlauben es dir, einen Codeblock so oft zu wiederholen, wie du möchtest, oder so lange, bis ein bestimmtes Ereignis eintritt. C bietet dafür drei verschiedene Schleifentypen, die wir in diesem Kapitel kennenlernen.

---

## 6.1 Die Zählschleife – for

Die `for`-Schleife wird meistens dann verwendet, wenn du bereits vor dem Start der Schleife genau weißt, wie oft der Codeblock wiederholt werden soll.

### Die Analogie: Rundenlaufen auf dem Sportplatz
Stell dir vor, du sollst im Sportunterricht genau 10 Runden laufen.
1. **Startvorbereitung (Initialisierung):** Du stellst dich an die Startlinie und setzt deinen Rundenzähler auf 0.
2. **Prüfung (Bedingung):** Vor jeder neuen Runde fragst du dich: "Habe ich schon 10 Runden geschafft?" Wenn nein, läufst du los.
3. **Aktion:** Du läufst eine Runde.
4. **Zählen (Aktualisierung):** Am Ende der Runde erhöhst du deinen Rundenzähler um 1.
5. Du wiederholst die Prüfung (Schritt 2), bis du die 10 Runden voll hast.

### Die Syntax in C
Das folgende Template zeigt dir, wie eine `for`-Schleife aufgebaut ist:

```c
for (Initialisierung; Bedingung; Aktualisierung) {
    // Dieser Codeblock wird wiederholt
}
```

* **Initialisierung:** Hier erstellst du eine Zählvariable und gibst ihr einen Startwert (z. B. `int i = 0;`).
* **Bedingung:** Solange diese Bedingung wahr (`true`) ist, wird die Schleife fortgesetzt (z. B. `i < 10;`).
* **Aktualisierung:** Nach jedem Schleifendurchlauf wird die Zählvariable verändert (z. B. erhöht mit `i++`).

> [!NOTE]
> Die Variable `i` (oft als Abkürzung für *Index* oder *Iterator* genutzt) ist standardmäßig nur innerhalb der `for`-Schleife gültig, wenn du sie im Schleifenkopf deklarierst. Man spricht hier vom Gültigkeitsbereich (Scope).

---

## 6.2 Die kopfgesteuerte while-Schleife

Manchmal weißt du vorher nicht, wie oft eine Schleife durchlaufen werden muss. Sie soll einfach so lange laufen, wie eine bestimmte Bedingung erfüllt ist. Die `while`-Schleife ist **kopfgesteuert**, das heißt: Die Bedingung wird **vor** jedem Durchlauf geprüft. Ist sie von Anfang an falsch, wird der Schleifeninhalt kein einziges Mal ausgeführt.

### Die Analogie: Der Regenschirm
Du möchtest spazieren gehen. Solange es regnet, bleibt dein Regenschirm aufgespannt.
1. **Prüfung:** Du schaust nach oben (Kopfprüfung). Regnet es?
2. **Aktion:** Wenn ja, spannst du den Schirm auf und gehst einen Schritt.
3. Du prüfst erneut. Sobald der Regen aufhört (Bedingung wird unwahr), klappst du den Schirm ein und gehst weiter. Wenn es beim ersten Blick nach oben gar nicht regnet, spannst du den Schirm erst gar nicht auf.

### Die Syntax in C
Das Grundgerüst sieht so aus:

```c
while (Bedingung) {
    // Dieser Codeblock wird ausgeführt, solange die Bedingung wahr ist
}
```

> [!WARNING]
> **Achtung vor der Endlosschleife!**
> Wenn die Bedingung einer `while`-Schleife immer wahr bleibt und sich innerhalb der Schleife niemals ändert, läuft dein Programm ewig weiter und reagiert nicht mehr. Sorge immer dafür, dass die Bedingung im Schleifenkörper irgendwann unwahr werden kann!

---

## 6.3 Die fußgesteuerte do-while-Schleife

Im Gegensatz zur `while`-Schleife ist die `do-while`-Schleife **fußgesteuert**. Das bedeutet, dass der Codeblock **zuerst einmal ausgeführt** wird und erst **danach** die Bedingung geprüft wird. Diese Schleife läuft also garantiert mindestens einmal!

### Die Analogie: Das Probieren eines Gerichts
Stell dir vor, du bekommst ein neues Gericht serviert. Du möchtest es probieren.
1. **Aktion:** Du nimmst *auf jeden Fall* zuerst einen Bissen.
2. **Prüfung:** Erst danach entscheidest du (Prüfung am Fuß), ob es dir schmeckt. Wenn ja, nimmst du den nächsten Bissen. Wenn nein, hörst du auf. Aber probiert hast du es mindestens einmal!

### Die Syntax in C
So baust du eine `do-while`-Schleife auf:

```c
do {
    // Dieser Codeblock wird mindestens einmal ausgeführt
} while (Bedingung);
```

> [!IMPORTANT]
> Vergiss nicht das **Semikolon `;`** ganz am Ende nach `while(Bedingung);`! Das ist ein beliebter Fehler, der zu Syntaxfehlern beim Compilieren führt.

---

## 6.4 Kontrolliertes Verlassen von Schleifen (break, continue)

Manchmal möchtest du das Verhalten einer Schleife vorzeitig beeinflussen, ohne auf das reguläre Ende der Bedingung zu warten. Dafür stellt dir C zwei mächtige Schlüsselwörter zur Verfügung.

### break – Die Reißleine
Mit `break` brichst du die gesamte Schleife sofort ab. Das Programm springt direkt zur ersten Anweisung *hinter* der Schleife.
* **Analogie:** Du läufst deine 10 Runden auf dem Sportplatz. Nach der 4. Runde knickst du um (Ereignis). Du brichst das Laufen sofort ab (`break`) und verlässt den Sportplatz.

### continue – Die Abkürzung
Mit `continue` überspringst du den restlichen Code des *aktuellen* Schleifendurchlaufs und springst direkt zur nächsten Überprüfung (bei `for` inklusive der Aktualisierung).
* **Analogie:** Du läufst deine Runden. Auf der 5. Runde liegt ein Hindernis auf der Laufbahn. Du springst nicht darüber, sondern nimmst eine Abkürzung direkt zum Start der nächsten Runde (`continue`). Du läufst also weiter, hast aber den Rest dieser speziellen Runde übersprungen.

---

## 6.5 Kontrollfragen und Aufgaben

Teste dein Wissen und versuche, die folgenden Fragen zu beantworten und die Aufgaben selbstständig in C umzusetzen.

### Kontrollfragen
1. Welcher Schleifentyp führt seinen Codeblock garantiert mindestens einmal aus?
2. Was passiert, wenn die Bedingung einer `while`-Schleife bereits beim ersten Aufruf unwahr (`false`) ist?
3. Welches Schlüsselwort beendet die gesamte Schleife vorzeitig, und welches springt nur zum nächsten Durchlauf?
4. Was ist eine Endlosschleife und wie kannst du sie unbeabsichtigt verursachen?

### Praktische Aufgaben
* **Aufgabe 1: Das Einmaleins (Zählschleife)**
  Erstelle ein Programm, das die 7er-Reihe (also 7, 14, 21, ... bis 70) ausgibt. Nutze dafür eine `for`-Schleife. Überlege, wie du den Schleifenkopf so gestaltest, dass deine Zählvariable als Multiplikator dient.

* **Aufgabe 2: Zahlen addieren (Kopfgesteuerte Schleife)**
  Schreibe ein Programm, das den Benutzer nacheinander Zahlen eingeben lässt. Das Programm soll diese Zahlen aufaddieren. Sobald der Benutzer die Zahl `0` eingibt, soll die Schleife enden und das Gesamtergebnis ausgegeben werden. Verwende hierfür eine `while`-Schleife.

* **Aufgabe 3: Menüauswahl (Fußgesteuerte Schleife)**
  Entwerfe ein Programm, das dem Benutzer ein einfaches Menü auf dem Bildschirm anzeigt (z. B. `1. Spiel starten`, `2. Optionen`, `3. Beenden`). Der Benutzer soll eine Zahl eingeben. Wenn er keine gültige Menünummer eingibt, soll das Menü erneut angezeigt werden. Da das Menü in jedem Fall mindestens einmal angezeigt werden muss, ist dies ein perfekter Fall für eine `do-while`-Schleife.

* **Aufgabe 4: Zahlen überspringen (break/continue)**
  Schreibe eine Schleife, die von 1 bis 20 zählt. 
  - Nutze ein Schlüsselwort, um die Zahl 13 bei der Ausgabe zu überspringen.
  - Nutze ein anderes Schlüsselwort, um die Schleife komplett abzubrechen, sobald die Zahl 17 erreicht wird.

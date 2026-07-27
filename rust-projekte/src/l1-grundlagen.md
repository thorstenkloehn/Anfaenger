# 🟢 L1 Grundlagen

In diesem Level lernst du die Bausteine, ohne die kein Rust-Programm auskommt. Jedes Projekt kombiniert mehrere Themen gleichzeitig, wie in einem echten Programm.

| Thema | Was du lernst |
|---|---|
| 🧱 Variablen, Datentypen, Kontrollfluss | Zahlen, Texte, Mutabilität, `if/else`, `loop`, `while`, `for` |
| ⌨️ Benutzereingabe & String-Parsing | Konsoleneingabe lesen, `parse()`, Fehler beim Parsen behandeln |
| 🧠 Ownership, Borrowing & Lifetimes-Basics | Wer besitzt was? Referenzen (`&`, `&mut`), einfache Lifetime-Annotationen |
| 🏗️ Structs, Enums, Methoden | Eigene Datentypen, `impl`-Blöcke, z. B. Events mit Severity Level |
| 🔀 Pattern Matching | `match` mit Exhaustiveness Checking, kompaktes `if let` |
| ❓ Error Handling | `Option<T>`, `Result<T, E>`, `?`-Operator |
| 📦 `Vec`, `HashMap`, `String` | Collections befüllen, durchsuchen, verändern |
| 📁 Modulsystem | `mod`, `pub`, `use`, Sichtbarkeit über Dateigrenzen hinweg |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📜 100+ Projektvorschläge

### 🎮 Spiele & Simulationen
1. 🎲 **Zahlenraten mit Statistik**
2. ✊ **Schere-Stein-Papier**
3. 🎯 **Würfelduell**
4. 🕹️ **Tic-Tac-Toe (Konsole)**
5. ❌⭕ **Vier-Gewinnt (Konsole)**
6. 🃏 **Kartenwert-Rechner (Black Jack)**
7. 🐍 **Text-Schlange (Positions-Tracker)**
8. 🏹 **Bogenschießen-Simulator**
9. 🐉 **Text-RPG-Kampf**
10. 🎰 **Einarmiger Bandit**
11. 🧩 **Zahlen-Sudoku-Prüfer (Zeile)**
12. 🏁 **Rennspiel-Simulator (Text)**
13. 🎳 **Bowling-Punkte-Rechner**

### 📋 Verwaltungstools
14. 📇 **Kontaktverwaltung**
15. 📝 **To-Do-Liste**
16. 🍕 **Pizza-Bestellsystem**
17. 🚗 **Fahrzeug-Inventar**
18. 🐶 **Haustier-Simulator**
19. 📚 **Mini-Bibliothek**
20. ⚔️ **Rollenspiel-Charakter**
21. 🏦 **Erweitertes Bankkonto**
22. 🎓 **Notenverwaltung**
23. 🧾 **Rechnungsgenerator**
24. 🏠 **Immobilienverwaltung**
25. 🧑‍🍳 **Rezeptverwaltung**
26. 🚲 **Fuhrpark-Verwaltung**
27. 🎫 **Kino-Reservierung**
28. 🐾 **Tierheim-Verwaltung**
29. 👔 **Mitarbeiterverwaltung**
30. 🌱 **Pflanzenpflege-Tracker**

### 🔢 Rechner & Konverter
31. 🧮 **Taschenrechner (Grundrechenarten)**
32. 🌡️ **Temperatur-Umrechner**
33. 💱 **Währungsumrechner (feste Kurse)**
34. 📏 **Einheiten-Umrechner (Länge)**
35. 💰 **Zinsrechner (Zinseszins)**
36. 🏠 **Kredit-Tilgungsplan**
37. 🧾 **Trinkgeld-Rechner**
38. ⚖️ **BMI-Rechner**
39. 🔋 **Stromverbrauchsrechner**
40. 🌍 **CO2-Rechner (Reisen)**
41. 📐 **Geometrie-Rechner**
42. 🎂 **Alter-in-Tagen-Rechner**
43. 🛒 **Rabatt-Rechner**
44. ⏱️ **Pace-Rechner (Laufsport)**
45. 🧮 **Fakultät & Fibonacci**

### 📚 Text- & Wortspiele
46. 🔤 **Palindrom-Checker**
47. 🔀 **Anagramm-Finder**
48. 🔒 **Cäsar-Verschlüsselung**
49. 📡 **Morsecode-Übersetzer**
50. 🔁 **ROT13-Encoder**
51. 🪢 **Wort-Umkehrer**
52. 🎯 **Galgenmännchen (Konsole)**
53. 📊 **Textstatistik-Tool**
54. 🧵 **Zeilen-Umbrecher**
55. 🔍 **Wort-Häufigkeits-Zähler**
56. ✂️ **Text-Zensor**
57. 🧾 **Quittungs-Formatter**
58. 🗣️ **Silben-Zähler (einfach)**

### 🗂️ Datenspeicher mit HashMap & Vec
59. 📖 **Wörterbuch-Tool**
60. 🗳️ **Umfrage-Auswertung**
61. 🛍️ **Einkaufsliste mit Mengen**
62. 📦 **Lagerbestand-Tracker**
63. 🎵 **Playlist-Verwaltung**
64. 🧳 **Reise-Packliste**
65. 🏆 **Highscore-Liste**
66. 📅 **Terminplaner (Tagesliste)**
67. 🧑‍🤝‍🧑 **Namens-Zufallsgenerator**
68. 🗳️ **Wahlrechner (Sitzverteilung, vereinfacht)**
69. 📮 **Postleitzahlen-Lookup**
70. 🔑 **Passwort-Tresor (Klartext-Demo)**

### ❓ Fehlerbehandlung im Fokus (Option/Result)
71. 🧮 **Sicherer Taschenrechner**
72. 📥 **Robuster Zahlen-Parser**
73. 🔍 **Sichere Array-Suche**
74. 🧾 **Config-Werte-Lookup**
75. 🎟️ **Ticket-Validierung**
76. 🧯 **Sicherer Datei-Zeilen-Zähler (simuliert)**
77. 🧮 **Verschachtelte Berechnung mit `?`**
78. 🔢 **Bereichsprüfung mit `Result`**

### 🧠 Ownership & Borrowing im Fokus
79. 🎒 **Inventarsystem**
80. 📋 **Aufgaben-Kopierer vs. Verschieber**
81. 🧺 **Wäschekorb-Sortierer**
82. 🧠 **Größter-Wert-Finder (per Referenz)**
83. 🔗 **Verkettete Namensliste**
84. 🧮 **Statistik ohne Kopie**

### 📁 Modulsystem im Fokus
85. 📁 **Modulares Adressbuch**
86. 🧮 **Rechenmodul-Bibliothek**
87. 🏪 **Modularer Kassenautomat**
88. 🗂️ **Mehrdatei-Bibliotheksverwaltung**
89. 🎮 **Modulares Text-Adventure**
90. 🧾 **Rechnungssystem mit Modulen**

### 🔀 Pattern Matching im Fokus
91. 🌦️ **Wetterstation**
92. 🚦 **Ampelsteuerung (Simulation)**
93. 🎭 **Stimmungs-Simulator**
94. 🃏 **Kartenfarbe-Auswerter**
95. 🧭 **Richtungs-Navigator**
96. 🏅 **Medaillen-Vergabe**

### 🎲 Variablen & Kontrollfluss im Fokus
97. 🔢 **Primzahlen-Sieb (einfach)**
98. 🎯 **FizzBuzz Deluxe**
99. 🌡️ **Temperatur-Logger (Tagesverlauf)**
100. 🧱 **Pyramiden-Zeichner (ASCII)**
101. 🔁 **Collatz-Folge-Rechner**
102. 🧊 **Eiswürfel-Schmelz-Simulator**

### 💼 Praxisnahe Business- & Firmenprojekte
103. 🧾 **Spesenabrechnung-Tool**
104. 📋 **Onboarding-Checkliste**
105. 🕒 **Zeiterfassungs-Tool**
106. 📞 **Support-Ticket-Logger**
107. 📅 **Meetingraum-Buchungssystem**
108. 📦 **Lagerbestands-Zähler (Wareneingang)**
109. 🧑‍💼 **Personalakte-Verwaltung**
110. 🚚 **Lieferschein-Verwaltung**
111. 🏢 **Büromaterial-Bestellliste**
112. 🚗 **Firmenwagen-Buchungssystem**
113. 📊 **Urlaubsantrag-Tracker**
114. 🎫 **Helpdesk-Prioritäten-Queue**
115. 🧑‍🤝‍🧑 **Kundenanfragen-Verwaltung**
116. 📬 **Interne Ankündigungs-Verteilerliste**
117. 🅿️ **Parkplatz-Vergabesystem**
118. 🧑‍🍳 **Kantinen-Bestellsystem**
119. 🧾 **Reisekostenabrechnung**
120. 📋 **Schichtplan-Verwaltung**

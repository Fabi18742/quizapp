# 📚 Quiz-Webanwendung

Eine vollständige Quiz-Anwendung mit HTML, CSS und Vanilla JavaScript, die es Benutzern ermöglicht, eigene Quizzes zu erstellen, zu bearbeiten, zu löschen und zu spielen.

## 🎯 Funktionen

- ✅ Quizzes erstellen mit drei verschiedenen Typen
- ✅ Quizzes bearbeiten und aktualisieren
- ✅ Quizzes löschen (mit Bestätigung)
- ✅ Quizzes spielen mit Ergebnisanzeige
- ✅ Dauerhafte Speicherung im Browser (localStorage)
- ✅ Responsive Design für Desktop und Mobile
- ✅ Vollständig auf Deutsch

## 📁 Projektstruktur

```
QuizApp/
├── index.html              # Hauptseite - Übersicht aller Quizzes
├── README.md              # Diese Datei
│
├── css/                   # Stylesheets
│   └── styles.css         # Komplettes CSS für alle Seiten
│
├── js/                    # JavaScript-Dateien
│   ├── storage.js         # LocalStorage-Verwaltung
│   ├── index.js           # Logik für Übersichtsseite
│   ├── create.js          # Logik für Quiz-Erstellung/-Bearbeitung
│   └── play.js            # Logik für Quiz-Spiel
│
└── pages/                 # Weitere HTML-Seiten
    ├── create.html        # Quiz erstellen/bearbeiten
    └── play.html          # Quiz spielen
```

## 🎮 Quiz-Typen

### 1. Single-Choice
- Eine richtige Antwort pro Frage
- Benutzer wählt eine Option aus

### 2. Multiple-Choice
- Mehrere richtige Antworten möglich
- Benutzer kann mehrere Optionen auswählen

### 3. Wahr / Falsch
- Zwei feste Antwortmöglichkeiten
- Einfach und schnell

## 🚀 Verwendung

### Quiz erstellen
1. Öffne `index.html` im Browser
2. Klicke auf "➕ Neues Quiz erstellen"
3. Gib einen Quiz-Titel ein
4. Wähle den Quiz-Typ
5. Füge Fragen mit Antworten hinzu
6. Markiere die richtigen Antworten
7. Klicke auf "💾 Quiz speichern"

### Quiz spielen
1. Wähle ein Quiz aus der Übersicht
2. Klicke auf "▶️ Quiz starten"
3. Beantworte alle Fragen nacheinander
4. Sieh dein Ergebnis am Ende

### Quiz bearbeiten
1. Klicke auf "✏️ Bearbeiten" bei einem Quiz
2. Ändere Titel, Fragen oder Antworten
3. Speichere die Änderungen

### Quiz löschen
1. Klicke auf "🗑️ Löschen" bei einem Quiz
2. Bestätige das Löschen

## 💾 Datenspeicherung

- Alle Quizzes werden im **localStorage** des Browsers gespeichert
- Daten bleiben auch nach dem Schließen des Browsers erhalten
- Keine Serververbindung erforderlich
- Daten sind nur auf diesem Gerät verfügbar

## 🎨 Design

Das Design der App ist bewusst **kantig und bold** gestaltet:

### Design-Merkmale
- **Farbschema:** Korallenrot (#FF6B6B), Türkis (#4ECDC4), Gelb (#FFE66D)
- **Hintergrund:** Farbige, schräge Blöcke ohne Gradienten
- **Buttons:** 3D-Effekte mit box-shadow und translateX-Animation
- **Typography:** Bold (800), Uppercase, negative letter-spacing
- **Formen:** Kantige Borders (6px radius), seitliche 5px Borders
- **Icons:** Text-basiert (×, +, ←, →, ✓) statt Emojis

### Technische Umsetzung
- CSS Custom Properties für einheitliches Theming
- Skew-Transform für dynamische Hintergrund-Blöcke
- Transition-Effekte für interaktive Elemente
- Mobile-First Responsive Design

## 🔧 Technologien

- **HTML5** - Struktur
- **CSS3** - Styling mit Flexbox/Grid
- **Vanilla JavaScript** - Logik ohne Frameworks
- **localStorage API** - Datenspeicherung

## 📱 Browser-Kompatibilität

Die Anwendung funktioniert in allen modernen Browsern:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 🔒 Sicherheit

- XSS-Schutz durch HTML-Escaping
- Validierung aller Eingaben
- Keine externen Abhängigkeiten

## 📝 Datenstruktur

### Quiz-Objekt
```javascript
{
    id: "unique_id",
    title: "Quiz-Titel",
    type: "single-choice" | "multiple-choice" | "true-false",
    questions: [...],
    createdAt: "2026-01-12T...",
    updatedAt: "2026-01-12T..."
}
```

### Frage-Objekt
```javascript
{
    text: "Fragetext",
    answers: ["Antwort 1", "Antwort 2", ...],
    correctAnswers: [0, 2] // Indizes der richtigen Antworten
}
```

## 🎓 Lernziele

Dieses Projekt demonstriert:
- ✅ DOM-Manipulation
- ✅ Event-Handling
- ✅ localStorage-Nutzung
- ✅ Dynamische Formulare
- ✅ URL-Parameter
- ✅ Saubere Code-Struktur
- ✅ Responsive Design

## 🚧 Mögliche Erweiterungen

- Export/Import von Quizzes (JSON)
- Quiz-Kategorien
- Zeitlimit pro Frage
- Highscore-Liste
- Bilder in Fragen
- Sound-Effekte
- Dark Mode

## 👨‍💻 Entwicklung

Das Projekt ist reines Frontend und benötigt keinen Build-Prozess. Einfach `index.html` im Browser öffnen und loslegen!
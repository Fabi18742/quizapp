/**
 * Play-Seite: Quiz spielen
 * Ermöglicht das Durchspielen eines Quiz und zeigt am Ende das Ergebnis an
 */

// DOM-Elemente
const quizTitleElement = document.getElementById('quizTitle');
const progressFill = document.getElementById('progressFill');
const questionCounter = document.getElementById('questionCounter');
const questionContainer = document.getElementById('questionContainer');
const answersContainer = document.getElementById('answersContainer');
const nextBtn = document.getElementById('nextBtn');
const quizGame = document.getElementById('quizGame');
const resultScreen = document.getElementById('resultScreen');
const scoreDisplay = document.getElementById('scoreDisplay');
const percentageDisplay = document.getElementById('percentageDisplay');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

// Variablen
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// URL-Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

/**
 * Quiz initialisieren und starten
 */
function initializeQuiz() {
    if (!quizId) {
        alert('Kein Quiz ausgewählt!');
        window.location.href = '../index.html';
        return;
    }
    
    currentQuiz = loadQuizById(quizId);
    
    if (!currentQuiz) {
        alert('Quiz nicht gefunden!');
        window.location.href = '../index.html';
        return;
    }
    
    // Quiz-Titel anzeigen
    quizTitleElement.textContent = currentQuiz.title;
    
    // Erste Frage anzeigen
    showQuestion();
}

/**
 * Aktuelle Frage anzeigen
 */
function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    // Fortschrittsbalken aktualisieren
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Fragenzähler aktualisieren
    questionCounter.textContent = `Frage ${currentQuestionIndex + 1} von ${currentQuiz.questions.length}`;
    
    // Fragetext anzeigen
    questionContainer.innerHTML = `
        <h2 class="question-text">${escapeHtml(question.text)}</h2>
    `;
    
    // Antworten anzeigen
    displayAnswers(question);    // Button-Text anpassen
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        nextBtn.innerHTML = 'Ergebnis anzeigen <span class="btn-icon">→</span>';
    } else {
        nextBtn.innerHTML = 'Weiter <span class="btn-icon">→</span>';
    }
}

/**
 * Antworten basierend auf Quiz-Typ anzeigen
 * @param {Object} question - Das Fragen-Objekt
 */
function displayAnswers(question) {
    answersContainer.innerHTML = '';
    
    const inputType = currentQuiz.type === 'multiple-choice' ? 'checkbox' : 'radio';
    const inputName = 'current_answer';
    
    question.answers.forEach((answer, index) => {
        const answerId = `answer_${index}`;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.onclick = () => toggleAnswer(index, inputType);
        
        answerDiv.innerHTML = `
            <input type="${inputType}" 
                   id="${answerId}" 
                   name="${inputName}" 
                   value="${index}">
            <label for="${answerId}">${escapeHtml(answer)}</label>
        `;
        
        answersContainer.appendChild(answerDiv);
    });
}

/**
 * Antwort auswählen/abwählen
 * @param {number} answerIndex - Index der Antwort
 * @param {string} inputType - radio oder checkbox
 */
function toggleAnswer(answerIndex, inputType) {
    const answerOption = answersContainer.children[answerIndex];
    const input = answerOption.querySelector('input');
    
    if (inputType === 'radio') {
        // Bei Radio: Alle anderen abwählen
        const allOptions = answersContainer.querySelectorAll('.answer-option');
        allOptions.forEach(option => option.classList.remove('selected'));
        
        // Diese auswählen
        answerOption.classList.add('selected');
        input.checked = true;
    } else {
        // Bei Checkbox: Togglen
        if (input.checked) {
            answerOption.classList.remove('selected');
            input.checked = false;
        } else {
            answerOption.classList.add('selected');
            input.checked = true;
        }
    }
}

/**
 * Zur nächsten Frage oder zum Ergebnis
 */
function nextQuestion() {
    // Antwort sammeln
    const selectedAnswers = getSelectedAnswers();
    
    // Validierung: Mindestens eine Antwort muss ausgewählt sein
    if (selectedAnswers.length === 0) {
        alert('Bitte wähle mindestens eine Antwort aus!');
        return;
    }
    
    // Antwort speichern
    userAnswers[currentQuestionIndex] = selectedAnswers;
    
    // Zur nächsten Frage oder zum Ergebnis
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

/**
 * Ausgewählte Antworten ermitteln
 * @returns {Array} Array von ausgewählten Antwort-Indizes
 */
function getSelectedAnswers() {
    const selected = [];
    const inputs = answersContainer.querySelectorAll('input:checked');
    
    inputs.forEach(input => {
        selected.push(parseInt(input.value));
    });
    
    return selected;
}

/**
 * Ergebnis berechnen und anzeigen
 */
function showResult() {
    // Score berechnen
    score = 0;
    
    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || [];
        const correctAnswer = question.correctAnswers;
        
        // Antworten sortieren für Vergleich
        const userSorted = [...userAnswer].sort((a, b) => a - b);
        const correctSorted = [...correctAnswer].sort((a, b) => a - b);
        
        // Vergleichen
        if (JSON.stringify(userSorted) === JSON.stringify(correctSorted)) {
            score++;
        }
    });
    
    // Prozentsatz berechnen
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    
    // Ergebnis anzeigen
    quizGame.style.display = 'none';
    resultScreen.style.display = 'block';
    
    scoreDisplay.textContent = `${score}/${currentQuiz.questions.length}`;
    percentageDisplay.textContent = `${percentage}%`;    // Motivierende Nachricht basierend auf Prozentsatz
    let message = '';
    if (percentage === 100) {
        message = 'Perfekt! Du hast alle Fragen richtig beantwortet!';
    } else if (percentage >= 80) {
        message = 'Sehr gut! Fast alle Fragen richtig!';
    } else if (percentage >= 60) {
        message = 'Gut gemacht! Das war solide!';
    } else if (percentage >= 40) {
        message = 'Nicht schlecht! Mit etwas Übung wird es noch besser!';
    } else {
        message = 'Versuch es nochmal! Übung macht den Meister!';
    }
    
    resultMessage.textContent = message;
}

/**
 * Quiz neu starten
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    resultScreen.style.display = 'none';
    quizGame.style.display = 'block';
    
    showQuestion();
}

/**
 * HTML-Entities escapen
 * @param {string} text - Der zu escapende Text
 * @returns {string} Der escapte Text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Quiz initialisieren
initializeQuiz();

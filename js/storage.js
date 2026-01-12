/**
 * Storage Manager für Quiz-Daten
 * Verwaltet alle localStorage-Operationen
 */

const STORAGE_KEY = 'quizApp_quizzes';

/**
 * Alle Quizzes aus dem localStorage laden
 * @returns {Array} Array von Quiz-Objekten
 */
function loadQuizzes() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        console.log(data ? JSON.parse(data) : [])
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Fehler beim Laden der Quizzes:', error);
        return [];
    }
}

/**
 * Alle Quizzes im localStorage speichern
 * @param {Array} quizzes - Array von Quiz-Objekten
 */
function saveQuizzes(quizzes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
        return true;
    } catch (error) {
        console.error('Fehler beim Speichern der Quizzes:', error);
        alert('Fehler beim Speichern! Möglicherweise ist der Speicher voll.');
        return false;
    }
}

/**
 * Ein einzelnes Quiz anhand der ID laden
 * @param {string} quizId - Die ID des Quiz
 * @returns {Object|null} Das Quiz-Objekt oder null
 */
function loadQuizById(quizId) {
    const quizzes = loadQuizzes();
    return quizzes.find(quiz => quiz.id === quizId) || null;
}

/**
 * Ein neues Quiz erstellen und speichern
 * @param {Object} quizData - Die Quiz-Daten
 * @returns {string} Die ID des erstellten Quiz
 */
function createQuiz(quizData) {
    const quizzes = loadQuizzes();
    
    // Neue ID generieren
    const newQuiz = {
        id: generateId(),
        title: quizData.title,
        type: quizData.type,
        questions: quizData.questions,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    quizzes.push(newQuiz);
    saveQuizzes(quizzes);
    
    return newQuiz.id;
}

/**
 * Ein bestehendes Quiz aktualisieren
 * @param {string} quizId - Die ID des Quiz
 * @param {Object} quizData - Die aktualisierten Quiz-Daten
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
function updateQuiz(quizId, quizData) {
    const quizzes = loadQuizzes();
    const index = quizzes.findIndex(quiz => quiz.id === quizId);
    
    if (index === -1) {
        console.error('Quiz nicht gefunden:', quizId);
        return false;
    }
    
    // Quiz aktualisieren, ID und createdAt beibehalten
    quizzes[index] = {
        ...quizzes[index],
        title: quizData.title,
        type: quizData.type,
        questions: quizData.questions,
        updatedAt: new Date().toISOString()
    };
    
    return saveQuizzes(quizzes);
}

/**
 * Ein Quiz löschen
 * @param {string} quizId - Die ID des zu löschenden Quiz
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
function deleteQuiz(quizId) {
    const quizzes = loadQuizzes();
    const filteredQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    
    if (filteredQuizzes.length === quizzes.length) {
        console.error('Quiz nicht gefunden:', quizId);
        return false;
    }
    
    return saveQuizzes(filteredQuizzes);
}

/**
 * Eindeutige ID generieren
 * @returns {string} Eine eindeutige ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Quiz-Typ in lesbaren Text umwandeln
 * @param {string} type - Der Quiz-Typ
 * @returns {string} Lesbarer Quiz-Typ
 */
function getQuizTypeLabel(type) {
    const types = {
        'single-choice': 'Single-Choice',
        'multiple-choice': 'Multiple-Choice',
        'true-false': 'Wahr / Falsch'
    };
    return types[type] || type;
}

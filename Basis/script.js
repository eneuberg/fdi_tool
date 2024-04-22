// Definition von Variablen zur Verfolgung des Anwendungszustands
let risks = 0; // Anfangsrisiken
let opportunities = 0; // Anfangschancen

let currentQuestionIndex = 0; // Derzeitiger Index der Frage
let currentQuestions = []; // Array zur Speicherung der aktuellen Fragen

var actualWidth = 0;
// Klassen zur Modellierung der Datenstruktur
class Evaluation {
    constructor(evaluation) {
        this.evaluation = evaluation;
    }
}

class Indicator {
    constructor(indicator, comment, evaluation) {
        this.indicator = indicator;
        this.comment = comment;
        this.evaluation = new Evaluation(evaluation);
    }
}

class Subsector {
    constructor(name, indicators) {
        this.name = name;
        this.indicators = indicators;
    }
}

class Sector {
    constructor(name, subsectors) {
        this.name = name;
        this.subsectors = subsectors;
    }
}

// Ausführen von Code, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function () {

    // Funktion zum Abrufen von JSON-Daten und Integration in den Code
    fetch('../data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extrahieren der Sektoren aus den Daten
            const sectors = Object.keys(data.sectors);

            /**********++++++++++++++++++++++++++++++++++
             * Start Formualr
             */


            // HTML für das Sektorauswahlsformular (Start Menu)
            const sectorSelectionForm = `
            <form id="sectorForm">
                <select id="sectorSelect" name="sector">
                    <option value="">Select a Sector</option>
                        ${sectors.map(sector => `<option value="${sector}">${sector}</option>`).join('')}
                </select>
                    <button type="submit">Start</button>
            </form>
            `;

            // Rendern des Sektorauswahlsformulars
            document.getElementById('questionContainer').innerHTML = sectorSelectionForm;

            // Eventlistener für das Sektorauswahlsformular
            document.getElementById('sectorForm').addEventListener('submit', function (event) {
                event.preventDefault();
                const selectedSector = document.getElementById('sectorSelect').value;
                //Sector wurde ausgewählt
                if (selectedSector) {
                    renderQuestions(selectedSector); // Fragen zum Sektor werden angezeigbar gemacht
                    getNextQuestion(); // Sektorwird angezeigt
                } else {
                    alert('Please select a sector.');
                    // To Do: 
                    // --> Schönes Anzeigen Feld 

                }
            });

            /**********++++++++++++++++++++++++++++++++++
             * Questions
             */

            // Funktion zum Rendern von Fragen basierend auf dem ausgewählten Sektor
            function renderQuestions(selectedSector) {
                const sector = data.sectors[selectedSector];
                const subsectors = Object.keys(sector);

                // Leeren des aktuellen Fragenarrays
                currentQuestions = [];
                subsectors.forEach(subsector => {
                    const indicators = sector[subsector];
                    indicators.forEach(indicator => {
                        // Hinzufügen von HTML für jede Frage zum Fragenarray
                        currentQuestions.push(`
                        <div>
                            <p id="indicator">${indicator.indicator}</p>
                            <p id="comment">${indicator.comment}</p>
                            <p id="evaluation">${generateEvaluationInput(indicator.evaluation)}</p> 
                        </div>

                        <hr>
                    `);
                    });
                });
            }

            // Funktion zum Generieren von HTML für Bewertungseingaben basierend auf dem Bewertungstyp
            function generateEvaluationInput(evaluation) {
    
                switch (evaluation) {
                    case 'multicheckbox':
                    return `
                    <form>
                        <input type="checkbox" id="evaluation-checkbox" class="evaluation-checkbox">
                            <label for="evaluation-checkbox-1">Option 1</label><br>
                        <input type="checkbox" id="evaluation-checkbox" class="evaluation-checkbox">
                            <label for="evaluation-checkbox-2">Option 2</label><br>
                        <input type="checkbox" id="evaluation-checkbox" class="evaluation-checkbox">
                            <label for="evaluation-checkbox-3">Option 3</label><br>
                    </form>
                    `;
                    case 'range':
                        return `
                    <form>
                        <input type="text" id="evaluation-text" class="evaluation-text" name="evaluation" placeholder="Percentage">
                    </form>
                    `;
                    case 'checkbox':
                         `
                    <form>
                        <input type="radio" id="evaluation-yes" class="evaluation-radio" name="evaluation-choice" value="yes"> 
                            <label for="evaluation-yes">Yes</label><br>
                        <input type="radio" id="evaluation-no" class="evaluation-radio" name="evaluation-choice" value="no"> 
                            <label for="evaluation-no">No</label> 
                    </form>
                    `;
                    default:
                        return'';
                }
                 
            }


            // Funktion zum Rendern der aktuellen Frage
            function getNextQuestion() {
                //updateProgressBar();
                if (currentQuestionIndex < currentQuestions.length) {
                    document.getElementById('questionContainer').innerHTML = `
                        ${currentQuestions[currentQuestionIndex]}
                        <button id="submitEvaluation">Submit</button>
                        <button id="previousQuestion">Back</button>
                        <div id="progress-bar" style data-label=""></div>
                    `;
                    // Eventlistener für den Submit-Button
                    document.getElementById('submitEvaluation').addEventListener('click', handleSubmit);
                    
                } else {
                    renderResults();
                }
            }

            // Eventhandler für den Submit-Button
            function handleSubmit() {
                currentQuestionIndex++;
                getNextQuestion();
            }

            /**********++++++++++++++++++++++++++++++++++
             * Result Calcualtion
             */

            // Funktion zum Rendern der Ergebnisse
            function renderResults() {
                let score;

                // Berechnung der Punktzahl basierend auf Risiken und Chancen
                if (opportunities === 0 && risks === 0) {
                    score = 0;
                } else if (risks === 0) {
                    score = 1;
                } else {
                    score = (opportunities / risks) / (risks + opportunities);
                }

                // Rendern der Ergebnisse
                document.getElementById('questionContainer').innerHTML = `
                <h2>Results</h2>
                <p>Risks: ${risks}</p>
                <p>Opportunities: ${opportunities}</p>
                <p>Score: ${score}</p>
            `;
            }
            /**********++++++++++++++++++++++++++++++++++
             * Progress Bar
             */

            const progressBar = document.getElementById("progress-bar");

            // Aktualisierung der Fortschrittsleiste basierend auf dem aktuellen Index und der Gesamtanzahl von Fragen
           /*function updateProgressBar() {

               
                var newWidth = actualWidth+1; // Erhöhe die Breite um 20 Pixel (kann angepasst werden)
                //progressBar.style.width = newWidth + 'px';

               
                progressBar.style.setProperty('--progress-width', newWidth + 'px');
            }
*/
            /**********++++++++++++++++++++++++++++++++++
             * Back Button
             */

            // Eventhandler für den Zurück-Button
            document.getElementById('previousQuestion').addEventListener('click', handlePrevious);

            // Funktion zum Anzeigen der vorherigen Frage
            function handlePrevious() {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    getNextQuestion();
                }
            }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

});



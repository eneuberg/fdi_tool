let risks = 0;
let opportunities = 0;
let currentQuestionIndex = 0;
let currentQuestions = [];

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
document.addEventListener('DOMContentLoaded', function() {

// Fetching the JSON data and integrating into the existing code
fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const sectors = Object.keys(data.sectors);

        // Function to render questions based on the selected sector
        function renderQuestions(selectedSector) {
            const sector = data.sectors[selectedSector];
            const subsectors = Object.keys(sector);

            currentQuestions = [];
            subsectors.forEach(subsector => {
                const indicators = sector[subsector];
                indicators.forEach(indicator => {
                    currentQuestions.push(`
                        <div>
                            <p><strong>Indicator Name:</strong> ${indicator.indicator}</p>
                            <p><strong>Indicator Comment:</strong> ${indicator.comment}</p>
                            <p><strong>Indicator Evaluation:</strong> ${generateEvaluationInput(indicator.evaluation)}</p>
                        </div>
                        <hr>
                    `);
                });
            });
        }

        // Function to generate HTML for evaluation inputs based on evaluation type
        function generateEvaluationInput(evaluation) {
            switch (evaluation.evaluation) {
                case 'multicheckbox':
                    return '<input type="checkbox" class="evaluation-checkbox">';
                case 'range':
                    return '<input type="text" class="evaluation-text">';
                case 'checkbox':
                    return '<input type="checkbox" class="evaluation-yes"> Yes <input type="checkbox" class="evaluation-no"> No';
                default:
                    return '';
            }
        }

        // Sector selection form HTML
        const sectorSelectionForm = `
            <form id="sectorForm">
                <select id="sectorSelect" name="sector">
                    <option value="">Select a Sector</option>
                    ${sectors.map(sector => `<option value="${sector}">${sector}</option>`).join('')}
                </select>
                <button type="submit">Start</button>
            </form>
        `;

        // Rendering sector selection form
        document.getElementById('questionContainer').innerHTML = sectorSelectionForm;

        // Event listener for sector selection form submission
        document.getElementById('sectorForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const selectedSector = document.getElementById('sectorSelect').value;
            if (selectedSector) {
                renderQuestions(selectedSector);
                renderQuestion();
            } else {
                alert('Please select a sector.');
            }
        });

        // Function to render current question
        function renderQuestion() {
            if (currentQuestionIndex < currentQuestions.length) {
                document.getElementById('questionContainer').innerHTML = currentQuestions[currentQuestionIndex];
                document.querySelector('#questionContainer .evaluation-checkbox').addEventListener('change', handleCheckboxChange);
                // Add event listeners for other types of inputs if necessary
            } else {
                renderResults();
            }
        }

        // Function to handle checkbox change event
        function handleCheckboxChange(event) {
            const checkbox = event.target;
            evaluateCheckbox(checkbox.checked);
            currentQuestionIndex++;
            renderQuestion();
        }

        // Function to evaluate checkbox answer
        function evaluateCheckbox(checked) {
            if (checked) {
                opportunities++;
            } else {
                risks++;
            }
        }

        // Function to render results
        function renderResults() {
            let score;

            if (opportunities === 0 && risks === 0) {
                score = 0;
            } else if (risks === 0) {
                score = 1;
            } else {
                score = (opportunities / risks) / (risks + opportunities);
            }

            document.getElementById('questionContainer').innerHTML = `
                <h2>Results</h2>
                <p>Risks: ${risks}</p>
                <p>Opportunities: ${opportunities}</p>
                <p>Score: ${score}</p>
            `;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

});

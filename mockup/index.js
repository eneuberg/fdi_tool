let risks = 0;
let opportunities = 0;
let currentQuestionIndex = 0;
let currentQuestions = []; // This will be directly set based on the sector selected

const sectorSelectionForm = `
    <form id="sectorForm">
        <select id="sectorSelect" name="sector">
            <option value="">Select a Sector</option>
            <option value="agriculture">Agriculture</option>
            <option value="technology">Technology</option>
            <!-- Add other sectors as options -->
        </select>
        <button type="submit">Start</button>
    </form>
`;

document.getElementById('questionContainer').innerHTML = sectorSelectionForm;

document.getElementById('sectorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedSector = document.getElementById('sectorSelect').value;
    switch (selectedSector) {
        case 'agriculture':
            currentQuestions = agricultureQuestions;
            break;
    }
    renderQuestion();
});

function renderQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        document.getElementById('questionContainer').innerHTML = currentQuestions[currentQuestionIndex];
        document.querySelector('#questionContainer form').addEventListener('submit', handleQuestionSubmit);
    } else {
        renderResults();
    }
}

function handleQuestionSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.id;

    let answer;
    if(form.elements['answer'].type === "checkbox") {
        answer = form.elements['answer'].checked;
    } else {
        answer = form.elements['answer'].value;
    }

    evaluateAnswer(answer, id); // Pass the answer and id for evaluation

    currentQuestionIndex++;
    renderQuestion();
}


function evaluateAnswer(answer, formId) {
    switch(formId) {
        case 'operatingSurplus':
            if (answer > 15)
                opportunities++;
            else
                risks++;
            break;
        case 'annualGroundwater':
            if (answer > 0)
                opportunities++;
            else
                risks++;
            break;
        default: // -> formId is null, is checkbox
            if(answer === true) { // If checkbox is checked
                opportunities++;
            } else {
                risks++;
            }
            break;
    }
}


function renderResults() {
    let score;

    if (opportunities === 0 && risks === 0) {
        score = 0;
    } else if (risks === undefined || risks === 0) {
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

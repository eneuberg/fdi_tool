import {initializeQuestionnaire} from "./utils/dataLoader"; // Adjust path as necessary
import * as data from './data/data.json';

document.addEventListener('DOMContentLoaded', () => {
    const questionnaire = initializeQuestionnaire(data);
    const questionnaireEl = document.getElementById('questionnaire');
    if (!questionnaireEl)
        throw new Error("Questionnaire element not found");
    questionnaireEl.innerHTML = questionnaire.renderQuestionnaire();
});

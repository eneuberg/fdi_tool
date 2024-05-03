import {initializeQuestionnaire} from "./utils/dataLoader"; // Adjust path as necessary
import * as data from './data/data.json';
import {EventManager} from "./services/eventManager";
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
    const questionnaire = initializeQuestionnaire(data);
    const questionnaireEl = document.getElementById('questionnaireContainer');
    if (!questionnaireEl)
        throw new Error("QuestionnaireManager element not found");
    questionnaire.renderQuestionnaire();
    EventManager.setup(questionnaire);
});

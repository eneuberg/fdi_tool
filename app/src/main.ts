import {initializeQuestionnaire} from "./utils/dataLoader"; // Adjust path as necessary
import * as data from './data/data.json';
import {EventManager} from "./services/eventManager";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Renderer} from "./models/renderers/renderer";

document.addEventListener('DOMContentLoaded', () => {
    const questionnaire = initializeQuestionnaire(data);
    Renderer.setupRenderer(questionnaire);
    questionnaire.render();
    //EventManager.setup(questionnaire);
});

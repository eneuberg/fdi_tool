import {Questionnaire} from "../models/questionnaire";

function renderQuestionnaire() {
    const questionnaireElement = document.getElementById('questionnaire');
    if (!questionnaireElement)
        throw new Error("Questionnaire element not found");

    questionnaireElement.innerHTML = EventManager.questionnaire.renderQuestionnaire();
}

export class EventManager {
    static questionnaire: Questionnaire;

    static setup(questionnaire: Questionnaire) {
        EventManager.questionnaire = questionnaire;
    }

    static addNextButtonEventListener() {
        function handleNextButton(event: Event) {
            event.preventDefault();
            //EventManager.questionnaire.storeResponse(event.target ? event.target.form);
            EventManager.questionnaire.nextIndicator();
            renderQuestionnaire();
        }

        const nextButton = document.getElementById('nextButton');
        if (!nextButton)
            throw new Error("Next button not found");
        //nextButton.removeEventListener('submit', handleNextButton)
        nextButton.addEventListener('submit', handleNextButton);
    }


    static addPrevButtonEventListener() {
        function handlePreviousButton(event: Event) {
            event.preventDefault();
            EventManager.questionnaire.previousIndicator();
            renderQuestionnaire();
        }

        const previousButton = document.getElementById('previousButton');
        if (!previousButton)
            throw new Error("Previous button not found");
        //previousButton.removeEventListener('submit', handlePreviousButton)
        previousButton.addEventListener('submit', handlePreviousButton);
    }

    addSectorSelectionEventListeners() {
        function handleSectorSelect(event: Event) {
            EventManager.questionnaire.selectSector((event.target as HTMLSelectElement).value);
            renderQuestionnaire();
        }

        const sectorSelect = document.getElementById('sector-select');
        if (!sectorSelect)
            throw new Error("Sector select element not found");
        //sectorSelect.removeEventListener('change', handleSectorSelect);
        sectorSelect.addEventListener('change', handleSectorSelect);
    }

    addSubsectorSelectionEventListeners() {
        function handleSectorSelect(event: Event) {
            EventManager.questionnaire.selectSubsector((event.target as HTMLSelectElement).value);
            renderQuestionnaire();
        }

        const sectorSelect = document.getElementById('sector-select');
        if (!sectorSelect)
            throw new Error("Subsector select element not found");
        //sectorSelect.removeEventListener('change', handleSectorSelect);
        sectorSelect.addEventListener('change', handleSectorSelect);
    }
}

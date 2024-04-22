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
        EventManager.addGlobalEventListener();
    }

    static addGlobalEventListener() {
        const questionnaireElement = document.getElementById('questionnaire');
        if (!questionnaireElement) throw new Error("Questionnaire element not found");

        // TODO: change event type; fired for <input>
        questionnaireElement.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            const select = target as HTMLSelectElement;
            switch (target.id) {
                case 'sectorSelect': {
                    EventManager.questionnaire.selectSector(select.value);
                    renderQuestionnaire();
                    break;
                }
                case 'subsectorSelect': {
                    EventManager.questionnaire.selectSubsector(select.value);
                    renderQuestionnaire();
                    break;
                }
            }
        });

        questionnaireElement.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const submitter = event.submitter as HTMLButtonElement;
            const formData = new FormData(form, submitter)

            const firstChild = form.querySelector('input') as HTMLInputElement;
            switch (firstChild.name) {
                case 'multiCheckbox': {
                    const allCheckboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
                    const checkedStates = Array.from(allCheckboxes).map(checkbox => checkbox.checked);
                    this.questionnaire.storeResponse(checkedStates);
                    break;
                }
                case 'singleCheckbox': {
                    const checkboxData = formData.get('singleCheckbox');
                    this.questionnaire.storeResponse(checkboxData);
                    break;
                }
                case 'rangeInput': {
                    const rangeData = formData.get('rangeInput');
                    this.questionnaire.storeResponse(rangeData);
                    break;
                }
            }

            const response = formData.get('action');
            switch (response) {
                case 'next':
                    EventManager.questionnaire.nextIndicator();
                    break;
                case 'previous':
                    EventManager.questionnaire.previousIndicator();
                    break;
                default:
                    console.error('Unexpected action');
            }



            renderQuestionnaire();
        });
    }
}

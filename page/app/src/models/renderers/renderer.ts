import {QuestionnaireManager} from "../managers/questionnaireManager";
import {Manager} from "../managers/manager";

export abstract class Renderer {
    static questionnaire: QuestionnaireManager;
    abstract manager: Manager;

    static attachHTMLToElementWithId(elementId: string, html: string) {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id ${elementId} not found`);
        element.innerHTML = html;
    }

    static async playAnimationOnElementWithId(elementId: string, animation: string) {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id ${elementId} not found`);
        element.classList.add(animation);
        element.addEventListener('animationend', () => {
            element.classList.remove(animation);
            return;
        });

    }
    static setupRenderer(questionnaire: QuestionnaireManager) {
        Renderer.questionnaire = questionnaire;
    }

    abstract render(): void;
    protected abstract attachEventListeners(): void;
}
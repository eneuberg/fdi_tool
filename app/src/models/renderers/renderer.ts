import {QuestionnaireManager} from "../managers/questionnaireManager";
import {Manager} from "../managers/manager";

export abstract class Renderer {
    static questionnaire: QuestionnaireManager;
    static questionnaireElement: HTMLElement;
    abstract manager: Manager;

    static attachHTMLToElementWithId(elementId: string, html: string) {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id ${elementId} not found`);
        element.innerHTML = html;
    }

    static setupRenderer(questionnaire: QuestionnaireManager, questionnaireElement: HTMLElement) {
        Renderer.questionnaire = questionnaire;
        Renderer.questionnaireElement = questionnaireElement;
    }

    abstract render(): void;
    abstract attachEventListeners(): void;
}
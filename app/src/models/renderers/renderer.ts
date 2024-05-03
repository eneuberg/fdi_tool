import {Questionnaire} from "../managers/questionnaire";
import {Manager} from "../managers/manager";

export abstract class Renderer {
    static questionnaire: Questionnaire;
    static questionnaireElement: HTMLElement;
    abstract manager: Manager;

    static attachHTMLToElementWithId(elementId: string, html: string) {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element with id ${elementId} not found`);
        element.innerHTML = html;
    }

    static setupRenderer(questionnaire: Questionnaire, questionnaireElement: HTMLElement) {
        Renderer.questionnaire = questionnaire;
        Renderer.questionnaireElement = questionnaireElement;
    }

    abstract render(...objectsToRender: any[]): void;
    abstract attachEventListeners(): void;
}
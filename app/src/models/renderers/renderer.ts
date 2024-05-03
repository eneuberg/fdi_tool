import {Questionnaire} from "../managers/questionnaire";
import {Manager} from "../managers/manager";

export abstract class Renderer {
    static questionnaire: Questionnaire;
    static questionnaireElement: HTMLElement;
    abstract manager: Manager;

    static setupRenderer(questionnaire: Questionnaire, questionnaireElement: HTMLElement) {
        Renderer.questionnaire = questionnaire;
        Renderer.questionnaireElement = questionnaireElement;
    }

    abstract render(...objectsToRender: any[]): void;
    abstract attachEventListeners(): void;
}
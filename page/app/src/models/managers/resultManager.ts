import {Manager} from "./manager";
import {ResultRenderer} from "../renderers/resultRenderer";
import {QuestionnaireManager} from "./questionnaireManager";

export class ResultManager extends Manager  {
    questionnaireManager: QuestionnaireManager;
    renderer: ResultRenderer;

    constructor(questionnaireManager: QuestionnaireManager) {
        super();
        this.renderer = new ResultRenderer(this);
        this.questionnaireManager = questionnaireManager;
    }

    render(): void {
        this.renderer.render();
    }
}
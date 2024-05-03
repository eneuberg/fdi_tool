import {EvaluationManager, EvaluationCriteria} from "./evaluation/evaluationManager";
import {EvaluationFactory} from "./evaluation/evaluationFactory";
import tooltipIcon from '../../resources/tooltip.svg';
import {Manager} from "./manager";
import {IndicatorRenderer} from "../renderers/indicatorRenderer";

export type Dimension = "economic" | "social" | "environmental" | "governance";

export class IndicatorManager extends Manager {
    text: string;
    comment: string;
    evaluation: EvaluationManager;
    hasBeenAnswered: boolean;
    dimension: Dimension;
    renderer: IndicatorRenderer;

    constructor(text: string, comment: string, dimension: Dimension, criteria: EvaluationCriteria) {
        super();
        this.text = text;
        this.comment = comment;
        this.evaluation = EvaluationFactory.createEvaluation(criteria);
        this.hasBeenAnswered = false;
        this.dimension = dimension;
        this.renderer = new IndicatorRenderer(this);
    }

    storeResponse(response: any): void {
        this.evaluation.response = response;
        this.hasBeenAnswered = true;
    }

    evaluateStoredResponse(): boolean | null {
        return this.evaluation.evaluate();
    }

    resetResponse(): void {
        this.evaluation.response = null;
    }

    isCompleted(): boolean {
        return this.hasBeenAnswered;
    }

    render(): void {
        this.renderer.render();
    }
}

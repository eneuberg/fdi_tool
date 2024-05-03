import {Evaluation, EvaluationCriteria} from "./evaluation/evaluation";
import {EvaluationFactory} from "./evaluation/evaluationFactory";
import tooltipIcon from '../../resources/tooltip.svg';

export type Dimension = "economic" | "social" | "environmental" | "governance";

export class Indicator {
    text: string;
    comment: string;
    evaluation: Evaluation;
    response: any;  // Stores the current response
    hasBeenAnswered: boolean;
    dimension: Dimension;

    constructor(text: string, comment: string, dimension: Dimension, criteria: EvaluationCriteria) {
        this.text = text;
        this.comment = comment;
        this.evaluation = EvaluationFactory.createEvaluation(criteria);
        this.response = null;
        this.hasBeenAnswered = false;
        this.dimension = dimension;
    }

    storeResponse(response: any): void {
        this.response = response;
        this.hasBeenAnswered = true;
    }

    evaluateStoredResponse(): boolean | null {
        if (this.response === null) {
            throw new Error("No response stored for evaluation.");
        }
        return this.evaluation.evaluate(this.response);
    }

    resetResponse(): void {
        this.response = null;
    }

    isCompleted(): boolean {
        return this.hasBeenAnswered;
    }

    renderIndicator(): string {
        const commentHtml = this.comment ? `
            <span class="comment">
                <img src="${tooltipIcon}" alt="(?)" width="24" height="24">
                <span class="commentText bg-dark text-white p-3 text-center">${this.comment}</span>
            </span>
            ` : '';
        return `
            <div class="indicator flex-column align-items-center" id="indicator">
                <p id="question" class="text-start fw-bold ps-3 mt-3">${this.text}   ${commentHtml}</p>
                ${this.evaluation.render(this.response)}
        </div>
        `;
    }
}

import {Evaluation, EvaluationCriteria} from "./evaluation/evaluation";
import {EvaluationFactory} from "./evaluation/evaluationFactory";

export class Indicator {
    text: string;
    comment: string;
    evaluation: Evaluation;
    response: any;  // Stores the current response

    constructor(text: string, comment: string, criteria: EvaluationCriteria) {
        this.text = text;
        this.comment = comment;
        this.evaluation = EvaluationFactory.createEvaluation(criteria);
        this.response = null;
    }

    storeResponse(response: any): void {
        this.response = response;
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
        return this.response !== null;
    }

    renderIndicator(): string {
        return `
        <div class="indicator flex-column align-items-center" id="indicator">
            <p id="question" class="text-start fw-bold ps-3 mt-3">${this.text}</p>
                ${this.evaluation.render(this.response)}
        </div>
        `;
    }
}

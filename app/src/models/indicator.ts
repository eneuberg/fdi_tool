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

    evaluateStoredResponse(): boolean {
        if (this.response === null) {
            throw new Error("No response stored for evaluation.");
        }
        return <boolean>this.evaluation.evaluate(this.response);
    }

    resetResponse(): void {
        this.response = null;
    }
}

import {EvaluationManager} from "./evaluationManager";
import {CheckboxEvaluationRenderer} from "../../renderers/evaluation/checkboxEvaluationRenderer";

export class CheckboxEvaluationManager extends EvaluationManager {
    response: boolean | null;
    renderer: CheckboxEvaluationRenderer;

    constructor() {
        super();
        this.response = null;
        this.renderer = new CheckboxEvaluationRenderer(this);
    }

    evaluate(): boolean {
        if (this.response === null) {
            throw new Error("No response stored for evaluation.");
        }
        return this.response; // Assuming a single checkbox returns true if checked
    }

    render(): void {
        this.renderer.render();
    }
}

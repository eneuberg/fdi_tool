import {EvaluationManager} from "./evaluationManager";
import {MultiCheckboxEvaluationRenderer} from "../../renderers/evaluation/multiCheckboxEvaluationRenderer";

export class MultiCheckboxEvaluationManager extends EvaluationManager {
    options: string[];
    response: boolean | null;
    renderer: MultiCheckboxEvaluationRenderer;

    constructor(options: string[]) {
        super();
        this.options = options;
        this.response = null;
        this.renderer = new MultiCheckboxEvaluationRenderer(this);
    }

    evaluate(): boolean {
        if (this.response === null) {
            throw new Error("No response stored for evaluation.");
        }
        return this.response;
    }

    render(): void {
        this.renderer.render();
    }


}

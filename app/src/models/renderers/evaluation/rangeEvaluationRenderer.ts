import {Renderer} from "../renderer";
import {RangeEvaluationManager} from "../../managers/evaluation/rangeEvaluationManager";

export class RangeEvaluationRenderer extends Renderer {
    manager: RangeEvaluationManager;

    constructor(manager: RangeEvaluationManager) {
        super();
        this.manager = manager;
    }
    protected attachEventListeners() {
    }

    render(): void {
        let min = "-Infinity";  // Default to no minimum if negative values are allowed
        let max = "Infinity";   // Default to no maximum if positive values are not restricted
        let placeholder = "Enter value";  // Generic placeholder

        switch (this.manager.rangeType) {
            case "percentage":
                min = "0";
                max = "100";
                placeholder = "Percentage (0-100)";
                break;
            case "absoluteCanBeNegative":
                placeholder = "Number (negative or positive)";
                break;
            case "absoluteOnlyPositive":
                min = "0";
                placeholder = "Number (positive)";
                break;
        }

        const evaluationHTML = `
        <div class="row">
            <div class="input-container d-flex justify-content-center mb-4">
                <div class="col-6">
                    <input class="number form-control" type="number" placeholder="${placeholder}" name="rangeInput" min="${min}" max="${max}" required ${this.manager.response !== null ? `value="${this.manager.response}"` : ''} />
                </div>
            </div>
        </div>
                `;

        Renderer.attachHTMLToElementWithId('evaluationContainer', evaluationHTML);
    }
}
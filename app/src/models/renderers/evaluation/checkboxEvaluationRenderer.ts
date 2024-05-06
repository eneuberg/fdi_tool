import {Renderer} from "../renderer";
import {CheckboxEvaluationManager} from "../../managers/evaluation/checkboxEvaluationManager";

export class CheckboxEvaluationRenderer extends Renderer {
    manager: CheckboxEvaluationManager;

    constructor(manager: CheckboxEvaluationManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
    }

    render(): void {
        const yesChecked = this.manager.response === true ? 'checked' : '';
        const noChecked = this.manager.response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="checkbox form-check-input mx-1 " type="radio" name="singleCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="checkbox form-check-input mx-1 " type="radio" name="singleCheckbox" value="yes" ${yesChecked} required> Yes</label>
        `;

        // Return the combined HTML string
        const evaluationHTML = `<div class="input-container d-flex justify-content-center mb-4">${checkboxesHtml}</div>`;

        Renderer.attachHTMLToElementWithId('evaluationContainer', evaluationHTML);
    }
}
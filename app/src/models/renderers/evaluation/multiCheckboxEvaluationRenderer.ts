import {Renderer} from "../renderer";
import {MultiCheckboxEvaluationManager} from "../../managers/evaluation/multiCheckboxEvaluationManager";

export class MultiCheckboxEvaluationRenderer extends Renderer   {
    manager: MultiCheckboxEvaluationManager;

    constructor(manager: MultiCheckboxEvaluationManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
    }

    render(): void {
        // Map each option into a <p> element.
        const optionsHtml = this.manager.options.map(option =>
            `<p class="option-item text-start ps-4 mt-3"> - ${option}</p>`
        ).join('');

        const yesChecked = this.manager.response === true ? 'checked' : '';
        const noChecked = this.manager.response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="yes" ${yesChecked} required> Yes</label>
    `;

        // Return the combined HTML string
        const evaluationHTML = `${optionsHtml}<div class="input-container d-flex justify-content-center mb-4" >${checkboxesHtml} </div>`;

        Renderer.attachHTMLToElementWithId('evaluationContainer', evaluationHTML);
    }
}
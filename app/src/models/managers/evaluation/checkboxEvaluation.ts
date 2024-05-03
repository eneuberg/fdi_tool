import {EvaluationManager} from "./evaluationManager";

export class CheckboxEvaluation extends EvaluationManager {
    constructor() {
        super();
    }

    evaluate(response: boolean): boolean {
        return response; // Assuming a single checkbox returns true if checked
    }

    render(response: boolean | null): string {

        const yesChecked = response === true ? 'checked' : '';
        const noChecked = response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="checkbox form-check-input mx-1" type="radio" name="singleCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="checkbox form-check-input mx-1" type="radio" name="singleCheckbox" value="yes" ${yesChecked} required> Yes</label>
        `;

        // Return the combined HTML string
        return `<div class="input-container d-flex justify-content-center mb-4">${checkboxesHtml}</div>`;
    }
}

import {Evaluation} from "./evaluation";

export class CheckboxEvaluation extends Evaluation {
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
        <label><input type="radio" name="singleCheckbox" value="no" ${noChecked}> No</label>
        <label><input type="radio" name="singleCheckbox" value="yes" ${yesChecked}> Yes</label>
        `;

        // Return the combined HTML string
        return `<div class="checkbox-container">${checkboxesHtml}</div>`;
    }
}

import {Evaluation} from "./evaluation";

export class MultiCheckboxEvaluation extends Evaluation {
    options: string[];

    constructor(options: string[]) {
        super();
        this.options = options;
    }

    evaluate(response: boolean): boolean {
        return response;
    }

    render(response: boolean | null): string {
        // Map each option into a <p> element.
        const optionsHtml = this.options.map(option =>
            `<p class="option-item text-start ps-4 mt-3"> - ${option}</p>`
        ).join('');

        const yesChecked = response === true ? 'checked' : '';
        const noChecked = response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="yes" ${yesChecked} required> Yes</label>
    `;

        // Return the combined HTML string
        return `${optionsHtml}<div class="input-container d-flex justify-content-center mb-4" >${checkboxesHtml} </div>`;
    }


}

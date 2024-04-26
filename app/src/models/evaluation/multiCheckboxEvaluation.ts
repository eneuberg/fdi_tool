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
            `<p class="option-item"> - ${option}</p>`
        ).join('');

        const yesChecked = response === true ? 'checked' : '';
        const noChecked = response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="checkbox" type="radio" name="multiCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="checkbox" type="radio" name="multiCheckbox" value="yes" ${yesChecked} required> Yes</label>
    `;

        // Return the combined HTML string
        return `${optionsHtml}<div class="input-container" >${checkboxesHtml} </div>`;
    }


}

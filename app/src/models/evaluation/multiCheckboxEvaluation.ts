import {Evaluation} from "./evaluation";

export class MultiCheckboxEvaluation extends Evaluation {
    options: string[];

    constructor(options: string[]) {
        super();
        this.options = options;
    }

    evaluate(response: boolean[]): boolean {
        return response.some(value => value === true);
    }

    render(response: boolean[] | null): string {
        return this.options.map((option, index) =>
            `<label><input class="checkbox" type="checkbox" name="multiCheckbox" value="${option}" ${
                response && response[index] ? 'checked' : ''
            } />
            <span class="label-text">${option}</span>
            </label>`
        ).join('<br />');
    }
}

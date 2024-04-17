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

    render(): string {
        return this.options.map(option =>
            `<label><input type="checkbox" name="multiCheckbox" value="${option}" /> ${option}</label>`
        ).join('<br />');
    }
}

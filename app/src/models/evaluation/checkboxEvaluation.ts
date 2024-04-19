import {Evaluation} from "./evaluation";

export class CheckboxEvaluation extends Evaluation {
    constructor() {
        super();
    }

    evaluate(response: boolean): boolean {
        return response; // Assuming a single checkbox returns true if checked
    }

    render(response: boolean | null): string {
        return `<input type="checkbox" name="singleCheckbox" ${response ? 'checked' : ''} />`;
    }
}

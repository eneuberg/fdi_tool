import {Evaluation} from "./evaluation";

export class CheckboxEvaluation extends Evaluation {
    constructor() {
        super();
    }

    evaluate(response: boolean): boolean {
        return response === true; // Assuming a single checkbox returns true if checked
    }

    render(): string {
        return `<input type="checkbox" />`; // Simplistic rendering for example
    }
}

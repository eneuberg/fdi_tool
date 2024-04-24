import {Evaluation, RangeOptions} from "./evaluation";
import {Range} from "./evaluation";

export class RangeEvaluation extends Evaluation {
    ranges: Range[];
    rangeType: "percentage" | "absoluteCanBeNegative" | "absoluteOnlyPositive";

    constructor(rangeOptions: RangeOptions) {
        super();
        this.ranges = rangeOptions.ranges;
        this.rangeType = rangeOptions.rangeType;
    }

    evaluate(response: number): boolean | null {
        for (const range of this.ranges) {
            if (
                (range.operator === 'more' && response > range.comparator) ||
                (range.operator === 'less' && response < range.comparator)
            ) {
                return range.returnValue;
            }
        }
        return null; // Return null if no ranges match
    }


    render(response = null) {
        let min = "-Infinity";  // Default to no minimum if negative values are allowed
        let max = "Infinity";   // Default to no maximum if positive values are not restricted
        let placeholder = "Enter value";  // Generic placeholder

        switch (this.rangeType) {
            case "percentage":
                min = "0";
                max = "100";
                placeholder = "Percentage (0-100)";
                break;
            case "absoluteCanBeNegative":
                placeholder = "Number (negative or positive)";
                break;
            case "absoluteOnlyPositive":
                min = "0";
                placeholder = "Number (positive)";
                break;
        }

        return `
        <div class="input-container">
            <input class="number" type="number" placeholder="${placeholder}" name="rangeInput" min="${min}" max="${max}" required ${response !== null ? `value="${response}"` : ''} />
        </div>`;
    }

}

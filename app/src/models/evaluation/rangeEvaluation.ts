import {Evaluation} from "./evaluation";
import {Range} from "./evaluation";

export class RangeEvaluation extends Evaluation {
    ranges: Range[];

    constructor(ranges: Range[]) {
        super();
        this.ranges = ranges;
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


    render(response: number | null): string {
        return `
        <div class="input-container">
        <input class="number" type="number" placeholder="Percentage"  name="rangeInput" min="0" max="100" required ${response !== null ? `value="${response}"` : ''} />
        </div>`;
    }

}

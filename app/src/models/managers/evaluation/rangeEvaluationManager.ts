import {EvaluationManager, RangeOptions} from "./evaluationManager";
import {Range} from "./evaluationManager";
import {RangeEvaluationRenderer} from "../../renderers/evaluation/rangeEvaluationRenderer";

export class RangeEvaluationManager extends EvaluationManager {
    ranges: Range[];
    rangeType: "percentage" | "absoluteCanBeNegative" | "absoluteOnlyPositive";
    response: number | null;
    renderer: RangeEvaluationRenderer;

    constructor(rangeOptions: RangeOptions) {
        super();
        this.ranges = rangeOptions.ranges;
        this.rangeType = rangeOptions.rangeType;
        this.response = null;
        this.renderer = new RangeEvaluationRenderer(this);
    }

    evaluate(): boolean | null {
        if (this.response === null) {
            throw new Error("No response stored for evaluation.");
        }
        for (const range of this.ranges) {
            if (
                (range.operator === 'more' && this.response > range.comparator) ||
                (range.operator === 'less' && this.response < range.comparator)
            ) {
                return range.returnValue;
            }
        }
        return null; // Return null if no ranges match
    }


    render(): void {
        this.renderer.render();
    }

}

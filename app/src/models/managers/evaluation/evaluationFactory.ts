import {EvaluationManager, EvaluationCriteria} from "./evaluationManager";
import {CheckboxEvaluation} from "./checkboxEvaluation";
import {MultiCheckboxEvaluation} from "./multiCheckboxEvaluation";
import {RangeEvaluation} from "./rangeEvaluation";

export class EvaluationFactory {
    static createEvaluation(criteria: EvaluationCriteria): EvaluationManager {
        switch (criteria.type) {
            case 'checkbox':
                return new CheckboxEvaluation();
            case 'multicheckbox':
                return new MultiCheckboxEvaluation(criteria.options);
            case 'range':
                return new RangeEvaluation(criteria.rangeOptions);
            default:
                throw new Error("Unsupported evaluation type");
        }
    }
}

import {EvaluationManager, EvaluationCriteria} from "./evaluationManager";
import {CheckboxEvaluationManager} from "./checkboxEvaluationManager";
import {MultiCheckboxEvaluationManager} from "./multiCheckboxEvaluationManager";
import {RangeEvaluationManager} from "./rangeEvaluationManager";

export class EvaluationFactory {
    static createEvaluation(criteria: EvaluationCriteria): EvaluationManager {
        switch (criteria.type) {
            case 'checkbox':
                return new CheckboxEvaluationManager();
            case 'multicheckbox':
                return new MultiCheckboxEvaluationManager(criteria.options);
            case 'range':
                return new RangeEvaluationManager(criteria.rangeOptions);
            default:
                throw new Error("Unsupported evaluation type");
        }
    }
}

type EvaluationType = 'checkbox' | 'multicheckbox' | 'range';

interface MultiCheckboxCriteria {
    type: 'multicheckbox';
    options: string[]; // Options that can be checked
}

interface Range {
    operator: 'more' | 'less';
    comparator: number;
    returnValue: boolean;
}

interface RangeCriteria {
    type: 'range';
    ranges: Range[];
}

interface CheckboxCriteria {
    type: 'checkbox';
}

export type EvaluationCriteria = MultiCheckboxCriteria | RangeCriteria | CheckboxCriteria;


export class Evaluation {
    private criteria: EvaluationCriteria;

    constructor(criteria: EvaluationCriteria) {
        this.criteria = criteria;
    }

    evaluate(response: any): boolean | null {
        switch (this.criteria.type) {
            case 'checkbox':
                return response === true; // Assuming a single checkbox returns true if checked
            case 'multicheckbox':
                return this.evaluateMultiCheckbox(response);
            case 'range':
                return this.evaluateRange(response);
            default:
                throw new Error("Unsupported evaluation type");
        }
    }

    private evaluateMultiCheckbox(response: boolean[]): boolean {
        // Check if any of the checkboxes are true
        return response.some(value => value === true);
    }

    private evaluateRange(response: number): boolean | null {
        // Iterate over each range and evaluate based on the operator
        for (const range of (this.criteria as RangeCriteria).ranges) {
            if (
                (range.operator === 'more' && response > range.comparator) ||
                (range.operator === 'less' && response < range.comparator)
            ) {
                return range.returnValue;
            }
        }
        return null; // Return null if no ranges match
    }
}

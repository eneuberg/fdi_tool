interface MultiCheckboxCriteria {
    type: 'multicheckbox';
    options: string[]; // Options that can be checked
}

interface RangeCriteria {
    type: 'range';
    ranges: Range[];
}

interface CheckboxCriteria {
    type: 'checkbox';
}

export interface Range {
    operator: 'more' | 'less';
    comparator: number;
    returnValue: boolean;
}

export type EvaluationCriteria = MultiCheckboxCriteria | RangeCriteria | CheckboxCriteria;


export abstract class Evaluation {
    abstract evaluate(response: any): boolean | null;
    abstract render(): string;
}

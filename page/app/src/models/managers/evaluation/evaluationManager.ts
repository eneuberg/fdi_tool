import {Manager} from "../manager";

interface MultiCheckboxCriteria {
    type: 'multicheckbox';
    options: string[]; // Options that can be checked
}

interface RangeCriteria {
    type: 'range';
    rangeOptions: RangeOptions;
}

interface CheckboxCriteria {
    type: 'checkbox';
}

export interface Range {
    operator: 'more' | 'less';
    comparator: number;
    returnValue: boolean;
}

export interface RangeOptions {
    rangeType: "percentage" | "absoluteCanBeNegative" | "absoluteOnlyPositive";
    ranges: Range[];
}

export type EvaluationCriteria = MultiCheckboxCriteria | RangeCriteria | CheckboxCriteria;


export abstract class EvaluationManager extends Manager {
    abstract response: any;
    abstract evaluate(): boolean | null;
}

import React from 'react';

export interface Range {
    operator: 'more' | 'less';
    comparator: number;
    returnValue: boolean;
}

export interface RangeOptions {
    rangeType: "percentage" | "absoluteCanBeNegative" | "absoluteOnlyPositive";
    ranges: Range[];
}

type EvaluationProps = {
    response: any;
    onChange: (response: any) => void;
};

export const MultiCheckboxEvaluation: React.FC<EvaluationProps & { options: string[] }> = ({ response, onChange, options }) => {
    return (
        <div>
            {options.map((option, index) => (
                <p key={index} className="option-item"> - {option}</p>
            ))}
            <div className="input-container">
                <label>
                    <input
                        className="checkbox"
                        type="radio"
                        name="multiCheckbox"
                        value="no"
                        checked={response === false}
                        onChange={() => onChange(false)}
                        required
                    /> No
                </label>
                <label>
                    <input
                        className="checkbox"
                        type="radio"
                        name="multiCheckbox"
                        value="yes"
                        checked={response === true}
                        onChange={() => onChange(true)}
                        required
                    /> Yes
                </label>
            </div>
        </div>
    );
};

export const RangeEvaluation: React.FC<EvaluationProps & { rangeOptions: RangeOptions }> = ({ response, onChange, rangeOptions }) => {
    let min = rangeOptions.rangeType === "absoluteOnlyPositive" ? "0" : "-Infinity";
    let max = "Infinity";
    let placeholder = "Enter value";

    switch (rangeOptions.rangeType) {
        case "percentage":
            min = "0";
            max = "100";
            placeholder = "Percentage (0-100)";
            break;
        case "absoluteCanBeNegative":
            placeholder = "Number (negative or positive)";
            break;
        case "absoluteOnlyPositive":
            placeholder = "Number (positive)";
            break;
    }

    return (
        <div className="input-container">
            <input
                className="number"
                type="number"
                placeholder={placeholder}
                name="rangeInput"
                min={min}
                max={max}
                value={response || ""}
                onChange={e => onChange(Number(e.target.value))}
                required
            />
        </div>
    );
};

export const CheckboxEvaluation: React.FC<EvaluationProps> = ({ response, onChange }) => {
    return (
        <div className="input-container">
            <label>
                <input
                    className="checkbox"
                    type="radio"
                    name="singleCheckbox"
                    value="no"
                    checked={response === false}
                    onChange={() => onChange(false)}
                    required
                /> No
            </label>
            <label>
                <input
                    className="checkbox"
                    type="radio"
                    name="singleCheckbox"
                    value="yes"
                    checked={response === true}
                    onChange={() => onChange(true)}
                    required
                /> Yes
            </label>
        </div>
    );
};

import {Indicator} from "./indicator";

export class Subsector {
    name: string;
    indicators: Indicator[];
    currentIndicator: Indicator | null;

    constructor(name: string, indicators: Indicator[]) {
        this.name = name;
        this.indicators = indicators;
        this.currentIndicator = null;
    }

    loadQuestions(): string {
        // Generates HTML for all questions in this sector
        return this.indicators.map(indicator => indicator.render()).join('');
    }

    resetIndicators(): void {
        this.indicators.forEach(indicator => indicator.resetResponse());
    }
}

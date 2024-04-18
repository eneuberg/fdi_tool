import {Indicator} from "./indicator";

export class Subsector {
    name: string;
    indicators: Indicator[];
    currentIndicator: Indicator | null;
    currentIndicatorIndex: number;
    isRealSubsector: boolean;

    constructor(name: string, indicators: Indicator[]) {
        this.name = name;
        this.indicators = indicators;
        this.currentIndicator = indicators[0];
        this.currentIndicatorIndex = 0;
        this.isRealSubsector = !name.endsWith("_direct");
    }

    resetIndicators(): void {
        this.indicators.forEach(indicator => indicator.resetResponse());
        this.currentIndicatorIndex = 0;
        this.currentIndicator = this.indicators[0];
    }

    evaluateIndicators(): (boolean | null)[] {
        return this.indicators.map(indicator => indicator.evaluateStoredResponse());
    }

    isCompleted(): boolean {
        return this.indicators.every(indicator => indicator.isCompleted());
    }

    nextIndicator() {
        if (this.currentIndicatorIndex < this.indicators.length - 1) {
            this.currentIndicatorIndex++;
            this.currentIndicator = this.indicators[this.currentIndicatorIndex];
        }
    }

    previousIndicator() {
        if (this.currentIndicatorIndex > 0) {
            this.currentIndicatorIndex--;
            this.currentIndicator = this.indicators[this.currentIndicatorIndex];
        }
    }

    renderSubsector(): string {
        const nameHTML = !this.isRealSubsector ? `<h2>Subsector: ${this.name}</h2>` : '';
        return `
            ${nameHTML}
            <form id="indicatorForm">
                ${this.currentIndicator?.renderIndicator()}
                <button id="next" type="submit">Next</button>
                <button id="previous" type="submit">Previous</button>
            </form>
        `;
    }
}

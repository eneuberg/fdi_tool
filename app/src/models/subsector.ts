import { Indicator } from "./indicator";
import { Dimension} from "./indicator";

export interface EvaluationDimension {
    dimension: Dimension;
    evaluationResult: boolean | null;
}

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

    evaluateIndicators(): EvaluationDimension[] {
        return this.indicators.map(indicator => ({
            evaluationResult: indicator.evaluateStoredResponse(),
            dimension: indicator.dimension
        }));
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
        const nameHTML = this.isRealSubsector ? `<h2> ${this.name}</h2>` : '';
        const currentIndex = this.currentIndicator ? this.indicators.indexOf(this.currentIndicator) : 0;
        const progressValue = currentIndex / (this.indicators.length - 1); // Adjusted formula
        const progressBarHTML = `<progress class="progressBar" value="${progressValue}" max="1"></progress>`;


        return `
            <form class= "indicatorForm" id="indicatorForm" >
             ${this.currentIndicator?.renderIndicator()}
                <div class="next-back-button">
                    <button id="previousButton" name="action" value="previous" type="submit">Previous</button>
                    <button id="nextButton" name="action" value="next" type="submit">Next</button>
                </div>
            </form>
            ${progressBarHTML}
        `;
    }

}

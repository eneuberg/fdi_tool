import { Indicator } from "./indicator";

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
        const nameHTML = this.isRealSubsector ? `<h2> ${this.name}</h2>` : '';
        const currentIndex = this.currentIndicator ? this.indicators.indexOf(this.currentIndicator) : 0;
        const progressValue = currentIndex / (this.indicators.length - 1); // Adjusted formula
        const progressBarHTML = ` <progress class="progressBar mt-4" value="${progressValue}" max="1"></progress>`;

        return `
      
        <div class="row">
          <div class="col-12">
            <form class="indicatorForm" id="indicatorForm">
                ${this.currentIndicator?.renderIndicator()}
                  <div class="next-back-button row">
                    <div class="col-12 col-md-6">
                      <button id="previousButton" name="action" value="previous" type="submit" class="btn btn-secondary w-100 mb-3">Previous</button>
                    </div>
                    <div class="col-12 col-md-6">
                      <button id="nextButton" name="action" value="next" type="submit" class="btn btn-primary w-100">Next</button>
                    </div>
                  </div>
            </form>
        </div>
  ${progressBarHTML}
</div>
       
   
        `;
    }

}

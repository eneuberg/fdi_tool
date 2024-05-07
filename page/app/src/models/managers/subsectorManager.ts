import { IndicatorManager } from "./indicatorManager";
import { Dimension} from "./indicatorManager";
import {Manager} from "./manager";
import {SubsectorRenderer} from "../renderers/subsectorRenderer";

export interface EvaluationDimension {
    dimension: Dimension;
    evaluationResult: boolean | null;
}

export class SubsectorManager extends Manager {
    name: string;
    indicators: IndicatorManager[];
    currentIndicator: IndicatorManager | null;
    currentIndicatorIndex: number;
    isRealSubsector: boolean;
    renderer: SubsectorRenderer;

    constructor(name: string, indicators: IndicatorManager[]) {
        super();
        this.name = name;
        this.indicators = indicators;
        this.currentIndicator = indicators[0];
        this.currentIndicatorIndex = 0;
        this.isRealSubsector = !name.endsWith("_direct");
        this.renderer = new SubsectorRenderer(this);
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

    render(): void {
        this.renderer.render();
    }

}

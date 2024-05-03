import { SectorManager } from "./sectorManager";
import { ResultRenderer } from "../renderers/resultRenderer";
import {Manager} from "./manager";
import {questionnaireRenderer} from "../renderers/questionnaireRenderer";

export class QuestionnaireManager extends Manager {
    sectors: SectorManager[];
    currentSector: SectorManager | null;
    renderer: questionnaireRenderer;

    constructor(sectors: SectorManager[]) {
        super();
        this.sectors = sectors;
        this.currentSector = null;
        this.renderer = new questionnaireRenderer(this);
    }

    selectSector(sectorId: string): void {
        this.currentSector?.resetQuestions();  // Reset questions when a new sector is selected

        this.currentSector = this.sectors.find(sector => sector.name === sectorId) || null;

        if (this.currentSector?.hasRealSubsectors() === false)
            this.selectSubsector(this.currentSector.subsectors[0].name);  // Select the first subsector by default
    }

    selectSubsector(subsectorId: string): void {
        this.currentSector?.resetQuestions();
        this.currentSector?.selectSubsector(subsectorId);
    }

    nextIndicator(): void {
        if (!this.currentSector?.currentSubsector?.isCompleted())
            this.currentSector?.currentSubsector?.nextIndicator();
        else {
            this.renderResults();
        }
    }

    previousIndicator(): void {
        this.currentSector?.currentSubsector?.previousIndicator();
    }

    storeResponse(response: any): void {
        console.log(response);
        this.currentSector?.currentSubsector?.currentIndicator?.storeResponse(response);
    }

    private renderResults(): void {
        const result = new ResultRenderer(this.currentSector?.currentSubsector?.isRealSubsector ? this.currentSector?.currentSubsector?.name : '',
            this.currentSector?.name || '',
            this.currentSector?.currentSubsector?.evaluateIndicators() || []);
        result.render()
    }

    render(): void {
        this.renderer.render();
    }
}

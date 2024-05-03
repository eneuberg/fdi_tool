import { SectorManager } from "./sectorManager";
import {Manager} from "./manager";
import {questionnaireRenderer} from "../renderers/questionnaireRenderer";
import {ResultManager} from "./resultManager";

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
        this.currentSector?.currentSubsector?.currentIndicator?.storeResponse(response);
    }

    private renderResults(): void {
        const result = new ResultManager(this);
        result.render()
    }

    render(): void {
        this.renderer.render();
    }
}

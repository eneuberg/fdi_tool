import { SectorManager } from "./sectorManager";
import { ResultRenderer } from "../renderers/resultRenderer";
import {Manager} from "./manager";
import {questionnaireRenderer} from "../renderers/questionnaireRenderer";

export class QuestionnaireManager extends Manager {
    sectors: SectorManager[];
    currentSector: SectorManager | null;
    completed: boolean;
    result: ResultRenderer | null;
    renderer: questionnaireRenderer;

    constructor(sectors: SectorManager[]) {
        super();
        this.sectors = sectors;
        this.currentSector = null;
        this.completed = false;
        this.result = null;
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
            this.completed = true;
        }
    }

    previousIndicator(): void {
        this.currentSector?.currentSubsector?.previousIndicator();
    }

    storeResponse(response: any): void {
        console.log(response);
        this.currentSector?.currentSubsector?.currentIndicator?.storeResponse(response);
    }

    renderQuestionnaireMustChange(): string {
        //console.log(this.currentSector?.currentSubsector?.currentIndicator?.response);
        if (this.completed) {
            return this.renderResults();
        }
        else {
            return '';//this.renderQuestionnaire();
        }
    }

    private renderResults(): string {
        const result = new ResultRenderer(this.currentSector?.currentSubsector?.isRealSubsector ? this.currentSector?.currentSubsector?.name : '',
            this.currentSector?.name || '',
            this.currentSector?.currentSubsector?.evaluateIndicators() || []);
        this.result = result;
        return result.renderCanvas();
    }

    render(): void {
        this.renderer.render();
    }
}

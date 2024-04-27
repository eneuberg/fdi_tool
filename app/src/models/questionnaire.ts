import { Sector } from "./sector";
import { Result } from "./result";

export class Questionnaire {
    sectors: Sector[];
    currentSector: Sector | null;
    completed: boolean;
    result: Result | null;

    constructor(sectors: Sector[]) {
        this.sectors = sectors;
        this.currentSector = null;
        this.completed = false;
        this.result = null;
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

    renderQuestionnaire(): string {
        //console.log(this.currentSector?.currentSubsector?.currentIndicator?.response);
        if (this.completed) {
            return this.renderResults();
        }
        else {
            return this.renderIncompleteQuestionnaire();
        }
    }

    private renderResults(): string {
        const result = new Result(this.currentSector?.currentSubsector?.isRealSubsector ? this.currentSector?.currentSubsector?.name : '',
            this.currentSector?.name || '',
            this.currentSector?.currentSubsector?.evaluateIndicators() || []);
        this.result = result;
        return result.renderCanvas();
    }

    private renderIncompleteQuestionnaire(): string {
        //const chooseSectorChosen = !this.currentSector ? 'selected' : '';
        let sectorOptions = '<option id="placeholder-chooseSector" value="" selected disabled>Choose a sector</option>';
        this.sectors.forEach(sector => {
            const selected = this.currentSector && this.currentSector.name === sector.name ? ' selected' : '';
            sectorOptions += `<option value="${sector.name}"${selected}>${sector.name}</option>`;
        });

        const currentSectorName = this.currentSector ? this.currentSector.name : '';
        const currentSectorExists = !!this.currentSector; // Hier wird der boolesche Wert erstellt

        if (!currentSectorExists) {
            return `
            <select id="sectorSelect">
                ${sectorOptions}
            </select>
            `;
        } else {
            return `
            <div class="select-Container">
                <!--<span class="sector-Name" >${currentSectorName}</span>-->
                <select id="sectorSelect">
                    ${sectorOptions}
                </select>
            </div>
            ${this.currentSector ? this.currentSector.renderSector() : ''}
        `;
        }
    }
}

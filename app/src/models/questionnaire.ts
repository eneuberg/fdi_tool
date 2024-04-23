import { Sector } from "./sector";

export class Questionnaire {
    sectors: Sector[];
    currentSector: Sector | null;
    completed: boolean;

    constructor(sectors: Sector[]) {
        this.sectors = sectors;
        this.currentSector = null;
        this.completed = false;
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
        const sectorName: string = this.currentSector?.name ?? '';
        const subsectorName: string = this.currentSector?.hasRealSubsectors() ? this.currentSector.currentSubsector?.name ?? '' : '';
        const evaluations = this.currentSector?.currentSubsector?.evaluateIndicators() ?? [];

        let opportunities = evaluations.filter(evaluation => evaluation).length;
        let risks = evaluations.length - opportunities;

        let sectorNameElement = sectorName ? `<h1>${sectorName}</h1>` : '';
        let subsectorNameElement = subsectorName ? `<h2>${subsectorName}</h2>` : '';
        const score = evaluations.length > 0 ? Math.round((opportunities / risks) / (risks + opportunities) * 100) / 100 : 0;

        return `
            <h1 id="result">YOUR RESLUT FOR </h1>
            <span class="sector-Name-result"> ${sectorNameElement} </span>
            <span class="subsector-Name-reslut"> ${subsectorNameElement}  </span>
            <p id="indicators">Indicators: ${evaluations.length}</p>
            <p id="opportunities">Opportunities: ${opportunities}</p>
            <p id="risk">Risks: ${risks}</p>
            <p id="score">Score: ${score.toFixed(2)}</p>
            <a href="index.html" class="back-to-home">Zurück zur Startseite</a>

        `;
    }


    private renderIncompleteQuestionnaire(): string {
        let sectorOptions = '<option id="placeholder-chooseSector" value="">Choose a sector</option>';
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
                <span class="sector-Name" >${currentSectorName}</span>
                <select id="sectorSelect">
                    ${sectorOptions}
                </select>
            </div>
            ${this.currentSector ? this.currentSector.renderSector() : ''}
        `;
        }
    }
}

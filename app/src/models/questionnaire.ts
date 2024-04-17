import {Sector} from "./sector";

export class Questionnaire {
    sectors: Sector[];
    currentSector: Sector | null;

    constructor(sectors: Sector[]) {
        this.sectors = sectors;
        this.currentSector = null;
    }

    selectSector(sectorId: string): void {
        this.currentSector = this.sectors.find(sector => sector.name === sectorId) || null;
        if (this.currentSector) {
            this.currentSector.resetQuestions();  // Reset questions when a new sector is selected
        }
    }

    renderQuestions(): string {
        if (!this.currentSector) return '';
        return this.currentSector.loadQuestions();
    }
}

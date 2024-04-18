import {Subsector} from "./subsector";

export class Sector {
    name: string;
    subsectors: Subsector[];
    currentSubsector: Subsector | null;

    constructor(name: string, subsectors?: Subsector[]) {
        this.name = name;
        this.subsectors = subsectors || [];
        this.currentSubsector = null;
    }

    selectSubsector(subsectorId: string): void {
        this.currentSubsector = this.subsectors.find(subsector => subsector.name === subsectorId) || null;
    }

    resetQuestions() {
        if (this.currentSubsector)
            this.currentSubsector.resetIndicators();
    }

    hasRealSubsectors(): boolean {
        return !(this.subsectors.length === 1 && !this.subsectors[0].isRealSubsector);
    }

    private renderSubsectorSelection(): string {
        if (!this.currentSubsector?.isRealSubsector) return '';
        return `
            <select id="subsector-select">
                ${this.subsectors.map(subsector => `<option value="${subsector.name}">${subsector.name}</option>`).join('')}
            </select>
        `;
    }

    renderSector(): string {
        return `
            <h2>Sector: ${this.name}</h2>
            ${this.renderSubsectorSelection()}
            ${this.currentSubsector ? this.currentSubsector.renderSubsector() : ''}
        `;
    }
}

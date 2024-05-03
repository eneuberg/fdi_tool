import { SubsectorManager } from "./subsectorManager";
import {Manager} from "./manager";

export class SectorManager extends Manager {
    name: string;
    subsectors: SubsectorManager[];
    currentSubsector: SubsectorManager | null;

    constructor(name: string, subsectors?: SubsectorManager[]) {
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
        if (this.currentSubsector?.isRealSubsector === false) return '';
        let subsectorOptions = '<option value="" selected disabled>Choose a SubsectorManager</option>';
        this.subsectors.forEach(subsector => {
            const selected = this.currentSubsector && this.currentSubsector.name === subsector.name ? ' selected' : '';
            subsectorOptions += `<option value="${subsector.name}"${selected}>${subsector.name}</option>`;
        });

        const currentSubsectorName = this.currentSubsector ? this.currentSubsector.name : '';
        const currentSubsectorExists = !!this.currentSubsector; // Hier wird der boolesche Wert erstellt

        if (!currentSubsectorExists) {

            return `
                <select id="subsectorSelect" class="form-select mt-3" aria-label="Default select example">
                    ${subsectorOptions}
                </select>
            `;
        }
        else {
            return `
                <div class="select-Container">
                     <select id="subsectorSelect" class="form-select form-select-lg mt-2" aria-label="Default select example">
                        ${subsectorOptions}
                    </select>
                </div>
            `;
        }
    }

    private attachEventListener() {

    }

    renderSector(): void {
        const questionnaireContainer = document.getElementById('questionnaireContainer');
        const subSectorSelectionHTML = this.renderSubsectorSelection();
        if (!questionnaireContainer) throw new Error("QuestionnaireManager element not found");
        questionnaireContainer.innerHTML = subSectorSelectionHTML;
        this.attachEventListener();
        this.currentSubsector?.renderSubsector();
    }
}

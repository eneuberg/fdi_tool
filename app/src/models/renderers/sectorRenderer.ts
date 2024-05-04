import {Renderer} from "./renderer";
import {SectorManager} from "../managers/sectorManager";

export class SectorRenderer extends Renderer {
    manager: SectorManager;

    constructor(manager: SectorManager) {
        super();
        this.manager = manager;
    }

    private buildSubsectorSelection(): string {
        let subsectorOptions = '<option value="" selected disabled>Choose a Subsector</option>';
        this.manager.subsectors.forEach(subsector => {
            const selected = this.manager.currentSubsector && this.manager.currentSubsector.name === subsector.name ? ' selected' : '';
            subsectorOptions += `<option value="${subsector.name}"${selected}>${subsector.name}</option>`;
        });

        const currentSubsectorName = this.manager.currentSubsector ? this.manager.currentSubsector.name : '';
        const currentSubsectorExists = !!this.manager.currentSubsector; // Hier wird der boolesche Wert erstellt

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

    render(): void {
        let subsectorSelectHTML = this.manager.currentSubsector?.isRealSubsector === false ? '' : this.buildSubsectorSelection();
        Renderer.attachHTMLToElementWithId('subsectorSelectContainer', subsectorSelectHTML);
        this.attachEventListeners();
        if (subsectorSelectHTML != '') Renderer.playAnimationOnElementWithId('subsectorSelectContainer', 'fade-in');
    }

    protected attachEventListeners(): void {
        const subsectorSelect = document.getElementById('subsectorSelect') as HTMLSelectElement;
        if (!subsectorSelect) return;
        const handleChange = () => {
            Renderer.questionnaire.selectSubsector(subsectorSelect.value);
            this.manager.currentSubsector?.render();
        }

        subsectorSelect.removeEventListener('change', handleChange);
        subsectorSelect.addEventListener('change', handleChange);
    }
}
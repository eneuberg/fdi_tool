import {Renderer} from "./renderer";
import {QuestionnaireManager} from "../managers/questionnaireManager";

export class questionnaireRenderer extends Renderer {

    manager: QuestionnaireManager;

    constructor(manager: QuestionnaireManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
        const sectorSelect = document.getElementById('sectorSelect') as HTMLSelectElement;
        if (!sectorSelect)
            throw new Error("Sector select element not found");

        const handleChange = () => {
            Renderer.questionnaire.selectSector(sectorSelect.value);
            this.manager.currentSector?.render();
            this.manager.currentSector?.currentSubsector?.render();
            this.manager.currentSector?.currentSubsector?.currentIndicator?.render();
        }

        sectorSelect.removeEventListener('change', handleChange);
        sectorSelect.addEventListener('change', handleChange);
    }

    render() {
        //const chooseSectorChosen = !this.currentSector ? 'selected' : '';
        let sectorOptions = '<option id="placeholder-chooseSector" value="" selected disabled>Choose a sector</option>';
        this.manager.sectors.forEach(sector => {
            const selected = this.manager.currentSector && this.manager.currentSector.name === sector.name ? ' selected' : '';
            sectorOptions += `<option value="${sector.name}"${selected}>${sector.name}</option>`;
        });

        const currentSectorExists = !!this.manager.currentSector; // Hier wird der boolesche Wert erstellt

        let sectorSelectHTML: string;
        if (!currentSectorExists) {
            sectorSelectHTML = `
            <select id="sectorSelect" class="form-select" aria-label="Default select example">
                ${sectorOptions}
            </select>
            `;
        } else {
            sectorSelectHTML = `
            <div class="select-Container">
                <select id="sectorSelect" class="form-select" aria-label="Default select example">
                    ${sectorOptions}
                </select>
            </div>
        `;
        }

        Renderer.attachHTMLToElementWithId('sectorSelectContainer', sectorSelectHTML);
        this.attachEventListeners();
        Renderer.playAnimationOnElementWithId('questionnaireContainer', 'fade-in');
    }
}
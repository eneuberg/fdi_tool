import {Renderer} from "./renderer";
import {Questionnaire} from "../managers/questionnaire";

export class questionnaireRenderer extends Renderer {

    manager: Questionnaire;

    constructor(manager: Questionnaire) {
        super();
        this.manager = manager;
    }

    attachEventListeners() {
        const sectorSelect = document.getElementById('sectorSelect') as HTMLSelectElement;
        if (!sectorSelect)
            throw new Error("Sector select element not found");
        sectorSelect.addEventListener('change', () => {
            Renderer.questionnaire.selectSector(sectorSelect.value);
            this.manager.render();
        });
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
    }
}
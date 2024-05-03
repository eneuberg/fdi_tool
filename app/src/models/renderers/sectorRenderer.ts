export class SectorRenderer extends Renderer {
    manager: SectorManager;

    constructor(manager: SectorManager) {
        super();
        this.manager = manager;
    }

    render(): void {
        const subsectorsHTML = this.manager.subsectors.map(subsector => subsector.renderSubsector()).join('');
        const sectorHTML = `
            <h1> ${this.manager.name}</h1>
            ${subsectorsHTML}
        `;
        Renderer.attachHTMLToElementWithId('questionnaire', sectorHTML);
    }

    attachEventListeners(): void {
        this.manager.subsectors.forEach(subsector => {
            const subsectorElement = document.getElementById(subsector.name);
            if (!subsectorElement) throw new Error(`Element with id ${subsector.name} not found`);
            subsectorElement.addEventListener('click', () => {
                this.manager.currentSubsector = subsector;
                this.render();
            });
        });
    }
}
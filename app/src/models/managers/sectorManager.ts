import { SubsectorManager } from "./subsectorManager";
import {Manager} from "./manager";
import {SectorRenderer} from "../renderers/sectorRenderer";

export class SectorManager extends Manager {
    name: string;
    subsectors: SubsectorManager[];
    currentSubsector: SubsectorManager | null;
    renderer: SectorRenderer;

    constructor(name: string, subsectors?: SubsectorManager[]) {
        super();
        this.name = name;
        this.subsectors = subsectors || [];
        this.currentSubsector = null;
        this.renderer = new SectorRenderer(this);
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

    render(): void {
        this.renderer.render();
    }
}

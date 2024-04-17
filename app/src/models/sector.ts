import {Subsector} from "./subsector";

export class Sector {
    name: string;
    subsectors: Subsector[];
    hasRealSubsectors: boolean;
    currentSubsector: Subsector | null;

    constructor(name: string, subsectors?: Subsector[]) {
        this.name = name;
        this.subsectors = subsectors || [];
        this.hasRealSubsectors = this.subsectors.length > 1;
        this.currentSubsector = null;
    }

    selectSubsector(subsectorId: string): void {
        this.currentSubsector = this.subsectors.find(subsector => subsector.name === subsectorId) || null;
    }
}

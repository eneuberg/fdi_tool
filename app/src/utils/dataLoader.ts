
import * as data from '../data/data.json';
import {Questionnaire} from "../models/managers/questionnaire";
import {Indicator} from "../models/managers/indicator";
import {Subsector} from "../models/managers/subsector";
import {Sector} from "../models/managers/sector";

export function initializeQuestionnaire(jsonData: any): Questionnaire {
    const sectors = Object.keys(jsonData.sectors).map(sectorName => {
        const subsectors = Object.keys(jsonData.sectors[sectorName]).map(subsectorName => {
            const subsectorData = jsonData.sectors[sectorName][subsectorName];
            const indicators = subsectorData.indicators.map((indicator: any) => {
                return new Indicator(indicator.text, indicator.comment, indicator.dimension, indicator.evaluation);
            });
            return new Subsector(subsectorName, indicators);
        });
        return new Sector(sectorName, subsectors);
    });

    const questionnaire = new Questionnaire(sectors);
    console.log(questionnaire);
    return questionnaire;
}

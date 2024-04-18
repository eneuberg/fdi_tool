
import * as data from '../data/data.json';
import {Questionnaire} from "../models/questionnaire";
import {Indicator} from "../models/indicator";
import {Subsector} from "../models/subsector";
import {Sector} from "../models/sector";

export function initializeQuestionnaire(jsonData: any): Questionnaire {
    const sectors = Object.keys(jsonData.sectors).map(sectorName => {
        const subsectors = Object.keys(jsonData.sectors[sectorName]).map(subsectorName => {
            const subsectorData = jsonData.sectors[sectorName][subsectorName];
            const indicators = subsectorData.indicators.map((indicator: any) => {
                return new Indicator(indicator.text, indicator.comment, indicator.evaluation);
            });
            return new Subsector(subsectorName, indicators);
        });
        return new Sector(sectorName, subsectors);
    });

    const questionnaire = new Questionnaire(sectors);
    console.log(questionnaire);
    return questionnaire;
}

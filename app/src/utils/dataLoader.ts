
import * as data from '../data/data.json';
import {Questionnaire} from "../models/questionnaire";
import {Indicator} from "../models/indicator";
import {Subsector} from "../models/subsector";
import {Sector} from "../models/sector";

function initializeQuestionnaire(jsonData: any): Questionnaire {
    const sectors = Object.keys(jsonData.sectors).map(sectorName => {
        const subsectors = Object.keys(jsonData.sectors[sectorName]).map(subsectorName => {
            const subsectorData = jsonData.sectors[sectorName][subsectorName];
            const indicators = subsectorData.indicators.map((indicator: any) => {
                // Directly using the JSON structure as the evaluation criteria
                return new Indicator(indicator.text, indicator.comment, indicator.evaluation);
            });
            return new Subsector(subsectorName, indicators);
        });
        return new Sector(sectorName, subsectors);
    });
    return new Questionnaire(sectors);
}

document.addEventListener('DOMContentLoaded', () => {
    const questionnaire = initializeQuestionnaire(data);
    // Render the questionnaire or do other setup here
});


import * as data from '../data/data.json';
import {QuestionnaireManager} from "../models/managers/questionnaireManager";
import {IndicatorManager} from "../models/managers/indicatorManager";
import {SubsectorManager} from "../models/managers/subsectorManager";
import {SectorManager} from "../models/managers/sectorManager";

export function initializeQuestionnaire(jsonData: any): QuestionnaireManager {
    const sectors = Object.keys(jsonData.sectors).map(sectorName => {
        const subsectors = Object.keys(jsonData.sectors[sectorName]).map(subsectorName => {
            const subsectorData = jsonData.sectors[sectorName][subsectorName];
            const indicators = subsectorData.indicators.map((indicator: any) => {
                return new IndicatorManager(indicator.text, indicator.comment, indicator.dimension, indicator.evaluation);
            });
            return new SubsectorManager(subsectorName, indicators);
        });
        return new SectorManager(sectorName, subsectors);
    });

    const questionnaire = new QuestionnaireManager(sectors);
    console.log(questionnaire);
    return questionnaire;
}

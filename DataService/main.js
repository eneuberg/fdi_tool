class Evaluation {
    constructor(evaluation) {
        this.evaluation = evaluation;
        
    }
}

class Indicator {
    constructor(indicator, comment, evaluation) {
        this.indicator = indicator;
        this.comment = comment;
        this.evaluation = new Evaluation(evaluation);
    }
}

class Subsector {
    constructor(name, indicators) {
        this.name = name;
        this.indicators = indicators;
    }
}

class Sector {
    constructor(name, subsectors) {
        this.name = name;
        this.subsectors = subsectors;
    }
}

// Fetching the JSON data
fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var sectorLib = [];
        const sectors = Object.keys(data.sectors);

        const subsectorsAndIndicators = {};

        var currentSectors = [];
        sectors.forEach(sector => {
            var sectorName = sector; //NAME
            console.log(sectorName)

            // Get subsectors for each sector
            const subsectors = Object.keys(data.sectors[sector]); //SUBSECTOR NAMES
            
            console.log(subsectors)
            
            
            
            // Iterate through subsectors
            var currentSubsectors = [];
            subsectors.forEach(subsector => {
                // Get indicators for each subsector
                console.log("SUBSEC "+subsector)
                

                const indicators = data.sectors[sector][subsector]; //indicators
                console.log(indicators);


                var currentIndicators = [];
                indicators.forEach(indicator =>{
                    
                    const indicatorName = indicator.indicator;
                    const indicatorComment = indicator.comment;
                    const indicatorEvaluation = indicator.evaluation;

                    currentIndicators.push(new Indicator(indicatorName, indicatorComment, indicatorEvaluation));

                    // You can then do whatever you need with these properties
                    console.log('Indicator Name:', indicatorName);
                    console.log('Indicator Comment:', indicatorComment);
                    console.log('Indicator Evaluation:', indicatorEvaluation);
                    console.log("-----------")
                    
                });
                
                currentSubsectors.push(new Subsector(subsector, currentIndicators));

                
            });
                currentSectors.push(new Sector(sectorName, currentSubsectors));

        });

        console.log("Sectors:", currentSectors);
        //console.log("Subsectors and Indicators:", subsectorsAndIndicators);

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
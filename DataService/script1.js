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

            // Get subsectors for each sector
            const subsectors = Object.keys(data.sectors[sector]);

            // Iterate through subsectors
            var currentSubsectors = [];
            subsectors.forEach(subsector => {
                // Get indicators for each subsector
                const indicators = data.sectors[sector][subsector];

                var currentIndicators = [];
                indicators.forEach(indicator => {
                    const indicatorName = indicator.indicator;
                    const indicatorComment = indicator.comment;
                    const indicatorEvaluation = indicator.evaluation;

                    currentIndicators.push(new Indicator(indicatorName, indicatorComment, indicatorEvaluation));
                });

                currentSubsectors.push(new Subsector(subsector, currentIndicators));
            });
            currentSectors.push(new Sector(sectorName, currentSubsectors));
        });

       // Nachdem die Daten verarbeitet wurden, generiere den HTML-Code
       var html = '';
       currentSectors.forEach(sector => {
           html += '<h2 id="sector">' + sector.name + '</h2>';
           sector.subsectors.forEach(subsector => {
               html += '<h3>' + subsector.name + '</h3>';
               subsector.indicators.forEach(indicator => {
                   html += '<p id="indicatorName"><strong>Indicator Name:</strong> ' + indicator.indicator + '</p>';
                   html += '<p id="indicatorComment"><strong>Indicator Comment:</strong> ' + indicator.comment + '</p>';
                   
                   // Anpassung der Indicator-Evaluation basierend auf dem Typ
                   var evaluationHTML = '';
                   if (indicator.evaluation.evaluation === 'multicheckbox') {
                       evaluationHTML += '<input type="checkbox" id="evaluation-checkbox">';
                   } else if (indicator.evaluation.evaluation === 'range') {
                       evaluationHTML += '<input type="text" id="evaluation-text">';
                   } else if (indicator.evaluation.evaluation === 'checkbox') {
                       evaluationHTML += '<input type="checkbox" id="evaluation-yes"> Yes ';
                       evaluationHTML += '<input type="checkbox" id="evaluation-no"> No';
                   }
                   html += '<p><strong>Indicator Evaluation:</strong> ' + evaluationHTML + '</p>';

                   html += '<hr>';
               });
           });
       });
        // Den generierten HTML-Code in das entsprechende HTML-Element einfügen
        document.getElementById('data-container').innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

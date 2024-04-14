class Evaluation {
    constructor(evaluation, rangeOptions = []) {
        this.evaluation = evaluation;
        this.rangeOptions = rangeOptions;
    }
}

// Define the Indicator class
class Indicator {
    constructor(indicator, comment, evaluation) {
        this.indicator = indicator;
        this.comment = comment;
        this.evaluation = new Evaluation(evaluation);
    }
}

// Define the Sector class
class Sector {
    constructor(name, indicators) {
        this.name = name;
        this.indicators = indicators.map(indicator => new Indicator(
            indicator.indicator,
            indicator.comment,
            indicator.evaluation,
        ));
    }
}
export class Result {
    subsectorName: string;
    sectorName: string;
    evaluations: (boolean | null)[];

    constructor(subsectorName: string, sectorName: string, evaluations: (boolean | null)[]) {
        this.subsectorName = subsectorName;
        this.sectorName = sectorName;
        this.evaluations = evaluations;
    }

    render(): string {
        const sectorName = this.sectorName;
        const subsectorName = this.subsectorName;
        const evaluations = this.evaluations;

        let opportunities = evaluations.filter(evaluation => evaluation).length;
        let risks = evaluations.length - opportunities;
        let remaining = evaluations.length - (opportunities + risks); // Calculate remaining indicators

        let sectorNameElement = sectorName ? `<h1>${sectorName}</h1>` : '';
        let subsectorNameElement = subsectorName ? `<h2>${subsectorName}</h2>` : '';
        const score = opportunities === 0 && risks === 0 ? 0 : risks ? (opportunities / risks) / (risks + opportunities) : 1;

        // Calculate percentages
        const oppPercent = (opportunities / evaluations.length) * 100;
        const riskPercent = (risks / evaluations.length) * 100;
        const remainingPercent = (remaining / evaluations.length) * 100;

        return `
        <h1 id="result">YOUR RESULT FOR </h1>
        <span class="sector-name-result">${sectorNameElement}</span>
        <span class="subsector-name-result">${subsectorNameElement}</span>
        <div class="chart">
            <div class="bar opp" style="width: ${oppPercent}%;">${opportunities}</div>
            <div class="bar risk" style="width: ${riskPercent}%;">${risks}</div>
            <div class="bar remaining" style="width: ${remainingPercent}%;">${remaining}</div>
        </div>
        <p id="indicators">Indicators: ${evaluations.length}</p>
        <p id="opportunities">Opportunities: ${opportunities}</p>
        <p id="risk">Risks: ${risks}</p>
        <p id="score">Score: ${(score * 100).toFixed(0)}%</p>
        <a href="index.html" class="back-to-home">Zurück zur Startseite</a>
    `;
    }
}
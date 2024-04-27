import Chart from "chart.js/auto";

export class Result {
    subsectorName: string;
    sectorName: string;
    evaluations: (boolean | null)[];

    constructor(subsectorName: string, sectorName: string, evaluations: (boolean | null)[]) {
        this.subsectorName = subsectorName;
        this.sectorName = sectorName;
        this.evaluations = evaluations;
    }
    renderCanvas(): string {
        return `
        <div class="result">
            <canvas id="chart"></canvas>
        </div>
        `;
    }
    render(canvas: HTMLCanvasElement) {
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

        const indicatorChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Indicators'],
                datasets: [{
                    label: 'Opportunities',
                    data: [opportunities],
                    backgroundColor: 'green',
                }, {
                    label: 'Risks',
                    data: [risks],
                    backgroundColor: 'red',
                }, {
                    label: 'Remaining',
                    data: [remaining],
                    backgroundColor: 'grey',
                }]
            },
            options: {
                scales: {
                    x: { // Horizontal axis
                        stacked: true
                    },
                    y: { // Vertical axis
                        stacked: true,
                    }
                }
            }
        });
    }
}
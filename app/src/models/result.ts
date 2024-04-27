import Chart from "chart.js/auto";
import { EvaluationDimension} from "./subsector";

export class Result {
    subsectorName: string;
    sectorName: string;
    evaluations: EvaluationDimension[];

    constructor(subsectorName: string, sectorName: string, evaluations: EvaluationDimension[]) {
        this.subsectorName = subsectorName;
        this.sectorName = sectorName;
        this.evaluations = evaluations;
    }
    renderCanvas(): string {
        const sectorName = this.sectorName;
        const subsectorName = this.subsectorName;
        let sectorNameElement = sectorName ? `<h3>${sectorName}</h3>` : '';
        let subsectorNameElement = subsectorName ? `<h4>${subsectorName}</h4>` : '';

        const evaluations = this.evaluations;
        let opportunities = evaluations.filter(evaluation => evaluation.evaluationResult).length;
        let risks = evaluations.length - opportunities;
        let remaining = evaluations.length - (opportunities + risks); // Calculate remaining indicators
        const score = opportunities === 0 && risks === 0 ? 0 : risks ? (opportunities / risks) / (risks + opportunities) : 1;

        return `
        <div class="result">
            <h2>Results</h2>
            ${sectorNameElement}
            ${subsectorNameElement}
            <canvas id="chart"></canvas>
            <span class="score">Overall Score: ${score.toFixed(2)}</span>
            <a href="index.html" class="back-to-home">Restart</a>
        </div>
        `;
    }
    render(canvas: HTMLCanvasElement) {
        const evaluations = this.evaluations;

        const dimensions = ['economic', 'social', 'environmental', 'governance'];
        const results = dimensions.map(dimension => {
            const filtered = evaluations.filter(e => e.dimension === dimension);
            const opportunities = filtered.filter(e => e.evaluationResult === true).length;
            const risks = filtered.filter(e => e.evaluationResult === false).length;
            const remaining = filtered.filter(e => e.evaluationResult === null).length;
            const score = opportunities === 0 && risks === 0 ? 0 : risks ? (opportunities / risks) / (risks + opportunities) : 1;
            return { dimension, opportunities, risks, remaining, score };
        });

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: results.map(r => `${r.dimension} (Score: ${r.score.toFixed(2)})`), // Updated labels to include scores
                datasets: [
                    {
                        label: 'Opportunities',
                        data: results.map(r => r.opportunities),
                        backgroundColor: 'green',
                    },
                    {
                        label: 'Risks',
                        data: results.map(r => r.risks),
                        backgroundColor: 'red',
                    },
                    {
                        label: 'Remaining',
                        data: results.map(r => r.remaining),
                        backgroundColor: 'grey',
                    }
                ]
            },
            options: {
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                },
                plugins: {
                    tooltip: {  // Correctly use 'tooltip' under 'plugins'
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}
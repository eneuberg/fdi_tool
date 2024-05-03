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
        let sectorNameElement = sectorName ? `<h3 class="text-center">Sector: ${sectorName}</h3>` : '';
        let subsectorNameElement = subsectorName ? `<h4 class="text-center">Subsector: ${subsectorName}</h4>` : '';

        const evaluations = this.evaluations;
        let opportunities = evaluations.filter(evaluation => evaluation.evaluationResult).length;
        let risks = evaluations.length - opportunities;
        const score = opportunities === 0 && risks === 0 ? 0 : risks ? (opportunities / risks) / (risks + opportunities) : 1;

        return `
            <div class="result text-center">
                <h2 class=" font-weight-bold">Results</h2>
                ${sectorNameElement}
                ${subsectorNameElement}
                <div class="container mt-10 mb-2">
                    <div class="row">
                        <div class="col-12"> <!-- Adjusted to 6 columns for medium devices -->
                            <canvas id="detailedChart" class="chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center"> <!-- Bootstrap class to center the link -->
                    <a href="index.html" class="back-to-home">Restart</a>
                 </div>
            </div>
        `;
    }
    render(detailedCanvas: HTMLCanvasElement): void {
        const evaluations = this.evaluations;
        const dimensions = ['economic', 'social', 'environmental', 'governance'];

        const results = dimensions.map(dimension => {
            const filtered = evaluations.filter(e => e.dimension === dimension);
            const opportunities = filtered.filter(e => e.evaluationResult === true).length;
            const risks = filtered.filter(e => e.evaluationResult === false).length;
            const neutral = filtered.filter(e => e.evaluationResult === null).length;
            const score = opportunities === 0 && risks === 0 ? 0 : risks ? (opportunities / risks) / (risks + opportunities) : 1;
            dimension = dimension.charAt(0).toUpperCase() + dimension.slice(1);
            return { dimension, opportunities, risks, neutral, score };
        });

// Aggregate totals across all dimensions
        const totalOpportunities = results.reduce((total, r) => total + r.opportunities, 0);
        const totalRisks = results.reduce((total, r) => total + r.risks, 0);
        const totalNeutral = results.reduce((total, r) => total + r.neutral, 0);
// Calculate a weighted overall score using the formula or a simple average as a placeholder
        const overallScore = results.reduce((total, r) => total + r.score, 0) / results.length;

        new Chart(detailedCanvas, {
            type: 'bar',
            data: {
                labels: [['Overall', overallScore.toFixed(2)]].concat(results.map(r => [r.dimension, r.score.toFixed(2)])),
                datasets: [
                    {
                        label: 'Opportunities',
                        data: [totalOpportunities].concat(results.map(r => r.opportunities)),
                        backgroundColor: 'green',
                    },
                    {
                        label: 'Risks',
                        data: [totalRisks].concat(results.map(r => r.risks)),
                        backgroundColor: 'red',
                    },
                    {
                        label: 'Neutral',
                        data: [totalNeutral].concat(results.map(r => r.neutral)),
                        backgroundColor: 'grey',
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            autoSkip: false,  // Turn off auto-skip
                            maxRotation: 50,  // Optional: Adjust label rotation if needed
                            minRotation: 50,   // Optional: Adjust label rotation if needed
                        }
                    },
                    y: { stacked: true }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
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
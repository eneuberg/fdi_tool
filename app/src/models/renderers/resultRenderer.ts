import Chart from "chart.js/auto";
import { EvaluationDimension} from "../managers/subsectorManager";
import {Renderer} from "./renderer";
import {ResultManager} from "../managers/resultManager";

export class ResultRenderer extends Renderer {
    manager: ResultManager

    constructor(resultManager: ResultManager) {
        super();
        this.manager = resultManager;
    }

    protected attachEventListeners() {

    }

    private renderCanvas(): void {
        const currentSector = this.manager.questionnaireManager.currentSector;
        const sectorName = currentSector?.name;
        const subsectorName = currentSector?.currentSubsector?.isRealSubsector ? currentSector?.currentSubsector?.name : '';
        let sectorNameElement = sectorName ? `<h5 class="fw-lighter text-center">Sector: ${sectorName}</h5>` : '';
        let subsectorNameElement = subsectorName ? `<h5 class="fw-lighter text-center">Subsector: ${subsectorName}</h5>` : '';

        const resultHTML = `
            <div class="result text-center p-5">
                <div class="mb-3">  
                    <h2 class="fw-bold">Results</h2>
                    ${sectorNameElement}
                    ${subsectorNameElement}
                </div>
                <div class="container border-dark border-1 border-top border-bottom mx-auto">
                    <div class="row col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
                        <div class="col-12 m-3 mx-auto"> <!-- Adjusted to 6 columns for medium devices -->
                            <canvas id="detailedChart" class="chart"></canvas>
                        </div>
                        <div class="col-8 m-3 mx-auto">
                            <canvas id="summaryChart" class="chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center"> <!-- Bootstrap class to center the link -->
                    <a href="index.html" class="back-to-home mt-4">Restart</a>
                 </div>
            </div>
        `;

        Renderer.attachHTMLToElementWithId('mainContainer', resultHTML);
    }

    private renderCharts() {
        const evaluations = this.manager.questionnaireManager.currentSector?.currentSubsector?.evaluateIndicators() || [];
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

        const totalOpportunities = results.reduce((total, r) => total + r.opportunities, 0);
        const totalRisks = results.reduce((total, r) => total + r.risks, 0);
        const totalNeutral = results.reduce((total, r) => total + r.neutral, 0);

        this.renderSummaryChart(totalOpportunities, totalRisks, totalNeutral);
        this.renderDetailedChart(results);
    }

    private renderSummaryChart(totalOpportunities: number, totalRisks: number, totalNeutral: number) {
        const summaryCanvas = document.getElementById('summaryChart') as HTMLCanvasElement;
        new Chart(summaryCanvas, {
            type: 'bar',
            data: {
                labels: [''],
                datasets: [
                    {
                        label: 'Opportunities',
                        data: [totalOpportunities],
                        backgroundColor: 'green',
                    },
                    {
                        label: 'Risks',
                        data: [totalRisks],
                        backgroundColor: 'red',
                    },
                    {
                        label: 'Neutral',
                        data: [totalNeutral],
                        backgroundColor: 'grey',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'n Indicators'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Summary: Risk & Opportunity Profile'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }

    private renderDetailedChart(results: any[]) {
        const canvas = document.getElementById('detailedChart') as HTMLCanvasElement;
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: results.map(r => r.dimension),
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
                        label: 'Neutral',
                        data: results.map(r => r.neutral),
                        backgroundColor: 'grey',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'n Indicators'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Opportunities & Risks Across Key Performance Areas'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }

    render(): void {
        Renderer.playAnimationOnElementWithId('questionnaireContainer', 'fade-out')
            .then(() => {
                this.renderCanvas();
                this.renderCharts();
                Renderer.playAnimationOnElementWithId('questionnaireContainer', 'fade-in');
            });
    }
}
import Chart from "chart.js/auto";
import {Renderer} from "./renderer";
import {ResultManager} from "../managers/resultManager";

export class ResultRenderer extends Renderer {
    manager: ResultManager

    constructor(resultManager: ResultManager) {
        super();
        this.manager = resultManager;
    }

    private calculateValue(opportunities: number, risks: number) {
        if (opportunities === 0 && risks === 0) {
            return 0;
        }

        if (risks === undefined || risks === null || risks === 0) {
            return 1;
        }

        const sum = opportunities + risks;
        return (opportunities / risks) / sum;
    }

    protected attachEventListeners() {
        window.addEventListener('resize', () => {
            const detailedChart = document.getElementById('detailedChart') as HTMLCanvasElement;
            const summaryChart = document.getElementById('summaryChart') as HTMLCanvasElement;
            if (detailedChart && summaryChart) {
                detailedChart.height = summaryChart.height = 300;
            }
        });
    }

    private renderCanvas(): void {
        const currentSector = this.manager.questionnaireManager.currentSector;
        const sectorName = currentSector?.name;
        const subsectorName = currentSector?.currentSubsector?.isRealSubsector ? currentSector?.currentSubsector?.name : '';
        let sectorNameElement = sectorName ? `<h5 class="fw-lighter text-center">Sector: ${sectorName}</h5>` : '';
        let subsectorNameElement = subsectorName ? `<h5 class="fw-lighter text-center">Subsector: ${subsectorName}</h5>` : '';

        const resultHTML = `
            <div class="result text-center py-5 px-2 px-md-3 px-lg-5">
                <div class="mb-3">  
                    <h2 class="fw-bold">Results</h2>
                    ${sectorNameElement}
                    ${subsectorNameElement}
                </div>
                <div class="container border-dark border-1 border-top border-bottom mx-auto">
                    <div class="row col-xl-7 col-lg-8 col-md-10 col-12 mx-auto">
                        <div class="detailedChart col-12 m-3 mx-auto"> <!-- Adjusted to 6 columns for medium devices -->
                            <canvas id="detailedChart" class="chart"></canvas>
                        </div>
                        <div class="summaryChart col-9 col-lg-7 m-3 mx-auto">
                            <canvas id="summaryChart" class="chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center"> <!-- Bootstrap class to center the link -->
                    <a href="index.html" class="btnH text-uppercase fs-5 mt-4">Restart</a>
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
            const total = opportunities + risks + neutral;

            // Calculate percentages
            const opportunitiesPercent = total > 0 ? (opportunities / total) * 100 : 0;
            const risksPercent = total > 0 ? (risks / total) * 100 : 0;
            const neutralPercent = total > 0 ? (neutral / total) * 100 : 0;

            dimension = dimension.charAt(0).toUpperCase() + dimension.slice(1);
            return {
                dimension,
                opportunities: opportunitiesPercent,
                risks: risksPercent,
                neutral: neutralPercent,
                absolute: {
                    opportunities,
                    risks,
                    neutral
                }
            };
        });

        // Aggregate totals and calculate overall percentages for summary chart
        const totalOpportunities = results.reduce((total, r) => total + r.absolute.opportunities, 0);
        const totalRisks = results.reduce((total, r) => total + r.absolute.risks, 0);
        const totalNeutral = results.reduce((total, r) => total + r.absolute.neutral, 0);

        const total = totalOpportunities + totalRisks + totalNeutral;

        const summaryData = {
            totalOpportunities: totalOpportunities,
            totalRisks: totalRisks,
            totalNeutral: totalNeutral,
            percentages: {
                opportunitiesPercent: (totalOpportunities / total) * 100,
                risksPercent: (totalRisks / total) * 100,
                neutralPercent: (totalNeutral / total) * 100
            }
        };

// Now passing the structured data to the summary chart function
        this.renderSummaryChart(summaryData);
        this.renderDetailedChart(results);
    }

    private renderSummaryChart(summaryData: any) {
        const score = this.calculateValue(summaryData.totalOpportunities, summaryData.totalRisks);
        const summaryCanvas = document.getElementById('summaryChart') as HTMLCanvasElement;
        new Chart(summaryCanvas, {
            type: 'bar',
            data: {
                labels: ['Overall Score: ' + score.toFixed(2)],
                datasets: [
                    {
                        label: 'Opportunities',
                        data: [summaryData.percentages.opportunitiesPercent],
                        backgroundColor: 'green',
                    },
                    {
                        label: 'Risks',
                        data: [summaryData.percentages.risksPercent],
                        backgroundColor: 'red',
                    },
                    {
                        label: 'Neutral',
                        data: [summaryData.percentages.neutralPercent],
                        backgroundColor: 'grey',
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: {
                        stacked: true,
                        max: 100, // Sets the maximum scale value to 100
                        title: {
                            display: true,
                            text: 'Percentage'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + "%"; // Append a percentage sign to the y-axis ticks
                            }
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
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const datasetLabel = context.dataset.label || "Unknown";
                                // Type assertion to ensure 'value' is treated as a number
                                const value = context.raw as number; // Safe assumption since it's known to be numeric

                                let absoluteValue = 0;
                                switch (datasetLabel) {
                                    case 'Opportunities':
                                        absoluteValue = summaryData.totalOpportunities;
                                        break;
                                    case 'Risks':
                                        absoluteValue = summaryData.totalRisks;
                                        break;
                                    case 'Neutral':
                                        absoluteValue = summaryData.totalNeutral;
                                        break;
                                }

                                return `${datasetLabel}: ${value.toFixed(2)}% (Absolute: ${absoluteValue})`;
                            }
                        }
                    }
                }
            }
        });
    }

    private renderDetailedChart(results: any[]) {
        const labelsWithScores = results.map(r => {
            const score = this.calculateValue(r.absolute.opportunities, r.absolute.risks);
            return [r.dimension, `Score: ${score.toFixed(2)}`]; // Array with dimension and score
        });

        const canvas = document.getElementById('detailedChart') as HTMLCanvasElement;
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labelsWithScores,
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
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: {
                        stacked: true,
                        max: 100, // Sets the maximum scale value to 100
                        title: {
                            display: true,
                            text: 'Percentage'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + "%"; // Append a percentage sign to the y-axis ticks
                            }
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
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const datasetLabel = context.dataset.label || "Unknown";  // Default label if undefined
                                const dataIndex = context.dataIndex;
                                const value = context.raw;

                                const absoluteValue = results[dataIndex].absolute[datasetLabel.toLowerCase()] || 0; // Default to 0 if not found

                                return `${datasetLabel}: ${value}% (Absolute: ${absoluteValue})`;
                            }
                        }
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
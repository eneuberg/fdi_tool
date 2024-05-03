import {SubsectorManager} from "../managers/subsectorManager";
import {Renderer} from "./renderer";

export class SubsectorRenderer extends Renderer {
    manager: SubsectorManager;

    constructor(manager: SubsectorManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
        const form = document.getElementById('indicatorForm');
        if (!form) throw new Error('Form not found');

        const handleNextSubmit = (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            const firstChild = form.querySelector('input') as HTMLInputElement;
            switch (firstChild.name) {
                case 'multiCheckbox' : {
                    const checkboxData = formData.get('multiCheckbox');
                    let booleanData = checkboxData === 'yes' ? true : checkboxData === 'no' ? false : null;
                    Renderer.questionnaire.storeResponse(booleanData);
                    break;
                }
                case 'singleCheckbox': {
                    const checkboxData = formData.get('singleCheckbox');
                    let booleanData = checkboxData === 'yes' ? true : checkboxData === 'no' ? false : null;
                    Renderer.questionnaire.storeResponse(booleanData);
                    break;
                }
                case 'rangeInput': {
                    const rangeData = formData.get('rangeInput');
                    Renderer.questionnaire.storeResponse(rangeData);
                    break;
                }
            }
            Renderer.questionnaire.nextIndicator();
            this.updateProgressBar();
            this.manager.currentIndicator?.render();
        }

        const previousButton = document.getElementById('previousButton');
        if (!previousButton) throw new Error('Previous button not found');

        const handlePreviousClick = () => {
            Renderer.questionnaire.previousIndicator();
            this.updateProgressBar();
            this.manager.currentIndicator?.render();
        }

        form.removeEventListener('submit', handleNextSubmit);
        console.log('removed event listener')
        form.addEventListener('submit', handleNextSubmit);

        previousButton.removeEventListener('click', handlePreviousClick);
        previousButton.addEventListener('click', handlePreviousClick);
    }

    render(): void {
        const nameHTML = this.manager.isRealSubsector ? `<h2> ${this.manager.name}</h2>` : '';
        const currentIndex = this.manager.currentIndicator ? this.manager.indicators.indexOf(this.manager.currentIndicator) : 0;
        const progressValue = currentIndex / (this.manager.indicators.length - 1); // Adjusted formula

        const indicatorFormHTML = `
            <div class="row">
                <div class="col-12">
                    <form class="indicatorForm" id="indicatorForm">
                        <div id="indicatorContainer"></div>
                        <div class="next-back-button row">
                            <div class="col-12 col-md-6">
                                <button id="previousButton" type="button" class="btn btn-secondary w-100 mb-3">Previous</button>
                            </div>
                            <div class="col-12 col-md-6">
                                <button id="nextButton" type="submit" class="btn btn-primary w-100">Next</button>
                            </div>
                        </div>
                    </form>
                </div>
                <progress id="progressBar" class="progressBar mt-4" value="0" max="1"></progress>
            </div>
            `
        Renderer.attachHTMLToElementWithId('indicatorFormContainer', indicatorFormHTML);
        this.manager.currentIndicator?.render();
        this.attachEventListeners();
    }

    private updateProgressBar(): void {
        const currentIndex = this.manager.currentIndicator ? this.manager.indicators.indexOf(this.manager.currentIndicator) : 0;
        const progressValue = currentIndex / (this.manager.indicators.length - 1); // Adjusted formula
        const progressBar = document.getElementById('progressBar') as HTMLProgressElement;
        progressBar.value = progressValue;
    }
}
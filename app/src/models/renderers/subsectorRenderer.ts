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
            Renderer.playAnimationOnElementWithId('indicatorContainer', 'fade-out')
                .then(() => {
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
                });
        }

        const previousButton = document.getElementById('previousButton');
        if (!previousButton) throw new Error('Previous button not found');

        const handlePreviousClick = () => {
            Renderer.playAnimationOnElementWithId('indicatorContainer', 'fade-out')
                .then(() => {
                    Renderer.questionnaire.previousIndicator();
                    this.manager.currentIndicator?.render();
                    this.updateProgressBar();
                    console.log('Previous button clicked')
                });
        }

        form.removeEventListener('submit', handleNextSubmit);
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
                                <button id="previousButton" type="button" class="btn btn-secondary w-100">Previous</button>
                            </div>
                            <div class="col-12 col-md-6">
                                <button id="nextButton" type="submit" class="btn btn-primary w-100">Next</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="progress mt-4">
                    <div class="bar">
                        <div class="progress-value"></div>
                    </div>
                </div>
            </div>
            `
        Renderer.attachHTMLToElementWithId('indicatorFormContainer', indicatorFormHTML);
        this.manager.currentIndicator?.render();
        this.attachEventListeners();
        Renderer.playAnimationOnElementWithId('indicatorFormContainer', 'fade-in');
    }

    private updateProgressBar(): void {
        const currentIndex = this.manager.currentIndicator
            ? this.manager.indicators.indexOf(this.manager.currentIndicator)
            : 0;
        const totalIndicators = this.manager.indicators.length - 1;
        const progressValue = (currentIndex / totalIndicators) * 100; // Calculate percentage

        const progressBar = document.querySelector('.progress .bar') as HTMLElement;
        if (progressBar) {
            progressBar.style.setProperty('--progress', `${progressValue}%`); // Update CSS variable
        }
    }

}
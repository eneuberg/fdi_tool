import {Renderer} from "../renderer";
import {MultiCheckboxEvaluationManager} from "../../managers/evaluation/multiCheckboxEvaluationManager";

export class MultiCheckboxEvaluationRenderer extends Renderer   {
    manager: MultiCheckboxEvaluationManager;

    constructor(manager: MultiCheckboxEvaluationManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
        const maskedOverflow = document.querySelector('.masked-overflow') as HTMLElement;

        function checkOverflow() {
            if (!maskedOverflow) return;

            const hasOverflow = maskedOverflow.scrollHeight > maskedOverflow.clientHeight;

            if (hasOverflow) {
                maskedOverflow.classList.remove('no-overflow');
            } else {
                maskedOverflow.classList.add('no-overflow');
            }
        }

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
    }

    render(): void {
        // Map each option into a <p> element.
        const optionsHtml = this.manager.options.map(option =>
            `<li class="option-item text-start ps-4 mt-3">  ${option}</li>`
        ).join('');


        const yesChecked = this.manager.response === true ? 'checked' : '';
        const noChecked = this.manager.response === false ? 'checked' : '';

        const checkboxesHtml = `
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="no" ${noChecked} required> No</label>
        <label><input class="form-check-input mx-1" type="radio" name="multiCheckbox" value="yes" ${yesChecked} required> Yes</label>
    `;

        // Return the combined HTML string
        const evaluationHTML = `
            <div class="masked-overflow mb-2">
                <ul style="list-style-type: decimal;">
                    ${optionsHtml}
                </ul>
            </div>
            <div class="input-container d-flex justify-content-center mb-4" >
                ${checkboxesHtml} 
            </div>`;

        Renderer.attachHTMLToElementWithId('evaluationContainer', evaluationHTML);
        this.attachEventListeners();
    }
}
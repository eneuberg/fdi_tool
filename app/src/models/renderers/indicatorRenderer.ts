import {Renderer} from "./renderer";
import {IndicatorManager} from "../managers/indicatorManager";
import tooltipIcon from "../../resources/tooltip.svg";

export class IndicatorRenderer extends Renderer {
    manager: IndicatorManager;

    constructor(manager: IndicatorManager) {
        super();
        this.manager = manager;
    }

    protected attachEventListeners() {
    }

    render(): void {
        const commentHtml = this.manager.comment ? `
            <span class="comment">
                <img src="${tooltipIcon}" alt="(?)" width="24" height="24">
                <span class="commentText bg-dark text-white p-3 text-center">${this.manager.comment}</span>
            </span>
            ` : '';

        const indicatorHTML = `
            <div class="indicator flex-column align-items-center" id="indicator">
                <p id="question" class="text-start fw-bold ps-3 mt-3">${this.manager.text}   ${commentHtml}</p>
                <div id="evaluationContainer"></div>
            </div>
            `;

        Renderer.attachHTMLToElementWithId('indicatorContainer', indicatorHTML);
        this.manager.evaluation.render();
        Renderer.playAnimationOnElementWithId('indicatorContainer', 'fade-in')
    }
}
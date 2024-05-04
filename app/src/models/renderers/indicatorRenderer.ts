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
        const comment = document.querySelector('.comment') as HTMLElement;
        const commentText = document.querySelector('.commentText') as HTMLElement;

        function positionCommentText(): void {
            if (comment && commentText) {
                const commentRect = comment.getBoundingClientRect();
                commentText.style.top = `${commentRect.bottom}px`;
            }
        }

        positionCommentText();

        window.addEventListener('resize', positionCommentText);
        window.addEventListener('scroll', positionCommentText);
    }

    render(): void {
        const commentHtml = this.manager.comment ? `
            <span class="comment">  
                <span class="seeMore align-content-center fw-lighter">See more: </span>
                <img class="align-sub" src="${tooltipIcon}" alt="(?)" width="22" height="22">
                <span class="commentText bg-dark text-white fw-lighter fs-6 p-3 text-center">${this.manager.comment}</span>
            </span>
                ` : '';

        const indicatorHTML = `
            <div class="indicator flex-column align-items-center" id="indicator">
                <p id="question" class="text-start fw-bold ps-3 mt-3">
                    <span class="me-3">
                        ${this.manager.text} 
                    </span>
                ${commentHtml}
                </p>
                <div id="evaluationContainer"></div>
            </div>
        `;

        Renderer.attachHTMLToElementWithId('indicatorContainer', indicatorHTML);
        this.manager.evaluation.render();
        Renderer.playAnimationOnElementWithId('indicatorContainer', 'fade-in');
        this.attachEventListeners();
    }
}
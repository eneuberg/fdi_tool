import {Manager} from "./manager";
import {ResultRenderer} from "../renderers/resultRenderer";

export class ResultManager extends Manager  {
    renderer: ResultRenderer;

    constructor() {
        super();
        this.renderer = new ResultRenderer(this);
    }
}
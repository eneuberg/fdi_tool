import {Renderer} from "../renderers/renderer";

export abstract class Manager {
    abstract renderer: Renderer;
    abstract render(): void;
}
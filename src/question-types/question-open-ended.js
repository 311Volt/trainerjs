import * as com from "../common.js"
import { TrainerQuestion } from "../question.js"

export class TrainerOEQView {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    static createTextArea() {
        let ret = document.createElement("textarea");
        ret.style.width = "500px";
        ret.style.height = "200px";
        return ret;
    }

    showTextArea() {
        this.eTextArea = TrainerOEQView.createTextArea();
        this.containerElement.appendChild(this.eTextArea);
    }

    getAnswer() {
        return this.eTextArea.value.trim();
    }
}

export class TrainerOEQ extends TrainerQuestion {
    constructor(containerElement, qData) {
        super(containerElement, qData);
        this.view = new TrainerOEQView(containerElement);
    }

    show() {
        this.view.showTextArea();
    }

    getScore() {
        return (this.view.getAnswer() == this.qData.exampleAnswer.trim()) ? 1.0 : 0.0;
    }

    evaluate() {
        this.evaluateCallback();
        return this.getScore();
    }
}

import * as com from "./common.js";

export class TrainerQuestion {
    constructor(containerElement, qData) {
        this.qData = qData;
        this.content = qData.question;
        this.containerElement = containerElement;
        this.evaluateCallback = () => {};
    }

    show(containerElement) {
        
    }

    showTitle(node) {
        if(this.qData.enableRawHTML == true) {
            node.innerHTML = this.qData.question;
        } else {
            node.innerText = this.qData.question;
        }
    }

    evaluate() {
        this.evaluateCallback();
    }

    hide() {
        this.containerElement.innerHTML = "";
    }

    getScore() {
        return 0;
    }
}


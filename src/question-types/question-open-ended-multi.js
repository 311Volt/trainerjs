import * as com from "../common.js"
import { TrainerQuestion } from "../question.js"

//defining "short" as 1 line and less than 50 characters
function isStringShort(str) {
    return !(str.includes("\n") || str.length >= 50);
}

class TrainerOEQMultiView {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    static createSubQuestion(subQ) {
        let ret = document.createElement("div");
        ret.appendChild(com.createElementWithText("span", subQ.question));
        let txt = document.createElement("textarea");
        txt.cols = "60";
        ret.appendChild(document.createElement("br"));
        if(isStringShort(subQ.exampleAnswer)) {
            txt.cols = "30";
            txt.rows = "1";
        } else {
            txt.rows = "15";
        }
        ret.appendChild(txt);
        return ret;
    }

    showSubQuestions() {
        let tab = document.createElement("table");

    }

    addSubQuestion(subQ) {
        this.containerElement.appendChild(TrainerOEQMultiView.createSubQuestion(subQ));
    }

    getAnswer(pos) {
        return this.containerElement.getElementsByTagName("textarea")[pos].value.trim();
    }

    static createTextArea() {
        let ret = document.createElement("textarea");
        ret.style.width = "500px";
        ret.style.height = "200px";
        return ret;
    }

    showTextArea() {
        this.containerElement.appendChild(TrainerOEQView.createTextArea());
    }
}

export class TrainerOEQMulti extends TrainerQuestion {
    constructor(containerElement, qData) {
        super(containerElement, qData);
        this.view = new TrainerOEQMultiView(containerElement);
    }

    show() {
        this.qData.subQuestions.forEach(q => {
            console.log(q);
            this.view.addSubQuestion(q);
        });
    }

    getScore() {
        let ret = 0;
        for(let i=0; i<this.qData.subQuestions.length; i++) {
            ret += (
                this.qData.subQuestions[i].exampleAnswer.trim() == this.view.getAnswer(i)
            ) ? 1.0 : 0.0;
        }
        ret /= this.qData.subQuestions.length;
        return ret;
    }

    evaluate() {
        this.evaluateCallback();
        return this.getScore();
    }
}
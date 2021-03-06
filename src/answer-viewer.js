import * as com from "./common.js";

export class TrainerAnswerViewer {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    static createAnswerElement(content, mode) {
        let ret = document.createElement("div");
        ret.classList.add("trc-ceq-answer");
        if(mode) {
            ret.innerHTML = content;
        } else {
            ret.innerText = content;
        }
        return ret;
    }

    static createInfoElement(content, mode) {
        let ret = TrainerAnswerViewer.createAnswerElement(content, mode);
        ret.prepend(com.createElementWithText("strong", "Info: "));
        return ret;
    }

    hide() {
        this.containerElement.style.display = "none";
    }

    show(qData) {
        //console.log(qData);
        this.containerElement.innerHTML = "";
        this.containerElement.style.display = "block";
        //let hdrText = qData.questionType.includes("open") ? "Przykładowe odpowiedzi" : "Poprawne odpowiedzi";
        let isOpen = qData.questionType.includes("open") && (!qData.evaluable);
        let isMulti = qData.questionType.includes("multi");
        let hdrText = (isMulti?"Odpowiedzi":"Odpowiedź") + (isOpen?" (przykład)":"");

        let answerList = new Array();

        if(qData.correctAnswer != undefined) {
            answerList.push(qData.answers[qData.correctAnswer]);
        } else if(qData.correctAnswers) {
            qData.correctAnswers.forEach((q) => {
                answerList.push(qData.answers[q]);
            });
        } else if(qData.exampleAnswer) {
            answerList.push(qData.exampleAnswer);
        } else if(qData.subQuestions) {
            qData.subQuestions.forEach((sq) => {
                answerList.push(sq.question + ": " + sq.exampleAnswer);
            });
        }
        let dMode = qData.enableRawHTML==true;

        this.containerElement.appendChild(com.createElementWithText("h2", hdrText));
        answerList.forEach((q) => {
            this.containerElement.appendChild(
                TrainerAnswerViewer.createAnswerElement(q, dMode)
            );
        });

        if(qData.info != undefined) {
            this.containerElement.appendChild(
                TrainerAnswerViewer.createInfoElement(qData.info, dMode)
            )
        }
    }
}
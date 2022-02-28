import * as com from "./common.js";

export class TrainerAnswerViewer {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    static createAnswerElement(ans) {
        let ret = document.createElement("div");
        ret.classList.add("trc-ceq-answer");
        ret.innerText = ans;
        return ret;
    }

    hide() {
        this.containerElement.style.display = "none";
    }

    show(qData) {
        console.log(qData);
        this.containerElement.innerHTML = "";
        this.containerElement.style.display = "block";
        let hdrText = qData.questionType.includes("open") ? "Przykładowe odpowiedzi" : "Poprawne odpowiedzi";

        let answerList = new Array();

        if(qData.correctAnswer) {
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


        this.containerElement.appendChild(com.createElementWithText("h2", hdrText));
        answerList.forEach((q) => {
            this.containerElement.appendChild(
                TrainerAnswerViewer.createAnswerElement(q)
            );
        });
    }
}
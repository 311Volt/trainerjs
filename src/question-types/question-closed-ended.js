import * as com from "../common.js"
import { TrainerQuestion } from "../question.js"

export class TrainerCEQView {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    static createAnswerElement(pos, num, text, callback, isMulti) {
        let ret = document.createElement("div");

        ret.classList.add("trc-ceq-answer", "trc-hover-highlight");
        ret.appendChild(com.createElementWithText("strong", com.asciiChar("a", pos) + ") "));
        ret.appendChild(com.createElementWithText("span", text));
        ret.setAttribute("data-pos", pos);
        ret.setAttribute("data-num", num);
        ret.onclick = callback;
        if(isMulti) {
            ret.classList.add("trc-multi");
        }
        return ret;
    }

    renderAnswers(answers, ansPermutation, btnCallback, isMulti) {
        this.containerElement.innerHTML = "";
        let len = answers.length;
        for(let i=0; i<len; i++) {
            this.containerElement.appendChild(TrainerCEQView.createAnswerElement(
                i, ansPermutation[i], answers[ansPermutation[i]], ()=>{btnCallback(i)}, isMulti
            ));
        }

        this.answerElements = Array.from(this.containerElement.getElementsByClassName("trc-ceq-answer"));
    }

    updateAnswerSelections(selections, ansInvPermutation) {
        this.answerElements.forEach((ans) => {
            let ansNum = ans.getAttribute("data-num");
            if(selections.has(String(ansNum))) {
                ans.classList.add("trc-selected-answer");
            } else {
                ans.classList.remove("trc-selected-answer");
            }
        });
    }

    revealCorrectAnswers(correctAnswers) {
        this.answerElements.forEach((ans) => {
            ans.classList.remove("trc-hover-highlight");
            ans.onclick = ()=>{};
            if(correctAnswers.has(ans.getAttribute("data-num"))) {
                ans.classList.add("trc-correct-answer");
            } else {
                ans.classList.add("trc-wrong-answer");
            }
        });
    }
}

export class TrainerCEQ extends TrainerQuestion {
    constructor(containerElement, qData) {
        super(containerElement, qData);
        this.selectedAnswers = new Set();
        this.view = new TrainerCEQView(this.containerElement);
        this.isMulti = false;
        
        this.ansPermutation = com.randomPermutation(this.getNumAnswers());
        this.ansInvPermutation = com.inversePermutation(this.ansPermutation);
        this.buildCorrectAnswerSet();
    }

    buildCorrectAnswerSet() {
        this.correctAnswers = new Set();
        this.correctAnswers.add(String(this.qData.correctAnswer));
    }

    getNumAnswers() {
        return this.qData.answers.length;
    }

    show() {
        this.selectedAnswers.clear();
        this.render();
    }

    getAnswerAtPos(pos) {
        return this.qData.answers[this.ansPermutation[pos]];
    }

    render() {
        this.view.renderAnswers(this.qData.answers, this.ansPermutation, position => {
            this.selectAnswer(position);
        });
        this.view.updateAnswerSelections(this.selectedAnswers, this.ansInvPermutation);
    }

    selectAnswer(pos) {
        this.selectedAnswers.add(String(this.ansPermutation[pos]));
        this.view.updateAnswerSelections(this.selectedAnswers, this.ansInvPermutation);
        this.evaluate();
    }

    getScore() {
        if(this.correctAnswers.size == 0) {
            return (this.selectedAnswers.size == 0) ? 1.0 : 0.0;
        }
        let wrongAnswers = com.setDifference(
            new Set(com.integerSequence(this.getNumAnswers()).map(x=>String(x))),
            this.correctAnswers
        );

        let correctSelectedAnswers = com.setIntersection(this.correctAnswers, this.selectedAnswers);
        let wrongSelectedAnswers = com.setIntersection(wrongAnswers, this.selectedAnswers);
        let scoreUnscaled = correctSelectedAnswers.size - wrongSelectedAnswers.size;
        let score = com.numClamp(
            scoreUnscaled/this.correctAnswers.size,
            0.0, 1.0
        );
        return score;
    }

    evaluate() {
        this.view.revealCorrectAnswers(this.correctAnswers);
        this.evaluateCallback();
        return this.getScore();
    }

}
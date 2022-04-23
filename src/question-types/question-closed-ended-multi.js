import * as com from "../common.js"

import { TrainerCEQView, TrainerCEQ } from "./question-closed-ended.js"

export class TrainerCEQMulti extends TrainerCEQ {
    constructor(containerElement, qData) {
        super(containerElement, qData);
        this.isMulti = true;
    }

    buildCorrectAnswerSet() {
        this.correctAnswers = new Set(this.qData.correctAnswers.map((x) => String(x)));
    }

    selectAnswer(pos) {
        let strQAtPos = String(this.ansPermutation[pos]);
        if(this.selectedAnswers.has(strQAtPos)) {
            this.selectedAnswers.delete(strQAtPos);
        } else {
            this.selectedAnswers.add(strQAtPos);
        }
        this.view.updateAnswerSelections(this.selectedAnswers, this.ansInvPermutation);
    }
}
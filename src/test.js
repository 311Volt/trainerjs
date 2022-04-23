import {xorshift32} from "./rng/xorshift32.js"
import { createQuestionFromInputObject } from "./question-factory.js";
import { TrainerAnswerViewer } from "./answer-viewer.js";
import { TrainerResourceBrowser } from "./resource-browser.js";
import * as com from "./common.js";

export class TrainerTestView {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.eQC = com.byCl0_(this.containerElement, "trc-question-container");
        this.eQNumberText = com.byCl0_(this.containerElement, "trc-question-number");
        this.eQContent = com.byCl0_(this.containerElement, "trc-question-text");
        this.eNavButtons = com.byCl0_(this.containerElement, "trc-navigation-buttons");
        this.eBtnEvaluate = com.byCl0_(this.eNavButtons, "trc-button-evaluate");
        this.eBtnNextQ = com.byCl0_(this.eNavButtons, "trc-button-next-question");
        this.eBtnRestart = com.byCl0_(this.eNavButtons, "trc-button-restart");
    }


    setButtonCallbacks(evaluate, nextQ, restart) {
        this.eBtnEvaluate.onclick = evaluate;
        this.eBtnNextQ.onclick = nextQ;
        this.eBtnRestart.onclick = restart;
    }

    resetButtonVisibility(question) {
        this.eBtnEvaluate.classList.remove("trc-btn-inactive");
        this.eBtnNextQ.classList.remove("trc-btn-inactive");
        this.eBtnNextQ.style.display = "none";
        if(question.qData.questionType == "closed-ended") {
            this.eBtnEvaluate.style.display = "none";
        } else {
            this.eBtnEvaluate.style.display = "inline-block";
        }
        this.eBtnRestart.style.display = "none";
    }

    showNextQuestionButton() {
        this.eBtnNextQ.style.display = "inline-block";
        this.eBtnEvaluate.onclick = () => {};
        this.eBtnEvaluate.classList.add("trc-btn-inactive");
    }

    displayQuestionTitle(num, numQuestions, question) {
        this.eQNumberText.innerText = "Pytanie " + (num+1) + "/" + numQuestions;
        if(question) {
            this.eQContent.innerText = question.qData.question;
        }
    }

    showSummary(score, maxScore) {
        let percentage = 100.0 * score/maxScore;

        this.eQNumberText.innerText = "Test ukończony";
        this.eQContent.innerText = 
            "Wynik: " + 
            score.toPrecision(3) + " / " + maxScore + 
            " (" + percentage.toPrecision(3) + "%)"
        ;

        this.eBtnEvaluate.style.display = "none";
        this.eBtnNextQ.style.display = "none";
        this.eBtnRestart.style.display = "inline-block";
    }

}

export class TrainerTest {
    constructor(containerElement, srcResources, srcQuestions) {
        
        this.containerElement = containerElement;
        this.view = new TrainerTestView(this.containerElement);
        this.ansViewer = new TrainerAnswerViewer(com.byId("tr-current-answer"));
        this.resBrowser = new TrainerResourceBrowser(com.byId("tr-resource-browser"));
        this.resources = srcResources;
        this.questionsData = srcQuestions;
        this.questions = this.questionsData.map(
            q => (createQuestionFromInputObject(this.view.eQC, q))
        );
    }

    getMaxScore() {
        let ret = 0;
        this.questions.forEach(q => {
            if(!q.qData.evaluable) {
                ret++;
            }
        });
        return ret;
    }

    init() {
        this.questionPermutation = com.randomPermutation(this.questions.length);
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.showQuestion(0);
    }

    getNumQuestions() {
        return this.questions.length;
    }

    getQuestionAt(index) {
        // *************CHANGE THIS BACK*************
        return this.questions[this.questionPermutation[index]];
        //return this.questions[index];
    }

    getCurrentQuestion() {
        return this.getQuestionAt(this.currentQuestionIndex);
    }

    showNextQuestion() {
        this.getCurrentQuestion().hide();
        if(this.currentQuestionIndex < this.getNumQuestions()-1) {
            this.showQuestion(++this.currentQuestionIndex);
        } else {
            this.view.showSummary(this.score, this.getMaxScore());
        }
    }

    showQuestion(index) {
        let q = this.getQuestionAt(index);
        this.ansViewer.hide();
        this.resBrowser.view.hide();
        this.view.resetButtonVisibility(q);
        this.view.displayQuestionTitle(index, this.getNumQuestions(), q);
        this.view.setButtonCallbacks(
            () => {q.evaluate();},
            () => {this.showNextQuestion();},
            () => {this.init();}
        );
        if(q) {
            q.evaluateCallback = () => {
                this.view.showNextQuestionButton();
                this.ansViewer.show(q.qData);
                this.score += q.getScore();
                if(q.qData.relevantResources) {
                    this.resBrowser.init(q.qData.relevantResources, this.resources);
                    this.resBrowser.show();
                } else {
                    this.resBrowser.view.showError("Dla tego pytania nie wprowadzono odnośników do materiałów.");
                }
            };
            q.show();
        }
    }

    start() {

    }

    end() {

    }

}
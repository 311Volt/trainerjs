
export class TrainerQuestion {
    constructor(containerElement, qData) {
        this.qData = qData;
        this.content = qData.question;
        this.containerElement = containerElement;
        this.evaluateCallback = () => {};
    }

    show(containerElement) {
        
    }

    render() {
        this.eQText.innerText = this.qData.question;
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


(()=>{function A(n){return document.getElementById(n)}function o(n,e){return n.getElementsByClassName(e)[0]}function f(n,e){return String.fromCharCode(n.charCodeAt(0)+e)}function c(n){let e=new Array(n);for(var t=0;t<n;t++)e[t]=t;for(var t=n-1;t>=1;t--){let i=Math.floor(Math.random()*t),s=e[i];e[i]=e[t],e[t]=s}return e}function h(n){let e=n.length,t=new Array(e);for(var r=0;r<e;r++)t[n[r]]=r;return t}function m(n,e){let t=document.createElement(n);return t.innerText=e,t}var d=class{constructor(e,t){this.qData=t,this.content=t.question,this.containerElement=e,this.evaluateCallback=()=>{}}show(e){}render(){this.eQText.innerText=this.qData.question}evaluate(){this.evaluateCallback()}hide(){this.containerElement.innerHTML=""}};var a=class{constructor(e){this.containerElement=e}static createAnswerElement(e,t,r,i){let s=document.createElement("div");return s.classList.add("trc-ceq-answer","trc-hover-highlight"),s.appendChild(m("strong",f("a",e)+") ")),s.appendChild(m("span",r)),s.setAttribute("data-pos",e),s.setAttribute("data-num",t),s.onclick=i,s}static createSubmitButtonElement(e,t){let r=document.createElement("button");return r.innerText=e,r.onclick=t,r}createSubmitButton(e){this.containerElement.appendChild(a.createSubmitButtonElement("Sprawd\u017A >>",e))}renderAnswers(e,t,r){this.containerElement.innerHTML="";let i=e.length;for(let s=0;s<i;s++)this.containerElement.appendChild(a.createAnswerElement(s,t[s],e[t[s]],()=>{r(s)}));this.answerElements=Array.from(this.containerElement.getElementsByClassName("trc-ceq-answer"))}updateAnswerSelections(e,t){this.answerElements.forEach(r=>{let i=r.getAttribute("data-num");e.has(String(i))?r.classList.add("trc-selected-answer"):r.classList.remove("trc-selected-answer")})}revealCorrectAnswers(e){this.answerElements.forEach(t=>{t.classList.remove("trc-hover-highlight"),t.onclick=()=>{},e.has(t.getAttribute("data-num"))?t.classList.add("trc-correct-answer"):t.classList.add("trc-wrong-answer")})}},u=class extends d{constructor(e,t){super(e,t);this.selectedAnswers=new Set,this.view=new a(this.containerElement),this.ansPermutation=c(this.getNumAnswers()),this.ansInvPermutation=h(this.ansPermutation),this.buildCorrectAnswerSet()}buildCorrectAnswerSet(){this.correctAnswers=new Set,this.correctAnswers.add(String(this.qData.correctAnswer))}getNumAnswers(){return this.qData.answers.length}show(){this.render()}getAnswerAtPos(e){return this.qData.answers[this.ansPermutation[e]]}render(){this.view.renderAnswers(this.qData.answers,this.ansPermutation,e=>{this.selectAnswer(e)})}selectAnswer(e){this.selectedAnswers.add(String(this.ansPermutation[e])),this.view.updateAnswerSelections(this.selectedAnswers,this.ansInvPermutation),this.evaluate()}evaluate(){this.view.revealCorrectAnswers(this.correctAnswers);let t=new Set([...this.correctAnswers].filter(r=>this.selectedAnswers.has(r))).size/this.correctAnswers.size;return this.evaluateCallback(),t}};var w=class extends u{constructor(e,t){super(e,t);this.selectedAnswers=new Set,this.view=new a(this.containerElement),this.ansPermutation=c(this.getNumAnswers()),this.ansInvPermutation=h(this.ansPermutation)}buildCorrectAnswerSet(){this.correctAnswers=new Set(this.qData.correctAnswers)}show(){this.render(),this.view.createSubmitButton()}selectAnswer(e){let t=String(this.ansPermutation[e]);this.selectedAnswers.has(t)?this.selectedAnswers.delete(t):this.selectedAnswers.add(t),this.view.updateAnswerSelections(this.selectedAnswers,this.ansInvPermutation)}evaluate(){return this.view.revealCorrectAnswers(this.correctAnswers),new Set([...this.correctAnswers].filter(r=>this.selectedAnswers.has(r))).size/this.correctAnswers.size}};function x(n,e){return e.questionType=="closed-ended"?new u(n,e):e.questionType=="closed-ended-multi"?new w(n,e):void 0}var v=class{constructor(e){this.containerElement=e,this.eQC=o(this.containerElement,"trc-question-container"),this.eQNumberText=o(this.containerElement,"trc-question-number"),this.eQContent=o(this.containerElement,"trc-question-text"),this.eNavButtons=o(this.containerElement,"trc-navigation-buttons"),this.eBtnEvaluate=o(this.eNavButtons,"trc-button-evaluate"),this.eBtnNextQ=o(this.eNavButtons,"trc-button-next-question")}},p=class{constructor(e,t,r){this.containerElement=e,this.view=new v(this.containerElement),this.resources=t,this.questionsData=r,this.questions=this.questionsData.map(i=>x(this.view.eQC,i)),this.eQNumberText=o(this.containerElement,"trc-question-number"),this.eQContent=o(this.containerElement,"trc-question-text"),this.questionPermutation=c(this.questions.length),this.currentQuestionIndex=0}getNumQuestions(){return this.questions.length}getQuestionAt(e){return this.questions[this.questionPermutation[e]]}showNextQuestion(){this.currentQuestionIndex<this.getNumQuestions()-1&&this.showQuestion(this.currentQuestionIndex++)}showNextQuestionButton(e){let t=document.createElement("button");t.innerText="Nast\u0119pne pytanie >>",t.onclick=()=>{this.showNextQuestion()},this.containerElement.appendChild(t)}showQuestion(e){let t=this.questions[e];this.eQNumberText.innerText="Pytanie "+(e+1)+"/"+this.getNumQuestions(),t&&(this.eQContent.innerText=t.qData.question,t.evaluateCallback=()=>{this.showNextQuestionButton()},t.show())}start(){}end(){}};var E=void 0;window.onload=function(){Promise.all([fetch("data/resources.json"),fetch("data/questions.json")]).then(n=>{Promise.all([n[0].json(),n[1].json()]).then(e=>{E=new p(A("tr-current-question"),e[0],e[1]),E.showQuestion(0)})}).catch(n=>{console.error(n.message)})};})();
//!!!!!!CHANGE THIS BACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

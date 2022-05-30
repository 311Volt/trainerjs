var trainerjs=(()=>{var T=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var H=Object.prototype.hasOwnProperty;var O=function(r){return T(r,"__esModule",{value:!0})};var F=function(r,e){for(var t in e)T(r,t,{get:e[t],enumerable:!0})},U=function(r,e,t,s){if(e&&typeof e=="object"||typeof e=="function")for(var n=z(e),o=0,i=n.length,l;o<i;o++)l=n[o],!H.call(r,l)&&(t||l!=="default")&&T(r,l,{get:function(R){return e[R]}.bind(null,l),enumerable:!(s=D(e,l))||s.enumerable});return r};var Y=function(r){return function(e,t){return r&&r.get(e)||(t=U(O({}),e,1),r&&r.set(e,t),t)}}(typeof WeakMap!="undefined"?new WeakMap:0);var j={};F(j,{g_Test:()=>L,startTest:()=>K});function u(r){return document.getElementById(r)}function c(r,e){return r.getElementsByClassName(e)[0]}function k(r,e){return String.fromCharCode(r.charCodeAt(0)+e)}function x(r){let e=new Array(r);for(var t=0;t<r;t++)e[t]=t;return e}function N(r,e,t){return Math.max(e,Math.min(r,t))}function b(r){let e=x(r);for(var t=r-1;t>=1;t--){let s=Math.floor(Math.random()*(t+1)),n=e[s];e[s]=e[t],e[t]=n}return e}function q(r){let e=r.length,t=new Array(e);for(var s=0;s<e;s++)t[r[s]]=s;return t}function v(r,e){return new Set([...r].filter(t=>e.has(t)))}function P(r,e){return new Set([...r].filter(t=>!e.has(t)))}function a(r,e){let t=document.createElement(r);return t.innerText=e,t}function E(r){let e=a("a",r);return e.href=r,e}function I(r){for(var e=0,t=0,s=0;s<r.length;s++)if(isNaN(r[s])){switch(r[s]){case"h":t*=3600;break;case"m":t*=60;break;case"s":t*=1;break;default:console.error("unexpected character "+r[s]+" in timestamp")}e+=t,t=0}else t*=10,t+=parseInt(r[s]);return e}var m=class{constructor(e,t){this.qData=t,this.content=t.question,this.containerElement=e,this.evaluateCallback=()=>{}}show(e){}render(){this.eQText.innerText=this.qData.question}evaluate(){this.evaluateCallback()}hide(){this.containerElement.innerHTML=""}getScore(){return 0}};var C=class{constructor(e){this.containerElement=e}static createAnswerElement(e,t,s,n,o){let i=document.createElement("div");return i.classList.add("trc-ceq-answer","trc-hover-highlight"),i.appendChild(a("strong",k("a",e)+") ")),i.appendChild(a("span",s)),i.setAttribute("data-pos",e),i.setAttribute("data-num",t),i.onclick=n,o&&i.classList.add("trc-multi"),i}renderAnswers(e,t,s,n){this.containerElement.innerHTML="";let o=e.length;for(let i=0;i<o;i++)this.containerElement.appendChild(C.createAnswerElement(i,t[i],e[t[i]],()=>{s(i)},n));this.answerElements=Array.from(this.containerElement.getElementsByClassName("trc-ceq-answer"))}updateAnswerSelections(e,t){this.answerElements.forEach(s=>{let n=s.getAttribute("data-num");e.has(String(n))?s.classList.add("trc-selected-answer"):s.classList.remove("trc-selected-answer")})}revealCorrectAnswers(e){this.answerElements.forEach(t=>{t.classList.remove("trc-hover-highlight"),t.onclick=()=>{},e.has(t.getAttribute("data-num"))?t.classList.add("trc-correct-answer"):t.classList.add("trc-wrong-answer")})}},p=class extends m{constructor(e,t){super(e,t);this.selectedAnswers=new Set,this.view=new C(this.containerElement),this.isMulti=!1,this.ansPermutation=b(this.getNumAnswers()),this.ansInvPermutation=q(this.ansPermutation),this.buildCorrectAnswerSet()}buildCorrectAnswerSet(){this.correctAnswers=new Set,this.correctAnswers.add(String(this.qData.correctAnswer))}getNumAnswers(){return this.qData.answers.length}show(){this.selectedAnswers.clear(),this.render()}getAnswerAtPos(e){return this.qData.answers[this.ansPermutation[e]]}render(){this.view.renderAnswers(this.qData.answers,this.ansPermutation,e=>{this.selectAnswer(e)},this.isMulti),this.view.updateAnswerSelections(this.selectedAnswers,this.ansInvPermutation)}selectAnswer(e){this.selectedAnswers.add(String(this.ansPermutation[e])),this.view.updateAnswerSelections(this.selectedAnswers,this.ansInvPermutation),this.evaluate()}getScore(){if(this.correctAnswers.size==0)return this.selectedAnswers.size==0?1:0;let e=P(new Set(x(this.getNumAnswers()).map(i=>String(i))),this.correctAnswers),t=v(this.correctAnswers,this.selectedAnswers),s=v(e,this.selectedAnswers),n=t.size-s.size;return N(n/this.correctAnswers.size,0,1)}evaluate(){return this.view.revealCorrectAnswers(this.correctAnswers),this.evaluateCallback(),this.getScore()}};var g=class extends p{constructor(e,t){super(e,t);this.isMulti=!0}buildCorrectAnswerSet(){this.correctAnswers=new Set(this.qData.correctAnswers.map(e=>String(e)))}selectAnswer(e){let t=String(this.ansPermutation[e]);this.selectedAnswers.has(t)?this.selectedAnswers.delete(t):this.selectedAnswers.add(t),this.view.updateAnswerSelections(this.selectedAnswers,this.ansInvPermutation)}};var f=class{constructor(e){this.containerElement=e}static createTextArea(){let e=document.createElement("textarea");return e.style.width="500px",e.style.height="200px",e}showTextArea(){this.containerElement.innerHTML="",this.eTextArea=f.createTextArea(),this.containerElement.appendChild(this.eTextArea)}getAnswer(){return this.eTextArea.value.trim().toLowerCase()}},A=class extends m{constructor(e,t){super(e,t);this.view=new f(e)}show(){this.view.showTextArea()}getScore(){let e=this.qData.exampleAnswer.trim().toLowerCase();return this.view.getAnswer()==e?1:0}evaluate(){return this.evaluateCallback(),this.getScore()}};function _(r){return!(r.includes(`
`)||r.length>=50)}var y=class{constructor(e){this.containerElement=e}static createSubQuestion(e){let t=document.createElement("div");t.appendChild(a("span",e.question));let s=document.createElement("textarea");return s.cols="60",t.appendChild(document.createElement("br")),_(e.exampleAnswer)?(s.cols="30",s.rows="1"):s.rows="15",t.appendChild(s),t}clear(){this.containerElement.innerHTML=""}addSubQuestion(e){this.containerElement.appendChild(y.createSubQuestion(e))}getAnswer(e){return this.containerElement.getElementsByTagName("textarea")[e].value.trim().toLowerCase()}static createTextArea(){let e=document.createElement("textarea");return e.style.width="500px",e.style.height="200px",e}showTextArea(){this.containerElement.appendChild(TrainerOEQView.createTextArea())}},S=class extends m{constructor(e,t){super(e,t);this.view=new y(e)}show(){this.view.clear(),this.qData.subQuestions.forEach(e=>{this.view.addSubQuestion(e)})}getScore(){let e=0;for(let t=0;t<this.qData.subQuestions.length;t++)e+=this.qData.subQuestions[t].exampleAnswer.trim().toLowerCase()==this.view.getAnswer(t)?1:0;return e/=this.qData.subQuestions.length,e}evaluate(){return this.evaluateCallback(),this.getScore()}};function M(r,e){if(e.questionType=="closed-ended")return new p(r,e);if(e.questionType=="closed-ended-multi")return new g(r,e);if(e.questionType=="open-ended")return new A(r,e);if(e.questionType=="open-ended-multi")return new S(r,e);throw new Error('unrecognized question type: "'+e.questionType+'"')}var w=class{constructor(e){this.containerElement=e}static createAnswerElement(e){let t=document.createElement("div");return t.classList.add("trc-ceq-answer"),t.innerText=e,t}hide(){this.containerElement.style.display="none"}show(e){this.containerElement.innerHTML="",this.containerElement.style.display="block";let t=e.questionType.includes("open")&&!e.evaluable,n=(e.questionType.includes("multi")?"Odpowiedzi":"Odpowied\u017A")+(t?" (przyk\u0142ad)":""),o=new Array;e.correctAnswer!=null?o.push(e.answers[e.correctAnswer]):e.correctAnswers?e.correctAnswers.forEach(i=>{o.push(e.answers[i])}):e.exampleAnswer?o.push(e.exampleAnswer):e.subQuestions&&e.subQuestions.forEach(i=>{o.push(i.question+": "+i.exampleAnswer)}),this.containerElement.appendChild(a("h2",n)),o.forEach(i=>{this.containerElement.appendChild(w.createAnswerElement(i))})}};var h=class{constructor(e){this.containerElement=e,this.eCButtons=u("tr-rb-buttons"),this.eCTopicSelector=c(this.containerElement,"trc-rb-topic-selector"),this.eCTSButtons=c(this.eCTopicSelector,"trc-rb-topic-selector-buttons"),this.eCContent=c(this.containerElement,"trc-rb-container")}clearContent(){this.eCContent.innerHTML=""}showError(e){this.show(),this.eCTopicSelector.style.display="none",this.eCButtons.style.display="none",this.eCContent.innerText=e}show(){this.eCButtons.style.display="block",this.containerElement.style.display="block"}hide(){this.containerElement.style.display="none",this.eCTopicSelector.style.display="none"}init(){this.eCTSButtons.innerHTML="",this.show()}static createSlideNumberList(e){let t=document.createElement("div");t.appendChild(a("strong","Numery slajd\xF3w: "));let s="";for(let n=0;n<e.length;n++)s+=e[n]+(n==e.length-1?"":", ");return t.appendChild(a("span",s)),t}static createTimestampList(e,t){let s=document.createElement("div");if(s.appendChild(a("strong","Istotne momenty: ")),e)for(let n=0;n<e.length;n++){let o=document.createElement("button");o.classList.add("trc-yt-timestamp"),o.innerText=e[n],o.onclick=()=>{t(n)},s.appendChild(o)}else s.appendChild(a("span","brak"));return s}static createYTIFrameURL(e,t){return"https://youtube.com/embed/"+e+"?autoplay=1&start="+I(t)}static createYouTubeIFrame(e,t){let s=document.createElement("iframe");return s.style.width="100%",s.style.height="480px",s.src=h.createYTIFrameURL(e,t),s}updateTabButtons(e,t){let s=this.eCButtons.getElementsByClassName("trc-tab-button");for(let n=0;n<s.length;n++)t.has(n)?s[n].style.display="none":s[n].style.display="inline-block",e==n?s[n].classList.add("trc-tab-button-active"):s[n].classList.remove("trc-tab-button-active")}setButtonCallbacks(e){Array.from(this.containerElement.getElementsByClassName("trc-tab-button")).forEach(t=>{t.onclick=()=>{e(t.getAttribute("data-tab-id"))}})}updateTopicSelectorButtons(e){[...this.eCTSButtons.getElementsByClassName("trc-rb-topic")].forEach(t=>{t.getAttribute("data-topic-id")==String(e)?t.classList.add("trc-rb-topic-active"):t.classList.remove("trc-rb-topic-active")})}showTopicSelector(e,t){this.eCTopicSelector.style.display="block";for(let s=0;s<e.length;s++){let n=document.createElement("button");n.classList.add("trc-rb-topic"),n.setAttribute("data-topic-id",s),n.innerText=e[s],n.onclick=()=>{t(s)},this.eCTSButtons.appendChild(n)}}showSummary(e,t){let s=document.createElement("div");s.appendChild(a("strong","Pytanie z zakresu: ")),s.appendChild(a("span",e.resource));let n=document.createElement("div");n.appendChild(a("strong","Link do PDF: ")),n.appendChild(E(t.pdf));let o=document.createElement("div"),i="https://youtube.com/watch?v="+t.youtube;if(t.youtube&&(o.appendChild(a("strong","Link do YT: ")),o.appendChild(E(i))),this.eCContent.appendChild(s),this.eCContent.appendChild(n),this.eCContent.appendChild(h.createSlideNumberList(e.pdfPages)),this.eCContent.appendChild(o),e.comment){let l=document.createElement("div");l.appendChild(a("strong","Komentarz: ")),l.appendChild(a("span",e.comment)),this.eCContent.appendChild(l)}}showPresentation(e,t){let s=document.createElement("iframe");s.style.width="100%",s.style.height="600px",s.src=t.pdf+"#page="+e.pdfPages[0],this.eCContent.appendChild(h.createSlideNumberList(e.pdfPages)),this.eCContent.appendChild(s)}showVideo(e,t){this.eCContent.appendChild(h.createTimestampList(e.ytTimestamps,n=>{this.eCContent.getElementsByTagName("iframe")[0].src=h.createYTIFrameURL(t.youtube,e.ytTimestamps[n])}));let s=e.ytTimestamps?e.ytTimestamps[0]:"0";this.eCContent.appendChild(h.createYouTubeIFrame(t.youtube,s))}},Q=class{constructor(e){this.containerElement=e,this.selectedTab=0,this.view=new h(e),this.currTopic=void 0,this.currResource=void 0}init(e,t){this.relevantResources=e,this.resources=t,this.view.init(),this.view.setButtonCallbacks(s=>{this.selectTab(s)}),Object.keys(e).length>1&&this.view.showTopicSelector(Object.keys(e),s=>{this.selectTopic(s)})}initError(e){}buildTabDisableList(){let e=new Set;return this.currResource.pdf==null&&e.add(1),this.currResource.youtube==null&&e.add(2),e}show(){this.view.show(),this.selectTopic(0),this.selectTab(0)}selectTopic(e){this.currTopic=this.relevantResources[Object.keys(this.relevantResources)[e]],this.currResource=this.resources[this.currTopic.resource],this.view.updateTopicSelectorButtons(e),this.view.updateTabButtons(this.selectedTab,this.buildTabDisableList()),this.selectTab(this.selectedTab)}selectTab(e){switch(this.selectedTab=e,this.view.clearContent(),this.view.updateTabButtons(e,this.buildTabDisableList()),String(e)){case"0":this.view.showSummary(this.currTopic,this.currResource);break;case"1":this.view.showPresentation(this.currTopic,this.currResource);break;case"2":this.view.showVideo(this.currTopic,this.currResource);break;default:throw new Error("tab #"+e+" does not exist")}}};var W=class{constructor(e){this.containerElement=e,this.eQC=c(this.containerElement,"trc-question-container"),this.eQNumberText=c(this.containerElement,"trc-question-number"),this.eQContent=c(this.containerElement,"trc-question-text"),this.eNavButtons=c(this.containerElement,"trc-navigation-buttons"),this.eBtnEvaluate=c(this.eNavButtons,"trc-button-evaluate"),this.eBtnNextQ=c(this.eNavButtons,"trc-button-next-question"),this.eBtnRestart=c(this.eNavButtons,"trc-button-restart")}setButtonCallbacks(e,t,s){this.eBtnEvaluate.onclick=e,this.eBtnNextQ.onclick=t,this.eBtnRestart.onclick=s}resetButtonVisibility(e){this.eBtnEvaluate.classList.remove("trc-btn-inactive"),this.eBtnNextQ.classList.remove("trc-btn-inactive"),this.eBtnNextQ.style.display="none",e.qData.questionType=="closed-ended"?this.eBtnEvaluate.style.display="none":this.eBtnEvaluate.style.display="inline-block",this.eBtnRestart.style.display="none"}showNextQuestionButton(){this.eBtnNextQ.style.display="inline-block",this.eBtnEvaluate.onclick=()=>{},this.eBtnEvaluate.classList.add("trc-btn-inactive")}displayQuestionTitle(e,t,s){this.eQNumberText.innerText="Pytanie "+(e+1)+"/"+t,s&&(this.eQContent.innerText=s.qData.question)}showSummary(e,t){let s=100*e/t;this.eQNumberText.innerText="Test uko\u0144czony",this.eQContent.innerText="Wynik: "+e.toPrecision(3)+" / "+t+" ("+s.toPrecision(3)+"%)",this.eBtnEvaluate.style.display="none",this.eBtnNextQ.style.display="none",this.eBtnRestart.style.display="inline-block"}},B=class{constructor(e,t,s){this.containerElement=e,this.view=new W(this.containerElement),this.ansViewer=new w(u("tr-current-answer")),this.resBrowser=new Q(u("tr-resource-browser")),this.resources=t,this.questionsData=s,this.questions=this.questionsData.map(n=>M(this.view.eQC,n))}getMaxScore(){let e=0;return this.questions.forEach(t=>{t.qData.evaluable||e++}),e}init(){this.questionPermutation=b(this.questions.length),this.score=0,this.currentQuestionIndex=0,this.showQuestion(0)}getNumQuestions(){return this.questions.length}getQuestionAt(e){return this.questions[this.questionPermutation[e]]}getCurrentQuestion(){return this.getQuestionAt(this.currentQuestionIndex)}showNextQuestion(){this.getCurrentQuestion().hide(),this.currentQuestionIndex<this.getNumQuestions()-1?this.showQuestion(++this.currentQuestionIndex):this.view.showSummary(this.score,this.getMaxScore())}showQuestion(e){let t=this.getQuestionAt(e);this.ansViewer.hide(),this.resBrowser.view.hide(),this.view.resetButtonVisibility(t),this.view.displayQuestionTitle(e,this.getNumQuestions(),t),this.view.setButtonCallbacks(()=>{t.evaluate()},()=>{this.showNextQuestion()},()=>{this.init()}),t&&(t.evaluateCallback=()=>{this.view.showNextQuestionButton(),this.ansViewer.show(t.qData),this.score+=t.getScore(),t.qData.relevantResources?(this.resBrowser.init(t.qData.relevantResources,this.resources),this.resBrowser.show()):this.resBrowser.view.showError("Dla tego pytania nie wprowadzono odno\u015Bnik\xF3w do materia\u0142\xF3w.")},t.show())}start(){}end(){}};var L=void 0;function K(r,e){Promise.all([fetch(r),fetch(e)]).then(t=>{Promise.all([t[0].json(),t[1].json()]).then(s=>{L=new B(u("tr-current-question"),s[0],s[1]),L.init()})}).catch(t=>{console.error(t.message)})}return Y(j);})();

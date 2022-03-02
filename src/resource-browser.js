import * as com from "./common.js"


class TRBView {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.eCButtons = com.byId("tr-rb-buttons");
        this.eCTopicSelector = com.byCl0_(this.containerElement, "trc-rb-topic-selector");
        this.eCTSButtons = com.byCl0_(this.eCTopicSelector, "trc-rb-topic-selector-buttons");
        this.eCContent = com.byCl0_(this.containerElement, "trc-rb-container");
    }

    clearContent() {
        this.eCContent.innerHTML = "";
    }

    showError(msg) {
        this.show();
        this.eCTopicSelector.style.display = "none";
        this.eCButtons.style.display = "none";
        this.eCContent.innerText = msg;
    }

    show() {
        this.eCButtons.style.display = "block";
        this.containerElement.style.display = "block";
    }

    hide() {
        this.containerElement.style.display = "none";
        this.eCTopicSelector.style.display = "none";
    }

    init() {
        this.eCTSButtons.innerHTML = "";
        this.show();
    }

    static createSlideNumberList(list) {
        let ret = document.createElement("div");
        ret.appendChild(com.createElementWithText("strong", "Numery slajdów: "));
        let slideNumbersText = "";
        for(let i=0; i<list.length; i++) {
            slideNumbersText += list[i] + ((i==list.length-1) ? "" : ", ");
        }
        ret.appendChild(com.createElementWithText("span", slideNumbersText));
        return ret;
    }

    static createTimestampList(list, callback) {
        let ret = document.createElement("div");
        ret.appendChild(com.createElementWithText("strong", "Istotne momenty: "));
        
        for(let i=0; i<list.length; i++) {
            let btn = document.createElement("button");
            btn.classList.add("trc-yt-timestamp");
            btn.innerText = list[i];
            btn.onclick = () => {callback(i)};
            ret.appendChild(btn);
        };

        return ret;
    }

    static createYTIFrameURL(videoId, timestamp) {
        return "https://youtube.com/embed/"
            + videoId
            + "?start=" + com.timestampToSeconds(timestamp)
            + "&autoplay=1";
    }

    static createYouTubeIFrame(videoId, timestamp) {
        let ytiframe = document.createElement("iframe");

        ytiframe.style.width = "100%";
        ytiframe.style.height = "480px";

        ytiframe.src = TRBView.createYTIFrameURL(videoId, timestamp);

        return ytiframe;
    }

    updateTabButtons(num) {
        let buttons = this.eCButtons.getElementsByClassName("trc-tab-button")
        for(let i=0; i<buttons.length; i++) {
            if(num == i) {
                buttons[i].classList.add("trc-tab-button-active");
            } else {
                buttons[i].classList.remove("trc-tab-button-active");
            }
        }
    }

    setButtonCallbacks(func) {
        Array.from(
            this.containerElement.getElementsByClassName("trc-tab-button")
        ).forEach(btn => {
            btn.onclick = () => {
                func(btn.getAttribute("data-tab-id"));
            };
        });
    }

    updateTopicSelectorButtons(currTopicId) {
        [...this.eCTSButtons.getElementsByClassName("trc-rb-topic")].forEach((btn) => {
            if(btn.getAttribute("data-topic-id") == String(currTopicId)) {
                btn.classList.add("trc-rb-topic-active");
            } else {
                btn.classList.remove("trc-rb-topic-active");
            }
        });
    }

    showTopicSelector(topicList, callback) {
        this.eCTopicSelector.style.display = "block";
        for(let i=0; i<topicList.length; i++) {
            let btn = document.createElement("button");
            btn.classList.add("trc-rb-topic");
            btn.setAttribute("data-topic-id", i);
            btn.innerText = topicList[i];
            btn.onclick = () => {callback(i)};
            this.eCTSButtons.appendChild(btn);
        }
    }

    showSummary(topic, resource) {

        let rName = document.createElement("div");
        rName.appendChild(com.createElementWithText("strong", "Pytanie z zakresu: "));
        rName.appendChild(com.createElementWithText("span", topic.resource));

        let pdfLink = document.createElement("div");
        pdfLink.appendChild(com.createElementWithText("strong", "Link do PDF: "));
        pdfLink.appendChild(com.createLinkWithURLText(resource.pdf));
        
        let ytLink = document.createElement("div");
        let ytURL = "https://youtube.com/watch?v=" + resource.youtube;
        ytLink.appendChild(com.createElementWithText("strong", "Link do YT: "));
        ytLink.appendChild(com.createLinkWithURLText(ytURL));

        this.eCContent.appendChild(rName);
        this.eCContent.appendChild(pdfLink);
        this.eCContent.appendChild(TRBView.createSlideNumberList(topic.pdfPages));
        this.eCContent.appendChild(ytLink);
    }

    showPresentation(topic, resource) {
        let pdfiframe = document.createElement("iframe");
        pdfiframe.style.width = "100%";
        pdfiframe.style.height = "600px";

        pdfiframe.src = resource.pdf + "#page=" + topic.pdfPages[0];

        this.eCContent.appendChild(TRBView.createSlideNumberList(topic.pdfPages));
        this.eCContent.appendChild(pdfiframe);
    }

    showVideo(topic, resource) {
        this.eCContent.appendChild(TRBView.createTimestampList(
            topic.ytTimestamps,
            (num) => {
                this.eCContent.getElementsByTagName("iframe")[0].src = TRBView.createYTIFrameURL(
                    resource.youtube,
                    topic.ytTimestamps[num]
                );
            })
        );
        this.eCContent.appendChild(TRBView.createYouTubeIFrame(resource.youtube, topic.ytTimestamps[0]));
    }
}

export class TrainerResourceBrowser {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.selectedTab = 0;
        this.view = new TRBView(containerElement);

        this.currTopic = undefined;
        this.currResource = undefined;
    }

    init(relevantResources, resourceList) {
        this.relevantResources = relevantResources;
        this.resources = resourceList;
        this.view.init();
        this.view.setButtonCallbacks(num => {
            this.selectTab(num);
        });
        if(Object.keys(relevantResources).length > 1) {
            this.view.showTopicSelector(Object.keys(relevantResources), (num) => {
                this.selectTopic(num);
            });
        }
    }

    initError(errorMessage) {

    }

    show() {
        this.view.show();
        this.selectTopic(0);
        this.selectTab(0);
    }

    selectTopic(num) {
        this.currTopic = this.relevantResources[Object.keys(this.relevantResources)[num]];
        this.currResource = this.resources[this.currTopic.resource];
        this.view.updateTopicSelectorButtons(num);
        this.selectTab(this.selectedTab);
    }

    selectTab(num) {
        this.selectedTab = num;
        this.view.clearContent();
        this.view.updateTabButtons(num);
        switch(String(num)) {
            case '0': this.view.showSummary(this.currTopic, this.currResource); break;
            case '1': this.view.showPresentation(this.currTopic, this.currResource); break;
            case '2': this.view.showVideo(this.currTopic, this.currResource); break;
            default: throw new Error("tab #"+num+" does not exist");
        }
    }
}
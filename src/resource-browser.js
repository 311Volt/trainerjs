import * as com from "./common.js"


class TrainerResourceBrowserView {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.eCButtons = com.byId("tr-rb-buttons");
        this.eCContent = com.byCl0_(this.containerElement, "trc-rb-container");
    }
    clearContent() {
        this.eCContent.innerHTML = "";
    }

    show() {
        this.containerElement.style.display = "block";
    }

    hide() {
        this.containerElement.style.display = "none";
    }

    init() {
        this.show();
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

    showSummary(topic, resource) {

        let rName = document.createElement("div");
        rName.appendChild(com.createElementWithText("strong", "Pytanie z zakresu: "));
        rName.appendChild(com.createElementWithText("span", topic.resource));

        let pdfLink = document.createElement("div");
        pdfLink.appendChild(com.createElementWithText("strong", "Link do PDF: "));
        pdfLink.appendChild(com.createLinkWithURLText(resource.pdf));
        

        let slideNumbers = document.createElement("div");
        slideNumbers.appendChild(com.createElementWithText("strong", "Numery slajdów: "));
        let slideNumbersText = "";
        for(let i=0; i<topic.pdfPages.length; i++) {
            slideNumbersText += topic.pdfPages[i] + ((i==topic.pdfPages.length-1) ? "" : ", ");
        }
        slideNumbers.appendChild(com.createElementWithText("span", slideNumbersText));

        let ytLink = document.createElement("div");
        let ytURL = "https://youtube.com/watch?v=" + resource.youtube + "?t=" + topic.ytTimestamps[0];
        ytLink.appendChild(com.createElementWithText("strong", "Link do YT: "));
        ytLink.appendChild(com.createLinkWithURLText(ytURL));

        this.eCContent.appendChild(rName);
        this.eCContent.appendChild(pdfLink);
        this.eCContent.appendChild(slideNumbers);
        this.eCContent.appendChild(ytLink);
    }

    showPresentation(topic, resource) {
        let pdfiframe = document.createElement("iframe");
        pdfiframe.style.width = "100%";
        pdfiframe.style.height = "600px";

        pdfiframe.src = resource.pdf + "#page=" + topic.pdfPages[0];

        this.eCContent.appendChild(pdfiframe);
    }

    showVideo(topic, resource) {
        let ytiframe = document.createElement("iframe");

        ytiframe.style.width = "100%";
        ytiframe.style.height = "480px";

        let yturl = "https://youtube.com/embed/"
            + resource.youtube + 
            "?start" + com.timestampToSeconds(topic.ytTimestamps[0]) + 
            "&autoplay=1";

        ytiframe.src = yturl;

        this.eCContent.appendChild(ytiframe);
    }
}

export class TrainerResourceBrowser {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.selectedTab = 0;
        this.view = new TrainerResourceBrowserView(containerElement);

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
    }

    show() {
        this.view.show();
        this.selectTopic(0);
        this.selectTab(0);
    }

    selectTopic(num) {
        this.currTopic = this.relevantResources[Object.keys(this.relevantResources)[num]];
        this.currResource = this.resources[this.currTopic.resource];
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
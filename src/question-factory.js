import { TrainerCEQ } from "./question-types/question-closed-ended.js";
import { TrainerCEQMulti } from "./question-types/question-closed-ended-multi.js";
import { TrainerOEQ } from "./question-types/question-open-ended.js";
import { TrainerOEQMulti } from "./question-types/question-open-ended-multi.js";

export function createQuestionFromInputObject(containerElement, obj) {
     if(obj.questionType == "closed-ended") {
        return new TrainerCEQ(containerElement, obj);
     } else if(obj.questionType == "closed-ended-multi") {
        return new TrainerCEQMulti(containerElement, obj);
     } else if(obj.questionType == "open-ended") {
        return new TrainerOEQ(containerElement, obj);
     } else if(obj.questionType == "open-ended-multi") {
        return new TrainerOEQMulti(containerElement, obj);
     } else {
         throw new Error('unrecognized question type: "'+obj.questionType+'"');
     }
}
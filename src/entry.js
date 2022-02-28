import { TrainerTest } from "./test.js"
import * as com from "./common.js"

var g_Test = undefined;

window.onload = function() {
	Promise.all([
		fetch('data/resources.json'),
		fetch('data/questions.json')
	]).then(values => {
		Promise.all([
			values[0].json(),
			values[1].json()
		]).then(data => {
			g_Test = new TrainerTest(com.byId("tr-current-question"), data[0], data[1]);
            g_Test.init();
		})
	}).catch(err => {
		console.error(err.message);
	});
}
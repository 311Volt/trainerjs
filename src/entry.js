import { startTest } from "./main.js";

var g_Test = undefined;


window.onload = function() {
	startTest('data/resources.json', 'data/questions.json');
}
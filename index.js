import * as dash from './seasonPerformance.js';
import * as rank from './seasonRanking.js';

var csvData = [];
var rankingData = [];
var team;
var teamByCountry = {
	aus: ['Queensland Firebirds', 'New South Wales Swifts', 'Canterbury Tactix', 'Melbourne Vixens', 'Adelaide Thunderbirds'],
	nz: ['Central Pulse', 'Northern Mystics', 'Waikato Bay of Plenty Magic', 'West Coast Fever', 'Southern Steel']
}

function fileData(stats) {
	console.log("Inside file data")
	d3.csv("http://github.com/vijayaaath/swen-422/blob/master/season-input.csv", function (data) {
		csvData = [];
		rankingData = [];
		data.forEach(element => {
			if (team == element.team) {
				var obj = { State: element.year, freq: { early: +element.early_wins, mid: +element.mid_wins, late: +element.late_wins } };
				csvData.push(obj);
				obj = { date: element.year, value: element.rank }
				rankingData.push(obj);
			}
		});
		if (csvData.length != 0) {
				dash.dashboard('#dashboard', csvData);
			}
		
	});
}

d3.select(".country")
	.on("change", function () {
		var selected = d3.select("#country").node().value;
		if (selected == 'aus') {
			if (selected.length == 0)
				document.getElementById("team").innerHTML = "<option></option>";
			else {
				var catOptions = "<option value=\"\" disabled selected>Select Team</option>";
				for (var categoryId in teamByCountry[selected]) {
					catOptions += "<option value=\"" + teamByCountry[selected][categoryId] + "\">" + teamByCountry[selected][categoryId] + "</option>";
				}
				document.getElementById("team").innerHTML = catOptions;
			}
		} else {
			if (selected.length == 0)
				document.getElementById("team").innerHTML = "<option></option>";
			else {
				var catOptions = "<option value=\"\" disabled selected>Select Team</option>";
				for (categoryId in teamByCountry[selected]) {
					catOptions += "<option value=\"" + teamByCountry[selected][categoryId] + "\">" + teamByCountry[selected][categoryId] + "</option>";
				}
				document.getElementById("team").innerHTML = catOptions;
			}
		}
	});

d3.select(".team")
	.on("change", function () {
		var selected = d3.select("#team option:checked").text();
		team = selected;
		var elements = document.getElementById("stats").options;
		elements[0].selected = true;
	});


d3.select(".stats")
	.on("change", function () {
		var selected = d3.select("#stats option:checked").text();
		if(selected == 'Season Ranking') {
				rank.ranking('#dashboard',team);
		} else if (selected == 'Regular Season') {
			fileData();
		}
	});

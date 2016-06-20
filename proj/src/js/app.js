/**

app.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

/*
	Making legends for graphs
	data; data to be shown in the legend
*/
function makeLegend(data) {
	d3.select(".black-legend")
		.html("");

	// select the place and load the data
	var div = d3.select(".black-legend").append("div");
	var legend = div.selectAll(".wrapper")
		.data(data);

	// add the legend with the right colors
	legend.enter().append("div")
		.attr("class", "wrapper mz-about-default mz-module-about-legend text-center")
	.append("div")
		.attr("class", "full-circle center-block")
		.style("background-color", function(d){return d.color})
	
	// add the text to the right colors
	legend.append("p").text(function(d){return d.name});
}
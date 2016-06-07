/**

suppliers.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/
var data_list = [];

var width = 600,
height = 600,
min = Math.min(width, height),
oRadius = min / 2 * 0.65,
iRadius = min / 2 * 0.85;

var color = d3.scale.category20();

var arc = d3.svg.arc()
.outerRadius(oRadius)
.innerRadius(iRadius);

var svg = d3.select(".donut-chart").append("svg")
.attr("width", width)
.attr("height", height)

var g = svg.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.selectAll(".list-group-item")
.on("click", function () {
	var value = d3.select(this).attr("value");
	d3.select(".active").attr("class", "list-group-item");
	d3.select(this).attr("class", "list-group-item active")
	createData(value);
});

function createData(value) { 
	d3.json("data/suppliers/suppliers.json", function(error, data) {
		// error checking
		if (error) {
			console.log("We cannot retrieve the data.");
			d3.select("#donut-chart")
			.html("<div class='text-center'><h3>Sorry.<br><br> Wij kunnen geen data ophalen.</h3></div>");
			throw error;
		};
		data_list = [];
		data.forEach(function(d){
			if(value == d.company) {
				data_list.push({"composition": d.composition, "value": parseFloat(d.score)});
			} else {
				d3.select("#donut-chart")
				.html("<div class='text-center'><h3>Sorry.<br><br> Het bedrijf is niet gevonden.</h3></div>");
			}
		});
		makeDonut(data_list);
	});
}

function makeDonut(data_list) {
	var pie = d3.layout.pie()
	.value(function(d) {return d.value; })
	.sort(null);

	// creates the pie chart container
	var g = svg.append('g')
	var g = svg.append('g')
	.attr('transform', function(){
		if ( window.innerWidth >= 60 ) var shiftWidth = width / 2;
		if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
		return 'translate(' + shiftWidth + ',' + height / 2 + ')';
	})

	// add transition to new path
	g.datum(data_list).selectAll("path").data(pie).transition().attrTween("d", arcTween);

	// add any new paths
	g.datum(data_list).selectAll("path")
	.data(pie)
	.enter().append("path")
	.attr("class","piechart")
	.attr("fill", function(d,i){ return color(i); })
	.attr("d", arc)
	.each(function(d){ this._current = d; });

	// remove data not being used
	g.datum(data_list).selectAll("path")
	.data(pie).exit().remove();
	// setInterval(render,2000);
}


// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

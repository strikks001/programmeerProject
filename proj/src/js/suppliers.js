/**

suppliers.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/
var dataList = [];
var pallette = [];
var names = ["Kolen", "Kern", "Aardgas","zon","wind","water","biomassa","overig groen", "overig Grijs"];
var colors = ["#d73027", "#f46d43" , "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850" ];

for (var i = 0; i < colors.length; i++) {
	pallette.push({"name": names[i], "color": colors[i]});
}
makeLegend(pallette);

// measurements for the donut chart
var width = 520,
height = 520,
min = Math.min(width, height),
oRadius = min / 2 * 0.65,
iRadius = min / 2 * 0.85;

// general colors 
var color = d3.scale.ordinal()
.domain(names)
.range(colors);

// the thickness of the donut
var arc = d3.svg.arc()
.outerRadius(oRadius)
.innerRadius(iRadius);

// the size of the chart
var svg = d3.select(".donut-chart").append("svg")
.attr("width", width)
.attr("height", height);

svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

// setting up the pie layout for the donut
var pie = d3.layout.pie();

// creates the pie chart container
var g = svg.append('g')
.attr('transform', function(){
	if ( window.innerWidth >= 60 ) var shiftWidth = width / 2;
	if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
	return 'translate(' + shiftWidth + ',' + height / 2 + ')';
});

// set up the first view
createData("Essent");

// select a company to show the donut chart
d3.selectAll(".list-group-item")
.on("click", function () {
	d3.select(".active").attr("class", "list-group-item");
	d3.select(this).attr("class", "list-group-item active");
	// show the donut chart with some created data of the selected company
	var value = d3.select(this).attr("value");
	console.log(value);
	createData(value);
});

/**
	Creates an array of data with the selected energy company.
	Then it wil show a donut chart.
	value; selected energy company.
*/
function createData(value) { 
	d3.json("data/suppliers/suppliers.json", function(error, data) {
		// error checking
		if (error) {
			console.log("We cannot retrieve the data.");
			d3.select(".donut-chart")
			.html("<div class='text-center'><h3>Sorry.<br><br> Wij kunnen geen data ophalen.</h3></div>");
			throw error;
		};
		dataList = [];
		data.forEach(function(d){
			if(value == d.company) {
				dataList.push({"composition": d.composition, "value": parseFloat(d.score)});
			}
		});

		makeDonut(dataList);
	});
}

/**
	Makes a donut chart with the given data.
	It will update the donut chart when there is other data.
	dataList; list with values of the selected company.
*/
function makeDonut(dataList) {
	// setting up the values for the donut
	pie.value(function(d) {return d.value; })
	.sort(null);
	
	// tooltip when hovering the bars
	var div = d3.select("body").append("div").attr("class", "donut-d3-tip");

	// add path to donut
	var path = g.datum(dataList).selectAll("path")
		.data(pie)
		.enter().append("path")
			.attr("class","piechart")
			.attr("d", arc)
			.attr("fill", function(d, i){return color(i); })
			.each(function(d){ this._current = d; });


	// add transition to new paths
	g.datum(dataList).selectAll("path").data(pie).transition().duration(600).attrTween("d", arcTween);

	// on mose hover the donut then add a tool tip
	path
	.on("mousemove", function(d){
		div.style("left", d3.event.pageX+10+"px");
		div.style("top", d3.event.pageY-25+"px");
		div.style("display", "inline-block");
		div.html("<strong>" + d.data.composition + "</strong><br>" + d.value + "%");
	})
	.on("mouseout", function(d){
		div.style("display", "none");
	});

	// remove data not being used
	g.datum(dataList).selectAll("path")
	.data(pie).exit().remove();
}

/**
	Store the displayed angles in _current.
	Then, interpolate from _current to the new angles.
	During the transition, _current is updated in-place by d3.interpolate.
*/
function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

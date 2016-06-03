/**

world.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/
var data = [];

var margin = {top: 20, right: 20, bottom: 30, left: 60},
width = 400 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
.rangeRoundBands([0, width], .75);

var y = d3.scale.linear()
.range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(7);

var svg = d3.select("#bar-chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("class", "text-center")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")");

svg.append("g")
.attr("class", "y axis")
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Stroom (per kWh)");

// load some files into a queue for recieving data
queue()
.defer(d3.json, 'data/world/sjv_world_2000.json')
.defer(d3.json, 'data/world/sjv_world_2005.json')
.defer(d3.json, 'data/world/sjv_world_2010.json')
.defer(d3.json, 'data/world/sjv_world_2014.json')
.await(makeMap);

// setting up the map
var map = new Datamap({
	element: document.getElementById('map-container'),
	scope: 'world',
	responsive: true,
	fills: {
		defaultFill: "#F2F2F2",
		low: "#fff5eb",
		low2: "#fee6ce",
		low3: "#fdd0a2",
		mid: "#fdae6b",
		mid2: "#fd8d3c",
		mid3: "#f16913",
		high: "#d94801",
		high2: "#a63603",
		high3: "#7f2704"
	},
	geographyConfig: {
		borderColor: '#A4A4A4',
		borderWidth: 0.5,
		highlightBorderWidth: 0.9,
		highlightBorderColor: '#A4A4A4',
		highlightFillColor: '#F2F2F2',
	},
	done: function (datamap) {
		datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
			code = geography.id;
			updateBar(code);
			$("html, body").animate({ scrollTop: $('#energy-bar').offset().top }, 1000);
		});
	}
});

// making the map responsive
d3.select(window).on('resize', function() {
	map.resize();
});

/*
	Getting data from loaded files.
	Push the data in a public array as JSON objects.
*/
function makeMap(error, year2000, year2005, year2010, year2014) {
	if (error) {
		console.log("We cannot retrieve the data.");
		d3.select("#map-container")
		.html("<div class='text-center'><h3>Sorry.<br><br> We cannot retrieve the data.</h3></div>");
		throw error;
	};
	year2000.forEach(function (d) {
		data.push({"country": findProp(d, d3.keys(d)[0] + ".country"), "code": d3.keys(d)[0], "year":findProp(d, d3.keys(d) + ".year"), "value": findProp(d, d3.keys(d) + ".data")});
	});
	year2005.forEach(function (d) {
		data.push({"country": findProp(d, d3.keys(d)[0] + ".country"), "code": d3.keys(d)[0],"year":findProp(d, d3.keys(d)[0] + ".year"), "value": findProp(d, d3.keys(d) + ".data")});
	});
	year2010.forEach(function (d) {
		data.push({"country": findProp(d, d3.keys(d)[0] + ".country"), "code": d3.keys(d)[0],"year":findProp(d, d3.keys(d)[0] + ".year"), "value": findProp(d, d3.keys(d) + ".data")});
	});
	year2014.forEach(function (d) {
		map.updateChoropleth(d);
		data.push({"country": findProp(d, d3.keys(d)[0] + ".country"), "code": d3.keys(d)[0],"year":findProp(d, d3.keys(d)[0] + ".year"), "value": findProp(d, d3.keys(d) + ".data")});
	});
}

function updateBar(code){
	var bar_data = [];
	for (var i = 0; i < data.length; i++) {
		if(code == data[i].code) {
			bar_data.push({"country": data[i].country, "year": data[i].year, "value": data[i].value});
		}
	}
	createBarchart(bar_data);
}

function createBarchart(data) {
	var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<strong>" + d.value + "</strong> kWh";
	});
	d3.select("#bar-chart-title")
	.html(data[0].country);

	x.domain(data.map(function(d) { return d.year;}));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	svg.select('.x.axis').transition().duration(300).call(xAxis);
	svg.select(".y.axis").transition().duration(300).call(yAxis);
	svg.call(tip);

	var bars = svg.selectAll(".bar")
	.data(data);

	bars.exit().remove();

	bars.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function(d) { return x(d.year); })
	.attr("width", x.rangeBand())
	.attr("y", function(d) { return y(d.value); })
	.attr("height", function(d) { return height - y(d.value); })
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);

	bars.transition().duration(300)
	.attr("x", function(d) { return x(d.year); })
	.attr("width", x.rangeBand())
	.attr("y", function(d) { return y(d.value); })
	.attr("height", function(d) { return height - y(d.value); });
}

function findProp(obj, prop, defval){
	if (typeof defval == 'undefined') defval = null;
	prop = prop.split('.');
	for (var i = 0; i < prop.length; i++) {
		if(typeof obj[prop[i]] == 'undefined')
			return defval;
		obj = obj[prop[i]];
	}
	return obj;
}


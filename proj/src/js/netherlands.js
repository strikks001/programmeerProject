/**

netherlands.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

var dataElek = [];
var dataGas = [];
var elek = true;
var gas = false;

var diameter = 500, //max size of the bubbles
    color    = d3.scale.category20b(); //color category

    var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

    var svg = d3.select("#bubble-chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

// load files into a queue for recieving data
queue()
.defer(d3.json, 'data/netherlands/netherlands_elk.json')
.defer(d3.json, 'data/netherlands/netherlands_gas.json')
.await(createData);

/*
	Getting data from loaded files.
	Push the data in a public array as JSON objects.
	*/
	function createData(error, elek, gas) {
	// error checking
	if (error) {
		console.log("We cannot retrieve the data.");
		d3.select("#map-container")
		.html("<div class='text-center'><h3>Sorry.<br><br> Wij kunnen geen data ophalen.</h3></div>");
		throw error;
	};

	// for each file save the data in the public list
	elek.forEach(function (d) {
		dataElek.push({"street": d.street, "place": d.place, "sjv": d.sjv, "color": d.color, "size": d.size});
	});

	gas.forEach(function (d) {
		dataGas.push({"street": d.street, "place": d.place, "sjv": d.sjv, "color": d.color, "size": d.size});
	});

	createBubbles(dataElek);
}

function createBubbles(dataList) {

	//convert numerical values from strings to numbers
	var data = dataList.map(function(d){ d.value = +d.sjv; return d; });

    //bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({children:dataList}).filter(function(d) {return !d.children; });

	// assign new data to existing DOM 
	var vis = svg.selectAll('circle')
	.data(nodes);

	// tooltip 
	var tooltip = d3.select("body")
	.append("div")
	.attr("class", "bubble-tool-tip")
	.text("tooltip");

	var duration = 300;
	var delay = 0;

	// update - this is created before enter.append. it only applies to updating nodes.
	vis.transition()
	.duration(duration)
	.delay(function(d, i) {delay = i * 7; return delay;}) 
	.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
	.attr('r', function(d) { return d.r; })
	.style("fill", function(d) { return color(d.sjv); });

	// enter - only applies to incoming elements (once emptying data)	
	vis.enter().append('circle')
	.on("mouseover", function(d) {
		tooltip.html("<div class='text-center'><strong>" + d.place + "</strong><br>SJV: " + d.sjv + "</div>");
		tooltip.style("visibility", "visible");
	})
	.on("mousemove", function() {
		return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
	})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
	.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
	.attr('r', function(d) { return d.r; })
	.transition()
	.duration(duration * 1.2)
	.style("fill", function(d) { return color(d.sjv); });

    // //format the text for each bubble
    // vis.append("text")
    // .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
    // .attr('r', function(d) { return d.r; })
    // .attr("text-anchor", "middle")
    // .text(function(d){return d.sjv; })
    // .style({
    // 	"fill":"white", 
    // 	"font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
    // 	"font-size": "12px"
    // });

	// exit
	vis.exit()
	.transition()
	.duration(duration + delay)
	.remove();
}

d3.select("#place-input")
.on("input", function () {
	var value = this.value;
	update(value);
});


d3.selectAll('input[name="options-radios"]')
.on("click", function () {
	var value = d3.select(this).property("value");
	if (value == "stroom") {
		elek = true;
		gas = false;

		createBubbles(dataElek);
	} else {
		gas = true;
		elek = false;

		createBubbles(dataGas);
	}
});

function update(value) {
	value = value.toLowerCase();
	if (elek == true) {
		
	} else (gas == true) {
		
	}
}


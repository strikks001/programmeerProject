/**

netherlands.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

var data_elek = [];
var data_gas = [];

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
		data_elek.push({"street": d.street, "place": d.place, "sjv": d.sjv, "color": d.color, "size": d.size});
	});

	gas.forEach(function (d) {
		data_gas.push({"street": d.street, "place": d.place, "sjv": d.sjv, "color": d.color, "size": d.size});
	});

	createBubbles();
}

function createBubbles() {
	//convert numerical values from strings to numbers
    var data = data_elek.map(function(d){ d.value = +d.sjv; return d; });

    //bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({children:data_elek}).filter(function(d) {return !d.children; });

    //setup the chart
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

    //create the bubbles
    bubbles.append("circle")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.sjv); });

    //format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){return d.sjv; })
        .style({
            "fill":"white", 
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
        });
}

	d3.select("#place-input")
	.on("input", function () {
		var value = this.value;
		update(value);
	});

function update(place) {

}
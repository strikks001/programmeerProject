/**

netherlands.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/
var data = [];
// load files into a queue for recieving data
queue()
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2010.json')
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2012.json')
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2014.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2010.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2012.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2014.json')
.await(createData);

/* 
	ChangeColor takes a path ID and a color (hex value)
	and changes that path's fill color 
	*/
	function changeColor(id, color) {
		if(document.getElementById(id) !== null) {
			document.getElementById(id).style.fill = color;
		}
	}



/*
	Getting data from loaded files.
	Push the data in a public array as JSON objects.
	*/
	function createData(error, elek10, elek12, elek14, gas10, gas12, gas14) {
	// error checking
	if (error) {
		console.log("We cannot retrieve the data.");
		d3.select("#map-container")
		.html("<div class='text-center'><h3>Sorry.<br><br> Wij kunnen geen data ophalen.</h3></div>");
		throw error;
	};
	// for each file save the data in the public list
	elek10.forEach(function (d) {
		data.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
		// changeColor(d.code, d.color);
	});

	d3.xml("src/img/nederland_gemeenten.svg", "image/svg+xml", function(error, xml) {
  		if (error) throw error;
  			document.getElementById("nl-map").appendChild(xml.documentElement);
  			setTooltip(data);
		});

}


function setTooltip(data) {
	// tooltip when hovering the bars
	var div = d3.select("body").append("div").attr("class", "donut-d3-tip");
	console.log(d3.select("svg"));

	// tooltip when hovering the bars
	d3.selectAll("path")
    .data(data)
    .attr('fill', function(d){return d.color;})
	.on("mousemove", function(d){
		div.style("left", d3.event.pageX+10+"px");
		div.style("top", d3.event.pageY-25+"px");
		div.style("display", "inline-block");
		div.html("<strong>" + d.community + "</strong><br>" + d.sjv);
	})
	.on("mouseout", function(d){
		div.style("display", "none");
	});

}
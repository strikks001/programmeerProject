/**

netherlands.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

var year = "2010";
var product = "electricity";

// lists to store data
var dataList = [],
detailList = [],
dataElec2010 = [],
dataElec2012 = [],
dataElec2014 = [],
dataGas2010 = [],
dataGas2012 = [],
dataGas2014 = [];

// set up for the map view
var svgMap = d3.select('svg');
var div = d3.select("body").append("div").attr("class", "nl-tooltip");

// legend information
var palletteElec = [],
palletteGas = [];
var colorsElec = ["#F2F2F2", "#f6faf4","#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c", "#00441b", "#083a1c"];
var colorsGas = ["#F2F2F2", "#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704", "#3f1302"];
var namesElec = ["Geen data", "< 400", "400 - 800", "800 - 1.200", "1.200 - 1.600", "1.600 - 2.000", "2.000 - 2.400", "2.400 - 2.800", "2.800 - 3.200", "3.200 - 3.600", "3.600 - 4.000", "4.000 >"];
var namesGas = ["Geen data", "< 250", "250 - 500", "500 - 750", "750 - 1.000", "1.000 - 1.250", "1.250 - 1.500", "1.500 - 1.750", "1.750 - 2.000", "2.000 - 2.250", "2.250 >"];

// load several files
queue()
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2010.json')
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2012.json')
.defer(d3.json, 'data/netherlands/electricity/netherlands_elek_2014.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2010.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2012.json')
.defer(d3.json, 'data/netherlands/gas/netherlands_gas_2014.json')
.await(getData);

// when selecting another variable, the map will be updated
d3.selectAll("select")
.on("change", function () {
	// update the year of the map
	year = d3.select(this).property('value');
	choiceUpdate();
});
d3.selectAll(".radio-product")
.on("click", function () {
	// update the product (electricity or gas) of the map
	product = d3.select(this).attr("value");
	choiceUpdate();
});

/*
	Get the data from the external files.
	Load the data into seperate arrays.
	One big array with all the information and arrays per year.
*/
function getData(error, elec2010, elec2012, elec2014, gas2010, gas2012, gas2014) {
	// error checking
	if (error) {
		console.log("We cannot retrieve the data.");
		alert("We cannot retrieve the data.");
		throw error;
	};

	// push every year and product to a different list
	elec2010.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2010", "product": "electricity"});
		dataElec2010.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	elec2012.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2012", "product": "electricity"});
		dataElec2012.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	elec2014.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2014", "product": "electricity"});
		dataElec2014.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	gas2010.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2010", "product": "gas"});
		dataGas2010.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	gas2012.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2012", "product": "gas"});
		dataGas2012.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	gas2014.forEach(function (d) {
		detailList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv, "year": "2014", "product": "gas"});
		dataGas2014.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	});
	// setting up the first view
	makeLegend(makeLegendData(namesElec, colorsElec));
	setMap(dataElec2010);
}

/*
	When selecting an option then change it.
	Also the legend will update.
*/
function choiceUpdate() {
	// if electricity is selected then show the right map with selected year
	if (product == "electricity") {
		if (year == "2010") {
			setMap(dataElec2010);
			titleChange("Gemiddeld stroomverbruik per huishouden in 2010");
		} else if (year == "2012") {
			setMap(dataElec2012);
			titleChange("Gemiddeld stroomverbruik per huishouden in 2012");
		} else {
			setMap(dataElec2014);
			titleChange("Gemiddeld stroomverbruik per huishouden in 2014");
		}
		// show the legend of electricity
		makeLegend(makeLegendData(namesElec,colorsElec));
	// otherwise show the information of gas in the map	
	} else {
		if (year == "2010") {
			setMap(dataGas2010);
			titleChange("Gemiddeld gasverbruik per huishouden in 2010");
		} else if (year == "2012") {
			setMap(dataGas2012);
			titleChange("Gemiddeld gasverbruik per huishouden in 2012");
		} else {
			setMap(dataGas2014);
			titleChange("Gemiddeld gasverbruik per huishouden in 2014");
		}
		// show the legend of gas
		makeLegend(makeLegendData(namesGas,colorsGas));
	}
}

/*
	Fills the map with colors.
	Shows the tooltips at the communities.
	data; data to be shown in the map and tooltips
*/
function setMap(data) {	
	// fill the communities in the netherlands
	var path = svgMap.selectAll("path")
	.data(data, function(d) {return (d && d.code) || d3.select(this).attr("id"); })
	.attr('fill', function(d){return d.color;});
	
	// tooltip when hovering the bars
	path
	.on("mousemove", function(d){
		div.style("left", d3.event.pageX+10+"px");
		div.style("top", d3.event.pageY-25+"px");
		div.style("display", "inline-block");
		// if the product is electricity then show kWh otherwise m3
		if (product == "electricity") {
			if (d.sjv == "Geen data beschikbaar"){
				div.html("<strong>" + d3.select(this).attr('class') + "</strong><br>Geen informatie beschikbaar");
			} else {
				div.html("<strong>" + d3.select(this).attr('class') + "</strong><br>SJV: " + d.sjv + " kWh");
			}
		} else if (product == "gas"){
			if (d.sjv == "Geen data beschikbaar"){
				div.html("<strong>" + d3.select(this).attr('class') + "</strong><br>Geen informatie beschikbaar");
			} else {
				div.html("<strong>" + d3.select(this).attr('class') + "</strong><br>SJV: " + d.sjv + " m3");
			}
		}
	})
	.on("mouseout", function(d){
		div.style("display", "none");
	});

	// on click a community, will show a barchart
	path.on("click", function(d){
		setBarchart(d);
	});
}

/*
	Creating data for the barchart and will change the titles at the barcharts
	data; data to be changed.
*/
function setBarchart(data) {
	var dataList = [];
	var dataListElec = [];
	var dataListGas = [];
	// gets data of the community of every year
	detailList.forEach(function(d){
		if (d.code == data.code){
			dataList.push(d);
		}
	});
	// puts the community data into seperate arrays for electricity and gas
	dataList.forEach(function(d){
		if (d.product == "electricity") {
			dataListElec.push(d);
		} else {
			dataListGas.push(d);
		}
	});
	// sets the title as a community name
	d3.select("#bar-chart-title").html(dataList[0].community);

	// shows the electricity chart
	d3.select("#bar-chart-elec").html("");
	createBarchart(dataListElec, "#bar-chart-elec");
	d3.select("#bar-chart-title-elec").html("stroomverbruik");

	// shows the gas chart
	d3.select("#bar-chart-gas").html("");
	createBarchart(dataListGas, "#bar-chart-gas");
	d3.select("#bar-chart-title-gas").html("Gasverbruik");

	// animate to the barchart
	$("html, body").animate({scrollTop: $('#bar-chart-title').offset().top }, 1000);
}

/*
	Creates the barchart.
	data; the list of information, 
	position; position of the barchart
*/
function createBarchart(data, position) {
	// checks if there is data
	data.forEach(function(d){
		if (d.sjv == "Geen data beschikbaar") {
			d.sjv = 0;
		}
	});
	// setting up the height and width of the chart
	var margin = {top: 20, right: 20, bottom: 30, left: 60},
	width = 500 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// x-axis
	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .75);
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	// y-axis
	var y = d3.scale.linear()
		.range([height, 0]);
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10);

	// sets the domains for the x and y axis
	x.domain(data.map(function(d) {return d.year;}));
	y.domain([0, d3.max(data, function(d) {return d.sjv;})]);

	// tooltip when hovering the bars
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			if (d.product == "electricity") {
				return "<strong>" + d.sjv + "</strong> kWh";
			} else {
				return "<strong>" + d.sjv + "</strong> m3";
			}
		});

	// initialze the part for the chart
	var svg = d3.select(position)
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("class", "text-center ")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// set x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// set y-axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.html(function(){
			if (data[0].product == "electricity"){
				return "Stroomverbruik (per kWh)";
			} else {
				return "Gasverbruik (per m3)";
			}
		});

	// add bars
	svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {return x(d.year);})
			.attr("width", x.rangeBand())
			.attr("y", function(d) {return y(d.sjv);})
			.attr("height", function(d) {return height - y(d.sjv);})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

	// add tooltip to the chart
	svg.call(tip);
}

/*
	Changes the title for the map
	text; text to be shown on the map.
*/
function titleChange(text) {
	d3.select("#title-change").html(text);
}

/*
	Making legend information
	nameData; text for the labels.
	colorData: color codes for the labels
*/
function makeLegendData(nameData, colorData) {
	var result = [];
	// connect names and colors together
	for (var i = 0; i < nameData.length; i++) {
		result.push({"name": nameData[i], "color": colorData[i]})
	}
	return result;
}
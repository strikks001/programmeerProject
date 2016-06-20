/**

netherlands.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

var svgMap = d3.select('svg');
var div = d3.select("body").append("div").attr("class", "donut-d3-tip");

var year = "2010";
var product = "electricity";

var dataList = [];

var palletteElec = [];
var palletteGas = [];
var colorsElec = ["#F2F2F2", "#f6faf4","#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c", "#00441b", "#083a1c"];
var colorsGas = ["#F2F2F2", "#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704", "#3f1302"];
var namesElec = ["Geen data", "< 400", "400 - 800", "800 - 1.200", "1.200 - 1.600", "1.600 - 2.000", "2.000 - 2.400", "2.400 - 2.800", "2.800 - 3.200", "3.200 - 3.600", "3.600 - 4.000", "4.000 >"];
var namesGas = ["Geen data", "< 250", "250 - 500", "500 - 750", "750 - 1.000", "1.000 - 1.250", "1.250 - 1.500", "1.500 - 1.750", "1.750 - 2.000", "2.000 - 2.250", "2.250 >"];
for (var i = 0; i < colorsElec.length; i++) {
	palletteElec.push({"name": namesElec[i], "color": colorsElec[i]})
}
for (var i = 0; i < colorsGas.length; i++) {
	palletteGas.push({"name": namesGas[i], "color": colorsGas[i]})
}
makeLegend(palletteElec);
// when selecting another variable, the map will be updated
d3.selectAll("select")
.on("change", function () {
	year = d3.select(this).property('value');
	choiceUpdate();
});

d3.selectAll(".radio-product")
.on("click", function () {
	product = d3.select(this).attr("value");
	choiceUpdate();
});

mapUpdate("data/netherlands/electricity/netherlands_elek_2010.json");

function choiceUpdate() {
	if (product == "electricity") {
		if (year == "2010") {
			mapUpdate("data/netherlands/electricity/netherlands_elek_2010.json");
			titleChange("Gemiddeld stroomverbruik per huishouden in 2010");
		} else if (year == "2012") {
			mapUpdate("data/netherlands/electricity/netherlands_elek_2012.json");
			titleChange("Gemiddeld stroomverbruik per huishouden in 2012");
		} else {
			mapUpdate("data/netherlands/electricity/netherlands_elek_2014.json");
			titleChange("Gemiddeld stroomverbruik per huishouden in 2014");
		}
		makeLegend(palletteElec);
	} else {
		if (year == "2010") {
			mapUpdate("data/netherlands/gas/netherlands_gas_2010.json");
			titleChange("Gemiddeld gasverbruik per huishouden in 2010");
		} else if (year == "2012") {
			mapUpdate("data/netherlands/gas/netherlands_gas_2012.json");
			titleChange("Gemiddeld gasverbruik per huishouden in 2012");
		} else {
			mapUpdate("data/netherlands/gas/netherlands_gas_2014.json");
			titleChange("Gemiddeld gasverbruik per huishouden in 2014");
		}
		makeLegend(palletteGas);
	}
}

function titleChange(text) {
	d3.select("#title-change").html(text);
}

function mapUpdate(file) {
	dataList.length = 0;
	// get data from json file and update the map with these values
	d3.json(file, function (error, data) {
		if (error) {
			console.log("We cannot retrieve the data.");
			alert("We cannot retrieve the data.");
			throw error;
		};
	    // update map
	    data.forEach(function (d) {
	    	dataList.push({"code": d.code, "color": d.color, "community": d.community, "sjv": d.sjv});
	    });
	    setMap(dataList);
	});
}

function setMap(data) {
	var path = svgMap.selectAll("path")
		.data(data, function(d) {return (d && d.code) || d3.select(this).attr("id"); })
		.attr('fill', function(d){return d.color;});

	if (product == "electricity") {
		// tooltip when hovering the bars
		path
		.on("mousemove", function(d){
			div.style("left", d3.event.pageX+10+"px");
			div.style("top", d3.event.pageY-25+"px");
			div.style("display", "inline-block");
			div.html("<strong>" + d.community + "</strong><br>SJV: " + d.sjv + " kWh");
		})
		.on("mouseout", function(d){
			div.style("display", "none");
		});
	} else {
		// tooltip when hovering the bars
		path
		.on("mousemove", function(d){
			div.style("left", d3.event.pageX+10+"px");
			div.style("top", d3.event.pageY-25+"px");
			div.style("display", "inline-block");
			div.html("<strong>" + d.community + "</strong><br>SJV: " + d.sjv + " m3");
		})
		.on("mouseout", function(d){
			div.style("display", "none");
		});
	}
}
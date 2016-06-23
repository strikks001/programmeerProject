/**

suppliers.js

Computer Science 50
Programmeer Project 2016
Energy Knowledge

Sanne Strikkers
11170816

*/

// donut
var svg = d3.select(".donut-chart")
	.append("svg")
	.attr("class", "donut-svg")
	.append("g")

svg.append("g")
	.attr("class", "slices")
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");
svg.append("g")
	.attr("class", "texts");

// color information
var names = ["Kolen", "Kern", "Aardgas","zon","wind","water","biomassa","Overig groen", "Overig Grijs"];
var colors = ["#d73027", "#f46d43" , "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850" ];
// general colors 
var color = d3.scale.ordinal()
	.domain(names)
	.range(colors);

// size for the donut
var width = 650,
height = 500,
radius = Math.min(width, height) / 2;

// thickness of the donut
var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.5);
var outerArc = d3.svg.arc()
	.innerRadius(radius * 1.0)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// select a company to show the donut chart
d3.selectAll(".list-group-item")
.on("click", function () {
	// setting the clicked item active
	d3.select(".active").attr("class", "list-group-item");
	d3.select(this).attr("class", "list-group-item active");
	// show the donut chart with some created data of the selected company
	var value = d3.select(this).attr("value");
	createData(value);
});

// set up the first view
createData("Essent");

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

		// push the data into a list
		dataList = [];
		data.forEach(function(d){
			if(value == d.company) {
				dataList.push({"composition": d.composition, "value": parseFloat(d.score)});
			}
		});
		// makes the actual donut
		makeDonut(dataList);
	});
}

/**
	Makes a donut chart with the given data.
	It will update the donut chart when there is other data.
	dataList; list with values of the selected company.
	*/
function makeDonut(dataList) {
	// tooltip when hovering the bars
	var div = d3.select("body").append("div").attr("class", "donut-d3-tip");

	var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});
	
	var duration = 1500;
	var key = function(d){return d.data.composition;};

	/* ------- SLICE ARCS -------*/

	var slice = svg.select(".slices").selectAll("path.slice")
	.data(pie(dataList), key)

	// fill the slice with information
	slice.enter()
		.insert("path")
		.attr("class", "slice")
		.style("fill", function(d) { return color(d.data.composition); })
		.each(function(d) {
			this._current = d;
		});

	// at an update	it will show a nice transition
	slice		
		.transition().duration(duration)
		.attrTween("d", function(d) {
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				_this._current = interpolate(t);
				return arc(_this._current);
			};
		});

	// deletes the previous information for the slice
	slice
		.exit().transition().delay(duration).duration(0)
		.remove();

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
	.data(pie(dataList), key);

	// will add the labels to the donut
	text.enter()
		.append("text")
			.attr("dy", ".35em")
			.style("opacity", 0)
			.text(function(d) {
				return d.data.composition;
			})
			.each(function(d) {
				this._current = d;
			});
	/*
		Computes the middle for placing the labels
	*/
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	// will add a nice transition to the text
	text.transition().duration(duration)
		.style("opacity", function(d) {
			return d.data.value == 0 ? 0 : 1;
		})
		.attrTween("transform", function(d) {
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				var d2 = interpolate(t);
				_this._current = d2;
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			var interpolate = d3.interpolate(this._current, d);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	// deletes the previous information for the labels
	text
		.exit().transition().delay(duration)
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
	.data(pie(dataList), key);
	
	// will add lines to the donut
	polyline.enter()
		.append("polyline")
			.style("opacity", 0)
			.each(function(d) {
				this._current = d;
			});
	
	// will add a nice transition to the lines
	polyline.transition().duration(duration)
		.style("opacity", function(d) {
			return d.data.value == 0 ? 0 : .5;
		})
		.attrTween("points", function(d){
			this._current = this._current;
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				var d2 = interpolate(t);
				_this._current = d2;
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	// deletes the previous information for the lines
	polyline
		.exit().transition().delay(duration)
		.remove();
	
	/* ------- HOVERING TEXT -------*/

	var texts = svg.select(".texts").selectAll("text")
	.data(pie(dataList), key);

	// will add text in the middle of the donut
	texts.enter()
		.append("text")
			.attr("x", 0 )
			.attr("y", 0 + radius/10 )
			.attr("class", "text-tooltip")        
			.style("text-anchor", "middle")
			.attr("font-weight", "bold")
			.style("font-size", radius/5.0+"px")
			.each(function(d) {
				this._current = d;
			});

	// on hovering a slice will show the information
	slice.on("mouseover", function(obj){
		svg.select("text.text-tooltip")
			.attr("fill", color(obj.data.composition))
			.text(obj.value + "%");
	});
	slice.on("mouseout", function(obj){
		svg.select("text.text-tooltip").text("");
	});
}

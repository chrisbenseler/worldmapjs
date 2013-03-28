
var WorldMap = function() {

	var countries = {};

	var options = {
		colors: {
			borders : {
				normal : "#000000",
				hover : "#CC0000"
			},
			fills : {
				normal : "#AAAAAA",
				hover : "#DDDDDD"
			}
		}
	};

	var get_paths = function() {
		$
		.when( $.getJSON("data/world_svg_paths_by_code.json") )
		.done( function(data) {
			
			var paper = new Raphael(document.getElementById("canvas_container"), 1200, 600);
			var border_color = "#000000";
			var unselected_color = "#CC0000";
			$.each(data, function(country, val) {
				var country_obj = new Country(country);
				var line, path;
				for (var i=0, l=val.length;i<l;i++) {

					line = paper.path(val[i]);
					line.attr({stroke:options.colors.borders.normal,'stroke-width':1,'fill':options.colors.fills.normal});
					line.country=country;

					$(line.node)
					.mousemove(function(country_obj) {
						countries[country].colorize(options);
					})
					.mouseout(function() {
						countries[country].uncolorize(options);
					});

					country_obj.borders.push(line);
				}

				countries[country] = country_obj;
			});
		});
	};

	get_paths();

	return this;

};


var Country = function(name) {
	this.name = name;
	this.borders = [];

	this.colorize = function(options) {
		var country = this;
		for (var i=0, l = country.borders.length;i<l;i++) {
			country.borders[i].animate({"fill":options.colors.fills.hover,"stroke":options.colors.borders.hover,"stroke-width":2},333);
		}
	};

	this.uncolorize = function(options) {
		var country = this;
		for (var i=0, l = country.borders.length;i<l;i++) {
			country.borders[i].animate({"fill":options.colors.fills.normal,"stroke":options.colors.borders.normal,"stroke-width":1},333);
		}
	};

	return this;
}
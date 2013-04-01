
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
			$.each(data, function(region, val) {
				var region_obj = new WorldMap.Region(region);
				var line, path;
				for (var i=0, l=val.length;i<l;i++) {

					line = paper.path(val[i]);
					line.attr({stroke:options.colors.borders.normal,'stroke-width':1,'fill':options.colors.fills.normal});
					line.region=region;

					$(line.node)
					.mousemove(function(region_obj) {
						countries[region].colorize(options);
					})
					.mouseout(function() {
						countries[region].uncolorize(options);
					});

					region_obj.borders.push(line);
				}

				countries[region] = region_obj;
			});
		});
	};

	get_paths();

	return this;

};


WorldMap.Region = function(name) {
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
};

/*global $:false, Raphael:false */
var WorldMap = function(custom_options) {
	"use strict";

	var countries = {};

	//default options
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
		},
		data_path : "data/world_svg_paths_by_code.json"
	};

	//override default options with custom
	for(var key in custom_options) {
		if(options.hasOwnProperty(key)) {
			options[key] = custom_options[key];
		}
	}

	var get_paths = function() {
		$
		.when( $.getJSON(options.data_path) )
		.done( function(data) {
			
			var paper = new Raphael($("#canvas_container")[0], "100%", 600);
			$.each(data, function(region, val) {
				var region_obj = new WorldMap.Region(region), line;

				for (var i=0, l=val.length;i<l;i++) {
					line = paper.path(val[i]);
					line.attr({stroke:options.colors.borders.normal,'stroke-width':1,'fill':options.colors.fills.normal});
					line.region=region;
					region_obj.borders.push(line);
				}

				$(region_obj.borders).each(function(index, value) {
					var line = value;
					$(line.node)
					.mousemove(function() {
						region_obj.colorize(options);
					})
					.mouseout(function() {
						region_obj.uncolorize(options);
					});
				});

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

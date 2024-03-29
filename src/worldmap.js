/*global $:false, Raphael:false */
var WorldMap = function(custom_options) {
	"use strict";

	var regions = {};

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
		data_path : "../data/world_svg_paths_by_code.json",
		container : null
	};

	//override default options with custom
	for(var key in custom_options) {
		if(options.hasOwnProperty(key)) {
			options[key] = custom_options[key];
		}
	}

	var get_paths = function() {
		if(options.container == null) {
			throw "No container for map defined";
		}

		$
		.when( $.getJSON(options.data_path) )
		.done( function(data) {
			
			var paper = new Raphael(options.container[0]);
			$.each(data, function(region, val) {
				var region_obj = new WorldMap.Region(region), line;
				regions[region] = region_obj;

				for (var i=0, l=val.length;i<l;i++) {
					line = paper.path(val[i]);
					line.region=region;
					region_obj.borders.push(line);
				}

				update_region(region, options);

			});
		});
	};

	get_paths();

	
	var update_region = function(key, options) {
		if(regions[key]!==undefined) {
			if(options.colors!==null) {
				$(regions[key].borders).each(function(index, value) {
					var line = value;
					line.attr({stroke:options.colors.borders.normal,'stroke-width':1,'fill':options.colors.fills.normal});
					$(line.node)
					.mousemove(function() {
						regions[key].colorize(options);
					})
					.mouseout(function() {
						regions[key].uncolorize(options);
					});
				});
			}
		}
	};

	this.get_region = function(key) {
		return regions[key] || null;
	};

	//reveal values & methods
	this.options = options;
	this.update_region = update_region;


	return this;

};


WorldMap.Region = function(name) {

	this.name = name;
	this.borders = [];

	this.colorize = function(options) {
		var region = this;
		for (var i=0, l = region.borders.length;i<l;i++) {
			region.borders[i].animate({"fill":options.colors.fills.hover,"stroke":options.colors.borders.hover,"stroke-width":2},333);
		}
	};

	this.uncolorize = function(options) {
		var region = this;
		for (var i=0, l = region.borders.length;i<l;i++) {
			region.borders[i].animate({"fill":options.colors.fills.normal,"stroke":options.colors.borders.normal,"stroke-width":1},333);
		}
	};

	this.on = function(event_name, cb) {
		var region = this;
		$(region.borders).each(function(index, value) {
			$(value.node)
			.on(event_name + ".worldmap", function() {
				cb.call(this, region);
			});
		});
	};

	this.off = function(event_name) {
		var region = this;
		$(region.borders).each(function(index, value) {
			$(value.node)
			.off(event_name + ".worldmap");
		});
	};

	return this;
};

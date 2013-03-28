
var WorldMap = function() {

	var options = {
		colors: {
			borders : {
				normal : "#000000",
				hover : "#CC0000"
			},
			fills : {
				normal : "#AAAAAA",
				hover : "#CC0000"
			}
		}
	}

	var get_paths = function() {
		$
		.when( $.getJSON("data/world_svg_paths_by_code.json") )
		.done( function(data) {
			var svg_borders = {};
			var paper = new Raphael(document.getElementById("canvas_container"), 1200, 600);
			var border_color = "#000000";
			var unselected_color = "#CC0000";
			$.each(data, function(country, val) {
				svg_borders[country]=[];
				var line, i, path;
				for (var i=0, l=val.length;i<l;i++) {
					line = paper.path(val[i]);
					//line.attr({stroke:border_color,'stroke-width':1,'fill':unselected_color});

					line.attr({stroke:options.colors.borders.normal,'stroke-width':1,'fill':options.colors.fills.normal});
					line.country=country;
					//$(line.node).click( get_click_handler(country));
					//$(line.node).mousemove( get_over_handler(country));
					//$(line.node).mouseout( get_out_handler(country));

					svg_borders[country].push(line);
				}
			});
			//alert(svg_borders.toSource())
		});
	}

	get_paths();

	return this;

}


var WorldMap = function() {

	var get_paths = function() {
		$
		.when( $.getJSON("data/world_svg_paths_by_code.json") )
		.done( function(response) {
			
		});
	}

	get_paths();

	return this;

}

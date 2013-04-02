"use strict";

test("create map", function() {
	var map = new WorldMap();
	ok(map!==null);
});

test("create map and override default options", function() {
	var map = new WorldMap({
		data_path: "my_path"
	});
	ok(map.options.data_path==="my_path");
});

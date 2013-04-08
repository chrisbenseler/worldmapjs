"use strict";

test("create map", function() {
	var map = new WorldMap({
		container: $("#canvas_container")
	});
	ok(map!==null);
});

test("create map and override default options", function() {
	var map = new WorldMap({
		data_path: "my_path",
		container: $("#canvas_container")
	});
	ok(map.options.data_path==="my_path");
});

var global_map = new WorldMap({
	container: $("#canvas_container")
});

asyncTest("get region", function() {
	setTimeout(function() {
		ok(global_map.get_region("BRA")!==null);
		start();
	}, 100);
});

asyncTest("set custom colors", function() {
	setTimeout(function() {
		var colors = {
			borders : {
				normal : "#00FF00",
				hover : "#CC0000"
			},
			fills : {
				normal : "#DADADA",
				hover : "#DDDDDD"
			}
		}
		global_map.update_region("BRA", {colors : colors});
		console.log(global_map.get_region("BRA").borders[0].attrs);
		ok(global_map.get_region("BRA").borders[0].attrs.stroke===colors.borders.normal);
		ok(global_map.get_region("BRA").borders[0].attrs.fill===colors.fills.normal);
		start();
	}, 100);
});


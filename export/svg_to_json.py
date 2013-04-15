#!/usr/bin/env python

from xml.dom import minidom
import json
 
config = {
	'svg_file' : 'files/mapa_sp.svg',
	'js_file'  : 'map.js'
}
 
svg = minidom.parse(config['svg_file'])
paths = svg.getElementsByTagName('path')
items = {}
 
for node in paths:
  if node.getAttributeNode('id'):
    path_id = str(node.getAttributeNode('id').nodeValue)
    path = str(node.getAttributeNode('d').nodeValue)
    items[path_id] = [path]
	
json = json.dumps(items, indent=2)
 
f = open(config['js_file'], 'w')

f.write(json)
f.close()
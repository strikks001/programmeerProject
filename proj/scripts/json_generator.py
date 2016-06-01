# creating json files
def createJson(data_list, sub):
	    # convert the list to JSON format
	    json_str = json.dumps(data_list, indent = 4)

	    jsonfile = '%s.json' %sub
	    with open(jsonfile, 'w') as f:
	    	try:
	    		f.write(json_str)
	    	except csv.Error as e:
	    		sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))
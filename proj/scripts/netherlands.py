# 
# netherlands.py
# 
# Computer Science 50
# Programmeer Project 2016
# Energy Knowledge
# 
# Sanne Strikkers
# 11170816
# 
import csv, sys, json

# creating json files
def createJson(data_list, sub):
        # convert the list to JSON format
        json_str = json.dumps(data_list, indent = 4, ensure_ascii=False)

        jsonfile = '%s.json' %sub
        with open(jsonfile, 'w') as f:
            try:
                f.write(json_str)
            except csv.Error as e:
                sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

# searching for provinces, towns, latitude en longitude
def getResult(data_list):
	product = sup_dict[i][4]
	sjv = sup_dict[i][5]

    for i in range(len(sup_dict)):
    	if product == "ELK":
    		if sjv <= 1000:
    			data_list.append({"street": sup_dict[i][0], "place": sup_dict[i][3], "product": product, "sjv": sjv, "size": 10})
    	else:
    		# f
    return data_list

# open csv file and read it into a dictionary
suppliers = 'csv/nl_sjv.csv'
with open(suppliers, 'r') as sup:
    reader = csv.reader(sup, delimiter=';')
    # ignore first line
    next(reader, None)
    try:
        sup_dict = list(reader)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))

data_list = []

createJson(getResult(data_list), "../data/netherlands/netherlands")
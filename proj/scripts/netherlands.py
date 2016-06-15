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

data_list_gas = []
data_list_stroom = []

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
def getcommunity(postcode):
	for i in range(len(nl_dict)):
		if int(postcode) == int(nl_dict[i][0]):
			return nl_dict[i][3]


# searching for provinces, towns, latitude en longitude
def getResult():
	for i in range(5000):
		product = sup_dict[i][4]
		sjv = int(sup_dict[i][5])
		street = sup_dict[i][0]
		place = sup_dict[i][3]

		# print product
		if product == "ELK":
			if sjv <= 1000:
				data_list_stroom.append({"sjv": sjv, "color": "#ffffff", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 1000 and sjv <= 2000:
				data_list_stroom.append({"sjv": sjv, "color": "#fff5eb", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 2000 and sjv <= 3000:
				data_list_stroom.append({"sjv": sjv, "color": "#fee6ce", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 3000 and sjv <= 4000:
				data_list_stroom.append({"sjv": sjv, "color": "#fdd0a2", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 4000 and sjv <= 5000:
				data_list_stroom.append({"sjv": sjv, "color": "#fdae6b", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 5000 and sjv <= 6000:
				data_list_stroom.append({"sjv": sjv, "color": "#fd8d3c", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 6000 and sjv <= 7000:
				data_list_stroom.append({"sjv": sjv,  "color": "#f16913", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 7000 and sjv <= 8000:
				data_list_stroom.append({"sjv": sjv, "color": "#d94801", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 8000 and sjv <= 9000:
				data_list_stroom.append({"sjv": sjv, "color": "#a63603", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 9000 and sjv <= 10000:
				data_list_stroom.append({"sjv": sjv, "color": "#7f2704", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 10000 and sjv <= 20000:
				data_list_stroom.append({"sjv": sjv, "color": "#3f1302", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
			elif sjv > 20000:
				data_list_stroom.append({"sjv": sjv, "color": "#0c0300", "community": getcommunity(sup_dict[i][1][:4]), "postcode": sup_dict[i][1][:4]})
		if product == "GAS":
			if sjv <= 500:
				data_list_gas.append({"sjv": sjv, "color": "#fff5eb", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 500 and sjv <= 1000:
				data_list_gas.append({"sjv": sjv, "color": "#fee6ce", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 1000 and sjv <= 1500:
				data_list_gas.append({"sjv": sjv, "color": "#fdd0a2", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 1500 and sjv <= 2000:
				data_list_gas.append({"sjv": sjv, "color": "#fdae6b", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 2000 and sjv <= 2500:
				data_list_gas.append({"sjv": sjv, "color": "#fd8d3c", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 2500 and sjv <= 3000:
				data_list_gas.append({"sjv": sjv, "color": "#f16913", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 3000 and sjv <= 3500:
				data_list_gas.append({"sjv": sjv, "color": "#d94801", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 3500 and sjv <= 4000:
				data_list_gas.append({"sjv": sjv, "color": "#a63603", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 4000 and sjv <= 4500:
				data_list_gas.append({"sjv": sjv, "color": "#7f2704", "community": getcommunity(sup_dict[i][1][:4])})
			elif sjv > 4500:
				data_list_gas.append({"sjv": sjv, "color": "#3f1302", "community": getcommunity(sup_dict[i][1][:4])})

def reduces(data_list):
	nextPlace = None
	data = []
	total = 0
	counter = 1
	avg = 0
	for i in range(len(data_list)):
		if i < (len(data_list) - 1):
			nextPlace = data_list[i + 1]
			total += data_list[i]['sjv']
			if nextPlace['community'] == data_list[i]['community']:
				counter += 1
			else:
				avg = total / counter
				data.append({"community": data_list[i]['community'], "color": data_list[i]['color'], "sjv": avg, "postcode": data_list[i]['postcode']})
				total = 0
				counter = 1
		else:
			total += data_list[-1]['sjv']
			avg = total / counter
			data.append({"community": data_list[-1]['community'], "color": data_list[-1]['color'], "sjv": avg, "postcode": data_list[-1]['postcode']})
			total = 0
			counter = 1
	return data


# def test(data_list_str):
# 	test = []
# 	for i in range(len(data_list_str)):
# 		# test.append({"community": getcommunity(data_list[i]['place']), "place": data_list[i]['place'], "product": data_list[i]['product'], "sjv": data_list[i]['sjv']})
# 		# print getcommunity(data_list_str[i]['postcode'])
# 	# print test

# open csv file and read it into a dictionary
suppliers = 'csv/nl_sjv.csv'
nl_file = 'csv/NL.csv'
with open(suppliers, 'r') as sup, open(nl_file, 'r') as nl:
	reader = csv.reader(sup, delimiter=';')
	reader2 = csv.reader(nl, delimiter=';')
    # ignore first line
	next(reader, None)
	next(reader2, None)
	try:
		sup_dict = list(reader)
		nl_dict = list(reader2)
	except csv.Error as e:
		sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))



getResult()
# reduces(data_list_stroom)
# reduces(data_list_gas)
# test(data_list_stroom)
createJson(reduces(data_list_stroom), "../data/netherlands/netherlands_elk")
# createJson(reduces(data_list_gas), "../data/netherlands/netherlands_gas")
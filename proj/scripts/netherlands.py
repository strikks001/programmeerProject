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
def getResult():
	for i in range(len(sup_dict)):
		product = sup_dict[i][4]
		sjv = int(sup_dict[i][5])
		street = sup_dict[i][0]
		place = sup_dict[i][3]

		# print product
		if product == "ELK":
			if sjv <= 1000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 5, "color": "#ffffff"})
			elif sjv > 1000 and sjv <= 2000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 8, "color": "#fff5eb"})
			elif sjv > 2000 and sjv <= 3000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 10, "color": "#fee6ce"})
			elif sjv > 3000 and sjv <= 4000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 13, "color": "#fdd0a2"})
			elif sjv > 4000 and sjv <= 5000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 15, "color": "#fdae6b"})
			elif sjv > 5000 and sjv <= 6000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 18, "color": "#fd8d3c"})
			elif sjv > 6000 and sjv <= 7000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 20, "color": "#f16913"})
			elif sjv > 7000 and sjv <= 8000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 23, "color": "#d94801"})
			elif sjv > 8000 and sjv <= 9000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 25, "color": "#a63603"})
			elif sjv > 9000 and sjv <= 10000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 28, "color": "#7f2704"})
			elif sjv > 10000 and sjv <= 20000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 30, "color": "#3f1302"})
			elif sjv > 20000:
				data_list_stroom.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 32, "color": "#0c0300"})
		if product == "GAS":
			if sjv <= 500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 5, "color": "#fff5eb"})
			elif sjv > 500 and sjv <= 1000:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 8, "color": "#fee6ce"})
			elif sjv > 1000 and sjv <= 1500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 10, "color": "#fdd0a2"})
			elif sjv > 1500 and sjv <= 2000:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 13, "color": "#fdae6b"})
			elif sjv > 2000 and sjv <= 2500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 15, "color": "#fd8d3c"})
			elif sjv > 2500 and sjv <= 3000:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 18, "color": "#f16913"})
			elif sjv > 3000 and sjv <= 3500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 20, "color": "#d94801"})
			elif sjv > 3500 and sjv <= 4000:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 23, "color": "#a63603"})
			elif sjv > 4000 and sjv <= 4500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 25, "color": "#7f2704"})
			elif sjv > 4500:
				data_list_gas.append({"street": street, "place": place, "product": product, "sjv": sjv, "size": 28, "color": "#3f1302"})



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
			if nextPlace['place'] == data_list[i]['place']:
				counter += 1
			else:
				avg = total / counter
				data.append({"place": data_list[i]['place'], "product": data_list[i]['product'], "sjv": avg})
				total = 0
				counter = 1
		else:
			total += data_list[-1]['sjv']
			avg = total / counter
			data.append({"place": data_list[-1]['place'], "product": data_list[-1]['product'], "sjv": avg})
			total = 0
			counter = 1
	return data


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

getResult()
reduces(data_list_stroom)
createJson(reduces(data_list_stroom), "../data/netherlands/netherlands_elk")
createJson(reduces(data_list_gas), "../data/netherlands/netherlands_gas")
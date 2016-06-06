# 
# suppliers.py
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
        json_str = json.dumps(data_list, indent = 4)

        jsonfile = '%s.json' %sub
        with open(jsonfile, 'w') as f:
            try:
                f.write(json_str)
            except csv.Error as e:
                sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

# searching for provinces, towns, latitude en longitude
def getResult(data_list):
    for i in range(len(sup_dict)):
    	data_list.append({"company": sup_dict[i][0], "score": sup_dict[i][1].replace('.', ','), "composition": sup_dict[i][2], "kind": sup_dict[i][3]})

    return data_list

# open csv file and read it into a dictionary
suppliers = 'csv/suppliers.csv'
with open(suppliers, 'r') as sup:
    reader = csv.reader(sup, delimiter=';')
    # ignore first line
    next(reader, None)
    try:
        sup_dict = list(reader)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))

data_list = []

createJson(getResult(data_list), "../data/suppliers/suppliers")
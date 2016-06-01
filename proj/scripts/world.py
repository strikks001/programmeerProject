# 
# world.py
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
def getCode(country):
    for i in range(len(code_dict)):
        if code_dict[i][0].lower() == country.lower():
            return code_dict[i][1]

def addFillKey():
    for i in range(len(sjv_dict)):
        if int(sjv_dict[i][1]) == country.lower():
            return code_dict[i][1]

# open csv file and read it into a dictionary
world_sjv = 'csv/energyuse_world.csv'
country_codes = 'csv/country_codes.csv'
with open(world_sjv, 'r') as sjv, open(country_codes, 'r') as code:
    reader_sjv = csv.reader(sjv, delimiter=';')
    reader_code = csv.reader(code, delimiter=';')
    # ignore first line
    next(reader_sjv, None)
    next(reader_code, None)
    try:
        sjv_dict = list(reader_sjv)
        code_dict = list(reader_code)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))

sjv_data = []
for i in range(len(sjv_dict)):
    sjv_data.append({getCode(sjv_dict[i][0]): {"country": sjv_dict[i][0], "2000": sjv_dict[i][1], "2005": sjv_dict[i][2], "2010": sjv_dict[i][3], "2011": sjv_dict[i][4], "2012": sjv_dict[i][5], "2013": sjv_dict[i][6], "2014": sjv_dict[i][7]}})

createJson(sjv_data, "../data/sjv_world")



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

# searching for provinces, towns, latitude en longitude
def getResult(year, num, data_list):
    for i in range(len(sjv_dict)):
        if int(sjv_dict[i][num]) <= 1000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "low", "year": year}})
        elif int(sjv_dict[i][num]) > 1000 and int(sjv_dict[i][num]) <= 2500:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "low2", "year": year}})
        elif int(sjv_dict[i][num]) > 2500 and int(sjv_dict[i][num]) <= 4000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "low3", "year": year}})
        elif int(sjv_dict[i][num]) > 4000 and int(sjv_dict[i][num]) <= 5500:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "mid", "year": year}})
        elif int(sjv_dict[i][num]) > 5500 and int(sjv_dict[i][num]) <= 7000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "mid2", "year": year}})
        elif int(sjv_dict[i][num]) > 7000 and int(sjv_dict[i][num]) <= 8500:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "mid3", "year": year}})
        elif int(sjv_dict[i][num]) > 8500 and int(sjv_dict[i][num]) <= 10000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "high", "year": year}})
        elif int(sjv_dict[i][num]) > 10000 and int(sjv_dict[i][num]) <= 20000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "high2", "year": year}})
        elif int(sjv_dict[i][num]) > 20000:
            data_list.append({getCode(sjv_dict[i][0]):{"country": sjv_dict[i][0], "data": sjv_dict[i][num], "fillKey": "high3", "year": year}})
    return data_list

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

sjv_data_2000 = []
sjv_data_2005 = []
sjv_data_2010 = []
sjv_data_2014 = []

createJson(getResult("2000", 1, sjv_data_2000), "../data/world/sjv_world_2000")
createJson(getResult("2005", 2, sjv_data_2005), "../data/world/sjv_world_2005")
createJson(getResult("2010", 3, sjv_data_2010), "../data/world/sjv_world_2010")
createJson(getResult("2014", 7, sjv_data_2014), "../data/world/sjv_world_2014")


